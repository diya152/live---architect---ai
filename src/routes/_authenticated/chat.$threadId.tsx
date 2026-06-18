import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getThreadMessages, renameThread } from "@/lib/twin.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Sparkles,
  Loader2,
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportThreadAsCSV, exportThreadAsPDF } from "@/lib/export-thread";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
  head: () => ({ meta: [{ title: "Chat · Digital Twin" }] }),
  component: ChatPage,
});

function ChatPage() {
  const { threadId } = Route.useParams();
  return <ChatLoader key={threadId} threadId={threadId} />;
}

function ChatLoader({ threadId }: { threadId: string }) {
  const getMessagesFn = useServerFn(getThreadMessages);
  const messagesQ = useQuery({
    queryKey: ["thread-messages", threadId],
    queryFn: () => getMessagesFn({ data: { threadId } }),
    staleTime: 0,
  });

  if (messagesQ.isLoading) {
    return (
      <div className="flex h-[calc(100vh-3rem)] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (messagesQ.error) {
    return (
      <div className="flex h-[calc(100vh-3rem)] items-center justify-center text-sm text-destructive">
        {(messagesQ.error as Error).message}
      </div>
    );
  }

  return (
    <ChatInner
      threadId={threadId}
      initialMessages={(messagesQ.data ?? []) as UIMessage[]}
    />
  );
}

function ChatInner({
  threadId,
  initialMessages,
}: {
  threadId: string;
  initialMessages: UIMessage[];
}) {
  const qc = useQueryClient();
  const renameFn = useServerFn(renameThread);
  const initial = initialMessages;

  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/chat",
      body: { threadId },
      fetch: async (input, init) => {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        const headers = new Headers(init?.headers);
        if (token) headers.set("authorization", `Bearer ${token}`);
        return fetch(input as any, { ...init, headers });
      },
    });
  }, [threadId]);

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initial,
    transport,
    onError: (e) => toast.error(e.message ?? "Chat error"),
  });

  const threadTitle = (() => {
    const threads = qc.getQueryData<Array<{ id: string; title: string }>>([
      "threads",
    ]);
    return threads?.find((t) => t.id === threadId)?.title ?? "conversation";
  })();

  const [input, setInput] = useState("");
  const isBusy = status === "submitted" || status === "streaming";
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId, status]);

  // auto-title on first user message
  const didRenameRef = useRef(false);
  useEffect(() => {
    if (didRenameRef.current) return;
    if (initial.length > 0) return; // existing thread
    const firstUser = messages.find((m) => m.role === "user");
    if (!firstUser) return;
    const text = firstUser.parts
      .map((p: any) => (p.type === "text" ? p.text : ""))
      .join(" ")
      .trim()
      .slice(0, 60);
    if (!text) return;
    didRenameRef.current = true;
    renameFn({ data: { id: threadId, title: text } })
      .then(() => qc.invalidateQueries({ queryKey: ["threads"] }))
      .catch(() => {});
  }, [messages, initial.length, renameFn, threadId, qc]);

  async function submit() {
    const text = input.trim();
    if (!text || isBusy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      <div className="flex items-center justify-end border-b px-4 md:px-6 h-12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={messages.length === 0}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                exportThreadAsPDF(threadTitle, messages);
                toast.success("PDF downloaded");
              }}
            >
              <FileText className="h-4 w-4 mr-2" /> Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                exportThreadAsCSV(threadTitle, messages);
                toast.success("CSV downloaded");
              }}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" /> Download CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="h-12 w-12 rounded-2xl bg-gradient-primary grid place-items-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Talk to your twin</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Ask for a weekly review, stress-test a decision, design a plan, or unblock yourself.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 mt-8 max-w-xl mx-auto text-left">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-sm border rounded-lg p-3 hover:bg-accent transition text-muted-foreground hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts
              .map((p: any) => (p.type === "text" ? p.text : ""))
              .join("");
            return (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                <div
                  className={
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%] whitespace-pre-wrap"
                      : "prose prose-sm dark:prose-invert max-w-none text-foreground"
                  }
                >
                  {m.role === "user" ? (
                    text
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  )}
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...
            </div>
          )}

          {error && (
            <div className="text-sm text-destructive">{error.message}</div>
          )}
        </div>
      </div>

      <div className="border-t bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex items-end gap-2"
          >
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="What's on your mind?"
              className="min-h-[52px] max-h-48 resize-none"
              rows={1}
              autoFocus
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isBusy}>
              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <p className="text-[11px] text-muted-foreground mt-1.5 text-center">
            Your twin sees your identity, active goals, and habits as context.
          </p>
        </div>
      </div>
    </div>
  );
}

const STARTERS = [
  "Run a weekly review with me.",
  "I'm stuck on a decision — help me think through it.",
  "Audit my goals and tell me what's misaligned.",
  "What's the highest-ROI thing I should focus on this week?",
];