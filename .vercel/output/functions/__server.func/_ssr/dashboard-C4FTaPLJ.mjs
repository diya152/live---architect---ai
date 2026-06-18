import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { d as listThreads, g as useServerFn, i as createThread, l as listGoals, s as getIdentity, u as listHabits } from "./twin.functions-DIQLNhi0.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { T as ArrowRight, a as Sparkles, f as MessageSquare, g as Flame, i as Target, n as User } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CfEwGGLW.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-C4FTaPLJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function Dashboard() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const getIdentityFn = useServerFn(getIdentity);
	const listGoalsFn = useServerFn(listGoals);
	const listHabitsFn = useServerFn(listHabits);
	const listThreadsFn = useServerFn(listThreads);
	const createThreadFn = useServerFn(createThread);
	const identity = useQuery({
		queryKey: ["identity"],
		queryFn: () => getIdentityFn()
	});
	const goals = useQuery({
		queryKey: ["goals"],
		queryFn: () => listGoalsFn()
	});
	const habits = useQuery({
		queryKey: ["habits"],
		queryFn: () => listHabitsFn()
	});
	const threads = useQuery({
		queryKey: ["threads"],
		queryFn: () => listThreadsFn()
	});
	const newThread = useMutation({
		mutationFn: () => createThreadFn({ data: {} }),
		onSuccess: (t) => {
			qc.invalidateQueries({ queryKey: ["threads"] });
			navigate({
				to: "/chat/$threadId",
				params: { threadId: t.id }
			});
		}
	});
	const active = goals.data?.filter((g) => g.status === "active") ?? [];
	const completed = goals.data?.filter((g) => g.status === "completed").length ?? 0;
	const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const todayHabits = habits.data?.habits ?? [];
	const todayLogs = (habits.data?.logs ?? []).filter((l) => l.log_date === todayStr);
	const todayPct = todayHabits.length === 0 ? 0 : Math.round(todayLogs.length / todayHabits.length * 100);
	const greet = (() => {
		const h = (/* @__PURE__ */ new Date()).getHours();
		return h < 5 ? "Burning the midnight oil" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
	})();
	identity.data?.mission;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "p-6 md:p-10 space-y-8 max-w-6xl mx-auto w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted-foreground",
						children: greet
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl md:text-4xl font-semibold tracking-tight",
						children: "What will you move forward today?"
					}),
					identity.data?.mission && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/80",
								children: "Mission:"
							}),
							" ",
							identity.data.mission
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active goals",
						value: active.length,
						icon: Target
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Completed goals",
						value: completed,
						icon: Flame
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Conversations",
						value: threads.data?.length ?? 0,
						icon: MessageSquare
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Today's habits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
						todayLogs.length,
						" of ",
						todayHabits.length,
						" done"
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/habits",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 ml-1" })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: todayPct,
					className: "h-2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-1.5",
					children: [todayHabits.slice(0, 5).map((h) => {
						const done = todayLogs.some((l) => l.habit_id === h.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: done ? "text-foreground" : "text-muted-foreground",
								children: h.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: done ? "text-primary" : "text-muted-foreground",
								children: done ? "done" : "pending"
							})]
						}, h.id);
					}), todayHabits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"No habits yet. ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/habits",
								className: "text-primary hover:underline",
								children: "Add one"
							}),
							"."
						]
					})]
				})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Top priorities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Highest-impact active goals" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/goals",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 ml-1" })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-2",
					children: [[...active].sort((a, b) => b.impact * b.priority - a.impact * a.priority).slice(0, 5).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm border-b border-border/40 pb-1.5 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate pr-2",
							children: g.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground capitalize",
							children: g.horizon.replace("_", " ")
						})]
					}, g.id)), active.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"No goals yet. ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/goals",
								className: "text-primary hover:underline",
								children: "Define your first"
							}),
							"."
						]
					})]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "bg-gradient-primary text-primary-foreground border-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-lg bg-primary-foreground/15 grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-lg",
							children: "Talk to your twin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-90 max-w-md",
							children: "Get strategic advice, run weekly reviews, stress-test decisions, design action plans."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "lg",
						onClick: () => newThread.mutate(),
						disabled: newThread.isPending,
						children: "Start a conversation"
					})]
				})
			}),
			(!identity.data?.mission || !identity.data?.vision) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-dashed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6 flex items-start gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-primary mt-0.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Define your identity first"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Your mission, values, strengths, and weaknesses give your twin the context it needs to coach you well."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/identity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Set up identity" })
						})
					]
				})
			})
		]
	});
}
function Stat({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "p-5 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xl font-semibold tracking-tight",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		})] })]
	}) });
}
//#endregion
export { Dashboard as component };
