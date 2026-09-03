import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle, Clock, PauseCircle, XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPerson, swaps, type Swap } from "@/lib/mock-data";

export const Route = createFileRoute("/swaps")({
  head: () => ({
    meta: [{ title: "My swaps — SkillSwap" }],
  }),
  component: Swaps,
});

const statusMeta = {
  active: { icon: Clock, label: "Active", color: "text-mint", bg: "bg-mint/15" },
  pending: { icon: PauseCircle, label: "Pending", color: "text-honey", bg: "bg-honey/15" },
  completed: { icon: CheckCircle, label: "Completed", color: "text-primary", bg: "bg-primary/15" },
  declined: {
    icon: XCircle,
    label: "Declined",
    color: "text-destructive",
    bg: "bg-destructive/15",
  },
};

const tabs: Swap["status"][] = ["active", "pending", "completed", "declined"];

function Swaps() {
  const [tab, setTab] = useState<Swap["status"]>("active");

  const filtered = useMemo(() => swaps.filter((s) => s.status === tab), [tab]);

  return (
    <AppShell eyebrow="My swaps" title="Swaps board">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap gap-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all duration-300",
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-accent",
                )}
              >
                {statusMeta[t].label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-6">
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((s, i) => (
                <SwapCard key={s.id} swap={s} delay={i * 50} />
              ))}
            </div>
          ) : (
            <div className="card-soft flex flex-col items-center gap-3 py-12">
              <PauseCircle size={32} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No {tab} swaps yet.</p>
              <Button asChild className="mt-1 rounded-full">
                <Link to="/matches">Find someone to swap with</Link>
              </Button>
            </div>
          )}
        </Reveal>
      </div>
    </AppShell>
  );
}

function SwapCard({ swap, delay }: { swap: Swap; delay: number }) {
  const meta = statusMeta[swap.status];
  const Icon = meta.icon;
  const person = getPerson(swap.personId) ?? {
    initials: "??",
    name: "Someone",
    tone: "mint",
  };

  return (
    <Reveal delay={delay} as="article">
      <Link to="/swaps" className="card-soft hover-lift block p-5">
        <div className="flex items-start gap-4">
          <span className={cn("flex size-11 items-center justify-center rounded-full", meta.bg)}>
            <Icon size={20} className={meta.color} />
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Monogram initials={person.initials} tone={person.tone} size="md" />
                <span className="font-semibold">{person.name}</span>
                <Badge variant="secondary" className="capitalize">
                  {swap.status}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">{swap.nextSession}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">You teach</span>
              <Badge variant="outline" className="rounded-full">
                {swap.youTeach}
              </Badge>
              <span className="text-muted-foreground">for</span>
              <Badge variant="outline" className="rounded-full">
                {swap.youLearn}
              </Badge>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">{swap.note}</p>

            {swap.status === "active" && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Progress: {swap.progress}%
                  </span>
                  <span className="text-xs text-muted-foreground">{swap.nextSession}</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-mint transition-all"
                    style={{ width: `${swap.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
