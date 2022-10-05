<template>
	<div class="main-container">
		<router-view v-slot="{ Component }">
			<transition name="el-fade-in-linear" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>
<style lang="scss" scoped>
.main-container {
	height: 100vh;
}
</style>
