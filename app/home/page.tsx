"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  apiActiveEmergency,
  apiCreateEmergency,
  apiMe,
} from "@/lib/api-client";
import type { User } from "@/lib/types";
import { SosHoldButton, SosSendingOverlay } from "@/components/sos-hold-button";
import {
  MapPinIcon,
  MicIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
  VideoIcon,
} from "@/components/icons";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    apiMe().then(setUser);
    apiActiveEmergency().then(({ emergency }) => {
      if (emergency?.status === "active") {
        router.replace("/emergency");
      }
    });
  }, [router]);

  const handleActivate = useCallback(async () => {
    setSending(true);
    try {
      await apiCreateEmergency();
      setTimeout(() => router.push("/emergency"), 600);
    } catch {
      setSending(false);
    }
  }, [router]);

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div
      className="min-h-[100dvh] flex flex-col select-none overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      <header className="p-6 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <ShieldIcon className="text-primary" />
          <span className="font-semibold text-sm">Protected</span>
        </div>
        <div className="flex gap-2">
          <Link
            href="/contacts"
            className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
          >
            <UsersIcon />
          </Link>
          <Link
            href="/profile"
            className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
          >
            <UserIcon />
          </Link>
          <Link
            href="/admin"
            className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors opacity-40"
          >
            <ShieldIcon />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-6 pb-8">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Hi, {firstName}</h1>
          <p className="text-muted-foreground text-sm">
            Hold the button below to send a silent alert.
          </p>
        </div>

        <SosHoldButton onActivate={handleActivate} disabled={sending} />

        <p className="text-xs text-muted-foreground max-w-[220px] text-center leading-relaxed">
          Your contacts receive your live location immediately.
        </p>

        <div
          className="flex gap-2 flex-wrap justify-center"
        >
          {[
            { icon: MapPinIcon, label: "Location" },
            { icon: MicIcon, label: "Audio" },
            { icon: VideoIcon, label: "Video" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-border text-muted-foreground"
            >
              <Icon />
              {label} ready
            </span>
          ))}
        </div>
      </main>

      {sending && <SosSendingOverlay />}
    </div>
  );
}
