import { createStore } from "vuex";

export default createStore({
	state: {
		userName: "123456"
	},
	getters: {
		userName: state => state.userName
	},
	mutations: {},
	actions: {},
	modules: {}
});
