import Image from "next/image";
import Link from "next/link";
import { TAGLINE } from "@/lib/site";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group">
      <Image
        src="/logo.png"
        alt="YouHooAlert"
        width={compact ? 40 : 48}
        height={compact ? 40 : 48}
        className="rounded-xl ring-2 ring-coral/40 group-hover:ring-coral/70 transition-shadow"
        priority
      />
      <div className="leading-tight">
        <span className="block font-bold text-foreground text-base sm:text-lg tracking-tight">
          YouHooAlert
        </span>
        {!compact && (
          <span className="block text-[9px] sm:text-[10px] font-medium tracking-[0.12em] text-muted uppercase mt-0.5">
            {TAGLINE}
          </span>
        )}
      </div>
    </Link>
  );
}
