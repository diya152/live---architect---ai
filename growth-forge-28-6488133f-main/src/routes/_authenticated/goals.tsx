import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listGoals,
  createGoal,
  updateGoalStatus,
  deleteGoal,
} from "@/lib/twin.functions";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Plus, Trash2, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const HORIZONS = [
  { v: "vision", l: "Vision" },
  { v: "ten_year", l: "10-Year" },
  { v: "five_year", l: "5-Year" },
  { v: "annual", l: "Annual" },
  { v: "quarterly", l: "Quarterly" },
  { v: "monthly", l: "Monthly" },
  { v: "weekly", l: "Weekly" },
  { v: "daily", l: "Daily" },
] as const;

export const Route = createFileRoute("/_authenticated/goals")({
  head: () => ({ meta: [{ title: "Goals · Digital Twin" }] }),
  component: GoalsPage,
});

function GoalsPage() {
  const listFn = useServerFn(listGoals);
  const createFn = useServerFn(createGoal);
  const statusFn = useServerFn(updateGoalStatus);
  const deleteFn = useServerFn(deleteGoal);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["goals"], queryFn: () => listFn() });

  const create = useMutation({
    mutationFn: (data: any) => createFn({ data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal created");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const setStatus = useMutation({
    mutationFn: (vars: { id: string; status: "active" | "completed" | "paused" | "dropped" }) => statusFn({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Goal Management</h1>
          <p className="text-muted-foreground">Vision → Long term → Annual → Quarterly → Weekly → Daily.</p>
        </div>
        <NewGoalDialog onCreate={(data) => create.mutate(data)} />
      </header>

      {HORIZONS.map((h) => {
        const items = (q.data ?? []).filter((g) => g.horizon === h.v && g.status !== "dropped");
        if (items.length === 0) return null;
        return (
          <section key={h.v} className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{h.l}</h2>
            <div className="grid gap-2">
              {items.map((g) => (
                <Card key={g.id} className={g.status === "completed" ? "opacity-60" : ""}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <button
                      onClick={() =>
                        setStatus.mutate({
                          id: g.id,
                          status: g.status === "completed" ? "active" : "completed",
                        })
                      }
                      className={`mt-0.5 h-5 w-5 rounded-full border grid place-items-center transition ${
                        g.status === "completed" ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/40 hover:border-primary"
                      }`}
                    >
                      {g.status === "completed" && <Check className="h-3 w-3" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${g.status === "completed" ? "line-through" : ""}`}>{g.title}</p>
                      {g.description && <p className="text-sm text-muted-foreground mt-0.5">{g.description}</p>}
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        <Badge variant="outline">P{g.priority}</Badge>
                        <Badge variant="outline">Impact {g.impact}</Badge>
                        <Badge variant="outline">Difficulty {g.difficulty}</Badge>
                        {g.due_date && <Badge variant="outline">Due {g.due_date}</Badge>}
                        {g.status === "paused" && <Badge variant="secondary">Paused</Badge>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          setStatus.mutate({
                            id: g.id,
                            status: g.status === "paused" ? "active" : "paused",
                          })
                        }
                        title={g.status === "paused" ? "Resume" : "Pause"}
                      >
                        {g.status === "paused" ? <RotateCcw className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => confirm("Delete this goal?") && del.mutate(g.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      {(q.data ?? []).length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-10 text-center space-y-3">
            <p className="text-muted-foreground">Nothing here yet. Define your first goal.</p>
            <NewGoalDialog onCreate={(d) => create.mutate(d)} />
          </CardContent>
        </Card>
      )}
    </main>
  );
}

function NewGoalDialog({ onCreate }: { onCreate: (g: any) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [horizon, setHorizon] = useState<typeof HORIZONS[number]["v"]>("annual");
  const [priority, setPriority] = useState(3);
  const [impact, setImpact] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [dueDate, setDueDate] = useState("");

  function submit() {
    if (!title.trim()) return;
    onCreate({ title, description, horizon, priority, impact, difficulty, due_date: dueDate || null });
    setTitle(""); setDescription(""); setDueDate("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-1" /> New goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New goal</DialogTitle>
          <DialogDescription>Define something measurable and meaningful.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ship MVP and reach $5k MRR" /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Horizon</Label>
              <Select value={horizon} onValueChange={(v) => setHorizon(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HORIZONS.map((h) => <SelectItem key={h.v} value={h.v}>{h.l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Due date</Label><Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
          </div>
          <SliderRow label="Priority" value={priority} onChange={setPriority} />
          <SliderRow label="Impact" value={impact} onChange={setImpact} />
          <SliderRow label="Difficulty" value={difficulty} onChange={setDifficulty} />
          <Button className="w-full" onClick={submit}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SliderRow({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm"><Label>{label}</Label><span className="text-muted-foreground">{value}/5</span></div>
      <Slider min={1} max={5} step={1} value={[value]} onValueChange={([n]) => onChange(n)} />
    </div>
  );
}