import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeftRight, Search, MessagesSquare, Star, HandHeart } from "lucide-react";
import { MarketingPage } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { SkillTag } from "@/components/SkillTag";
import { Monogram } from "@/components/Monogram";
import { Stars } from "@/components/Stars";
import { people, platformStats, allSkills, reviews, getPerson } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillSwap — Trade skills, grow together" },
      {
        name: "description",
        content:
          "SkillSwap is a free peer-to-peer community where you teach what you know and learn what you need. Smart skill matching, swap requests, and honest reviews.",
      },
      { property: "og:title", content: "SkillSwap — Trade skills, grow together" },
      {
        property: "og:description",
        content: "Teach what you know, learn what you need. No fees, no courses — just people trading skills.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: HandHeart,
    title: "List what you teach & learn",
    body: "Two lists, a few tags each. That's your whole profile — it takes about four minutes.",
  },
  {
    icon: Search,
    title: "Get matched by skill tags",
    body: "We surface people whose 'can teach' overlaps your 'want to learn', and vice versa.",
  },
  {
    icon: ArrowLeftRight,
    title: "Send a swap request",
    body: "Pick a skill each way, add a note, propose a schedule. They accept, decline, or counter.",
  },
  {
    icon: Star,
    title: "Meet, learn, review",
    body: "Run your sessions, then leave a review both ways. Reputation is the only currency here.",
  },
];

function Landing() {
  return (
    <MarketingPage>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-mint/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 size-80 rounded-full bg-honey/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <Reveal>
            <span className="inline-flex rounded-full bg-honey px-3 py-1 text-xs font-semibold text-honey-foreground">
              A better way to learn
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] font-semibold md:text-7xl">
              Trade skills.
              <br />
              <span className="text-primary">Grow together.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Courses are expensive. Tutors are rigid. Your neighbour is neither. Meet generous people who can
              teach what you want to learn — and are excited about what you already know.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/signup">
                  Start swapping <ArrowRight size={17} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/matches">Browse skills</Link>
              </Button>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {platformStats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <p className="font-display text-2xl font-semibold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="card-soft animate-float p-6">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground">
                A LIVE MATCH
              </p>
              <div className="mt-4 flex items-center gap-4">
                <Monogram initials="MC" tone="forest" size="lg" />
                <div>
                  <p className="font-display text-lg font-semibold">Maya Chen</p>
                  <p className="text-sm text-muted-foreground">UX designer & curious maker</p>
                </div>
                <span className="ml-auto rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold text-mint-foreground">
                  96%
                </span>
              </div>
              <div className="mt-5 space-y-3 rounded-2xl bg-muted p-4">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-muted-foreground">She teaches</span>
                  <SkillTag label="Figma" variant="teach" />
                </div>
                <div className="flex items-center justify-center">
                  <ArrowLeftRight size={18} className="text-primary" />
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-muted-foreground">You teach</span>
                  <SkillTag label="Writing & editing" variant="honey" />
                </div>
              </div>
              <Button asChild className="mt-5 w-full rounded-full">
                <Link to="/people/$personId" params={{ personId: "maya-chen" }}>
                  See the profile <ArrowRight size={16} />
                </Link>
              </Button>
            </div>

            <div className="card-soft absolute -bottom-10 -left-4 hidden w-56 p-4 lg:block">
              <div className="flex items-center gap-2">
                <Stars rating={5} />
                <span className="text-xs font-semibold">5.0</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                “Two hours with Jordan fixed lighting problems I'd had for a year.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skill marquee */}
      <section className="overflow-hidden border-y border-border bg-card py-5">
        <div className="flex w-max animate-marquee gap-3">
          {[...allSkills, ...allSkills].map((s, i) => (
            <SkillTag key={`${s}-${i}`} label={s} variant={i % 3 === 0 ? "teach" : "neutral"} />
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-primary">WHY WE BUILT THIS</p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Learning shouldn't be locked behind a paywall.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Bootcamps cost thousands. Tutoring is rigid and impersonal. Meanwhile there are people three
            streets away who'd happily teach you sourdough, French, or React for an hour of your time — they
            just have no reliable way to find you.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { k: "The cost wall", v: "Paid courses price out the people most eager to learn." },
            { k: "The coordination gap", v: "Peer learning is fragmented across group chats and forums." },
            { k: "The trust problem", v: "Without reviews, nobody knows who actually shows up." },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 100}>
              <div className="card-soft hover-lift h-full p-6">
                <p className="font-display text-xl font-semibold">{c.k}</p>
                <p className="mt-2 text-sm text-muted-foreground">{c.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-forest py-24 text-forest-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">Four steps, zero dollars.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="h-full rounded-3xl border border-forest-foreground/15 p-6 transition-transform duration-500 hover:-translate-y-1.5">
                  <span className="flex size-11 items-center justify-center rounded-full bg-honey text-honey-foreground">
                    <s.icon size={20} />
                  </span>
                  <p className="mt-4 font-display text-xl font-semibold">{s.title}</p>
                  <p className="mt-2 text-sm text-forest-foreground/75">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <Button asChild variant="secondary" size="lg" className="mt-10 rounded-full">
              <Link to="/how-it-works">
                See the full flow <ArrowRight size={16} />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Featured people */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-primary">PEOPLE ON SKILLSWAP</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Someone here knows the thing.</h2>
          </div>
          <Link to="/matches" className="underline-grow text-sm font-semibold text-primary">
            Browse everyone →
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {people.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <Link
                to="/people/$personId"
                params={{ personId: p.id }}
                className="card-soft hover-lift block h-full p-5"
              >
                <Monogram initials={p.initials} tone={p.tone} size="lg" />
                <p className="mt-4 font-display text-lg font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.headline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.teaches.slice(0, 2).map((s) => (
                    <SkillTag key={s} label={s} variant="teach" />
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-card py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold">Reputation, not receipts.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Every completed swap gets reviewed both ways. That's the whole trust system.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.slice(3, 6).map((r, i) => {
              const author = getPerson(r.authorId);
              return (
                <Reveal key={r.id} delay={i * 100}>
                  <div className="hover-lift h-full rounded-3xl border border-border bg-background p-6">
                    <Stars rating={r.rating} />
                    <p className="mt-4 text-[15px]">“{r.body}”</p>
                    <div className="mt-5 flex items-center gap-3">
                      <Monogram initials={author?.initials ?? "SS"} tone={author?.tone ?? "mint"} size="sm" />
                      <div className="text-sm">
                        <p className="font-semibold">{author?.name}</p>
                        <p className="text-muted-foreground">on {r.skill}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-honey px-8 py-16 text-center text-honey-foreground">
            <MessagesSquare className="mx-auto mb-5 opacity-70" size={34} />
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              What could you teach this week?
            </h2>
            <p className="mx-auto mt-4 max-w-xl">
              Join 18,400 people trading what they know. Free forever, because knowledge already is.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full">
              <Link to="/signup">
                Create your profile <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </MarketingPage>
  );
}
