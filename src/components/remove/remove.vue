<template>
	<el-dialog
		class="removeDialog"
		v-model="state.visiable"
		:width="428"
		:before-close="handleCancel"
		destroy-on-close
	>
		<template #header>
			<div>
				<i class="el-icon-error"></i>
				{{ `确认删除${state.title}?` }}
			</div>
		</template>
		<div class="content">
			<div>
				确定删除{{ state.title }}<span class="bold">{{ state.value }}</span> ?
				{{ state.title }}删除后将无法恢复
			</div>
			<div style="margin-bottom: 8px">
				请输入<span class="bold">{{ state.value }}</span>
				并确保您已了解操作所带来的风险
			</div>
			<el-input :placeholder="`请输入${currentValue}`" v-model="inputValue" />
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button round @click="handleCancel">取 消</el-button>
				<el-button round :disabled="!disabled" type="primary" @click="submit"
					>确 定</el-button
				>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { computed, reactive, ref } from "vue";

const state = reactive({
	title: "",
	visiable: false,
	value: "",
	onOk: () => {}
});
const inputValue = ref("");
const handleCancel = () => {
	state.visiable = false;
	resetState();
};

const submit = () => {
	state.visiable = false;
	state.onOk(state.value);
	resetState();
};

let currentValue = computed(() => state.value);
// 如果输入框中的值不等于期望值 则禁用按钮
let disabled = computed(() => inputValue.value === state.value);

const setState = opt => {
	state.title = opt.title ?? "";
	state.visiable = true;
	state.value = opt.value ?? "";
	state.onOk = opt.onOk ?? function () {};
};

const resetState = () => {
	inputValue.value = "";
	state.title = "";
	state.value = "";
	state.onOk = () => {};
};
// 通过defineExpose暴露出方法 给外部调用
defineExpose({
	setState
});
</script>

<style lang="scss">
.removeDialog {
	border-radius: 6px;
	& > .el-dialog__header {
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		padding: 12px;
		padding-bottom: 0;
		font-size: 14px;
		font-weight: normal;
		color: #ec4561;
		& > .el-dialog__headerbtn {
			top: 12px;
			width: 24px;
			height: 24px;
			margin-right: 8px;
			.el-dialog__close {
				color: #ec4561;
			}
		}
	}
	& > .el-dialog__body {
		padding: 12px;
	}
	& > .el-dialog__footer {
		padding: 12px;
		background-color: #eff4f9;
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
	}

	.content {
		background-color: #f9fbfd;
		padding: 12px;
		font-size: 14px;
		line-height: 1.67;
		color: #5f708a;
	}
	.el-input {
		font-size: 12px;
	}
	.bold {
		font-weight: 500;
		color: #000;
	}
}
</style>
