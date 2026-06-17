import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { a as Sparkles, c as Repeat, f as MessageSquare, i as Target, n as User } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhJ0ZnHv.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-gradient-mesh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-6xl mx-auto px-6 py-5 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold tracking-tight",
					children: "Digital Twin"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					children: "Sign in"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-4xl mx-auto px-6 py-20 md:py-28 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.2em] text-primary mb-4",
					children: "Personal Growth Operating System"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]",
					children: [
						"The AI twin that",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"grows with you."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-lg text-muted-foreground max-w-2xl mx-auto",
					children: "Define your mission. Track your goals and habits. Stress-test decisions. Run weekly reviews. Your twin remembers everything and coaches you toward who you want to become."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex gap-3 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							children: "Create your twin"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "outline",
							children: "Sign in"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-left",
					children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-sm",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: f.desc
							})
						]
					}, f.title))
				})
			]
		})]
	});
}
var FEATURES = [
	{
		icon: User,
		title: "Identity Engine",
		desc: "Mission, values, strengths, weaknesses — the foundation."
	},
	{
		icon: Target,
		title: "Goal System",
		desc: "Vision → 10y → annual → quarterly → weekly → daily."
	},
	{
		icon: Repeat,
		title: "Habit Intelligence",
		desc: "Track streaks, build discipline, see momentum."
	},
	{
		icon: MessageSquare,
		title: "Strategic Twin",
		desc: "Decision analyst, accountability partner, learning mentor."
	}
];
//#endregion
export { Index as component };
