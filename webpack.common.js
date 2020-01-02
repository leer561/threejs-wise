const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const distDll = path.resolve(process.cwd(), 'dist', 'dll')

module.exports = {
	entry: './app/index.js',
	module: {
		rules: [
			{
				enforce: "pre",
				test:/\.(js|jsx)/,
				loader:'eslint-loader',
				exclude:/node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'models',
							name: '[name].[ext]'
						},
					},
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(fbx|FBX)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'models',
							name: '[name].[ext]'
						},
					},
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
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
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.less', '.css'],
		alias: {
			"@css": require('path').resolve(__dirname, 'app/css'),
			"@common": require('path').resolve(__dirname, 'app/common'),
			"@components": require('path').resolve(__dirname, 'app/components')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'ThreeJS3D渲染',
			template: 'app/index.html',
			inject: 'body'
		}),
		new webpack.DllReferencePlugin({
			context: process.cwd(),
			// dll过程生成的manifest文件
			manifest: require(path.join(distDll, "vendor-manifest.json"))
		}),
		new HtmlWebpackIncludeAssetsPlugin({
			assets: [{
				path: './dll',
				glob: '*.js',
				globPath: path.resolve(__dirname, './dist/dll'),
				files: path.resolve(__dirname, './app/index.html'),
			}],
			append: false
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			useState:['react','useState'],
			useEffect:['react','useEffect'],
			useContext:['react','useContext'],
			useReducer:['react','useReducer'],
			useRef:['react','useRef']
		}),
		new CleanWebpackPlugin(
			{
				cleanOnceBeforeBuildPatterns: ['dist/dll'],　 //匹配删除的文件
				root: __dirname,       　　　　　　　　　　//根目录
				verbose: true,        　　　　　　　　　　//开启在控制台输出信息
				dry: false        　　　　　　　　　　//启用删除文件
			}
		)
	],
	// externals: {
	// 	Txplayer: 'Txplayer'
	// },
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/"
	}
}
