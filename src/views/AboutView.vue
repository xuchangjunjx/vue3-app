<template>
	<div class="about">
		<div>
			<CodeEdit
				:code="code"
				mode="javascript"
				:show-type="false"
				:scrollIntoViews="50"
				:mark-texts="marks"
				ref="codeEditor"
			></CodeEdit>
		</div>
	</div>
</template>
<script setup>
import CodeEdit from "@/components/codeEdit/codeEdit.vue";
import { ref } from "vue";
let code = ref(`// import "./theme-yaml.less";
import CodeMirror from "codemirror";
// import codemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/foldgutter.css";
// import "codemirror/addon/hint/show-hint.css"
import "./hint-style.scss";
import "./theme-yaml.scss";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/indent-fold";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/search";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";

// language
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/go/go.js";
import "codemirror/mode/yaml/yaml.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

// import codeObj from "./code";

export function jsonFormat(json) {
	return JSON.stringify(json, null, "\t");
}
export function getMode(lang) {
	let mode = "";
	if (lang === "java") {
		mode = "text/x-java";
	} else if (lang === "xml") {
		mode = "application/xml";
	} else if (lang === "js") {
		mode = "application/json";
	} else if (lang === "javascript") {
		mode = "javascript";
	} else if (lang === "vue") {
		mode = "text/x-vue";
	} else if (lang === "less") {
		mode = "text/x-less";
	} else if (lang === "scss") {
		mode = "text/x-scss";
	} else if (lang === "css") {
		mode = "text/css";
	} else if (lang === "html") {
		mode = "text/html";
	} else if (lang === "go") {
		mode = "text/x-go";
	} else if (lang === "yaml") {
		mode = "text/x-yaml";
	} else {
		mode = lang;
	}
	return mode;
}

export function foldCode(editor, keys = ["managedFields", "status"]) {
	let froms = [];
	keys.forEach(key => {
		const cursor = editor.getSearchCursor(key);
		while (cursor.findNext()) {
			froms.push(cursor.from());
		}
	});
	froms = froms
		.filter(from => from && from.line)
		.sort((a, b) => b.line - a.line);
	// console.log("froms", froms);
	froms.forEach(el => {
		editor.foldCode(el);
	});
}
export default CodeMirror;
`);
let codeEditor = ref(null);
let marks = ref([
	{
		startLine: 50,
		startOffset: 1,
		endLine: 50,
		endOffset: 17,
		title: "abcdefg"
	}
]);
//  ??????????????????
const getCode = () => {
	console.log(codeEditor.value.getSource());
};
</script>
