"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertIcon,
  ArrowLeftIcon,
  CheckIcon,
  FlagIcon,
  MapPinIcon,
  UsersIcon,
  XIcon,
} from "@/components/icons";

type EmergencyStatus = "active" | "resolved" | "cancelled";
type ReportStatus = "pending" | "reviewing" | "dismissed";

type AdminEmergency = {
  id: string;
  userName: string;
  startedAt: Date;
  status: EmergencyStatus;
  lat: number;
  lng: number;
  respondersCount: number;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  suspended: boolean;
  emergencies: number;
};

type AdminReport = {
  id: string;
  reporter: string;
  target: string;
  reason: string;
  createdAt: Date;
  status: ReportStatus;
};

const INITIAL_EMERGENCIES: AdminEmergency[] = [
  {
    id: "e1",
    userName: "Emma Rodriguez",
    startedAt: new Date(Date.now() - 240 * 1000),
    status: "active",
    lat: 51.507,
    lng: -0.127,
    respondersCount: 2,
  },
  {
    id: "e2",
    userName: "Aisha Patel",
    startedAt: new Date(Date.now() - 1320 * 1000),
    status: "resolved",
    lat: 51.515,
    lng: -0.098,
    respondersCount: 1,
  },
  {
    id: "e3",
    userName: "Chloe Kim",
    startedAt: new Date(Date.now() - 3480 * 1000),
    status: "cancelled",
    lat: 51.499,
    lng: -0.142,
    respondersCount: 0,
  },
];

const INITIAL_USERS: AdminUser[] = [
  { id: "u1", name: "Emma Rodriguez", email: "emma@example.com", suspended: false, emergencies: 3 },
  { id: "u2", name: "Marcus Webb", email: "marcus@example.com", suspended: false, emergencies: 1 },
  { id: "u3", name: "Priya Sharma", email: "priya@example.com", suspended: true, emergencies: 0 },
  { id: "u4", name: "Jake Thornton", email: "jake@example.com", suspended: false, emergencies: 7 },
];

const INITIAL_REPORTS: AdminReport[] = [
  {
    id: "r1",
    reporter: "Emma Rodriguez",
    target: "Marcus Webb",
    reason: "Declined emergency request without valid reason",
    createdAt: new Date(Date.now() - 7200 * 1000),
    status: "pending",
  },
  {
    id: "r2",
    reporter: "Aisha Patel",
    target: "Jake Thornton",
    reason: "Responder accepted but did not show up",
    createdAt: new Date(Date.now() - 300 * 60 * 1000),
    status: "reviewing",
  },
  {
    id: "r3",
    reporter: "Chloe Kim",
    target: "Priya Sharma",
    reason: "False emergency triggered repeatedly",
    createdAt: new Date(Date.now() - 1080 * 60 * 1000),
    status: "dismissed",
  },
];

