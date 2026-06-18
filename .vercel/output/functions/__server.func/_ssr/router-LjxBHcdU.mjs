import { o as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { a as require_react, i as streamText, r as convertToModelMessages } from "../_libs/@ai-sdk/react+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-BRy8G1Ro.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Route$9 } from "./chat._threadId-CbZQuixv.mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-LjxBHcdU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DiLA_7g4.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Talent Tracker AI" },
			{
				name: "description",
				content: "\"An AI-powered that analuzes a student's interests , habits, skills, and activities to recommend suitable career paths and learning opportunities.\""
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Talent Tracker AI"
			},
			{
				property: "og:description",
				content: "\"An AI-powered that analuzes a student's interests , habits, skills, and activities to recommend suitable career paths and learning opportunities.\""
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "Talent Tracker AI"
			},
			{
				name: "twitter:description",
				content: "\"An AI-powered that analuzes a student's interests , habits, skills, and activities to recommend suitable career paths and learning opportunities.\""
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/78e6324e-f9ba-4115-b0bc-c557c33f3a32"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/78e6324e-f9ba-4115-b0bc-c557c33f3a32"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$6 = () => import("./auth-DbCoYZgz.mjs");
var Route$7 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in · Digital Twin" }, {
		name: "description",
		content: "Sign in to your Personal Growth Digital Twin."
	}] }),
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await supabase.auth.getSession();
		if (data.session) throw redirect({ to: "/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_authenticated-DKmFue2p.mjs");
var Route$6 = createFileRoute("/_authenticated")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await supabase.auth.getSession();
		if (!data.session) throw redirect({ to: "/auth" });
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./routes-BhJ0ZnHv.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Digital Twin — Your Personal Growth OS" },
		{
			name: "description",
			content: "An AI-powered digital twin that helps you set goals, build habits, make better decisions, and grow continuously."
		},
		{
			property: "og:title",
			content: "Digital Twin — Your Personal Growth OS"
		},
		{
			property: "og:description",
			content: "An AI-powered digital twin that coaches you toward your long-term mission."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
function createLovableAiGatewayProvider(apiKey) {
	return createOpenAICompatible({
		name: "lovable-ai-gateway",
		baseURL: "https://ai.gateway.lovable.dev/v1",
		headers: { "Lovable-API-Key": apiKey }
	});
}
var DIGITAL_TWIN_SYSTEM_PROMPT = `You are the user's Personal Growth Digital Twin.

Your role is to act as a strategic advisor, life coach, productivity consultant, accountability partner, learning mentor, and decision analyst.

Your primary mission is to help the user maximize their long-term growth, effectiveness, happiness, health, wealth, knowledge, and impact.

Always operate using the following principles:
1. Prioritize long-term outcomes over short-term comfort.
2. Identify bottlenecks limiting growth.
3. Detect patterns of procrastination, avoidance, and self-sabotage.
4. Recommend evidence-based improvements.
5. Challenge weak assumptions respectfully.
6. Convert goals into measurable actions.
7. Optimize systems rather than relying on motivation.
8. Track progress continuously.
9. Encourage reflection and learning from mistakes.
10. Align recommendations with the user's values and mission.

When responding to a substantive request:
STEP 1: Analyze the current situation.
STEP 2: Identify opportunities, risks, and constraints.
STEP 3: Provide strategic recommendations.
STEP 4: Break recommendations into concrete next steps.
STEP 5: Define measurable success metrics.

You also act as a board of advisors composed of: Strategic Thinker, Behavioral Psychologist, Productivity Expert, Wealth Builder, Health Coach, Learning Scientist. Before giving major recommendations, briefly weigh perspectives, identify disagreements, and synthesize the highest-ROI path.

For every major goal, provide: priority score, impact score, difficulty score, time estimate, recommended execution plan.
For every decision, provide: pros, cons, risks, second-order consequences, recommendation.
For every weekly review, provide: wins, failures, lessons learned, focus areas, action plan.

Keep replies focused and skimmable. Use short paragraphs, bold key terms, and bullet lists when they help. Be warm but direct — challenge weak thinking without being harsh. Default to markdown formatting.`;
var Route$4 = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const { messages, threadId } = await request.json();
	if (!Array.isArray(messages) || !threadId) return new Response("Missing messages or threadId", { status: 400 });
	const token = request.headers.get("authorization")?.replace("Bearer ", "");
	if (!token) return new Response("Unauthorized", { status: 401 });
	const SUPABASE_URL = process.env.SUPABASE_URL;
	const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
	const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: { headers: { Authorization: `Bearer ${token}` } },
		auth: {
			persistSession: false,
			autoRefreshToken: false
		}
	});
	const { data: claims, error: authErr } = await supabase.auth.getClaims(token);
	if (authErr || !claims?.claims?.sub) return new Response("Unauthorized", { status: 401 });
	const userId = claims.claims.sub;
	const { data: thread } = await supabase.from("chat_threads").select("id").eq("id", threadId).maybeSingle();
	if (!thread) return new Response("Thread not found", { status: 404 });
	const [{ data: identity }, { data: goals }, { data: habits }] = await Promise.all([
		supabase.from("identity").select("*").maybeSingle(),
		supabase.from("goals").select("title,horizon,status,priority,impact,due_date").eq("status", "active").order("priority", { ascending: false }).limit(30),
		supabase.from("habits").select("name,frequency,target_per_period").eq("archived", false).limit(30)
	]);
	const contextBlock = buildContextBlock(identity, goals ?? [], habits ?? []);
	const key = process.env.LOVABLE_API_KEY;
	if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
	const gateway = createLovableAiGatewayProvider(key);
	const uiMessages = messages;
	return streamText({
		model: gateway("google/gemini-3-flash-preview"),
		system: `${DIGITAL_TWIN_SYSTEM_PROMPT}\n\n${contextBlock}`,
		messages: await convertToModelMessages(uiMessages)
	}).toUIMessageStreamResponse({
		originalMessages: uiMessages,
		onFinish: async ({ messages: finalMessages }) => {
			const { count } = await supabase.from("chat_messages").select("*", {
				count: "exact",
				head: true
			}).eq("thread_id", threadId);
			const already = count ?? 0;
			const toInsert = finalMessages.slice(already).map((m) => ({
				thread_id: threadId,
				user_id: userId,
				role: m.role,
				parts: m.parts
			}));
			if (toInsert.length > 0) {
				const { error } = await supabase.from("chat_messages").insert(toInsert);
				if (error) console.error("[chat] insert error", error);
			}
			await supabase.from("chat_threads").update({ last_message_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", threadId);
		}
	});
} } } });
function buildContextBlock(identity, goals, habits) {
	const lines = ["# User Context (use to ground every reply)"];
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
		for (const g of goals) lines.push(`- [${g.horizon}] ${g.title} (priority ${g.priority}, impact ${g.impact}${g.due_date ? `, due ${g.due_date}` : ""})`);
	}
	if (habits.length) {
		lines.push("## Tracked Habits");
		for (const h of habits) lines.push(`- ${h.name} (${h.frequency}, target ${h.target_per_period})`);
	}
	if (lines.length === 1) lines.push("(No profile data yet — ask the user to set up their identity, goals, and habits.)");
	return lines.join("\n");
}
var $$splitComponentImporter$3 = () => import("./identity-BZ4ByCIu.mjs");
var Route$3 = createFileRoute("/_authenticated/identity")({
	head: () => ({ meta: [{ title: "Identity · Digital Twin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./habits-BG01Pmoe.mjs");
var Route$2 = createFileRoute("/_authenticated/habits")({
	head: () => ({ meta: [{ title: "Habits · Digital Twin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./goals-Be6IHzl7.mjs");
var Route$1 = createFileRoute("/_authenticated/goals")({
	head: () => ({ meta: [{ title: "Goals · Digital Twin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard-C4FTaPLJ.mjs");
var Route = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard · Digital Twin" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AuthRoute = Route$7.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$8
});
var AuthenticatedRoute = Route$6.update({
	id: "/_authenticated",
	getParentRoute: () => Route$8
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var ApiChatRoute = Route$4.update({
	id: "/api/chat",
	path: "/api/chat",
	getParentRoute: () => Route$8
});
var AuthenticatedIdentityRoute = Route$3.update({
	id: "/identity",
	path: "/identity",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedHabitsRoute = Route$2.update({
	id: "/habits",
	path: "/habits",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedGoalsRoute = Route$1.update({
	id: "/goals",
	path: "/goals",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedRouteChildren = {
	AuthenticatedDashboardRoute: Route.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedGoalsRoute,
	AuthenticatedHabitsRoute,
	AuthenticatedIdentityRoute,
	AuthenticatedChatThreadIdRoute: Route$9.update({
		id: "/chat/$threadId",
		path: "/chat/$threadId",
		getParentRoute: () => AuthenticatedRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRoute: AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren),
	AuthRoute,
	ApiChatRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
