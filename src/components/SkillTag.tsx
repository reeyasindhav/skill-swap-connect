import { cn } from "@/lib/utils";

type Variant = "teach" | "learn" | "neutral" | "honey";

const styles: Record<Variant, string> = {
  teach: "bg-mint text-mint-foreground border-transparent",
  learn: "bg-transparent text-foreground border-border",
  neutral: "bg-muted text-muted-foreground border-transparent",
  honey: "bg-honey text-honey-foreground border-transparent",
};

export function SkillTag({
  label,
  variant = "neutral",
  className,
  onClick,
  active,
}: {
  label: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300",
        styles[variant],
        onClick && "cursor-pointer hover:-translate-y-0.5 hover:shadow-soft",
        active && "bg-primary text-primary-foreground border-transparent",
        className,
      )}
    >
      {label}
    </Comp>
  );
}
