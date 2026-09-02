import { Link } from "@tanstack/react-router";
import { MapPin, Heart, ArrowRight } from "lucide-react";
import { Monogram } from "@/components/Monogram";
import { SkillTag } from "@/components/SkillTag";
import { Button } from "@/components/ui/button";
import { ProposeSwapDialog } from "@/components/ProposeSwapDialog";
import type { Person } from "@/lib/mock-data";
import { toggleSaved, useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function PersonCard({ person }: { person: Person }) {
  const { saved } = useAppState();
  const isSaved = saved.includes(person.id);

  return (
    <article className="card-soft hover-lift flex h-full flex-col overflow-hidden">
      <div className="flex items-start gap-4 p-5">
        <Monogram initials={person.initials} tone={person.tone} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              to="/people/$personId"
              params={{ personId: person.id }}
              className="font-display text-lg font-semibold underline-grow"
            >
              {person.name}
            </Link>
            <span className="shrink-0 rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold text-mint-foreground">
              {person.match}% match
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{person.headline}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <MapPin size={13} /> {person.location}
            <span>·</span>
            <Star size={13} className="fill-honey text-honey" />
            <span className="font-semibold text-foreground">{person.rating}</span> ({person.reviewCount})
          </p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4 border-y border-border px-5 py-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">CAN TEACH</p>
          <div className="flex flex-wrap gap-1.5">
            {person.teaches.map((s) => (
              <SkillTag key={s} label={s} variant="teach" />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
            WANTS TO LEARN
          </p>
          <div className="flex flex-wrap gap-1.5">
            {person.learns.map((s) => (
              <SkillTag key={s} label={s} variant="learn" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 p-5">
        <ProposeSwapDialog person={person}>
          <Button className="flex-1 rounded-full">
            Propose a swap <ArrowRight size={16} />
          </Button>
        </ProposeSwapDialog>
        <button
          onClick={() => toggleSaved(person.id)}
          aria-label={isSaved ? "Remove from saved" : "Save profile"}
          className={cn(
            "flex size-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:scale-110",
            isSaved && "border-transparent bg-honey text-honey-foreground",
          )}
        >
          <Heart size={17} className={cn(isSaved && "fill-current")} />
        </button>
      </div>
    </article>
  );
}
