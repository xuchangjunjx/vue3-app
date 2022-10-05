import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
const routes = [
	{
		path: "/",
		component: () => import("@/layout/mainLayout.vue"),
		children: [
			{
				path: "",
				name: "home",
				component: HomeView
			},
			{
				path: "about",
				name: "about",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () =>
					import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
			},
			{
				path: "child",
				component: () => import("@/layout/childLayout.vue"),
				children: [
					{
						path: "",
						redirect: "/child/page1"
					},
					{
						path: "page1",
						name: "child-page1",
						component: () => import("@/views/childs/page1.vue")
					},
					{
						path: "page2",
						name: "child-page2",
						component: () => import("@/views/childs/page2.vue")
					}
				]
			}
		]
	},

	{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
