import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { g as useServerFn, m as toggleHabitLog, r as createHabit, t as archiveHabit, u as listHabits } from "./twin.functions-DIQLNhi0.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { E as Archive, g as Flame, l as Plus } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-CfEwGGLW.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { a as DialogTitle, c as SelectContent, d as SelectValue, i as DialogHeader, l as SelectItem, n as DialogContent, o as DialogTrigger, r as DialogDescription, s as Select, t as Dialog, u as SelectTrigger } from "./dialog-D-5fNhY1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/habits-BG01Pmoe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HabitsPage() {
	const listFn = useServerFn(listHabits);
	const createFn = useServerFn(createHabit);
	const toggleFn = useServerFn(toggleHabitLog);
	const archiveFn = useServerFn(archiveHabit);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["habits"],
		queryFn: () => listFn()
	});
	const create = useMutation({
		mutationFn: (data) => createFn({ data }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["habits"] });
			toast.success("Habit added");
		},
		onError: (e) => toast.error(e.message)
	});
	const toggle = useMutation({
		mutationFn: (vars) => toggleFn({ data: vars }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] })
	});
	const archive = useMutation({
		mutationFn: (id) => archiveFn({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] })
	});
	const days = Array.from({ length: 30 }, (_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - (29 - i));
		return d.toISOString().slice(0, 10);
	});
	const habits = q.data?.habits ?? [];
	const logs = q.data?.logs ?? [];
	const isDone = (habitId, date) => logs.some((l) => l.habit_id === habitId && l.log_date === date);
	function streak(habitId) {
		let count = 0;
		for (let i = days.length - 1; i >= 0; i--) if (isDone(habitId, days[i])) count++;
		else break;
		return count;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "p-6 md:p-10 max-w-6xl mx-auto w-full space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Habit Intelligence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Tap to log. Streaks build discipline."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewHabitDialog, { onCreate: (d) => create.mutate(d) })]
			}),
			habits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-dashed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-10 text-center space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No habits yet. Start with one keystone habit."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewHabitDialog, { onCreate: (d) => create.mutate(d) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: habits.map((h) => {
					const s = streak(h.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: h.name
							}), h.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: h.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-sm text-primary font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }),
										" ",
										s
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => archive.mutate(h.id),
									title: "Archive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "h-4 w-4" })
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-30 gap-1",
							style: { gridTemplateColumns: "repeat(30, minmax(0, 1fr))" },
							children: days.map((d) => {
								const done = isDone(h.id, d);
								const isToday = d === days[days.length - 1];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggle.mutate({
										habitId: h.id,
										date: d,
										completed: !done
									}),
									className: `h-6 rounded-sm transition ${done ? "bg-primary hover:bg-primary/80" : "bg-muted hover:bg-muted-foreground/20"} ${isToday ? "ring-2 ring-primary/40 ring-offset-1 ring-offset-background" : ""}`,
									title: d
								}, d);
							})
						})]
					}) }, h.id);
				})
			})
		]
	});
}
function NewHabitDialog({ onCreate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [frequency, setFrequency] = (0, import_react.useState)("daily");
	const [target, setTarget] = (0, import_react.useState)(1);
	function submit() {
		if (!name.trim()) return;
		onCreate({
			name,
			description,
			frequency,
			target_per_period: target
		});
		setName("");
		setDescription("");
		setTarget(1);
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " New habit"] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New habit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Make it small enough you can't say no." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Read 20 minutes"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: description,
						onChange: (e) => setDescription(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Frequency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: frequency,
							onValueChange: (v) => setFrequency(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "daily",
								children: "Daily"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "weekly",
								children: "Weekly"
							})] })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Target / period" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 50,
							value: target,
							onChange: (e) => setTarget(parseInt(e.target.value) || 1)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					onClick: submit,
					children: "Create"
				})
			]
		})] })]
	});
}
//#endregion
export { HabitsPage as component };
