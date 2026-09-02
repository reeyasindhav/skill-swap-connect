import { cn } from "@/lib/utils";

const tones = {
  mint: "bg-mint text-mint-foreground",
  honey: "bg-honey text-honey-foreground",
  forest: "bg-primary text-primary-foreground",
};

export function Monogram({
  initials,
  tone = "forest",
  size = "md",
  className,
}: {
  initials: string;
  tone?: keyof typeof tones;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-11 text-sm",
    lg: "size-14 text-base",
    xl: "size-24 text-2xl",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-wide",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
