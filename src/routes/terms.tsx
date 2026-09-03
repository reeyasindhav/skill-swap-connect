import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Handshake, Mail } from "lucide-react";
import { MarketingPage } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — SkillSwap" },
      {
        name: "description",
        content: "How SkillSwap is meant to be used. Fair, simple, and human.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <MarketingPage>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Handshake size={20} />
            </span>
            <h1 className="font-display text-4xl font-semibold md:text-5xl highlight-reveal">
              Terms of Use
            </h1>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Last updated September 2026. These terms exist to keep SkillSwap friendly, safe, and
            useful for everyone.
          </p>
        </Reveal>

        <article className="mt-12 max-w-3xl space-y-10 text-sm text-muted-foreground">
          <Reveal delay={60}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                1. The short version
              </h2>
              <p className="mt-3 text-reveal">
                Be excellent to each other. SkillSwap is built on trust — if you flake, harass, or
                scam someone, you lose access.
              </p>
            </section>
          </Reveal>

          <Reveal delay={120}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                2. Eligibility
              </h2>
              <p className="mt-3 text-reveal">
                SkillSwap is for people 16 and up. By using it, you confirm you're not barred from
                online services under any applicable law.
              </p>
            </section>
          </Reveal>

          <Reveal delay={180}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                3. Accounts and conduct
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-reveal">
                <li>
                  Keep your profile honest. Fake skills or false availability undermines trust.
                </li>
                <li>Respect boundaries. Messages should be about skill exchange.</li>
                <li>No spam, scraping, or automated bulk use of the site.</li>
              </ul>
            </section>
          </Reveal>

          <Reveal delay={240}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                4. Reviews
              </h2>
              <p className="mt-3 text-reveal">
                Reviews must be based on actual swaps. Personal attacks or off-topic content will be
                removed and may lead to account suspension.
              </p>
            </section>
          </Reveal>

          <Reveal delay={300}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                5. Intellectual property
              </h2>
              <p className="mt-3 text-reveal">
                You keep ownership of the skills and knowledge you share. By posting, you grant
                SkillSwap a license to display it within the app so other users can see what you
                offer.
              </p>
            </section>
          </Reveal>

          <Reveal delay={360}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                6. Disclaimer
              </h2>
              <p className="mt-3 text-reveal">
                SkillSwap is provided as-is, with no guarantees of uptime or specific matches. We
                don't guarantee outcomes — that's up to the people involved.
              </p>
            </section>
          </Reveal>

          <Reveal delay={420}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                7. Changes
              </h2>
              <p className="mt-3 text-reveal">
                We may update these terms as the product evolves. We'll post the new version here
                and note the updated date. Continued use means acceptance.
              </p>
            </section>
          </Reveal>

          <Reveal delay={480}>
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground highlight-reveal">
                8. Contact
              </h2>
              <p className="mt-3 text-reveal">
                Questions? Reach us at{" "}
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
