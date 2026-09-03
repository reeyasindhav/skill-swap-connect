import { useSyncExternalStore } from "react";
import {
  swaps as seedSwaps,
  conversations as seedConversations,
  type Swap,
  type Conversation,
} from "./mock-data";

type State = {
  swaps: Swap[];
  conversations: Conversation[];
  saved: string[];
  signedIn: boolean;
};

let state: State = {
  swaps: seedSwaps,
  conversations: seedConversations,
  saved: ["aisha-bello"],
  signedIn: true,
};
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

export function proposeSwap(input: {
  personId: string;
  youTeach: string;
  youLearn: string;
  note: string;
}) {
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

export function sendMessage(conversationId: string, text: string) {
  state = {
    ...state,
    conversations: state.conversations.map((c) =>
      c.id === conversationId
        ? {
            ...c,
            messages: [
              ...c.messages,
              {
                from: "me",
                text,
                at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ],
          }
        : c,
    ),
  };
  emit();
}

export function setSignedIn(value: boolean) {
  state = { ...state, signedIn: value };
  emit();
}
