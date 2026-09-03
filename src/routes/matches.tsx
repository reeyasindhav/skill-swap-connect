import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PersonCard } from "@/components/PersonCard";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { skillFilters, people, type Person } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [{ title: "Browse skills — SkillSwap" }],
  }),
  component: Matches,
});

function Matches() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof skillFilters)[number]>("All skills");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return people.filter((p) => {
      if (q) {
        const haystack = [p.name, p.headline, ...p.teaches, ...p.learns].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (category !== "All skills") {
        if (!p.categories.includes(category)) return false;
      }
      return true;
    });
  }, [query, category]);

  return (
    <AppShell eyebrow="Browse" title="Find your next swap">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "person" : "people"} found
            </p>
            <div className="relative w-full max-w-sm">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills or names…"
                className="h-10 rounded-full pl-10"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={60} className="mt-6">
          <div className="flex flex-wrap gap-1.5">
            {skillFilters.map((f) => (
              <button
                key={f}
                onClick={() => setCategory(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300",
                  category === f
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-accent",
                )}
              >
                <Filter size={13} className="mr-1 inline-block -mt-0.5" />
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.length > 0 ? (
              results.map((p: Person, i) => (
                <Reveal key={p.id} delay={i * 40}>
                  <PersonCard person={p} />
                </Reveal>
              ))
            ) : (
              <p className="col-span-full text-center text-sm text-muted-foreground">
                No one matches that. Try a different tag or search.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}
