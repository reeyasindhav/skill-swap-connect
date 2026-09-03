import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit3, Heart, Save } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { allSkills, currentUser, getPerson, reviews, type Person } from "@/lib/mock-data";
import { SkillTag } from "@/components/SkillTag";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Your profile — SkillSwap" }],
  }),
  component: Profile,
});

function Profile() {
  const [teach, setTeach] = useState<string[]>([...currentUser.teaches]);
  const [learn, setLearn] = useState<string[]>([...currentUser.learns]);
  const [bio, setBio] = useState(currentUser.bio);
  const [saved, setSaved] = useState<Person[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, s: string) =>
    set(list.includes(s) ? list.filter((x) => x !== s) : [...list, s]);

  function save() {
    toast.success("Profile updated", { description: "Your teach and learn lists are saved." });
  }

  return (
    <AppShell eyebrow="Profile" title="Your profile">
      <div className="mx-auto max-w-4xl space-y-8">
        <Reveal>
          <div className="card-soft flex flex-col items-center gap-6 p-8 md:flex-row md:items-start">
            <Monogram initials={currentUser.initials} tone="honey" size="xl" />
            <div className="mt-2 md:mt-0 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <h1 className="font-display text-3xl font-semibold">{currentUser.name}</h1>
                <Edit3 size={16} className="text-muted-foreground" />
              </div>
              <p className="mt-1 text-muted-foreground">{currentUser.headline}</p>
              <p className="mt-3 text-sm text-muted-foreground">{currentUser.location}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground md:justify-start">
                <span className="inline-flex items-center gap-1">
                  <Heart size={14} className="fill-honey text-honey" /> {currentUser.swapsCompleted}{" "}
                  swaps completed
                </span>
                <span>·</span>
                <span>Rating {currentUser.rating}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="card-soft p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Edit3 size={18} /> About
            </h2>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="mt-3 rounded-2xl"
            />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-soft p-6">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                WHAT YOU TEACH
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {teach.length} skills — people learn from you.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {allSkills.map((s) => (
                  <SkillTag
                    key={s}
                    label={s}
                    variant="teach"
                    active={teach.includes(s)}
                    onClick={() => toggle(teach, setTeach, s)}
                  />
                ))}
              </div>
            </div>
            <div className="card-soft p-6">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                WHAT YOU WANT TO LEARN
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {learn.length} skills — these power your matches.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {allSkills.map((s) => (
                  <SkillTag
                    key={s}
                    label={s}
                    active={learn.includes(s)}
                    onClick={() => toggle(learn, setLearn, s)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <Button onClick={save} className="rounded-full">
            <Save size={16} className="mr-1.5" /> Save profile
          </Button>
        </Reveal>

        <Reveal delay={320} className="mt-8">
          <h2 className="font-display text-xl font-semibold">Saved profiles</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {saved.length > 0 ? (
              saved.map((p, i) => <SavedItem key={p.id} person={p} delay={i * 50} />)
            ) : (
              <p className="text-sm text-muted-foreground">
                You haven't saved any profiles. Browse matches and tap the heart to save.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={400} className="mt-8">
          <h2 className="font-display text-xl font-semibold">Reviews you received</h2>
          <div className="mt-4 space-y-4">
            {reviews
              .filter((r) => r.targetId === "me")
              .map((r) => {
                const author = getPerson(r.authorId) ?? {
                  initials: "??",
                  name: "Someone",
                  tone: "mint",
                };
                return (
                  <div key={r.id} className="card-soft p-5">
                    <div className="flex items-center gap-3">
                      <Monogram initials={author.initials} tone={author.tone} size="sm" />
                      <div>
                        <p className="font-semibold">{author.name}</p>
                        <p className="text-xs text-muted-foreground">reviewed you on {r.skill}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">"{r.body}"</p>
                  </div>
                );
              })}
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}

function SavedItem({ person, delay }: { person: Person; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="card-soft hover-lift flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Monogram initials={person.initials} tone={person.tone} size="lg" />
          <div>
            <p className="font-semibold">{person.name}</p>
            <p className="text-sm text-muted-foreground">{person.headline}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="rounded-full">
          Message
        </Button>
      </div>
    </Reveal>
  );
}
