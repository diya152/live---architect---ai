import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, n as DefaultChatTransport, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { c as getThreadMessages, f as renameThread, g as useServerFn } from "./twin.functions-DIQLNhi0.mjs";
import { t as supabase } from "./client-BRy8G1Ro.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as ChevronRight, _ as FileText, a as Sparkles, b as Circle, m as LoaderCircle, o as Send, v as FileSpreadsheet, w as Check, y as Download } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./chat._threadId-CbZQuixv.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "../_libs/remark-gfm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat._threadId-Bg2zLk44.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function messageText(m) {
	return m.parts.map((p) => p.type === "text" ? p.text : "").join("").trim();
}
function safeFilename(title) {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "conversation";
}
function download(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function csvEscape(value) {
	if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, "\"\"")}"`;
	return value;
}
function exportThreadAsCSV(title, messages, createdAt = /* @__PURE__ */ new Date()) {
	const rows = [[
		"index",
		"role",
		"content"
	]];
	messages.forEach((m, i) => {
		rows.push([
			String(i + 1),
			m.role,
			messageText(m)
		]);
	});
	const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
	const stamp = createdAt.toISOString().slice(0, 10);
	download(new Blob([csv], { type: "text/csv;charset=utf-8" }), `${stamp}-${safeFilename(title)}.csv`);
}
function exportThreadAsPDF(title, messages, createdAt = /* @__PURE__ */ new Date()) {
	const doc = new import_jspdf_node_min.default({
		unit: "pt",
		format: "a4"
	});
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 48;
	const contentWidth = pageWidth - margin * 2;
	let y = margin;
	const ensureSpace = (needed) => {
		if (y + needed > pageHeight - margin) {
			doc.addPage();
			y = margin;
		}
	};
	doc.setFont("helvetica", "bold");
	doc.setFontSize(16);
	doc.text(title || "Conversation", margin, y);
	y += 22;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(10);
	doc.setTextColor(120);
	doc.text(`Exported ${createdAt.toLocaleString()} · ${messages.length} messages`, margin, y);
	y += 20;
	doc.setTextColor(0);
	for (const m of messages) {
		const text = messageText(m);
		if (!text) continue;
		ensureSpace(28);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(11);
		doc.setTextColor(m.role === "user" ? 30 : 80);
		doc.text(m.role === "user" ? "You" : "Twin", margin, y);
		y += 14;
		doc.setFont("helvetica", "normal");
		doc.setFontSize(11);
		doc.setTextColor(20);
		const lines = doc.splitTextToSize(text, contentWidth);
		const lineHeight = 14;
		for (const line of lines) {
			ensureSpace(lineHeight);
			doc.text(line, margin, y);
			y += lineHeight;
		}
		y += 10;
	}
	const stamp = createdAt.toISOString().slice(0, 10);
	doc.save(`${stamp}-${safeFilename(title)}.pdf`);
}
function ChatPage() {
	const { threadId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatLoader, { threadId }, threadId);
}
function ChatLoader({ threadId }) {
	const getMessagesFn = useServerFn(getThreadMessages);
	const messagesQ = useQuery({
		queryKey: ["thread-messages", threadId],
		queryFn: () => getMessagesFn({ data: { threadId } }),
		staleTime: 0
	});
	if (messagesQ.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-[calc(100vh-3rem)] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
	});
	if (messagesQ.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-[calc(100vh-3rem)] items-center justify-center text-sm text-destructive",
		children: messagesQ.error.message
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatInner, {
		threadId,
		initialMessages: messagesQ.data ?? []
	});
}
function ChatInner({ threadId, initialMessages }) {
	const qc = useQueryClient();
	const renameFn = useServerFn(renameThread);
	const initial = initialMessages;
	const { messages, sendMessage, status, error } = useChat({
		id: threadId,
		messages: initial,
		transport: (0, import_react.useMemo)(() => {
			return new DefaultChatTransport({
				api: "/api/chat",
				body: { threadId },
				fetch: async (input, init) => {
					const { data } = await supabase.auth.getSession();
					const token = data.session?.access_token;
					const headers = new Headers(init?.headers);
					if (token) headers.set("authorization", `Bearer ${token}`);
					return fetch(input, {
						...init,
						headers
					});
				}
			});
		}, [threadId]),
		onError: (e) => toast.error(e.message ?? "Chat error")
	});
	const threadTitle = (() => {
		return qc.getQueryData(["threads"])?.find((t) => t.id === threadId)?.title ?? "conversation";
	})();
	const [input, setInput] = (0, import_react.useState)("");
	const isBusy = status === "submitted" || status === "streaming";
	const scrollRef = (0, import_react.useRef)(null);
	const textareaRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, status]);
	(0, import_react.useEffect)(() => {
		textareaRef.current?.focus();
	}, [threadId, status]);
	const didRenameRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (didRenameRef.current) return;
		if (initial.length > 0) return;
		const firstUser = messages.find((m) => m.role === "user");
		if (!firstUser) return;
		const text = firstUser.parts.map((p) => p.type === "text" ? p.text : "").join(" ").trim().slice(0, 60);
		if (!text) return;
		didRenameRef.current = true;
		renameFn({ data: {
			id: threadId,
			title: text
		} }).then(() => qc.invalidateQueries({ queryKey: ["threads"] })).catch(() => {});
	}, [
		messages,
		initial.length,
		renameFn,
		threadId,
		qc
	]);
	async function submit() {
		const text = input.trim();
		if (!text || isBusy) return;
		setInput("");
		await sendMessage({ text });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-[calc(100vh-3rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-end border-b px-4 md:px-6 h-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						disabled: messages.length === 0,
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Export"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: () => {
							exportThreadAsPDF(threadTitle, messages);
							toast.success("PDF downloaded");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 mr-2" }), " Download PDF"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: () => {
							exportThreadAsCSV(threadTitle, messages);
							toast.success("CSV downloaded");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4 mr-2" }), " Download CSV"]
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-6",
					children: [
						messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-2xl bg-gradient-primary grid place-items-center mx-auto mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-primary-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-semibold tracking-tight",
									children: "Talk to your twin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-2 max-w-md mx-auto",
									children: "Ask for a weekly review, stress-test a decision, design a plan, or unblock yourself."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid sm:grid-cols-2 gap-2 mt-8 max-w-xl mx-auto text-left",
									children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setInput(s),
										className: "text-sm border rounded-lg p-3 hover:bg-accent transition text-muted-foreground hover:text-foreground",
										children: s
									}, s))
								})
							]
						}),
						messages.map((m) => {
							const text = m.parts.map((p) => p.type === "text" ? p.text : "").join("");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: m.role === "user" ? "flex justify-end" : "",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: m.role === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%] whitespace-pre-wrap" : "prose prose-sm dark:prose-invert max-w-none text-foreground",
									children: m.role === "user" ? text : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
										remarkPlugins: [remarkGfm],
										children: text
									})
								})
							}, m.id);
						}),
						status === "submitted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Thinking..."]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-destructive",
							children: error.message
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto px-4 md:px-6 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							submit();
						},
						className: "flex items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							ref: textareaRef,
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									submit();
								}
							},
							placeholder: "What's on your mind?",
							className: "min-h-[52px] max-h-48 resize-none",
							rows: 1,
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "icon",
							disabled: !input.trim() || isBusy,
							children: isBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mt-1.5 text-center",
						children: "Your twin sees your identity, active goals, and habits as context."
					})]
				})
			})
		]
	});
}
var STARTERS = [
	"Run a weekly review with me.",
	"I'm stuck on a decision — help me think through it.",
	"Audit my goals and tell me what's misaligned.",
	"What's the highest-ROI thing I should focus on this week?"
];
//#endregion
export { ChatPage as component };
