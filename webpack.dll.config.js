const webpack = require('webpack')
const path = require('path')
const dependencies = require("./package.json").dependencies
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// 需要独立打包的第三方库，自行添加
const vendor = Object.keys(dependencies)
const dist = path.resolve(process.cwd(), 'dist','dll')
module.exports = {
	mode: 'production',
	entry:{
		vendor
	},

	output:{
		path: dist,      // 路径
		filename: '[name].[hash].js',   // 文件名
		library: '[name]'        // 与打包后的文件的返回值绑定
	},

	plugins:[
		new CleanWebpackPlugin(
			{
				default: ['dist/dll'],
				root: __dirname,       　　　　　　　　　　//根目录
				verbose: true,        　　　　　　　　　　//开启在控制台输出信息
				dry: false        　　　　　　　　　　//启用删除文件
			}
		),
		new webpack.DllPlugin({
			// manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
			context: process.cwd(),

			// manifest.json文件的输出位置
			path: path.join(dist, '[name]-manifest.json'),

			// 定义打包的公共vendor文件对外暴露的函数名
			name: '[name]'
		}),
	]
}
