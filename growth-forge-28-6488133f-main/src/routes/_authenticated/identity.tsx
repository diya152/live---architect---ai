import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIdentity, saveIdentity } from "@/lib/twin.functions";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/identity")({
  head: () => ({ meta: [{ title: "Identity · Digital Twin" }] }),
  component: IdentityPage,
});

type State = {
  mission: string;
  vision: string;
  beliefs: string;
  personality: string;
  values_list: string[];
  strengths: string[];
  weaknesses: string[];
};

function IdentityPage() {
  const getFn = useServerFn(getIdentity);
  const saveFn = useServerFn(saveIdentity);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["identity"], queryFn: () => getFn() });
  const [s, setS] = useState<State | null>(null);

  useEffect(() => {
    if (q.data && !s) {
      setS({
        mission: q.data.mission ?? "",
        vision: q.data.vision ?? "",
        beliefs: q.data.beliefs ?? "",
        personality: q.data.personality ?? "",
        values_list: q.data.values_list ?? [],
        strengths: q.data.strengths ?? [],
        weaknesses: q.data.weaknesses ?? [],
      });
    }
  }, [q.data, s]);

  const save = useMutation({
    mutationFn: (data: State) => saveFn({ data }),
    onSuccess: () => {
      toast.success("Identity saved");
      qc.invalidateQueries({ queryKey: ["identity"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Save failed"),
  });

  if (!s) return <div className="p-10 text-muted-foreground text-sm">Loading...</div>;

  return (
    <main className="p-6 md:p-10 max-w-3xl mx-auto w-full space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Identity Engine</h1>
        <p className="text-muted-foreground">The foundation your twin uses to coach you.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Mission & Vision</CardTitle>
          <CardDescription>What you're here to do and where you're going.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Mission</Label>
            <Textarea rows={2} value={s.mission} onChange={(e) => setS({ ...s, mission: e.target.value })} placeholder="Become financially free and create meaningful impact." />
          </div>
          <div className="space-y-2">
            <Label>Vision</Label>
            <Textarea rows={2} value={s.vision} onChange={(e) => setS({ ...s, vision: e.target.value })} placeholder="In 10 years..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Values</CardTitle></CardHeader>
        <CardContent><TagInput value={s.values_list} onChange={(v) => setS({ ...s, values_list: v })} placeholder="Integrity, growth, discipline..." /></CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Strengths</CardTitle></CardHeader>
          <CardContent><TagInput value={s.strengths} onChange={(v) => setS({ ...s, strengths: v })} placeholder="Analytical thinking" /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Weaknesses</CardTitle></CardHeader>
          <CardContent><TagInput value={s.weaknesses} onChange={(v) => setS({ ...s, weaknesses: v })} placeholder="Procrastination" /></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Beliefs & Personality</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Core beliefs</Label>
            <Textarea rows={3} value={s.beliefs} onChange={(e) => setS({ ...s, beliefs: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Personality</Label>
            <Textarea rows={3} value={s.personality} onChange={(e) => setS({ ...s, personality: e.target.value })} placeholder="INTJ, high openness, low neuroticism..." />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => save.mutate(s)} disabled={save.isPending} size="lg">
          {save.isPending ? "Saving..." : "Save identity"}
        </Button>
      </div>
    </main>
  );
}

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState("");
  function add() {
    const v = text.trim();
    if (!v) return;
    if (value.includes(v)) return setText("");
    onChange([...value, v]);
    setText("");
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <Button type="button" variant="outline" onClick={add}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {value.map((v) => (
          <Badge key={v} variant="secondary" className="gap-1 pr-1">
            {v}
            <button onClick={() => onChange(value.filter((x) => x !== v))} className="hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}