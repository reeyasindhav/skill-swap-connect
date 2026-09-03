import { Link } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/matches", label: "Browse skills" },
  { to: "/community", label: "Community" },
  { to: "/reviews", label: "Reviews" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Heart size={17} />
          </span>
          <span className="font-display text-xl font-semibold">skillswap</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="underline-grow text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:ml-0 md:flex">
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/signup">Join free</Link>
          </Button>
        </div>
        <button
          className="ml-auto md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="animate-fade-up border-t border-border bg-background px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Button asChild className="mt-2 rounded-full">
              <Link to="/signup" onClick={() => setOpen(false)}>
                Join free
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-honey text-honey-foreground">
              <Heart size={17} />
            </span>
            <span className="font-display text-xl font-semibold">skillswap</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-forest-foreground/75">
            A community where knowledge is the currency. Teach what you know, learn what you need,
            pay nothing.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Explore</p>
          <ul className="space-y-2 text-forest-foreground/75">
            <li>
              <Link to="/matches" className="underline-grow">
                Browse skills
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="underline-grow">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/community" className="underline-grow">
                Circles & events
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="underline-grow">
                Community reviews
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Legal</p>
          <ul className="space-y-2 text-forest-foreground/75">
            <li>
              <Link to="/privacy" className="underline-grow">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="underline-grow">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/contact" className="underline-grow">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-foreground/15 px-5 py-6 text-center text-xs text-forest-foreground/60">
        © 2026 skillswap · Built for people who'd rather trade than pay.
      </div>
    </footer>
  );
}

export function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
