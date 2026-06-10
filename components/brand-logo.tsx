import Image from "next/image";
import Link from "next/link";
import { TAGLINE } from "@/lib/site";

type BrandLogoProps = {
  compact?: boolean;
  large?: boolean;
};

const SIZES = {
  compact: {
    image: 40,
    imageClass: "h-10 w-10",
    name: "text-base sm:text-lg",
    tagline: "text-[9px] sm:text-[10px]",
    gap: "gap-3",
  },
  default: {
    image: 48,
    imageClass: "h-12 w-12",
    name: "text-base sm:text-lg",
    tagline: "text-[9px] sm:text-[10px]",
    gap: "gap-3",
  },
  large: {
    image: 72,
    imageClass: "h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]",
    name: "text-xl sm:text-2xl",
    tagline: "text-[10px] sm:text-xs",
    gap: "gap-3.5 sm:gap-4",
  },
} as const;

export function BrandLogo({ compact = false, large = false }: BrandLogoProps) {
  const size = compact ? SIZES.compact : large ? SIZES.large : SIZES.default;

  return (
    <Link href="/" className={`flex items-center ${size.gap} shrink-0 group`}>
      <Image
        src="/logo.png"
        alt="YouHooAlert"
        width={size.image}
        height={size.image}
        className={`${size.imageClass} rounded-xl`}
        priority
      />
      <div className="leading-tight">
        <span className={`block font-bold tracking-tight ${size.name}`}>
          <span className="text-foreground">You</span>
          <span className="text-coral">Hoo</span>
          <span className="text-foreground">Alert</span>
        </span>
        {!compact && (
          <span
            className={`block font-medium tracking-[0.12em] text-muted uppercase mt-0.5 ${size.tagline}`}
          >
            {TAGLINE}
          </span>
        )}
      </div>
    </Link>
  );
}
