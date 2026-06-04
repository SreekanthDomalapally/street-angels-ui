import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "default" | "outline" | "ghost" | "destructive";
type Size = "default" | "sm" | "icon";

const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  outline:
    "border border-border bg-transparent hover:bg-accent text-foreground",
  ghost: "hover:bg-accent text-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
};

const sizes: Record<Size, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs rounded-md",
  icon: "h-9 w-9 p-0",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }
>(function Button(
  { className = "", variant = "default", size = "default", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
});
