import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getPerson, type Conversation } from "@/lib/mock-data";
import { useAppState, sendMessage } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [{ title: "Messages — SkillSwap" }],
  }),
  component: Messages,
});

function Messages() {
  const { conversations } = useAppState();
  const [active, setActive] = useState<string | null>(null);

  return (
    <AppShell eyebrow="Messages" title="Messages">
      <div className="mx-auto flex h-[calc(100vh-12rem)] max-w-5xl gap-3">
        <Reveal className="w-80 shrink-0">
          <div className="card-soft flex h-full flex-col p-3">
            <p className="px-3 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground">
              CONVERSATIONS ({conversations.length})
            </p>
            <div className="mt-2 space-y-1.5 overflow-y-auto">
              {conversations.map((c) => (
                <ConversationRow
                  key={c.id}
                  conversation={c}
                  active={active === c.id}
                  onSelect={() => setActive(c.id)}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="flex-1">
          <div className="card-soft h-full p-5">
            {active ? (
              <ChatView conversationId={active} onBack={() => setActive(null)} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <ArrowLeft size={24} className="text-muted-foreground/50" />
                <h3 className="font-display text-xl font-semibold">Open a conversation</h3>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Pick a thread from the list to read and reply.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}

function ConversationRow({
  conversation,
  active,
  onSelect,
}: {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
}) {
  const person = getPerson(conversation.personId) ?? {
    initials: "??",
    name: "Someone",
    tone: "mint",
  };
  const last = conversation.messages[conversation.messages.length - 1];
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl p-3 text-left transition-all",
        active ? "bg-accent/60" : "hover:bg-accent/40",
      )}
    >
      <div className="flex items-center gap-3">
        <Monogram initials={person.initials} tone={person.tone} size="sm" />
        <div className="flex-1 truncate">
          <p className="flex items-center justify-between font-semibold">
            <span>{person.name}</span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              {conversation.lastAt}
              {conversation.unread > 0 && (
                <Badge variant="default" className="rounded-full bg-honey text-honey-foreground">
                  {conversation.unread}
                </Badge>
              )}
            </span>
          </p>
          <p className="truncate text-sm text-muted-foreground">{last?.text ?? ""}</p>
        </div>
      </div>
    </button>
  );
}

function ChatView({ conversationId, onBack }: { conversationId: string; onBack: () => void }) {
  const { conversations } = useAppState();
  const conversation = conversations.find((c) => c.id === conversationId);
  const [draft, setDraft] = useState("");
  if (!conversation) return null;
  const { id, messages, personId } = conversation;
  const person = getPerson(personId) ?? {
    initials: "??",
    name: "Someone",
    tone: "mint",
    availability: "Usually replies within a day",
  };

  function send() {
    const text = draft.trim();
    if (!text) return;
    sendMessage(id, text);
    setDraft("");
    toast.success("Message sent", { description: "Your reply is on its way." });
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <button
          onClick={onBack}
          className="lg:hidden rounded-full p-1 hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <Monogram initials={person.initials} tone={person.tone} size="sm" />
        <div>
          <p className="font-semibold">{person.name}</p>
          <p className="text-xs text-muted-foreground">{person.availability}</p>
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={`${m.at}-${i}`}
            className={cn(
              "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
              m.from === "me"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted text-foreground",
            )}
          >
            {m.text}
            <div className="mt-1 text-[10px] opacity-70 text-right">{m.at}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="mt-3 flex items-end gap-2 flex-shrink-0"
      >
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message…"
          className="min-h-[44px] rounded-2xl flex-1"
          rows={1}
        />
        <Button type="submit" size="sm" className="rounded-full">
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}
