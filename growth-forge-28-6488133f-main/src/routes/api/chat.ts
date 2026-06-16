import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";
import {
  createLovableAiGatewayProvider,
  DIGITAL_TWIN_SYSTEM_PROMPT,
} from "@/lib/ai-gateway.server";

type Body = { messages?: unknown; threadId?: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, threadId } = (await request.json()) as Body;
        if (!Array.isArray(messages) || !threadId) {
          return new Response("Missing messages or threadId", { status: 400 });
        }

        const authHeader = request.headers.get("authorization");
        const token = authHeader?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const SUPABASE_URL = process.env.SUPABASE_URL!;
        const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;
        const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: claims, error: authErr } = await supabase.auth.getClaims(token);
        if (authErr || !claims?.claims?.sub) {
          return new Response("Unauthorized", { status: 401 });
        }
        const userId = claims.claims.sub;

        // Verify thread belongs to user
        const { data: thread } = await supabase
          .from("chat_threads")
          .select("id")
          .eq("id", threadId)
          .maybeSingle();
        if (!thread) return new Response("Thread not found", { status: 404 });

        // Load identity + goals + habits for context
        const [{ data: identity }, { data: goals }, { data: habits }] = await Promise.all([
          supabase.from("identity").select("*").maybeSingle(),
          supabase
            .from("goals")
            .select("title,horizon,status,priority,impact,due_date")
            .eq("status", "active")
            .order("priority", { ascending: false })
            .limit(30),
          supabase
            .from("habits")
            .select("name,frequency,target_per_period")
            .eq("archived", false)
            .limit(30),
        ]);

        const contextBlock = buildContextBlock(identity, goals ?? [], habits ?? []);

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        const gateway = createLovableAiGatewayProvider(key);

        const uiMessages = messages as UIMessage[];
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: `${DIGITAL_TWIN_SYSTEM_PROMPT}\n\n${contextBlock}`,
          messages: await convertToModelMessages(uiMessages),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
          onFinish: async ({ messages: finalMessages }) => {
            // Dedup by count: AI SDK message ids (msg_...) don't match the
            // UUIDs the DB generates, so we persist only the tail beyond
            // what's already stored. finalMessages preserves order.
            const { count } = await supabase
              .from("chat_messages")
              .select("*", { count: "exact", head: true })
              .eq("thread_id", threadId);
            const already = count ?? 0;
            const toInsert = finalMessages.slice(already).map((m) => ({
              thread_id: threadId,
              user_id: userId,
              role: m.role,
              parts: m.parts as unknown as object,
            }));
            if (toInsert.length > 0) {
              const { error } = await supabase.from("chat_messages").insert(toInsert);
              if (error) console.error("[chat] insert error", error);
            }
            await supabase
              .from("chat_threads")
              .update({ last_message_at: new Date().toISOString() })
              .eq("id", threadId);
          },
        });
      },
    },
  },
});

function buildContextBlock(
  identity: any,
  goals: Array<any>,
  habits: Array<any>,
): string {
  const lines: string[] = ["# User Context (use to ground every reply)"];
  if (identity) {
    lines.push("## Identity");
    if (identity.mission) lines.push(`- Mission: ${identity.mission}`);
    if (identity.vision) lines.push(`- Vision: ${identity.vision}`);
    if (identity.values_list?.length) lines.push(`- Values: ${identity.values_list.join(", ")}`);
    if (identity.strengths?.length) lines.push(`- Strengths: ${identity.strengths.join(", ")}`);
    if (identity.weaknesses?.length) lines.push(`- Weaknesses: ${identity.weaknesses.join(", ")}`);
    if (identity.beliefs) lines.push(`- Beliefs: ${identity.beliefs}`);
    if (identity.personality) lines.push(`- Personality: ${identity.personality}`);
  }
  if (goals.length) {
    lines.push("## Active Goals");
    for (const g of goals) {
      lines.push(
        `- [${g.horizon}] ${g.title} (priority ${g.priority}, impact ${g.impact}${g.due_date ? `, due ${g.due_date}` : ""})`,
      );
    }
  }
  if (habits.length) {
    lines.push("## Tracked Habits");
    for (const h of habits) {
      lines.push(`- ${h.name} (${h.frequency}, target ${h.target_per_period})`);
    }
  }
  if (lines.length === 1) lines.push("(No profile data yet — ask the user to set up their identity, goals, and habits.)");
  return lines.join("\n");
}