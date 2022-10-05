<template>
	<el-container class="h-full g-dark">
		<el-header class="header">
			<div class="flex justify-between">
				<div class="flex">
					<router-link
						v-for="menu in headerMenus"
						:key="menu.path"
						:to="menu.path"
						class="menu-item cursor-pointer"
						>{{ menu.title }}</router-link
					>
				</div>
				<div class="states" v-show="userName">欢迎👏 {{ userName }}</div>
			</div>
		</el-header>
		<el-main class="p-0">
			<router-view v-slot="{ Component }">
				<transition name="el-fade-in-linear" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</el-main>
	</el-container>
</template>
<script setup>
/*
 * import { mapGetters } from "vuex";
 * export default {
 *  computed: {
 *    ...mapGetters(["userName"]),
 *  },
 * };
 */
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
// 从store中获取userName
const userName = computed(() => store.getters.userName);
// 菜单栏变量
const headerMenus = ref([
	{
		title: "首页",
		path: "/"
	},
	{
		title: "关于",
		path: "/about"
	},
	{
		title: "child",
		path: "/child"
	}
]);
// 添加菜单
// headerMenus.value.push()
</script>
<style scoped lang="scss">
.header {
	border-bottom: 1px solid rgba(248, 250, 252, 0.06);
}
</style>
