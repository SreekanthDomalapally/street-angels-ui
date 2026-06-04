"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiLogin, apiRegister } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldIcon, SparklesIcon } from "@/components/icons";

export default function WelcomePage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignIn) {
        await apiLogin({ email, password });
      } else {
        await apiRegister({ name, email, password });
      }
      router.push("/home");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function tryDemo() {
    setLoading(true);
    setError("");
    try {
      await apiLogin({
        email: "demo@streetangels.app",
        password: "demo",
      });
      router.push("/home");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo unavailable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-7">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <ShieldIcon className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tighter">YouHoo Alert</h1>
            <p className="text-muted-foreground text-sm">
              Assistance when you need it most.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={tryDemo}
          disabled={loading}
          className="w-full h-14 rounded-2xl border flex items-center justify-center gap-3 font-semibold text-sm text-primary transition-all active:scale-[0.98] disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.08))",
            borderColor: "hsl(var(--primary) / 0.35)",
            boxShadow: "0 0 20px hsl(var(--primary) / 0.12)",
          }}
        >
          <SparklesIcon />
          {loading ? "Signing in…" : "Try Demo — instant access"}
        </button>

        <div className="flex items-center gap-3 text-muted-foreground text-xs">
          <div className="flex-1 h-px bg-border" />
          <span>or sign in with your account</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isSignIn && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Jane Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
            {loading ? "Please wait…" : isSignIn ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {isSignIn ? "Need an account? Register" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
