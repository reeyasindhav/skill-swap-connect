import { Link, useRouterState } from "@tanstack/react-router";
import {
  Compass,
  MessageCircle,
  BookOpen,
  Users,
  Settings,
  Star,
  Bell,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Monogram } from "@/components/Monogram";
import { currentUser } from "@/lib/mock-data";

const nav = [
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/messages", label: "Messages", icon: MessageCircle, badge: 3 },
  { to: "/swaps", label: "My swaps", icon: BookOpen },
  { to: "/community", label: "Community", icon: Users },
  { to: "/reviews", label: "Reviews", icon: Star },
];

export function AppShell({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full bg-background lg:flex">
      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar px-5 py-7 text-sidebar-foreground transition-transform duration-500 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-honey text-honey-foreground">
              <Heart size={20} />
            </span>
            <span className="font-display text-2xl font-semibold">skillswap</span>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <p className="mt-10 px-3 text-[11px] font-semibold tracking-[0.18em] text-sidebar-foreground/60">
          WORKSPACE
        </p>

        <nav className="mt-3 flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon, badge }) => {
            const active = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-300",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                    : "text-sidebar-foreground/85 hover:bg-sidebar-accent/60 hover:translate-x-1",
                )}
              >
                <Icon
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <span className="flex-1">{label}</span>
                {badge ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-honey text-[11px] font-bold text-honey-foreground">
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-300",
              pathname === "/settings"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/85 hover:bg-sidebar-accent/60 hover:translate-x-1",
            )}
          >
            <Settings size={19} />
            Settings
          </Link>
          <div className="border-t border-sidebar-border pt-4">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-sidebar-accent/60"
            >
              <Monogram initials={currentUser.initials} tone="honey" />
              <span className="text-sm">
                <span className="block font-semibold">{currentUser.name}</span>
                <span className="block text-sidebar-foreground/70">Your profile</span>
              </span>
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-card/90 px-5 py-5 backdrop-blur md:px-10">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground">{eyebrow}</p>
            <h1 className="truncate font-display text-2xl font-semibold md:text-[28px]">{title}</h1>
          </div>
          {action}
          <button
            aria-label="Notifications"
            className="relative rounded-full p-2 transition-colors hover:bg-muted"
          >
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-honey" />
          </button>
        </header>

        <main className="flex-1 px-5 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
