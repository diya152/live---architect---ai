import { o as __toESM } from "../_runtime.mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Xk-zVyWk.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Q as _enum, dt as object, mt as string, nt as array, rt as boolean, ut as number } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/twin.functions-DIQLNhi0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listThreads = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("55355d48deb537ef11a430f46ba5854523b8aa0242b8ee75195d988831d89da7"));
var createThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ title: string().optional() }).parse(input)).handler(createSsrRpc("2f5f22b7c9b23444979ebe6939ab333ec49b7df691c4fc4638ed4f5c8d1bd2e7"));
var renameThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	id: string().uuid(),
	title: string().min(1).max(120)
}).parse(input)).handler(createSsrRpc("46b7db37a5a2ff29888ba019b901362c18a03ef00fecbce4488acca8edde3975"));
var deleteThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ id: string().uuid() }).parse(input)).handler(createSsrRpc("815453d203af0acd85313797d05ed0d9696d3f1444ca305b8d947b4526dc3557"));
var getThreadMessages = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ threadId: string().uuid() }).parse(input)).handler(createSsrRpc("ca15c0099126c802f15417e782ed732c2b03e4306c206bd8ab4e1b3fd2d83751"));
var identitySchema = object({
	mission: string(),
	vision: string(),
	beliefs: string(),
	personality: string(),
	values_list: array(string()),
	strengths: array(string()),
	weaknesses: array(string())
});
var getIdentity = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("0d2549449508024712da02f0f24e7389792bb673123ee73a2fefac9d13783bf8"));
var saveIdentity = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => identitySchema.parse(input)).handler(createSsrRpc("20288aca116de9d525d8d95822da61e4ca2ee5a6ce03f2c41c3ebd72a533c111"));
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
var listGoals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("f137f48f5f8ca0d4d8f6a3426c2f060073f561b454359aed6bcaac37f5455e34"));
var goalInputSchema = object({
	title: string().min(1).max(200),
	description: string().default(""),
	horizon: _enum(HORIZONS),
	priority: number().int().min(1).max(5),
	impact: number().int().min(1).max(5),
	difficulty: number().int().min(1).max(5),
	due_date: string().nullable().optional()
});
var createGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => goalInputSchema.parse(input)).handler(createSsrRpc("07f3449a444310d728048259c111d5fe3aecd768946abe5658c4208303748c60"));
var updateGoalStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	id: string().uuid(),
	status: _enum(STATUSES)
}).parse(input)).handler(createSsrRpc("db7343e890829c9fe09645be5995d68974e83e150b7b97a86e3e81f12fac003b"));
var deleteGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ id: string().uuid() }).parse(input)).handler(createSsrRpc("f20edbcbf797b44524f5ee16631807274f08296b7aa6640f6c71c5e2ab88de5d"));
var listHabits = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("c47aa9046e8cbb074cf6e5d528544ebca46ba34382ae65700edd62fcb95643b7"));
var createHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	name: string().min(1).max(120),
	description: string().default(""),
	frequency: _enum(["daily", "weekly"]),
	target_per_period: number().int().min(1).max(50)
}).parse(input)).handler(createSsrRpc("2785022196a5ecea58733d30495aebb0de179db3038aa0586b00d197fad66ad2"));
var toggleHabitLog = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({
	habitId: string().uuid(),
	date: string(),
	completed: boolean()
}).parse(input)).handler(createSsrRpc("2787a68da8615dffb711e93f57c10989f5b84553964e0cb27cad99ece47d5e46"));
var archiveHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => object({ id: string().uuid() }).parse(input)).handler(createSsrRpc("12d6f1282bc05f16913abf1ed92ebb4b1377dbaaf099dd23e07f3f6db2574c64"));
//#endregion
export { deleteGoal as a, getThreadMessages as c, listThreads as d, renameThread as f, useServerFn as g, updateGoalStatus as h, createThread as i, listGoals as l, toggleHabitLog as m, createGoal as n, deleteThread as o, saveIdentity as p, createHabit as r, getIdentity as s, archiveHabit as t, listHabits as u };
