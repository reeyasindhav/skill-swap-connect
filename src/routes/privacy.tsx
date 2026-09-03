import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Handshake, Mail, Shield } from "lucide-react";
import { MarketingPage } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SkillSwap" },
      {
        name: "description",
        content:
          "How SkillSwap collects, uses, and protects your data. We believe knowledge is the currency, not your personal information.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <MarketingPage>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Shield size={20} />
            </span>
            <h1 className="font-display text-4xl font-semibold md:text-5xl">Privacy Policy</h1>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Last updated September 2026. SkillSwap is a place to trade knowledge, not personal data.
            We collect only what we need to match you with the right people, and we delete it when
            it no longer serves you.
          </p>
        </Reveal>

        <article className="mt-12 max-w-3xl space-y-10 text-sm text-muted-foreground">
          <Reveal delay={60}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">
                1. Information we collect
              </h2>
              <p className="mt-3">
                You give us a name, email, and two lists of skills (what you teach, what you learn).
                Everything else is optional: your location, availability, bio, and any messages you
                send. We never ask for your ID number, and you can use a nickname if you prefer.
              </p>
            </section>
          </Reveal>

          <Reveal delay={120}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">
                2. How we use your information
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>To compute your match score and surface compatible teachers and learners.</li>
                <li>To deliver and improve SkillSwap — we log anonymized usage to fix bugs.</li>
                <li>To send you a notification only when someone replies to your swap request.</li>
                <li>To keep the community safe and enforce our standards.</li>
              </ul>
              <p className="mt-3">
                We do not sell your data. We do not build a profile of you to sell to advertisers.
                Skill-swap is not a marketplace: there is no advertising.
              </p>
            </section>
          </Reveal>

          <Reveal delay={180}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">
                3. Cookies & tracking
              </h2>
              <p className="mt-3">
                We use essential cookies to keep you logged in and preserve your draft messages. We
                use one anonymized analytics cookie so we can see which features people actually use
                — you can block this in your browser, and it does not slow the site down.
              </p>
            </section>
          </Reveal>

          <Reveal delay={240}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">
                4. Reviews, messages, and your public profile
              </h2>
              <p className="mt-3">
                After a swap, both people leave a skill-specific review that appears on each
                profile. Your reviews are public and permanent, just like the rest of your profile.
                Messages are private between you and the recipient; we don't read them unless it's
                required to investigate abuse.
              </p>
            </section>
          </Reveal>

          <Reveal delay={300}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">5. Your rights</h2>
              <p className="mt-3">
                You can edit or delete any of your information at any time from Settings. You may
                download a copy of your data — email us at the address below. You may also close
                your account, which removes your lists within 30 days; reviews you left stay so the
                community keeps its context.
              </p>
            </section>
          </Reveal>

          <Reveal delay={360}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">6. Retention</h2>
              <p className="mt-3">
                We keep the minimum necessary: your profile and swaps for as long as your account is
                active, and anonymized logs for 12 months. If you delete your account, your personal
                data is purged within 30 days, except for public reviews which retain author context
                only as long as a skill is taught by someone.
              </p>
            </section>
          </Reveal>

          <Reveal delay={420}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">
                7. Who we share with
              </h2>
              <p className="mt-3">
                Only the people you explicitly swap with see your messages and reviews. We share
                anonymized, aggregated stats (e.g. "most taught skill this month") publicly. We use
                a small set of service providers to host the site and send emails — all are bound to
                protect your data.
              </p>
            </section>
          </Reveal>

          <Reveal delay={480}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground">
                8. Kids and contact
              </h2>
              <p className="mt-3">
                SkillSwap is for adults 16 and up. We don't knowingly collect data from anyone
                younger. Questions about how we handle your data? Reach us at{" "}
                <a href="mailto:privacy@skillswap.example" className="underline-grow">
                  privacy@skillswap.example
                </a>
                .
              </p>
            </section>
          </Reveal>
        </article>

        <Reveal delay={540} className="mt-16">
          <div className="flex items-center gap-3 text-sm">
            <Handshake size={18} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              One rule: be excellent to the people teaching you.
            </span>
          </div>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/signup">Start swapping — it's free</Link>
          </Button>
        </Reveal>
      </section>
    </MarketingPage>
  );
}
