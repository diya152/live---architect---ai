import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// ---------- Threads ----------
export const listThreads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("chat_threads")
      .select("*")
      .order("last_message_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ title: z.string().optional() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("chat_threads")
      .insert({
        user_id: context.userId,
        title: data.title?.slice(0, 80) || "New conversation",
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const renameThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), title: z.string().min(1).max(120) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("chat_threads")
      .update({ title: data.title })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("chat_threads").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getThreadMessages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ threadId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("chat_messages")
      .select("id,role,parts,created_at")
      .eq("thread_id", data.threadId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []).map((r) => ({
      id: r.id,
      role: r.role,
      parts: r.parts,
    }));
  });

// ---------- Identity ----------
const identitySchema = z.object({
  mission: z.string(),
  vision: z.string(),
  beliefs: z.string(),
  personality: z.string(),
  values_list: z.array(z.string()),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
});

export const getIdentity = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("identity")
      .select("*")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) {
      const { data: created, error: ce } = await context.supabase
        .from("identity")
        .insert({ user_id: context.userId })
        .select()
        .single();
      if (ce) throw new Error(ce.message);
      return created;
    }
    return data;
  });

export const saveIdentity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => identitySchema.parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("identity")
      .update(data)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Goals ----------
const HORIZONS = [
  "vision",
  "ten_year",
  "five_year",
  "annual",
  "quarterly",
  "monthly",
  "weekly",
  "daily",
] as const;
const STATUSES = ["active", "completed", "paused", "dropped"] as const;

export const listGoals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("goals")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const goalInputSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().default(""),
  horizon: z.enum(HORIZONS),
  priority: z.number().int().min(1).max(5),
  impact: z.number().int().min(1).max(5),
  difficulty: z.number().int().min(1).max(5),
  due_date: z.string().nullable().optional(),
});

export const createGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => goalInputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("goals")
      .insert({ ...data, user_id: context.userId, due_date: data.due_date || null })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateGoalStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(STATUSES) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const completed_at = data.status === "completed" ? new Date().toISOString() : null;
    const { error } = await context.supabase
      .from("goals")
      .update({ status: data.status, completed_at })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("goals").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Habits ----------
export const listHabits = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 29);
    const startStr = start.toISOString().slice(0, 10);

    const [{ data: habits, error: he }, { data: logs, error: le }] = await Promise.all([
      context.supabase
        .from("habits")
        .select("*")
        .eq("archived", false)
        .order("created_at", { ascending: true }),
      context.supabase
        .from("habit_logs")
        .select("habit_id,log_date,completed")
        .gte("log_date", startStr),
    ]);
    if (he) throw new Error(he.message);
    if (le) throw new Error(le.message);
    return { habits: habits ?? [], logs: logs ?? [] };
  });

export const createHabit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        name: z.string().min(1).max(120),
        description: z.string().default(""),
        frequency: z.enum(["daily", "weekly"]),
        target_per_period: z.number().int().min(1).max(50),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("habits")
      .insert({ ...data, user_id: context.userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const toggleHabitLog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        habitId: z.string().uuid(),
        date: z.string(),
        completed: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    if (data.completed) {
      const { error } = await context.supabase
        .from("habit_logs")
        .upsert(
          {
            habit_id: data.habitId,
            user_id: context.userId,
            log_date: data.date,
            completed: true,
          },
          { onConflict: "habit_id,log_date" },
        );
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase
        .from("habit_logs")
        .delete()
        .eq("habit_id", data.habitId)
        .eq("log_date", data.date);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const archiveHabit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("habits")
      .update({ archived: true })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });