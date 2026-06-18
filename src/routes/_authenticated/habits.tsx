import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listHabits,
  createHabit,
  toggleHabitLog,
  archiveHabit,
} from "@/lib/twin.functions";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Archive, Flame } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/habits")({
  head: () => ({ meta: [{ title: "Habits · Digital Twin" }] }),
  component: HabitsPage,
});

function HabitsPage() {
  const listFn = useServerFn(listHabits);
  const createFn = useServerFn(createHabit);
  const toggleFn = useServerFn(toggleHabitLog);
  const archiveFn = useServerFn(archiveHabit);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["habits"], queryFn: () => listFn() });

  const create = useMutation({
    mutationFn: (data: any) => createFn({ data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit added");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const toggle = useMutation({
    mutationFn: (vars: { habitId: string; date: string; completed: boolean }) => toggleFn({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });
  const archive = useMutation({
    mutationFn: (id: string) => archiveFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });

  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().slice(0, 10);
  });

  const habits = q.data?.habits ?? [];
  const logs = q.data?.logs ?? [];
  const isDone = (habitId: string, date: string) =>
    logs.some((l) => l.habit_id === habitId && l.log_date === date);

  function streak(habitId: string) {
    let count = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (isDone(habitId, days[i])) count++;
      else break;
    }
    return count;
  }

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Habit Intelligence</h1>
          <p className="text-muted-foreground">Tap to log. Streaks build discipline.</p>
        </div>
        <NewHabitDialog onCreate={(d) => create.mutate(d)} />
      </header>

      {habits.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-10 text-center space-y-3">
            <p className="text-muted-foreground">No habits yet. Start with one keystone habit.</p>
            <NewHabitDialog onCreate={(d) => create.mutate(d)} />
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {habits.map((h) => {
          const s = streak(h.id);
          return (
            <Card key={h.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium">{h.name}</p>
                    {h.description && <p className="text-xs text-muted-foreground">{h.description}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-primary font-medium">
                      <Flame className="h-4 w-4" /> {s}
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => archive.mutate(h.id)} title="Archive">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-30 gap-1" style={{ gridTemplateColumns: "repeat(30, minmax(0, 1fr))" }}>
                  {days.map((d) => {
                    const done = isDone(h.id, d);
                    const isToday = d === days[days.length - 1];
                    return (
                      <button
                        key={d}
                        onClick={() => toggle.mutate({ habitId: h.id, date: d, completed: !done })}
                        className={`h-6 rounded-sm transition ${
                          done
                            ? "bg-primary hover:bg-primary/80"
                            : "bg-muted hover:bg-muted-foreground/20"
                        } ${isToday ? "ring-2 ring-primary/40 ring-offset-1 ring-offset-background" : ""}`}
                        title={d}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

function NewHabitDialog({ onCreate }: { onCreate: (d: any) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [target, setTarget] = useState(1);

  function submit() {
    if (!name.trim()) return;
    onCreate({ name, description, frequency, target_per_period: target });
    setName(""); setDescription(""); setTarget(1);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-1" /> New habit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New habit</DialogTitle>
          <DialogDescription>Make it small enough you can't say no.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Read 20 minutes" /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Target / period</Label><Input type="number" min={1} max={50} value={target} onChange={(e) => setTarget(parseInt(e.target.value) || 1)} /></div>
          </div>
          <Button className="w-full" onClick={submit}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}