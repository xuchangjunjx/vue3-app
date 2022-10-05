<template>
	<div class="home">
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<el-button type="primary">hello</el-button>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "HomeView",
	components: {
		HelloWorld
	}
};
</script>
