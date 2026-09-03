import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { getPerson, reviews } from "@/lib/mock-data";
import { Stars } from "@/components/Stars";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [{ title: "Community reviews — SkillSwap" }],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <AppShell eyebrow="Reviews" title="Community reviews">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-sm text-muted-foreground">
            Real feedback from completed swaps. Ratings are skill-specific and public.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-6 space-y-4">
          {reviews.map((r, i) => {
            const author = getPerson(r.authorId) ?? {
              initials: "??",
              name: "Anonymous",
              tone: "mint",
            };
            const target = getPerson(r.targetId) ?? {
              initials: "??",
              name: "the reviewer",
              tone: "mint",
            };
            return (
              <div key={r.id} className="card-soft hover-lift p-6">
                <div className="flex items-start gap-4">
                  <Monogram initials={author.initials} tone={author.tone} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-semibold">{author.name}</span>
                        <span className="mx-1 text-muted-foreground">→</span>
                        <Link
                          to="/people/$personId"
                          params={{ personId: r.targetId === "me" ? "you" : r.targetId }}
                          className="font-semibold text-primary underline-grow"
                        >
                          {r.targetId === "me" ? "you" : target.name}
                        </Link>
                      </div>
                      <Badge variant="outline" className="rounded-full">
                        {r.skill}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <Stars rating={r.rating} size={14} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">"{r.body}"</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </AppShell>
  );
}
