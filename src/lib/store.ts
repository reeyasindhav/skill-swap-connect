import { useSyncExternalStore } from "react";
import { swaps as seedSwaps, type Swap } from "./mock-data";

type State = {
  swaps: Swap[];
  saved: string[];
  signedIn: boolean;
};

let state: State = { swaps: seedSwaps, saved: ["aisha-bello"], signedIn: true };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return state;
}

export function useAppState() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function proposeSwap(input: { personId: string; youTeach: string; youLearn: string; note: string }) {
  const swap: Swap = {
    id: `swp-${Math.floor(1100 + Math.random() * 800)}`,
    personId: input.personId,
    youTeach: input.youTeach,
    youLearn: input.youLearn,
    status: "pending",
    nextSession: "Awaiting response",
    progress: 0,
    note: input.note || "You proposed a new swap.",
  };
  state = { ...state, swaps: [swap, ...state.swaps] };
  emit();
  return swap;
}

export function toggleSaved(personId: string) {
  const saved = state.saved.includes(personId)
    ? state.saved.filter((id) => id !== personId)
    : [...state.saved, personId];
  state = { ...state, saved };
  emit();
}

export function setSignedIn(value: boolean) {
  state = { ...state, signedIn: value };
  emit();
}
