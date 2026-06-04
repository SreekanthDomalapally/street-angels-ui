"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  apiAddContact,
  apiContacts,
  apiDeleteContact,
  apiUpdateContact,
} from "@/lib/api-client";
import type { Contact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const list = await apiContacts();
      setContacts(list);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await apiContacts();
        if (!cancelled) setContacts(list);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiAddContact({
        name,
        phone,
        priority: contacts.length + 1,
      });
      setDialogOpen(false);
      setName("");
      setPhone("");
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await apiDeleteContact(id);
    await load();
  }

  async function handleReorder(
    id: string,
    priority: number,
    direction: "up" | "down",
  ) {
    const sorted = [...contacts].sort((a, b) => a.priority - b.priority);
    const idx = sorted.findIndex((c) => c.id === id);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === sorted.length - 1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const other = sorted[swapIdx];
    await apiUpdateContact(id, { priority: other.priority });
    await apiUpdateContact(other.id, { priority });
    await load();
  }

  const sorted = [...contacts].sort((a, b) => a.priority - b.priority);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b border-border bg-card">
        <Link href="/home" className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ArrowLeftIcon />
        </Link>
        <h1 className="text-xl font-bold flex-1">Trusted Contacts</h1>
        <Button size="sm" className="gap-1" onClick={() => setDialogOpen(true)}>
          <PlusIcon /> Add
        </Button>
      </header>

      <main className="flex-1 p-4 space-y-4">
        <p className="text-sm text-muted-foreground">
          These people will be alerted instantly when you activate SOS.
        </p>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-xl bg-card/50">
            <p className="text-muted-foreground">
              No contacts added yet.
              <br />
              Add someone you trust.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((c, idx) => (
              <div
                key={c.id}
                className="bg-card border border-border p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <PhoneIcon /> {c.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={idx === 0}
                      onClick={() => handleReorder(c.id, c.priority, "up")}
                    >
                      <ChevronUpIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={idx === sorted.length - 1}
                      onClick={() => handleReorder(c.id, c.priority, "down")}
                    >
                      <ChevronDownIcon />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(c.id)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-lg font-bold">Add Trusted Contact</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="cname" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="cname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Mom"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cphone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="cphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={saving}>
                  Save Contact
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