function timeAgo(date: Date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-primary/15 text-primary border-primary/30",
    resolved: "bg-green-500/15 text-green-400 border-green-500/30",
    cancelled: "bg-muted/60 text-muted-foreground border-border",
    pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    reviewing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dismissed: "bg-muted/60 text-muted-foreground border-border",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${styles[status] ?? styles.cancelled}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function EmergenciesTab({
  items,
  onResolve,
}: {
  items: AdminEmergency[];
  onResolve: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((e) => (
        <div key={e.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold">{e.userName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPinIcon /> {timeAgo(e.startedAt)}
              </div>
            </div>
            <StatusBadge status={e.status} />
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Lat {e.lat.toFixed(3)}</span>
            <span>Lng {e.lng.toFixed(3)}</span>
            <span>
              {e.respondersCount} responder{e.respondersCount !== 1 ? "s" : ""}
            </span>
          </div>
          {e.status === "active" && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => onResolve(e.id)}
            >
              <CheckIcon className="mr-1.5" /> Force Resolve
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

function UsersTab({
  items,
  confirmId,
  onConfirm,
  onCancel,
  onRequestConfirm,
}: {
  items: AdminUser[];
  confirmId: string | null;
  onConfirm: (id: string) => void;
  onCancel: () => void;
  onRequestConfirm: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((u) => (
        <div
          key={u.id}
          className={`bg-card border rounded-xl p-4 transition-all ${u.suspended ? "border-primary/20 opacity-60" : "border-border"}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center">
                {u.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm">{u.name}</div>
                <div className="text-xs text-muted-foreground">{u.email}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {u.emergencies} emergency sessions
                </div>
              </div>
            </div>
            {u.suspended && (
              <span className="text-xs text-primary border border-primary/30 bg-primary/10 px-2 py-0.5 rounded-full font-semibold">
                Suspended
              </span>
            )}
          </div>
          {confirmId === u.id ? (
            <div className="mt-3 flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={() => onConfirm(u.id)}
              >
                {u.suspended ? "Re-activate" : "Confirm Suspend"}
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs h-8" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full text-xs h-8"
              onClick={() => onRequestConfirm(u.id)}
            >
              {u.suspended ? "Re-activate Account" : "Suspend Account"}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

function ReportsTab({
  items,
  onStatus,
}: {
  items: AdminReport[];
  onStatus: (id: string, status: ReportStatus) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((r) => (
        <div key={r.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm font-semibold">
                {r.reporter}{" "}
                <span className="text-muted-foreground font-normal">reported</span>{" "}
                {r.target}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <MapPinIcon /> {timeAgo(r.createdAt)}
              </div>
            </div>
            <StatusBadge status={r.status} />
          </div>
          <p className="text-sm text-muted-foreground leading-snug border-l-2 border-border pl-3 italic">
            &ldquo;{r.reason}&rdquo;
          </p>
          {r.status === "pending" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                onClick={() => onStatus(r.id, "reviewing")}
              >
                <CheckIcon className="mr-1 h-3 w-3" /> Investigate
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={() => onStatus(r.id, "dismissed")}
              >
                <XIcon className="mr-1 h-3 w-3" /> Dismiss
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function AdminPanel() {
  const [tab, setTab] = useState<"emergencies" | "users" | "reports">("emergencies");
  const [emergencies, setEmergencies] = useState(INITIAL_EMERGENCIES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [confirmUserId, setConfirmUserId] = useState<string | null>(null);

  const tabs = [
    {
      id: "emergencies" as const,
      label: "Emergencies",
      icon: AlertIcon,
      count: emergencies.filter((e) => e.status === "active").length,
    },
    {
      id: "users" as const,
      label: "Users",
      icon: UsersIcon,
      count: users.filter((u) => u.suspended).length,
    },
    {
      id: "reports" as const,
      label: "Reports",
      icon: FlagIcon,
      count: reports.filter((r) => r.status === "pending").length,
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b border-border bg-card sticky top-0 z-10">
        <Link href="/home" className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ArrowLeftIcon />
        </Link>
        <div>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-xs text-muted-foreground">Safeguarding dashboard</p>
        </div>
        <span className="ml-auto text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-semibold">
          INTERNAL
        </span>
      </header>

      <div className="flex border-b border-border bg-card sticky top-[73px] z-10">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium relative transition-colors ${
              tab === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.label}</span>
            {t.count > 0 && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                {t.count}
              </span>
            )}
            {tab === t.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 p-4 overflow-y-auto">
        {tab === "emergencies" && (
          <EmergenciesTab
            items={emergencies}
            onResolve={(id) =>
              setEmergencies((list) =>
                list.map((e) => (e.id === id ? { ...e, status: "resolved" as const } : e)),
              )
            }
          />
        )}
        {tab === "users" && (
          <UsersTab
            items={users}
            confirmId={confirmUserId}
            onRequestConfirm={setConfirmUserId}
            onCancel={() => setConfirmUserId(null)}
            onConfirm={(id) => {
              setUsers((list) =>
                list.map((u) => (u.id === id ? { ...u, suspended: !u.suspended } : u)),
              );
              setConfirmUserId(null);
            }}
          />
        )}
        {tab === "reports" && (
          <ReportsTab
            items={reports}
            onStatus={(id, status) =>
              setReports((list) => list.map((r) => (r.id === id ? { ...r, status } : r)))
            }
          />
        )}
      </main>
    </div>
  );
}
