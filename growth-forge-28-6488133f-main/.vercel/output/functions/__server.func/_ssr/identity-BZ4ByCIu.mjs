import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { g as useServerFn, p as saveIdentity, s as getIdentity } from "./twin.functions-DIQLNhi0.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CfEwGGLW.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/identity-BZ4ByCIu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IdentityPage() {
	const getFn = useServerFn(getIdentity);
	const saveFn = useServerFn(saveIdentity);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["identity"],
		queryFn: () => getFn()
	});
	const [s, setS] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (q.data && !s) setS({
			mission: q.data.mission ?? "",
			vision: q.data.vision ?? "",
			beliefs: q.data.beliefs ?? "",
			personality: q.data.personality ?? "",
			values_list: q.data.values_list ?? [],
			strengths: q.data.strengths ?? [],
			weaknesses: q.data.weaknesses ?? []
		});
	}, [q.data, s]);
	const save = useMutation({
		mutationFn: (data) => saveFn({ data }),
		onSuccess: () => {
			toast.success("Identity saved");
			qc.invalidateQueries({ queryKey: ["identity"] });
		},
		onError: (e) => toast.error(e.message ?? "Save failed")
	});
	if (!s) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-muted-foreground text-sm",
		children: "Loading..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "p-6 md:p-10 max-w-3xl mx-auto w-full space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Identity Engine"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "The foundation your twin uses to coach you."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Mission & Vision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "What you're here to do and where you're going." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mission" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: s.mission,
						onChange: (e) => setS({
							...s,
							mission: e.target.value
						}),
						placeholder: "Become financially free and create meaningful impact."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Vision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: s.vision,
						onChange: (e) => setS({
							...s,
							vision: e.target.value
						}),
						placeholder: "In 10 years..."
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Values" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
				value: s.values_list,
				onChange: (v) => setS({
					...s,
					values_list: v
				}),
				placeholder: "Integrity, growth, discipline..."
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Strengths" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
					value: s.strengths,
					onChange: (v) => setS({
						...s,
						strengths: v
					}),
					placeholder: "Analytical thinking"
				}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Weaknesses" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
					value: s.weaknesses,
					onChange: (v) => setS({
						...s,
						weaknesses: v
					}),
					placeholder: "Procrastination"
				}) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Beliefs & Personality" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Core beliefs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: s.beliefs,
						onChange: (e) => setS({
							...s,
							beliefs: e.target.value
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Personality" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: s.personality,
						onChange: (e) => setS({
							...s,
							personality: e.target.value
						}),
						placeholder: "INTJ, high openness, low neuroticism..."
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => save.mutate(s),
					disabled: save.isPending,
					size: "lg",
					children: save.isPending ? "Saving..." : "Save identity"
				})
			})
		]
	});
}
function TagInput({ value, onChange, placeholder }) {
	const [text, setText] = (0, import_react.useState)("");
	function add() {
		const v = text.trim();
		if (!v) return;
		if (value.includes(v)) return setText("");
		onChange([...value, v]);
		setText("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: text,
				onChange: (e) => setText(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === ",") {
						e.preventDefault();
						add();
					}
				},
				placeholder
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				onClick: add,
				children: "Add"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: value.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "secondary",
				className: "gap-1 pr-1",
				children: [v, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onChange(value.filter((x) => x !== v)),
					className: "hover:text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
				})]
			}, v))
		})]
	});
}
//#endregion
export { IdentityPage as component };
