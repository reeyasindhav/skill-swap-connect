import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, UserPlus, Tags, Send, CalendarCheck, Star } from "lucide-react";
import { MarketingPage } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { SkillTag } from "@/components/SkillTag";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How SkillSwap works — matching, swaps & reviews" },
      {
        name: "description",
        content:
          "From profile to review in five steps: skill tags, smart matching, swap requests, sessions, and two-way community reviews.",
      },
      { property: "og:title", content: "How SkillSwap works" },
      {
        property: "og:description",
        content: "Skill tags, smart matching, swap requests, sessions, and two-way reviews.",
      },
    ],
  }),
  component: HowItWorks,
});

const stages = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create your two lists",
    body: "Everything on SkillSwap starts with two lists: what you can teach, and what you want to learn. No CV, no portfolio review.",
    detail: ["Pick 2–6 tags per list", "Set your availability", "Write two honest sentences"],
  },
  {
    icon: Tags,
    step: "02",
    title: "Tag matching finds the overlap",
    body: "Your match score rises when your teach list answers someone's learn list — and theirs answers yours. Two-way overlap always ranks highest.",
    detail: ["Two-way overlap = highest score", "Location and availability weighted", "Filter by category any time"],
  },
  {
    icon: Send,
    step: "03",
    title: "Propose a swap",
    body: "Choose one skill each way, add a note, and send. They can accept, decline, or counter with a different pairing.",
    detail: ["One skill each direction", "Personal note required", "Counter-offers welcome"],
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Meet and teach",
    body: "Agree a rhythm in messages — a one-off hour or five weekly sessions. Track progress from your swaps board.",
    detail: ["Online or in person", "Progress tracked per swap", "Reschedule without penalty"],
  },
  {
    icon: Star,
    step: "05",
    title: "Review each other",
    body: "When a swap closes, both people review. Ratings are public, permanent, and the only reputation that matters here.",
    detail: ["Two-way, always", "Skill-specific ratings", "Visible on every profile"],
  },
];

function HowItWorks() {
  return (
    <MarketingPage>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-20">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-primary">THE FLOW</p>
          <h1 className="mt-4 font-display text-5xl font-semibold md:text-6xl">
            From stranger to swap in five steps.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            No credits, no subscriptions, no lesson marketplace. Just a structured way to find someone whose
            skills fit the shape of yours.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="space-y-5">
          {stages.map((s, i) => (
            <Reveal key={s.step} delay={i * 80}>
              <div className="card-soft hover-lift grid gap-6 p-7 md:grid-cols-[auto_1fr_1fr] md:items-start">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-mint text-mint-foreground">
                    <s.icon size={22} />
                  </span>
                  <span className="font-display text-3xl font-semibold text-muted-foreground/50">
                    {s.step}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </div>
                <ul className="space-y-2 text-sm md:pl-6">
                  {s.detail.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <div className="rounded-[2rem] bg-forest p-8 text-forest-foreground md:p-12">
            <h2 className="font-display text-3xl font-semibold">How a match score is built</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { w: "60%", t: "Two-way tag overlap", d: "You teach what they want, they teach what you want." },
                { w: "25%", t: "Availability fit", d: "Overlapping windows in your weekly schedule." },
                { w: "15%", t: "Community signal", d: "Rating, completed swaps, and response rate." },
              ].map((m) => (
                <div key={m.t} className="rounded-2xl border border-forest-foreground/15 p-6">
                  <p className="font-display text-4xl font-semibold text-honey">{m.w}</p>
                  <p className="mt-2 font-semibold">{m.t}</p>
                  <p className="mt-1 text-sm text-forest-foreground/75">{m.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Figma", "Sourdough baking", "React", "Watercolor", "Conversational French", "Ceramics"].map(
                (s) => (
                  <SkillTag key={s} label={s} variant="honey" />
                ),
              )}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold">Questions people ask</h2>
          <Accordion type="single" collapsible className="mt-6">
            {[
              {
                q: "Is it really free?",
                a: "Yes. There is no payment layer at all. The exchange is skill for skill, which is the entire point.",
              },
              {
                q: "What if someone doesn't hold up their end?",
                a: "Swaps close with a two-way review. Repeated no-shows show up on a profile immediately, and you can report a swap from the swap detail page.",
              },
              {
                q: "Do sessions have to be in person?",
                a: "No. Most swaps run over video. Location only affects your match score if you've marked a skill as in-person only.",
              },
              {
                q: "What if I don't think I can teach anything?",
                a: "You almost certainly can. Spreadsheets, gardening, note-taking systems, a second language you grew up with — all of it is on somebody's learn list.",
              },
            ].map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button asChild size="lg" className="mt-10 rounded-full">
            <Link to="/signup">
              Start your first swap <ArrowRight size={17} />
            </Link>
          </Button>
        </Reveal>
      </section>
    </MarketingPage>
  );
}
