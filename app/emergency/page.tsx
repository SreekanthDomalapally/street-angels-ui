"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  apiActiveEmergency,
  apiResolveEmergency,
} from "@/lib/api-client";
import type { Emergency } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  MapPinIcon,
  MicIcon,
  VideoIcon,
} from "@/components/icons";

const RESPONDERS = [
  {
    id: "r1",
    name: "Sarah",
    initials: "S",
    distanceMiles: 0.4,
    appearsAfterMs: 1800,
    color: "#f59e0b",
  },
  {
    id: "r2",
    name: "James",
    initials: "J",
    distanceMiles: 1.2,
    appearsAfterMs: 3400,
    color: "#8b5cf6",
  },
];

type ResponderStatus = "pending" | "accepted" | "rejected";

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function EmergencyMap() {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-border"
      style={{ height: 130, background: "#0f1923" }}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.13]"
        preserveAspectRatio="none"
        viewBox="0 0 360 130"
      >
        {[26, 52, 78, 104].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#4a9eff" strokeWidth="0.8" />
        ))}
        {[50, 110, 170, 230, 290].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="130" stroke="#4a9eff" strokeWidth="0.8" />
        ))}
        <line x1="0" y1="65" x2="360" y2="65" stroke="#4a9eff" strokeWidth="1.5" />
        <line x1="180" y1="0" x2="180" y2="130" stroke="#4a9eff" strokeWidth="1.5" />
      </svg>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white z-10"
        style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.6)" }}
      />
      <span className="absolute top-1.5 right-2 text-[9px] font-bold tracking-wider opacity-30 text-white">
        LIVE
      </span>
    </div>
  );
}

function MicVisualizer({ active }: { active: boolean }) {
  const heights = [0.45, 0.7, 1, 0.55, 0.85, 0.4, 0.9, 0.6];
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 16 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-full flex-shrink-0 w-0.5"
          style={{
            height: active ? `${h * 100}%` : "25%",
            background: active ? "hsl(var(--primary))" : "hsl(var(--border))",
          }}
        />
      ))}
    </div>
  );
}

