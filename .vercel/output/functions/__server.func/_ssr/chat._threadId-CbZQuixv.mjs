import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat._threadId-CbZQuixv.js
var $$splitComponentImporter = () => import("./chat._threadId-Bg2zLk44.mjs");
var Route = createFileRoute("/_authenticated/chat/$threadId")({
	head: () => ({ meta: [{ title: "Chat · Digital Twin" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
