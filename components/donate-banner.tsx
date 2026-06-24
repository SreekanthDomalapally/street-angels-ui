import Link from "next/link";

export function DonateBanner() {
  return (
    <div className="bg-foreground/5 border-b border-foreground/10">
      <div className="container mx-auto max-w-6xl px-4 py-2 sm:px-6 text-center">
        <p className="text-xs text-muted">
          Free for everyone — help cover growing server costs as our community expands.{" "}
          <Link href="#donate" className="font-medium text-coral hover:text-coral-soft transition-colors">
            Donate
          </Link>
        </p>
      </div>
    </div>
  );
}
