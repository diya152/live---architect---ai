import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat._threadId-DFZ70Eyf.js
var $$splitComponentImporter = () => import("./chat._threadId-Cy39ORvS.mjs");
var Route = createFileRoute("/_authenticated/chat/$threadId")({
	head: () => ({ meta: [{ title: "Chat · Digital Twin" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
