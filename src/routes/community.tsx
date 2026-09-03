import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkillTag } from "@/components/SkillTag";
import {
  communityCircles,
  communityEvents,
  type CommunityCircle,
  type CommunityEvent,
} from "@/lib/mock-data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [{ title: "Community — SkillSwap" }],
  }),
  component: Community,
});

function Community() {
  return (
    <AppShell eyebrow="Community" title="Circles & events">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="max-w-xl text-sm text-muted-foreground">
            Smaller groups around shared interests. Join a circle for weekly swaps, themed
            challenges, or just good conversation — all free.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <h2 className="font-display text-xl font-semibold">Circles</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {communityCircles.map((c: CommunityCircle, i) => (
              <CircleCard key={c.id} c={c} delay={i * 80} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-12">
          <h2 className="font-display text-xl font-semibold">Upcoming events</h2>
          <div className="mt-4 space-y-3">
            {communityEvents.map((e: CommunityEvent, i) => (
              <EventRow key={e.id} event={e} delay={i * 80} />
            ))}
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}

function CircleCard({ c, delay }: { c: CommunityCircle; delay: number }) {
  const tones = ["mint", "honey", "forest"] as const;
  const tone = tones.includes(c.tone) ? c.tone : "mint";
  return (
    <Reveal delay={delay}>
      <div className="card-soft hover-lift flex h-full flex-col p-6">
        <div className="flex items-start justify-between">
          <Monogram
            initials={c.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
            tone={tone}
            size="lg"
          />
          <Badge variant="secondary" className="rounded-full">
            {c.members} members
          </Badge>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold">{c.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground flex-1">{c.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <SkillTag key={t} label={t} variant="neutral" />
          ))}
        </div>
        <Button asChild variant="secondary" className="mt-5 rounded-full">
          <Link to="/matches">Join circle</Link>
        </Button>
      </div>
    </Reveal>
  );
}

function EventRow({ event, delay }: { event: CommunityEvent; delay: number }) {
  return (
    <Reveal key={event.id} delay={delay}>
      <div className="card-soft hover-lift flex items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mint text-mint-foreground">
            <Calendar size={22} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold">{event.title}</p>
            <p className="text-sm text-muted-foreground">
              Hosted by {event.host} · {event.date} at {event.time}
            </p>
          </div>
        </div>
        <Badge className="shrink-0 rounded-full bg-primary">{event.seats} seats</Badge>
      </div>
    </Reveal>
  );
}
