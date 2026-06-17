import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { Q as _enum, dt as object, mt as string, nt as array, rt as boolean, ut as number } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/twin.functions-XXh5geiy.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listThreads_createServerFn_handler = createServerRpc({
	id: "55355d48deb537ef11a430f46ba5854523b8aa0242b8ee75195d988831d89da7",
	name: "listThreads",
	filename: "src/lib/twin.functions.ts"
}, (opts) => listThreads.__executeServer(opts));
var listThreads = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listThreads_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("chat_threads").select("*").order("last_message_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var createThread_createServerFn_handler = createServerRpc({
	id: "2f5f22b7c9b23444979ebe6939ab333ec49b7df691c4fc4638ed4f5c8d1bd2e7",
	name: "createThread",
	filename: "src/lib/twin.functions.ts"
}, (opts) => createThread.__executeServer(opts));
var createThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ title: string().optional() }).parse(input)).handler(createThread_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("chat_threads").insert({
		user_id: context.userId,
		title: data.title?.slice(0, 80) || "New conversation"
	}).select().single();
	if (error) throw new Error(error.message);
	return row;
});
var renameThread_createServerFn_handler = createServerRpc({
	id: "46b7db37a5a2ff29888ba019b901362c18a03ef00fecbce4488acca8edde3975",
	name: "renameThread",
	filename: "src/lib/twin.functions.ts"
}, (opts) => renameThread.__executeServer(opts));
var renameThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	id: string().uuid(),
	title: string().min(1).max(120)
}).parse(input)).handler(renameThread_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("chat_threads").update({ title: data.title }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteThread_createServerFn_handler = createServerRpc({
	id: "815453d203af0acd85313797d05ed0d9696d3f1444ca305b8d947b4526dc3557",
	name: "deleteThread",
	filename: "src/lib/twin.functions.ts"
}, (opts) => deleteThread.__executeServer(opts));
var deleteThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ id: string().uuid() }).parse(input)).handler(deleteThread_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("chat_threads").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var getThreadMessages_createServerFn_handler = createServerRpc({
	id: "ca15c0099126c802f15417e782ed732c2b03e4306c206bd8ab4e1b3fd2d83751",
	name: "getThreadMessages",
	filename: "src/lib/twin.functions.ts"
}, (opts) => getThreadMessages.__executeServer(opts));
var getThreadMessages = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ threadId: string().uuid() }).parse(input)).handler(getThreadMessages_createServerFn_handler, async ({ data, context }) => {
	const { data: rows, error } = await context.supabase.from("chat_messages").select("id,role,parts,created_at").eq("thread_id", data.threadId).order("created_at", { ascending: true });
	if (error) throw new Error(error.message);
	return (rows ?? []).map((r) => ({
		id: r.id,
		role: r.role,
		parts: r.parts
	}));
});
var identitySchema = object({
	mission: string(),
	vision: string(),
	beliefs: string(),
	personality: string(),
	values_list: array(string()),
	strengths: array(string()),
	weaknesses: array(string())
});
var getIdentity_createServerFn_handler = createServerRpc({
	id: "0d2549449508024712da02f0f24e7389792bb673123ee73a2fefac9d13783bf8",
	name: "getIdentity",
	filename: "src/lib/twin.functions.ts"
}, (opts) => getIdentity.__executeServer(opts));
var getIdentity = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getIdentity_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("identity").select("*").maybeSingle();
	if (error) throw new Error(error.message);
	if (!data) {
		const { data: created, error: ce } = await context.supabase.from("identity").insert({ user_id: context.userId }).select().single();
		if (ce) throw new Error(ce.message);
		return created;
	}
	return data;
});
var saveIdentity_createServerFn_handler = createServerRpc({
	id: "20288aca116de9d525d8d95822da61e4ca2ee5a6ce03f2c41c3ebd72a533c111",
	name: "saveIdentity",
	filename: "src/lib/twin.functions.ts"
}, (opts) => saveIdentity.__executeServer(opts));
var saveIdentity = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => identitySchema.parse(input)).handler(saveIdentity_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("identity").update(data).eq("user_id", context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var HORIZONS = [
	"vision",
	"ten_year",
	"five_year",
	"annual",
	"quarterly",
	"monthly",
	"weekly",
	"daily"
];
var STATUSES = [
	"active",
	"completed",
	"paused",
	"dropped"
];
var listGoals_createServerFn_handler = createServerRpc({
	id: "f137f48f5f8ca0d4d8f6a3426c2f060073f561b454359aed6bcaac37f5455e34",
	name: "listGoals",
	filename: "src/lib/twin.functions.ts"
}, (opts) => listGoals.__executeServer(opts));
var listGoals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listGoals_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("goals").select("*").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var goalInputSchema = object({
	title: string().min(1).max(200),
	description: string().default(""),
	horizon: _enum(HORIZONS),
	priority: number().int().min(1).max(5),
	impact: number().int().min(1).max(5),
	difficulty: number().int().min(1).max(5),
	due_date: string().nullable().optional()
});
var createGoal_createServerFn_handler = createServerRpc({
	id: "07f3449a444310d728048259c111d5fe3aecd768946abe5658c4208303748c60",
	name: "createGoal",
	filename: "src/lib/twin.functions.ts"
}, (opts) => createGoal.__executeServer(opts));
var createGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => goalInputSchema.parse(input)).handler(createGoal_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("goals").insert({
		...data,
		user_id: context.userId,
		due_date: data.due_date || null
	}).select().single();
	if (error) throw new Error(error.message);
	return row;
});
var updateGoalStatus_createServerFn_handler = createServerRpc({
	id: "db7343e890829c9fe09645be5995d68974e83e150b7b97a86e3e81f12fac003b",
	name: "updateGoalStatus",
	filename: "src/lib/twin.functions.ts"
}, (opts) => updateGoalStatus.__executeServer(opts));
var updateGoalStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	id: string().uuid(),
	status: _enum(STATUSES)
}).parse(input)).handler(updateGoalStatus_createServerFn_handler, async ({ data, context }) => {
	const completed_at = data.status === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : null;
	const { error } = await context.supabase.from("goals").update({
		status: data.status,
		completed_at
	}).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteGoal_createServerFn_handler = createServerRpc({
	id: "f20edbcbf797b44524f5ee16631807274f08296b7aa6640f6c71c5e2ab88de5d",
	name: "deleteGoal",
	filename: "src/lib/twin.functions.ts"
}, (opts) => deleteGoal.__executeServer(opts));
var deleteGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ id: string().uuid() }).parse(input)).handler(deleteGoal_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("goals").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var listHabits_createServerFn_handler = createServerRpc({
	id: "c47aa9046e8cbb074cf6e5d528544ebca46ba34382ae65700edd62fcb95643b7",
	name: "listHabits",
	filename: "src/lib/twin.functions.ts"
}, (opts) => listHabits.__executeServer(opts));
var listHabits = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listHabits_createServerFn_handler, async ({ context }) => {
	const start = /* @__PURE__ */ new Date(/* @__PURE__ */ new Date());
	start.setDate(start.getDate() - 29);
	const startStr = start.toISOString().slice(0, 10);
	const [{ data: habits, error: he }, { data: logs, error: le }] = await Promise.all([context.supabase.from("habits").select("*").eq("archived", false).order("created_at", { ascending: true }), context.supabase.from("habit_logs").select("habit_id,log_date,completed").gte("log_date", startStr)]);
	if (he) throw new Error(he.message);
	if (le) throw new Error(le.message);
	return {
		habits: habits ?? [],
		logs: logs ?? []
	};
});
var createHabit_createServerFn_handler = createServerRpc({
	id: "2785022196a5ecea58733d30495aebb0de179db3038aa0586b00d197fad66ad2",
	name: "createHabit",
	filename: "src/lib/twin.functions.ts"
}, (opts) => createHabit.__executeServer(opts));
var createHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	name: string().min(1).max(120),
	description: string().default(""),
	frequency: _enum(["daily", "weekly"]),
	target_per_period: number().int().min(1).max(50)
}).parse(input)).handler(createHabit_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("habits").insert({
		...data,
		user_id: context.userId
	}).select().single();
	if (error) throw new Error(error.message);
	return row;
});
var toggleHabitLog_createServerFn_handler = createServerRpc({
	id: "2787a68da8615dffb711e93f57c10989f5b84553964e0cb27cad99ece47d5e46",
	name: "toggleHabitLog",
	filename: "src/lib/twin.functions.ts"
}, (opts) => toggleHabitLog.__executeServer(opts));
var toggleHabitLog = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	habitId: string().uuid(),
	date: string(),
	completed: boolean()
}).parse(input)).handler(toggleHabitLog_createServerFn_handler, async ({ data, context }) => {
	if (data.completed) {
		const { error } = await context.supabase.from("habit_logs").upsert({
			habit_id: data.habitId,
			user_id: context.userId,
			log_date: data.date,
			completed: true
		}, { onConflict: "habit_id,log_date" });
		if (error) throw new Error(error.message);
	} else {
		const { error } = await context.supabase.from("habit_logs").delete().eq("habit_id", data.habitId).eq("log_date", data.date);
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
var archiveHabit_createServerFn_handler = createServerRpc({
	id: "12d6f1282bc05f16913abf1ed92ebb4b1377dbaaf099dd23e07f3f6db2574c64",
	name: "archiveHabit",
	filename: "src/lib/twin.functions.ts"
}, (opts) => archiveHabit.__executeServer(opts));
var archiveHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ id: string().uuid() }).parse(input)).handler(archiveHabit_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("habits").update({ archived: true }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { archiveHabit_createServerFn_handler, createGoal_createServerFn_handler, createHabit_createServerFn_handler, createThread_createServerFn_handler, deleteGoal_createServerFn_handler, deleteThread_createServerFn_handler, getIdentity_createServerFn_handler, getThreadMessages_createServerFn_handler, listGoals_createServerFn_handler, listHabits_createServerFn_handler, listThreads_createServerFn_handler, renameThread_createServerFn_handler, saveIdentity_createServerFn_handler, toggleHabitLog_createServerFn_handler, updateGoalStatus_createServerFn_handler };
