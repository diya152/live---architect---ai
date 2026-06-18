import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as deleteGoal, g as useServerFn, h as updateGoalStatus, l as listGoals, n as createGoal } from "./twin.functions-DIQLNhi0.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { l as Plus, r as Trash2, s as RotateCcw, u as Pause, w as Check } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-CfEwGGLW.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { a as DialogTitle, c as SelectContent, d as SelectValue, i as DialogHeader, l as SelectItem, n as DialogContent, o as DialogTrigger, r as DialogDescription, s as Select, t as Dialog, u as SelectTrigger } from "./dialog-D-5fNhY1.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/goals-Be6IHzl7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var HORIZONS = [
	{
		v: "vision",
		l: "Vision"
	},
	{
		v: "ten_year",
		l: "10-Year"
	},
	{
		v: "five_year",
		l: "5-Year"
	},
	{
		v: "annual",
		l: "Annual"
	},
	{
		v: "quarterly",
		l: "Quarterly"
	},
	{
		v: "monthly",
		l: "Monthly"
	},
	{
		v: "weekly",
		l: "Weekly"
	},
	{
		v: "daily",
		l: "Daily"
	}
];
function GoalsPage() {
	const listFn = useServerFn(listGoals);
	const createFn = useServerFn(createGoal);
	const statusFn = useServerFn(updateGoalStatus);
	const deleteFn = useServerFn(deleteGoal);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["goals"],
		queryFn: () => listFn()
	});
	const create = useMutation({
		mutationFn: (data) => createFn({ data }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["goals"] });
			toast.success("Goal created");
		},
		onError: (e) => toast.error(e.message)
	});
	const setStatus = useMutation({
		mutationFn: (vars) => statusFn({ data: vars }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] })
	});
	const del = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "p-6 md:p-10 max-w-5xl mx-auto w-full space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Goal Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Vision → Long term → Annual → Quarterly → Weekly → Daily."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewGoalDialog, { onCreate: (data) => create.mutate(data) })]
			}),
			HORIZONS.map((h) => {
				const items = (q.data ?? []).filter((g) => g.horizon === h.v && g.status !== "dropped");
				if (items.length === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm uppercase tracking-[0.18em] text-muted-foreground",
						children: h.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: items.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: g.status === "completed" ? "opacity-60" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex items-start gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setStatus.mutate({
											id: g.id,
											status: g.status === "completed" ? "active" : "completed"
										}),
										className: `mt-0.5 h-5 w-5 rounded-full border grid place-items-center transition ${g.status === "completed" ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/40 hover:border-primary"}`,
										children: g.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `font-medium ${g.status === "completed" ? "line-through" : ""}`,
												children: g.title
											}),
											g.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground mt-0.5",
												children: g.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-1.5 mt-2 flex-wrap",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: "outline",
														children: ["P", g.priority]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: "outline",
														children: ["Impact ", g.impact]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: "outline",
														children: ["Difficulty ", g.difficulty]
													}),
													g.due_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: "outline",
														children: ["Due ", g.due_date]
													}),
													g.status === "paused" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "secondary",
														children: "Paused"
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => setStatus.mutate({
												id: g.id,
												status: g.status === "paused" ? "active" : "paused"
											}),
											title: g.status === "paused" ? "Resume" : "Pause",
											children: g.status === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => confirm("Delete this goal?") && del.mutate(g.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								]
							})
						}, g.id))
					})]
				}, h.v);
			}),
			(q.data ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-dashed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-10 text-center space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Nothing here yet. Define your first goal."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewGoalDialog, { onCreate: (d) => create.mutate(d) })]
				})
			})
		]
	});
}
function NewGoalDialog({ onCreate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [horizon, setHorizon] = (0, import_react.useState)("annual");
	const [priority, setPriority] = (0, import_react.useState)(3);
	const [impact, setImpact] = (0, import_react.useState)(3);
	const [difficulty, setDifficulty] = (0, import_react.useState)(3);
	const [dueDate, setDueDate] = (0, import_react.useState)("");
	function submit() {
		if (!title.trim()) return;
		onCreate({
			title,
			description,
			horizon,
			priority,
			impact,
			difficulty,
			due_date: dueDate || null
		});
		setTitle("");
		setDescription("");
		setDueDate("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " New goal"] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New goal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Define something measurable and meaningful." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Ship MVP and reach $5k MRR"
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Horizon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: horizon,
							onValueChange: (v) => setHorizon(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: HORIZONS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: h.v,
								children: h.l
							}, h.v)) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Due date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: dueDate,
							onChange: (e) => setDueDate(e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
					label: "Priority",
					value: priority,
					onChange: setPriority
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
					label: "Impact",
					value: impact,
					onChange: setImpact
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
					label: "Difficulty",
					value: difficulty,
					onChange: setDifficulty
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
function SliderRow({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted-foreground",
				children: [value, "/5"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			min: 1,
			max: 5,
			step: 1,
			value: [value],
			onValueChange: ([n]) => onChange(n)
		})]
	});
}
//#endregion
export { GoalsPage as component };
