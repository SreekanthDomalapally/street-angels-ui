"use client";

import { useCallback, useRef, useState } from "react";

const HOLD_MS = 5000;
const RING_R = 112;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

type Props = {
  onActivate: () => void;
  disabled?: boolean;
};

export function SosHoldButton({ onActivate, disabled }: Props) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [connecting, setConnecting] = useState(false);
  const [tick, setTick] = useState(0);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef(5);

  const clearHold = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const endHold = useCallback(() => {
    if (connecting) return;
    clearHold();
    setHolding(false);
    setProgress(0);
    setCountdown(5);
    countdownRef.current = 5;
  }, [connecting, clearHold]);

  const startHold = useCallback(() => {
    if (disabled || connecting) return;
    setHolding(true);
    setProgress(0);
    setCountdown(5);
    countdownRef.current = 5;
    startRef.current = performance.now();

    const tickFrame = () => {
      const elapsed = performance.now() - startRef.current;
      const pct = Math.min((elapsed / HOLD_MS) * 100, 100);
      setProgress(pct);
      const secs = Math.max(1, Math.ceil((HOLD_MS - elapsed) / 1000));
      if (secs !== countdownRef.current) {
        countdownRef.current = secs;
        setCountdown(secs);
        setTick((t) => t + 1);
      }
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tickFrame);
      }
    };
    rafRef.current = requestAnimationFrame(tickFrame);

    timeoutRef.current = setTimeout(() => {
      clearHold();
      setConnecting(true);
      onActivate();
    }, HOLD_MS);
  }, [disabled, connecting, clearHold, onActivate]);

  const strokeOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
  const glow = progress / 100;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: 264, height: 264 }}
    >
      {!holding && !connecting && (
        <>
          <span
            className="absolute inset-0 rounded-full border border-primary/40"
            style={{ animation: "breatheRing 3s ease-in-out infinite" }}
          />
          <span
            className="absolute rounded-full border border-primary/20"
            style={{
              inset: -14,
              animation: "breatheRing2 3s ease-in-out infinite 0.4s",
            }}
          />
        </>
      )}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 264 264"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="132"
          cy="132"
          r={RING_R}
          fill="none"
          stroke={holding ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card-border))"}
          strokeWidth="5"
        />
        {holding && (
          <circle
            cx="132"
            cy="132"
            r={RING_R}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
          />
        )}
      </svg>
      <button
        type="button"
        className="relative rounded-full flex flex-col items-center justify-center select-none"
        style={{
          width: 212,
          height: 212,
          touchAction: "none",
          animation: connecting
            ? "softPulse 1.2s ease-in-out infinite"
            : holding
              ? tick > 0
                ? undefined
                : undefined
              : "idleGlow 3.5s ease-in-out infinite",
          background: connecting
            ? "hsl(148 40% 18%)"
            : holding
              ? `hsl(148 ${34 + glow * 10}% ${16 + glow * 8}%)`
              : "hsl(var(--card))",
          border: holding || connecting ? "1.5px solid hsl(var(--primary) / 0.35)" : "1.5px solid hsl(var(--card-border))",
          boxShadow: holding
            ? `0 0 ${32 + glow * 36}px ${8 + glow * 16}px hsl(var(--primary) / ${0.18 + glow * 0.16})`
            : undefined,
        }}
        disabled={disabled}
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onContextMenu={(e) => e.preventDefault()}
      >
        {connecting ? (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-primary/60 border-t-primary"
              style={{ animation: "spin 0.9s linear infinite" }}
            />
            <span className="text-sm font-semibold text-primary/80 tracking-wide">
              Connecting…
            </span>
          </div>
        ) : holding ? (
          <div className="flex flex-col items-center gap-1.5">
            <span
              key={countdown}
              className="font-black text-white tabular-nums leading-none"
              style={{ fontSize: 72, letterSpacing: "-0.03em" }}
            >
              {countdown}
            </span>
            <span className="text-xs text-white/50 tracking-widest uppercase font-medium">
              release to cancel
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span
              className="font-black tracking-tighter text-primary leading-none"
              style={{ fontSize: 42 }}
            >
              SOS
            </span>
            <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Hold to activate
            </span>
          </div>
        )}
      </button>
    </div>
  );
}

export function SosSendingOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(148 38% 10%) 0%, hsl(var(--background)) 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className="w-16 h-16 rounded-full border-2 border-primary/40 border-t-primary"
          style={{ animation: "spin 1s linear infinite" }}
        />
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-primary/90">Sending alert</p>
          <p className="text-sm text-muted-foreground">Contacting your trusted people…</p>
        </div>
      </div>
    </div>
  );
}
