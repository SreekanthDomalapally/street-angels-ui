import { BrandLogo } from "@/components/brand-logo";
import Link from "next/link";

const social = [
  { label: "Facebook", href: "https://www.facebook.com/youhooalert", icon: "f" },
  { label: "Instagram", href: "https://www.instagram.com/youhooalert", icon: "◎" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/youhooalert", icon: "in" },
];

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-bg-deep">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <BrandLogo compact />

          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted" aria-label="Footer">
            <Link href="/privacy" className="hover:text-coral transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-coral transition-colors">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-coral transition-colors">
              Contact Us
            </Link>
            <Link href="#donate" className="hover:text-coral transition-colors">
              Donate
            </Link>
            <Link href="#early-access" className="hover:text-coral transition-colors">
              Early Access
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 border border-foreground/10 text-xs font-bold text-foreground/80 hover:bg-coral/20 hover:border-coral/30 hover:text-coral transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted/80">
          © {new Date().getFullYear()} YouHooAlert. Helping People Help People.
        </p>
      </div>
    </footer>
  );
}
