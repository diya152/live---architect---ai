import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getIdentity, listGoals, listHabits, listThreads, createThread } from "@/lib/twin.functions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Repeat, MessageSquare, User, ArrowRight, Sparkles, Flame } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Digital Twin" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const getIdentityFn = useServerFn(getIdentity);
  const listGoalsFn = useServerFn(listGoals);
  const listHabitsFn = useServerFn(listHabits);
  const listThreadsFn = useServerFn(listThreads);
  const createThreadFn = useServerFn(createThread);

  const identity = useQuery({ queryKey: ["identity"], queryFn: () => getIdentityFn() });
  const goals = useQuery({ queryKey: ["goals"], queryFn: () => listGoalsFn() });
  const habits = useQuery({ queryKey: ["habits"], queryFn: () => listHabitsFn() });
  const threads = useQuery({ queryKey: ["threads"], queryFn: () => listThreadsFn() });

  const newThread = useMutation({
    mutationFn: () => createThreadFn({ data: {} }),
    onSuccess: (t) => {
      qc.invalidateQueries({ queryKey: ["threads"] });
      navigate({ to: "/chat/$threadId", params: { threadId: t.id } });
    },
  });

  const active = goals.data?.filter((g) => g.status === "active") ?? [];
  const completed = goals.data?.filter((g) => g.status === "completed").length ?? 0;
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayHabits = habits.data?.habits ?? [];
  const todayLogs = (habits.data?.logs ?? []).filter((l) => l.log_date === todayStr);
  const todayPct = todayHabits.length === 0 ? 0 : Math.round((todayLogs.length / todayHabits.length) * 100);

  const greet = (() => {
    const h = new Date().getHours();
    return h < 5 ? "Burning the midnight oil" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  })();
  const name = identity.data?.mission ? "" : "";

  return (
    <main className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto w-full">
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{greet}</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          What will you move forward today?
        </h1>
        {identity.data?.mission && (
          <p className="text-muted-foreground max-w-2xl">
            <span className="text-foreground/80">Mission:</span> {identity.data.mission}
          </p>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Active goals" value={active.length} icon={Target} />
        <Stat label="Completed goals" value={completed} icon={Flame} />
        <Stat label="Conversations" value={threads.data?.length ?? 0} icon={MessageSquare} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Today's habits</CardTitle>
              <CardDescription>{todayLogs.length} of {todayHabits.length} done</CardDescription>
            </div>
            <Link to="/habits"><Button variant="ghost" size="sm">Open <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </CardHeader>
          <CardContent>
            <Progress value={todayPct} className="h-2" />
            <div className="mt-4 space-y-1.5">
              {todayHabits.slice(0, 5).map((h) => {
                const done = todayLogs.some((l) => l.habit_id === h.id);
                return (
                  <div key={h.id} className="flex items-center justify-between text-sm">
                    <span className={done ? "text-foreground" : "text-muted-foreground"}>{h.name}</span>
                    <span className={done ? "text-primary" : "text-muted-foreground"}>{done ? "done" : "pending"}</span>
                  </div>
                );
              })}
              {todayHabits.length === 0 && (
                <p className="text-sm text-muted-foreground">No habits yet. <Link to="/habits" className="text-primary hover:underline">Add one</Link>.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Top priorities</CardTitle>
              <CardDescription>Highest-impact active goals</CardDescription>
            </div>
            <Link to="/goals"><Button variant="ghost" size="sm">Open <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {[...active]
              .sort((a, b) => b.impact * b.priority - a.impact * a.priority)
              .slice(0, 5)
              .map((g) => (
                <div key={g.id} className="flex items-center justify-between text-sm border-b border-border/40 pb-1.5 last:border-0">
                  <span className="truncate pr-2">{g.title}</span>
                  <span className="text-xs text-muted-foreground capitalize">{g.horizon.replace("_", " ")}</span>
                </div>
              ))}
            {active.length === 0 && (
              <p className="text-sm text-muted-foreground">No goals yet. <Link to="/goals" className="text-primary hover:underline">Define your first</Link>.</p>
            )}
          </CardContent>
        </Card>
      </section>

      <Card className="bg-gradient-primary text-primary-foreground border-0">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary-foreground/15 grid place-items-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Talk to your twin</h3>
              <p className="text-sm opacity-90 max-w-md">
                Get strategic advice, run weekly reviews, stress-test decisions, design action plans.
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => newThread.mutate()}
            disabled={newThread.isPending}
          >
            Start a conversation
          </Button>
        </CardContent>
      </Card>

      {(!identity.data?.mission || !identity.data?.vision) && (
        <Card className="border-dashed">
          <CardContent className="p-6 flex items-start gap-4">
            <User className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">Define your identity first</p>
              <p className="text-sm text-muted-foreground">
                Your mission, values, strengths, and weaknesses give your twin the context it needs to coach you well.
              </p>
            </div>
            <Link to="/identity"><Button>Set up identity</Button></Link>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}