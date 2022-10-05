import { getCurrentInstance } from "vue";
// 简化获取global属性
export default () => {
	const { proxy } = getCurrentInstance();
	return proxy;
};
