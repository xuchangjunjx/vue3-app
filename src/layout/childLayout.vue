<template>
	<el-container class="h-full">
		<el-aside width="200px" class="aside p-12">
			<div v-for="menu in sideMenus" :key="menu.path">
				<router-link :to="menu.path" class="menu-item cursor-pointer">{{
					menu.title
				}}</router-link>
			</div>
		</el-aside>
		<el-container>
			<el-main class="p-12">
				<router-view v-slot="{ Component }">
					<transition name="el-fade-in-linear" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<script setup>
import { ref } from "vue";
const sideMenus = ref([
	{
		title: "子路由1",
		path: "/child/page1"
	},
	{
		title: "子路由2",
		path: "/child/page2"
	}
]);
</script>
<style lang="scss" scoped>
.aside {
	border-right: 1px solid rgba(248, 250, 252, 0.06);
	& > div {
		padding: 8px 0;
		margin-bottom: 8px;
		color: rgb(226, 232, 240);
		&:hover {
			// background: rgb(56, 189, 248);
			color: rgb(56, 189, 248);
		}
	}
}
</style>
