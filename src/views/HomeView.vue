<template>
	<div class="home">
		<el-button type="danger" @click="removeConfirm">删除确认</el-button>
	</div>
</template>

<script setup>
// import HelloWorld from "@/components/HelloWorld.vue";
// 先获取实例
import { getCurrentInstance } from "vue";
// 拿到proxy
const { proxy } = getCurrentInstance();
const handleDelete = row => {
	console.log(row);
};
const removeConfirm = () => {
	console.log(proxy);
	// 调用$remove
	proxy.$remove({
		title: "用户",
		value: "12345",
		onOk: () => handleDelete(12345)
	});
};
</script>
