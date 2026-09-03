import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Key, LogOut, Mail, Save, User } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { currentUser } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [{ title: "Settings — SkillSwap" }],
  }),
  component: Settings,
});

function Settings() {
  const [email, setEmail] = useState(
    currentUser.name ? currentUser.name.toLowerCase().replace(/\s+/g, ".") : "",
  );
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Settings saved");
  }

  return (
    <AppShell eyebrow="Settings" title="Settings">
      <div className="mx-auto max-w-2xl space-y-8">
        <Reveal>
          <form onSubmit={save} className="card-soft p-6">
            <h2 className="font-display text-xl font-semibold">Account</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" defaultValue={currentUser.name} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <Key
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl pl-10"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="mt-5 rounded-full">
              <Save size={15} className="mr-1.5" /> Save account
            </Button>
          </form>
        </Reveal>

        <Reveal delay={80}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Preferences saved");
            }}
            className="card-soft p-6"
          >
            <h2 className="font-display text-xl font-semibold">Preferences</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="flex items-center gap-2">
                    <Bell size={16} /> Email notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get a ping when someone responds to your swap.
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="flex items-center gap-2">
                    <User size={16} /> Public profile
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Let other members find you on SkillSwap.
                  </p>
                </div>
                <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
              </div>
            </div>
            <Button type="submit" className="mt-5 rounded-full">
              <Save size={15} className="mr-1.5" /> Save preferences
            </Button>
          </form>
        </Reveal>

        <Reveal delay={160}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Password updated");
            }}
            className="card-soft p-6"
          >
            <h2 className="font-display text-xl font-semibold">Security</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>
            <Button type="submit" className="mt-5 rounded-full">
              <Key size={15} className="mr-1.5" /> Update password
            </Button>
          </form>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex items-center justify-between rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-destructive">Log out</h2>
              <p className="text-sm text-muted-foreground">
                Sign out of your SkillSwap account on this device.
              </p>
            </div>
            <Link to="/login">
              <Button variant="destructive" className="rounded-full">
                <LogOut size={15} className="mr-1.5" /> Log out
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}
