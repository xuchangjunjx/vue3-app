import { h, render } from "vue";
import confirm from "./remove.vue";

let instance;
// 创建实例
const initInstance = container => {
	const vnode = h(confirm);
	render(vnode, container);
	document.body.appendChild(container.firstElementChild);
	return vnode.component;
};
//  暴露方法
const $remove = opt => {
	if (!instance) {
		let dom = document.createElement("div");
		instance = initInstance(dom);
	}
	// 获取暴露的方法
	const expose = instance.exposed;
	expose.setState(opt);
};

export default {
	install(app) {
		app.config.globalProperties.$remove = $remove;
	}
};
