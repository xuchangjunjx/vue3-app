<template>
	<div class="codeedit">
		<div class="tool" v-if="showType">
			<span
				@click="changType('yaml')"
				:class="{ active: type.value === 'yaml' }"
				>yaml</span
			>
			<span style="padding: 0 2px">/</span>
			<span
				@click="changType('json')"
				:class="{ active: type.value === 'json' }"
				>json</span
			>
		</div>
		<div class="tool" v-else>
			<span class="active">{{ props.mode }}</span>
		</div>
		<textarea id="code" name="code"></textarea>
	</div>
</template>
<script setup>
import CodeMirror, { jsonFormat, getMode, foldCode } from "./codemirror";
import yaml from "js-yaml";
import { computed, onMounted, ref, watch, toRaw } from "vue";
// 定义组件的属性
const props = defineProps({
	code: [Object, String],
	mode: String,
	readonly: [Boolean, String],
	// 是否展示类型
	showType: {
		default: true,
		type: Boolean
	},
	// 被选中的数据
	selections: {
		type: Array
	},
	// 被标记的数据
	markTexts: {
		type: Array
	},
	// 滚动到第几行
	scrollIntoViews: {
		type: Number
	}
});
let type = ref("");
// 当前编辑器实例
let editor = ref(null);
// 方法
const getSource = () => {
	let obj = editor.value.getValue();
	try {
		if (props.mode === "json") {
			obj = JSON.parse(obj);
		} else if (props.mode === "yaml") {
			obj = yaml.load(obj);
		}
	} catch (error) {
		return null;
	}
	return obj;
};

// yaml转json
const dump = obj => {
	return yaml.dump(obj);
};
// 折叠一些不想要的关键词
const foldCodeKeys = (keys = ["managedFields", "status"]) => {
	foldCode(toRaw(editor.value), keys);
};
// 切换显示格式
const changType = newType => {
	if (type.value == newType) {
		return;
	}
	type.value = newType;
	let mode = null;
	let code = toRaw(editor.value).getValue();
	try {
		if (type.value === "json") {
			// code =;
			code = jsonFormat(yaml.load(code));
			mode = "application/json";
		} else if (type.value === "yaml") {
			let cd = JSON.parse(code);
			code = dump(cd);
			mode = "text/x-yaml";
		}
	} catch (error) {
		console.error(error);
		return;
	}

	if (code) {
		toRaw(editor.value).setOption("mode", mode);
		toRaw(editor.value).setValue(code);
	}
};
const createMessgae = message => {
	var msg = document.createElement("div");
	var icon = msg.appendChild(document.createElement("span"));
	icon.innerHTML = "error: ";
	icon.className = "lint-error-icon";
	msg.appendChild(document.createTextNode(message));
	msg.className = "lint-error";
	return msg;
};
// 给指定位置打标记
const markText = (marks, cmp) => {
	// console.log(marks);

	let cm = toRaw(cmp.value);
	for (let mark of marks) {
		cm.doc.markText(
			{
				line: mark.startLine - 1,
				ch: mark.startOffset
			},
			{
				line: mark.endLine - 1,
				ch: mark.endOffset
			},
			{
				className: "markText",
				attributes: {
					title: mark.title
				}
			}
		);
		cm.doc.addLineWidget(mark.startLine - 1, createMessgae(mark.title), {
			coverGutter: false,
			noHScroll: true
		});
	}
};
// 选中指定数据
const setSelection = (selections, editor) => {
	let cm = toRaw(editor.value);
	for (let selection of selections) {
		cm.doc.setSelection(
			{
				line: selection.startLine - 1,
				ch: selection.startOffset || 0
			},
			{
				line: selection.endLine - 1,
				ch: selection.endOffset || 0
			}
		);
	}
};
// 编辑器初始化
const initEditor = () => {
	let options = {
		// mode: "javascript",
		mode: { name: getMode(props.mode), globalVars: true },
		lineNumbers: true,
		lineWrapping: true,
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"],
		theme: "yaml",
		tabSize: 4,
		readOnly: props.readonly
	};
	editor.value = CodeMirror.fromTextArea(
		document.getElementById("code"),
		options
	);
	// 代码提示
	editor.value.on("keydown", (cm, event) => {
		// console.log("event.keyCode", event.keyCode);
		if (event.keyCode <= 90 && event.keyCode >= 65) {
			setTimeout(function () {
				if (!cm.state.completionActive) cm.showHint({ completeSingle: false });
			}, 100);
		}
	});
	// 初始化赋值
	if (props.code) {
		if (typeof props.code === "object") {
			toRaw(editor.value).setValue(jsonFormat(props.code));
		} else {
			toRaw(editor.value).setValue(props.code);
		}
	}
	// 初始化选中
	if (props.selections) {
		setSelection(props.selections, editor);
	}
	// 初始化标记
	if (props.markTexts) {
		markText(props.markTexts, editor);
	}
	// 滚动到指定行
	if (props.scrollIntoViews) {
		toRaw(editor.value).scrollIntoView(
			{ line: props.scrollIntoViews, ch: 5 },
			200
		);
	}
	// 监听数据变化
	editor.value.on("change", (ins, obj) => {
		// console.log(`on change`);
		if (obj.origin == "setValue") {
			if (props.selections) {
				setSelection(props.selections, editor);
			}
			if (props.markTexts) {
				markText(props.markTexts, editor);
			}
			if (props.scrollIntoViews) {
				toRaw(editor.value).scrollIntoView(
					{ line: props.scrollIntoViews, ch: 5 },
					200
				);
			}
			foldCodeKeys();
		}
	});
};
// 挂载后初始化编辑器
onMounted(() => {
	initEditor();
});
// 监听编辑器属性变化
watch(
	() => props.code,
	(code, oldCode) => {
		console.log("wathc ", code);
		if (code) {
			if (typeof props.code === "object") {
				let trueRaw = toRaw(editor.value);
				trueRaw.setValue(jsonFormat(code));
			} else {
				let trueRaw = toRaw(editor.value);
				trueRaw.setValue(code);
			}
		}
	}
);
// 暴露出方法
defineExpose({
	getSource
});
</script>