export default function EmergencyPage() {
  const router = useRouter();
  const [emergency, setEmergency] = useState<Emergency | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<Record<string, ResponderStatus>>({});
  const [mapOpen, setMapOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [ending, setEnding] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    apiActiveEmergency().then(({ emergency: e }) => {
      if (!e) {
        router.replace("/home");
        return;
      }
      setEmergency(e);
    });
  }, [router]);

  useEffect(() => {
    if (!emergency?.startedAt) return;
    const start = new Date(emergency.startedAt).getTime();
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [emergency?.startedAt]);

  useEffect(() => {
    if (!emergency) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    RESPONDERS.forEach((r) => {
      const t = setTimeout(() => {
        setVisibleIds((prev) => (prev.includes(r.id) ? prev : [...prev, r.id]));
        setStatuses((prev) => (prev[r.id] ? prev : { ...prev, [r.id]: "pending" }));
      }, r.appearsAfterMs);
      timersRef.current.push(t);
    });
    return () => timersRef.current.forEach(clearTimeout);
  }, [emergency]);

  const accepted = RESPONDERS.find((r) => statuses[r.id] === "accepted");
  const pending = RESPONDERS.filter(
    (r) => visibleIds.includes(r.id) && statuses[r.id] === "pending",
  );

  const endEmergency = useCallback(async () => {
    if (!emergency) return;
    setEnding(true);
    try {
      await apiResolveEmergency(emergency.id);
      router.push("/home");
      router.refresh();
    } finally {
      setEnding(false);
      setSheetOpen(false);
    }
  }, [emergency, router]);

  if (!emergency) {
    return <div className="min-h-[100dvh] bg-background" />;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
            style={{ animation: "dotBlink 1.1s ease-in-out infinite" }}
          />
          <span className="text-sm font-semibold text-primary tracking-wide">
            Emergency Active
          </span>
        </div>
        <span className="font-mono text-lg font-bold tabular-nums">
          {formatElapsed(elapsed)}
        </span>
      </header>

      <div className="flex-1 flex flex-col px-5 gap-4 overflow-y-auto pb-6">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4 min-h-[200px]">
          {accepted && (
            <div
              className="w-full flex flex-col items-center gap-3"
              style={{ animation: "slideUp 0.35s ease-out" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                style={{ background: "#22c55e", boxShadow: "0 0 28px rgba(34,197,94,0.35)" }}
              >
                <CheckIcon className="h-8 w-8" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">
                  {accepted.name} is responding
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  On their way · {accepted.distanceMiles} mi away
                </p>
              </div>
            </div>
          )}

          {!accepted && pending.length > 0 && (
            <div className="w-full space-y-3" style={{ animation: "slideUp 0.35s ease-out" }}>
              {pending.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-border p-4 flex items-center gap-4 bg-card"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                    style={{ background: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base">{r.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.distanceMiles} mi away
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setStatuses((s) => ({ ...s, [r.id]: "accepted" }))
                      }
                      className="h-11 px-5 rounded-xl font-bold text-sm text-white"
                      style={{ background: "#22c55e", minWidth: 80 }}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setStatuses((s) => ({ ...s, [r.id]: "rejected" }))
                      }
                      className="h-11 px-5 rounded-xl font-bold text-sm border border-border text-muted-foreground"
                      style={{ minWidth: 80 }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!accepted && pending.length === 0 && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    style={{
                      animation: "alertingDot 1.2s ease-in-out infinite",
                      animationDelay: `${i * 0.28}s`,
                    }}
                  />
                ))}
              </div>
              <div>
                <p className="text-lg font-semibold">Alerting your contacts</p>
                <p className="text-sm text-muted-foreground mt-1">
                  They will be notified immediately
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {[
            { icon: MapPinIcon, label: "Location active" },
            { icon: MicIcon, label: accepted ? "Audio live" : "Audio ready" },
            { icon: VideoIcon, label: "Video active" },
          ].map(({ icon: StatusIcon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-medium text-primary"
              style={{
                background: "hsl(var(--primary) / 0.07)",
                borderColor: "hsl(var(--primary) / 0.2)",
              }}
            >
              <StatusIcon className="h-3 w-3 flex-shrink-0 opacity-80" />
              {label}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground"
            onClick={() => setMapOpen((o) => !o)}
          >
            <span>Map, feeds & audio</span>
            <span>{mapOpen ? "▲" : "▼"}</span>
          </button>
          {mapOpen && (
            <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
              <EmergencyMap />
              <div className="flex gap-2">
                {[
                  { label: "You", dark: true },
                  { label: accepted ? accepted.name : "Waiting…", dark: false },
                ].map(({ label, dark }) => (
                  <div
                    key={label}
                    className="flex-1 rounded-xl overflow-hidden relative border aspect-[4/3]"
                    style={{
                      background: dark ? "#050e1a" : "#120508",
                      borderColor: dark
                        ? "hsl(var(--primary) / 0.2)"
                        : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <span className="absolute top-1.5 left-2 flex items-center gap-1 bg-black/50 rounded px-1.5 py-0.5 text-[8px] font-bold text-white tracking-wider">
                      LIVE
                    </span>
                    <span
                      className="absolute bottom-1.5 left-2 text-[10px] font-semibold text-white/75"
                      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 px-1">
                <span className="text-xs text-muted-foreground font-medium">Mic</span>
                <MicVisualizer active={!!accepted} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-8 pt-3 flex-shrink-0 border-t border-border">
        <Button
          className="w-full h-16 rounded-2xl text-lg font-bold"
          onClick={() => setSheetOpen(true)}
        >
          I am safe — End alert
        </Button>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80">
          <div className="w-full max-w-lg rounded-t-2xl border border-border bg-card p-6 pb-10 space-y-5">
            <div className="text-center space-y-2 pt-2">
              <h2 className="text-2xl font-bold">Are you safe?</h2>
              <p className="text-base text-muted-foreground">
                This stops location sharing and notifies your contacts you are okay.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full h-14 text-base"
                onClick={endEmergency}
                disabled={ending}
              >
                {ending ? "Ending…" : "Yes, I am safe"}
              </Button>
              <Button
                variant="outline"
                className="w-full h-14 text-base"
                onClick={() => setSheetOpen(false)}
              >
                Back to emergency
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
