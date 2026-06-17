//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Xk-zVyWk.js
var manifest = {
	"07f3449a444310d728048259c111d5fe3aecd768946abe5658c4208303748c60": {
		functionName: "createGoal_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"0d2549449508024712da02f0f24e7389792bb673123ee73a2fefac9d13783bf8": {
		functionName: "getIdentity_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"12d6f1282bc05f16913abf1ed92ebb4b1377dbaaf099dd23e07f3f6db2574c64": {
		functionName: "archiveHabit_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"20288aca116de9d525d8d95822da61e4ca2ee5a6ce03f2c41c3ebd72a533c111": {
		functionName: "saveIdentity_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"2785022196a5ecea58733d30495aebb0de179db3038aa0586b00d197fad66ad2": {
		functionName: "createHabit_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"2787a68da8615dffb711e93f57c10989f5b84553964e0cb27cad99ece47d5e46": {
		functionName: "toggleHabitLog_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"2f5f22b7c9b23444979ebe6939ab333ec49b7df691c4fc4638ed4f5c8d1bd2e7": {
		functionName: "createThread_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"46b7db37a5a2ff29888ba019b901362c18a03ef00fecbce4488acca8edde3975": {
		functionName: "renameThread_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"55355d48deb537ef11a430f46ba5854523b8aa0242b8ee75195d988831d89da7": {
		functionName: "listThreads_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"815453d203af0acd85313797d05ed0d9696d3f1444ca305b8d947b4526dc3557": {
		functionName: "deleteThread_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"c47aa9046e8cbb074cf6e5d528544ebca46ba34382ae65700edd62fcb95643b7": {
		functionName: "listHabits_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"ca15c0099126c802f15417e782ed732c2b03e4306c206bd8ab4e1b3fd2d83751": {
		functionName: "getThreadMessages_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"db7343e890829c9fe09645be5995d68974e83e150b7b97a86e3e81f12fac003b": {
		functionName: "updateGoalStatus_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"f137f48f5f8ca0d4d8f6a3426c2f060073f561b454359aed6bcaac37f5455e34": {
		functionName: "listGoals_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	},
	"f20edbcbf797b44524f5ee16631807274f08296b7aa6640f6c71c5e2ab88de5d": {
		functionName: "deleteGoal_createServerFn_handler",
		importer: () => import("./_ssr/twin.functions-XXh5geiy.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
