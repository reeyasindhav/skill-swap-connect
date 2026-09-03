import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SkillTag } from "@/components/SkillTag";
import { allSkills } from "@/lib/mock-data";
import { setSignedIn } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Join SkillSwap — free skill trading community" },
      {
        name: "description",
        content:
          "Create a free SkillSwap profile in three steps: your details, what you teach, what you want to learn.",
      },
      { property: "og:title", content: "Join SkillSwap" },
      {
        property: "og:description",
        content: "Three steps to your first skill swap. Free forever.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teach, setTeach] = useState<string[]>([]);
  const [learn, setLearn] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, s: string) =>
    set(list.includes(s) ? list.filter((x) => x !== s) : [...list, s]);

  function finish() {
    setSignedIn(true);
    toast.success("Profile created", { description: "Here are your first matches." });
    navigate({ to: "/discover" });
  }

  const labels = ["Your details", "What you teach", "What you learn"];

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="relative hidden overflow-hidden bg-mint px-12 py-16 text-mint-foreground lg:block">
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-96 rounded-full bg-honey/40 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Heart size={17} />
          </span>
          <span className="font-display text-xl font-semibold">skillswap</span>
        </Link>
        <div className="animate-fade-up relative mt-24 max-w-sm">
          <h2 className="font-display text-5xl font-semibold leading-tight">
            Everyone here is a teacher and a beginner.
          </h2>
          <ul className="mt-10 space-y-4 text-sm">
            {[
              "No payment details, ever",
              "Matched by skill tags in seconds",
              "Two-way reviews keep it honest",
              "Leave any swap at any time",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check size={13} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-14">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2">
            {labels.map((l, i) => (
              <div key={l} className="flex flex-1 flex-col gap-1.5">
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i <= step ? "bg-primary" : "bg-border",
                  )}
                />
                <span className="text-[11px] text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="animate-fade-up mt-10 space-y-4">
              <h1 className="font-display text-4xl font-semibold">Create your profile</h1>
              <p className="text-muted-foreground">Four minutes, then you're matching.</p>
              <div className="space-y-2 pt-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Lee"
                  className="h-12 rounded-2xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 rounded-2xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pw">Password</Label>
                <Input
                  id="pw"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 rounded-2xl"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-up mt-10 space-y-4">
              <h1 className="font-display text-4xl font-semibold">What can you teach?</h1>
              <p className="text-muted-foreground">
                Pick everything you'd happily spend an hour explaining. {teach.length} selected.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
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
          )}

          {step === 2 && (
            <div className="animate-fade-up mt-10 space-y-4">
              <h1 className="font-display text-4xl font-semibold">What do you want to learn?</h1>
              <p className="text-muted-foreground">
                We'll match these against other people's teach lists. {learn.length} selected.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
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
          )}

          <div className="mt-10 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="rounded-full">
                Back
              </Button>
            ) : (
              <Link to="/login" className="text-sm text-muted-foreground underline-grow">
                I already have an account
              </Link>
            )}
            <Button
              onClick={() => (step === 2 ? finish() : setStep(step + 1))}
              className="rounded-full px-6"
            >
              {step === 2 ? "Finish & see matches" : "Continue"} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
