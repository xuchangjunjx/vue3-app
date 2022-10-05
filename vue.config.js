const { defineConfig } = require("@vue/cli-service");
// const AutoImport = require("unplugin-auto-import/webpack");
// const Components = require("unplugin-vue-components/webpack");
// const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "~@/style/variables.scss";`
			}
		}
	},
	chainWebpack: config => {
		// config.plugin("AutoImport").use(AutoImport, [
		// 	{
		// 		resolvers: [ElementPlusResolver()]
		// 	}
		// ]);
		// config.plugin("Components").use(Components, [
		// 	{
		// 		resolvers: [ElementPlusResolver()]
		// 	}
		// ]);
		if (process.env.npm_config_report) {
			config
				.plugin("webpack-bundle-analyzer")
				.use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
		}
	}
});
