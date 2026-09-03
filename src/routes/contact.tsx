import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Mail, MessageSquare } from "lucide-react";
import { MarketingPage } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SkillSwap" },
      {
        name: "description",
        content: "Questions, feedback, or partnership ideas? Reach the SkillSwap team.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <MarketingPage>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Mail size={20} />
            </span>
            <h1 className="font-display text-4xl font-semibold md:text-5xl">Contact</h1>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            We read every message. If you have a question, a bug report, or just want to say hi,
            this is the place.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:max-w-3xl md:grid-cols-2">
          <Reveal delay={60} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <a href="mailto:privacy@skillswap.example" className="text-sm underline-grow">
                  privacy@skillswap.example
                </a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Best for detailed questions, partnership ideas, or data requests. We usually reply
              within 2 business days.
            </p>
          </Reveal>

          <Reveal delay={120} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquare size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">In-app</p>
                <p className="text-sm text-muted-foreground">
                  Use the messages tab after you sign up.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Already have an account? Message us directly from the app for faster support about
              swaps, reviews, or account issues.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={180}
          className="mt-12 max-w-3xl rounded-2xl border border-border/70 bg-card p-8"
        >
          <h2 className="font-display text-xl font-semibold text-foreground">Common topics</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Account deletion or data export requests</li>
            <li>Abuse, harassment, or safety reports</li>
            <li>Feature requests and bug reports</li>
            <li>Press, partnerships, or speaking inquiries</li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            For anything urgent, put <span className="font-medium text-foreground">URGENT</span> at
            the start of the subject line so we can prioritize it.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-16 flex items-center gap-3 text-sm">
          <Heart size={18} className="text-muted-foreground" />
          <span className="text-muted-foreground">
            We're a small team, but we care about every person on SkillSwap.
          </span>
        </Reveal>

        <Reveal delay={300} className="mt-6">
          <Button asChild className="rounded-full">
            <Link to="/signup">Create an account</Link>
          </Button>
        </Reveal>
      </section>
    </MarketingPage>
  );
}
