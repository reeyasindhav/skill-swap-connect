import { createFileRoute, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Star, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Monogram } from "@/components/Monogram";
import { SkillTag } from "@/components/SkillTag";
import { Stars } from "@/components/Stars";
import { ProposeSwapDialog } from "@/components/ProposeSwapDialog";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { getPerson, reviews } from "@/lib/mock-data";

export const Route = createFileRoute("/people/$personId")({
  head: () => ({
    meta: [{ title: "Person — SkillSwap" }],
  }),
  component: PersonProfile,
  loader: ({ params }) => {
    const person = getPerson(params.personId);
    if (!person) {
      throw notFound();
    }
    return { person };
  },
});

function PersonProfile() {
  const { person } = Route.useLoaderData();

  return (
    <AppShell eyebrow="Profile" title={person.name}>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="card-soft hover-lift flex flex-col items-center gap-6 p-8 md:flex-row md:items-start md:gap-8">
            <Monogram initials={person.initials} tone={person.tone} size="xl" />
            <div className="mt-2 md:mt-0 flex-1 text-center md:text-left">
              <h1 className="font-display text-3xl font-semibold md:text-4xl">{person.name}</h1>
              <p className="mt-1 text-muted-foreground">{person.headline}</p>

              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground md:justify-start">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} /> {person.location}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={14} className="fill-honey text-honey" /> {person.rating}{" "}
                  <span className="text-muted-foreground">({person.reviewCount} reviews)</span>
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Users size={14} /> {person.swaps} swaps completed
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} /> Joined {person.joined}
                </span>
              </div>
            </div>

            <div className="md:mt-1 rounded-full bg-mint px-3 py-1 text-xs font-bold text-mint-foreground">
              {person.match}% match
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Reveal>
              <div className="card-soft p-6">
                <h2 className="font-display text-xl font-semibold">Bio</h2>
                <p className="mt-3 text-sm text-muted-foreground">{person.bio}</p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal>
                <div className="card-soft p-6">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                    CAN TEACH
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {person.teaches.map((s) => (
                      <SkillTag key={s} label={s} variant="teach" />
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="card-soft p-6">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                    WANTS TO LEARN
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {person.learns.map((s) => (
                      <SkillTag key={s} label={s} variant="learn" />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="card-soft p-6">
                <h2 className="font-display text-xl font-semibold">
                  Reviews of {person.name.split(" ")[0]}
                </h2>
                <div className="mt-4 space-y-4">
                  {reviews.filter((r) => r.targetId === person.id).length > 0 ? (
                    reviews
                      .filter((r) => r.targetId === person.id)
                      .map((r) => {
                        const author = getPerson(r.authorId) ?? {
                          initials: "??",
                          name: "A reviewer",
                          tone: "mint",
                        };
                        return (
                          <div key={r.id} className="flex items-start gap-3">
                            <Monogram initials={author.initials} tone={author.tone} size="sm" />
                            <div className="text-sm">
                              <p className="font-semibold">{author.name}</p>
                              <Stars rating={r.rating} size={13} />
                              <p className="mt-1 text-muted-foreground">"{r.body}"</p>
                              <p className="text-xs text-muted-foreground">
                                on {r.skill} · {r.date}
                              </p>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No reviews yet. Be the first to complete a swap and leave one.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="card-soft p-6">
                <h2 className="font-display text-xl font-semibold">Availability</h2>
                <p className="mt-3 text-sm text-muted-foreground">{person.availability}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Categories: {person.categories.map((c) => c).join(", ")}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={80}>
              <ProposeSwapDialog person={person}>
                <Button className="w-full rounded-full">Propose a swap</Button>
              </ProposeSwapDialog>
            </Reveal>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
