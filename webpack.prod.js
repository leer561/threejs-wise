const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {

							publicPath: '../'
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader', // Run postcss actions
						options: {
							plugins: function () { // postcss plugins, can be exported to postcss.config.js
								return [
									require('autoprefixer')
								];
							}
						}
					},
					{
						loader: "less-loader",
						options: {
							javascriptEnabled: true
						}
					}
				]
			},
		]
	},
	plugins: [
		// new UglifyJsPlugin({
		// 	sourceMap: true
		// }),
		new webpack.DllReferencePlugin({
			context: __dirname,    // manifest中请求的上下文（即依赖的相对路径）
			manifest: require('./dist/dll/vendor-manifest.json')
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[id].[hash].css'
		})
	]
})
