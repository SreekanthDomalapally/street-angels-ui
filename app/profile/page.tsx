"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiLogout, apiMe, apiUpdateProfile } from "@/lib/api-client";
import type { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, LogOutIcon, ShieldIcon, UserIcon } from "@/components/icons";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiMe().then((u) => {
      if (u) {
        setUser(u);
        setName(u.name);
        setPhrase(u.emergencyPhrase ?? "");
      }
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await apiUpdateProfile({
        name,
        emergencyPhrase: phrase.trim() || null,
      });
      setUser(updated);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await apiLogout();
    router.push("/welcome");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-background p-4 space-y-6">
        <div className="h-10 w-32 bg-card rounded animate-pulse" />
        <div className="h-32 w-full bg-card rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Link href="/home" className="p-2 -ml-2 rounded-full hover:bg-accent">
            <ArrowLeftIcon />
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOutIcon className="mr-2" /> Logout
        </Button>
      </header>

      <main className="flex-1 p-4 space-y-6 max-w-md w-full mx-auto">
        <div className="flex flex-col items-center py-6 bg-card rounded-xl border border-border mt-4">
          <div className="h-20 w-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <UserIcon className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-6 bg-card p-6 rounded-xl border border-border"
        >
          <div className="space-y-2">
            <label htmlFor="pname" className="text-sm font-medium">
              Display Name
            </label>
            <Input
              id="pname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label htmlFor="phrase" className="text-sm font-medium">
                Siri / Voice Action Phrase
              </label>
              <ShieldIcon className="text-primary h-4 w-4" />
            </div>
            <p className="text-xs text-muted-foreground">
              Optional. The phrase you can speak to instantly trigger an SOS
              without touching your phone.
            </p>
            <Input
              id="phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="E.g. Help me now"
            />
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </main>
    </div>
  );
}
