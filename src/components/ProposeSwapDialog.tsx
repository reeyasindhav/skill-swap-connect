import { useState, type ReactNode } from "react";
import { ArrowLeftRight, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SkillTag } from "@/components/SkillTag";
import { Monogram } from "@/components/Monogram";
import { currentUser, type Person } from "@/lib/mock-data";
import { proposeSwap } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProposeSwapDialog({ person, children }: { person: Person; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [youLearn, setYouLearn] = useState(person.teaches[0] ?? "");
  const [youTeach, setYouTeach] = useState(currentUser.teaches[0] ?? "");
  const [note, setNote] = useState("");

  function reset() {
    setStep(0);
    setNote("");
    setYouLearn(person.teaches[0] ?? "");
    setYouTeach(currentUser.teaches[0] ?? "");
  }

  function submit() {
    proposeSwap({ personId: person.id, youTeach, youLearn, note });
    setStep(3);
    toast.success(`Swap proposed to ${person.name.split(" ")[0]}`, {
      description: `${youTeach} for ${youLearn}`,
    });
  }

  const steps = ["What you'll learn", "What you'll teach", "Add a note"];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(reset, 250);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {step === 3 ? "Proposal sent" : `Propose a swap with ${person.name.split(" ")[0]}`}
          </DialogTitle>
          <DialogDescription>
            {step === 3
              ? "You'll get a notification the moment they respond."
              : "Three quick steps. Nothing is charged, ever."}
          </DialogDescription>
        </DialogHeader>

        {step < 3 && (
          <div className="flex items-center gap-2">
            {steps.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col gap-1.5">
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i <= step ? "bg-primary" : "bg-border",
                  )}
                />
                <span className="text-[11px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        )}

        {step === 0 && (
          <div className="animate-fade-up space-y-3">
            <p className="text-sm font-semibold">Pick a skill {person.name.split(" ")[0]} can teach</p>
            <div className="flex flex-wrap gap-2">
              {person.teaches.map((s) => (
                <SkillTag
                  key={s}
                  label={s}
                  variant="teach"
                  active={youLearn === s}
                  onClick={() => setYouLearn(s)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-up space-y-3">
            <p className="text-sm font-semibold">Offer something back</p>
            <div className="flex flex-wrap gap-2">
              {currentUser.teaches.map((s) => (
                <SkillTag key={s} label={s} active={youTeach === s} onClick={() => setYouTeach(s)} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-muted p-4 text-sm">
              <span className="font-semibold">{youTeach}</span>
              <ArrowLeftRight size={16} className="text-primary" />
              <span className="font-semibold">{youLearn}</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up space-y-3">
            <p className="text-sm font-semibold">Say hello</p>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder={`Hi ${person.name.split(" ")[0]} — I'd love to learn ${youLearn}. I can trade ${youTeach} sessions whenever suits you.`}
              className="rounded-2xl"
            />
            <div className="rounded-2xl border border-border p-4 text-sm">
              <div className="flex items-center gap-3">
                <Monogram initials={person.initials} tone={person.tone} size="sm" />
                <div>
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-muted-foreground">Usually replies within a day · {person.availability}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-scale-in space-y-4 py-2 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-mint text-mint-foreground">
              <Check size={30} />
            </span>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{youTeach}</span> for{" "}
              <span className="font-semibold text-foreground">{youLearn}</span> — waiting on{" "}
              {person.name.split(" ")[0]}.
            </p>
          </div>
        )}

        <div className="mt-2 flex justify-between gap-3">
          {step > 0 && step < 3 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < 2 && (
            <Button onClick={() => setStep(step + 1)} className="rounded-full">
              Continue <ArrowRight size={16} />
            </Button>
          )}
          {step === 2 && (
            <Button onClick={submit} className="rounded-full">
              Send proposal <ArrowRight size={16} />
            </Button>
          )}
          {step === 3 && (
            <Button onClick={() => setOpen(false)} className="w-full rounded-full">
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
