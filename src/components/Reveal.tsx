import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const [shown, setShown] = useState(false);

  // Reveal on mount rather than on scroll so pages are visible immediately
  // after navigation instead of only appearing once scrolled into view.
  useEffect(() => {
    setShown(true);
  }, []);

  const Comp = Tag as "div";

  return (
    <Comp
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </Comp>
  );
}
