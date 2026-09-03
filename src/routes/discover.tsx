import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Monogram } from "@/components/Monogram";
import { PersonCard } from "@/components/PersonCard";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { conversations, getPerson, people, swaps, type Swap } from "@/lib/mock-data";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [{ title: "Dashboard — SkillSwap" }],
  }),
  component: Discover,
});

const swapIcons = {
  pending: MessageCircle,
  active: Activity,
  completed: Activity,
  declined: Activity,
};

function Discover() {
  const activeSwaps = swaps.filter((s) => s.status === "active");
  const pendingSwaps = swaps.filter((s) => s.status === "pending");
  const topMatches = people
    .filter((p) => p.match >= 85)
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  return (
    <AppShell
      eyebrow="Dashboard"
      title="Your dashboard"
      action={
        <Button asChild className="rounded-full">
          <Link to="/swaps">My swaps</Link>
        </Button>
      }
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-soft p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
                SWAPS IN PROGRESS
              </p>
              <p className="mt-2 font-display text-3xl font-semibold">{activeSwaps.length}</p>
            </div>
            <div className="card-soft p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
                AWAITING YOUR REPLY
              </p>
              <p className="mt-2 font-display text-3xl font-semibold">{pendingSwaps.length}</p>
            </div>
            <div className="card-soft p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
                COMPLETED SWAPS
              </p>
              <p className="mt-2 font-display text-3xl font-semibold">
                {swaps.filter((s) => s.status === "completed").length}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Active swaps</h2>
            <Link to="/swaps" className="text-sm font-semibold text-primary underline-grow">
              See all swaps →
            </Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {activeSwaps.length > 0 ? (
              activeSwaps.map((s, i) => <SwapRow key={s.id} swap={s} index={i} />)
            ) : (
              <p className="text-sm text-muted-foreground">No active swaps right now.</p>
            )}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Matched for you</h2>
            <Link to="/matches" className="text-sm font-semibold text-primary underline-grow">
              Browse all →
            </Link>
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topMatches.map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Recent conversations</h2>
            <Link to="/messages" className="text-sm font-semibold text-primary underline-grow">
              All messages →
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {conversations.slice(0, 3).map((c) => {
              const person = getPerson(c.personId) ?? {
                id: "",
                name: "Someone",
                initials: "SS",
                headline: "",
                location: "",
                rating: 0,
                reviewCount: 0,
                match: 0,
                teaches: [],
                learns: [],
                categories: [],
                bio: "",
                availability: "",
                swaps: 0,
                joined: "",
                tone: "mint",
              };
              const last = c.messages[c.messages.length - 1];
              return (
                <Link
                  key={c.id}
                  to="/messages"
                  className="card-soft hover-lift flex items-center gap-4 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Monogram initials={person.initials} tone={person.tone} size="md" />
                    <div>
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {last?.text ?? ""}
                      </p>
                    </div>
                  </div>
                  {c.unread > 0 ? (
                    <Badge className="ml-auto bg-honey text-honey-foreground">{c.unread}</Badge>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}

function SwapRow({ swap, index }: { swap: Swap; index: number }) {
  const person = getPerson(swap.personId) ?? {
    initials: "??",
    name: "Someone",
    tone: "mint",
  };
  const Icon = swapIcons[swap.status];
  const color =
    swap.status === "active"
      ? "text-mint"
      : swap.status === "pending"
        ? "text-honey"
        : "text-muted-foreground";

  return (
    <Reveal delay={index * 60} as="article">
      <Link to="/swaps" className="card-soft hover-lift flex items-center gap-4 p-5">
        <span
          className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <Icon size={18} className={color} />
        </span>
        <div className="flex-1">
          <p className="font-display text-lg font-semibold">{person.name}</p>
          <p className="text-sm text-muted-foreground">
            You teach <span className="font-medium text-foreground">{swap.youTeach}</span> · You
            learn <span className="font-medium text-foreground">{swap.youLearn}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{swap.note}</p>
        </div>
        <Badge
          variant={
            swap.status === "active"
              ? "default"
              : swap.status === "pending"
                ? "secondary"
                : "outline"
          }
        >
          {swap.status}
        </Badge>
      </Link>
    </Reveal>
  );
}
