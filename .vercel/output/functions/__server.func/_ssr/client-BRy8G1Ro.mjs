import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BRy8G1Ro.js
function createSupabaseClient() {
	return createClient("https://xvtagzxkzhsrmrssmkxd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dGFnenhremhzcm1yc3Nta3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MDg5MTksImV4cCI6MjA5NzI4NDkxOX0.1tngHMAe4FR81lPBymH1wSibDu_K1RKsLSmq1JwK2uo", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
