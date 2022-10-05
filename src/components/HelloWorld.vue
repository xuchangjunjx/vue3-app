<template>
	<div>{{ msg }}</div>
</template>
<script>
import { ref } from "vue";
export default {
	setup() {
		const msg = ref("hello");
		return {
			msg
		};
	}
};
</script>
