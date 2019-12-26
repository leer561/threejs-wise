const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		clientLogLevel: 'debug',
		// proxy: {
		// 	'/api': {
        //         target: 'https://pmsex.foton.com.cn:1183', // 接口的域名
		// 		secure: false,  // 如果是https接口，需要配置这个参数
		// 		changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
		// 		pathRewrite: {'^/api': ''}  // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
		// 	}
		// },
		contentBase: './dist',
		hot: true,
		historyApiFallback: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CircularDependencyPlugin({
			// exclude detection of files based on a RegExp
			exclude: /a\.js|node_modules/,
			// add errors to webpack instead of warnings
			failOnError: true,
			// allow import cycles that include an asyncronous import,
			// e.g. via import(/* webpackMode: "weak" */ './file.js')
			allowAsyncCycles: false,
			// set the current working directory for displaying module paths
			cwd: process.cwd(),
		})
	],
})
