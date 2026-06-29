import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Repeat, MessageSquare, User } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Twin — Your Personal Growth OS" },
      { name: "description", content: "An AI-powered digital twin that helps you set goals, build habits, make better decisions, and grow continuously." },
      { property: "og:title", content: "Digital Twin — Your Personal Growth OS" },
      { property: "og:description", content: "An AI-powered digital twin that coaches you toward your long-term mission." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">Digital Twin</span>
        </div>
        <div className="flex items-center gap-1">
          <Link to="/contact"><Button variant="ghost">Contact</Button></Link>
          <Link to="/auth"><Button variant="ghost">Sign in</Button></Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Personal Growth Operating System</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          The AI twin that<br />grows with you.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Define your mission. Track your goals and habits. Stress-test decisions. Run weekly reviews. Your twin remembers everything and coaches you toward who you want to become.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/auth"><Button size="lg">Create your twin</Button></Link>
          <Link to="/auth"><Button size="lg" variant="outline">Sign in</Button></Link>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-5">
              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
                <f.icon className="h-4 w-4" />
              </div>
              <p className="font-medium text-sm">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const FEATURES = [
  { icon: User, title: "Identity Engine", desc: "Mission, values, strengths, weaknesses — the foundation." },
  { icon: Target, title: "Goal System", desc: "Vision → 10y → annual → quarterly → weekly → daily." },
  { icon: Repeat, title: "Habit Intelligence", desc: "Track streaks, build discipline, see momentum." },
  { icon: MessageSquare, title: "Strategic Twin", desc: "Decision analyst, accountability partner, learning mentor." },
];
