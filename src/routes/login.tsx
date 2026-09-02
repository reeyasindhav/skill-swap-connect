import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SkillTag } from "@/components/SkillTag";
import { Stars } from "@/components/Stars";
import { setSignedIn } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — SkillSwap" },
      { name: "description", content: "Log back into SkillSwap to pick up your swaps, messages and matches." },
      { property: "og:title", content: "Log in — SkillSwap" },
      { property: "og:description", content: "Pick up your swaps, messages and matches." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex@skillswap.co");
  const [password, setPassword] = useState("swapmore");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSignedIn(true);
      toast.success("Welcome back, Alex");
      navigate({ to: "/discover" });
    }, 700);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-14">
        <div className="animate-fade-up w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles size={17} />
            </span>
            <span className="font-display text-xl font-semibold">skillswap</span>
          </Link>
          <h1 className="mt-10 font-display text-4xl font-semibold">Welcome back.</h1>
          <p className="mt-2 text-muted-foreground">Your swaps are waiting.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-2xl"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-xs text-muted-foreground">Forgot?</span>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-2xl"
                required
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Keep me signed in
            </label>
            <Button type="submit" disabled={loading} className="h-12 w-full rounded-full">
              {loading ? "Signing you in…" : "Log in"} <ArrowRight size={16} />
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-primary underline-grow">
              Create a free profile
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden bg-forest px-10 text-forest-foreground lg:flex">
        <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-honey/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-mint/20 blur-3xl" />
        <div className="animate-fade-up relative max-w-md">
          <h2 className="font-display text-4xl font-semibold leading-tight">
            “I've learned three things this year and paid for none of them.”
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <Stars rating={5} />
            <span className="text-sm text-forest-foreground/75">Priya N. · member since 2024</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {["Figma", "Sourdough baking", "Piano", "Watercolor", "React", "Portuguese"].map((s) => (
              <SkillTag key={s} label={s} variant="honey" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
