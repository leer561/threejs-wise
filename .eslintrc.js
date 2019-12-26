module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		node: true
	},
	//解析器用babel-eslint，对Babel解析器的包装使其与 ESLint 兼容
	"parser": "babel-eslint",
	//启用eslint一系列核心规则
	"extends": "eslint:recommended",
	"parserOptions": {
		//支持ECMAScript 模块
		"sourceType": "module",
		//ES6 语法
		"ecmaVersion": 10,
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true,
			"arrowFunctions": true,
			"classes": true,
			"modules": true,
			"defaultParams": true
		}

	},
	//定义全局变量
	"globals": {
		"React": true,
		"useState": true,
		"useEffect": true,
		"useContext": true,
		"useReducer": true
	},
	//需要 eslint-plugin-html 来支持提取并检验 .vue 文件中的 JavaScript
	"plugins": [
		"react",
		"react-hooks",
		"html"
	],
	"settings": {
		"react": {
			"createClass": "createReactClass", // Regex for Component Factory to use,
											   // default to "createReactClass"
			"pragma": "React",  // Pragma to use, default to "React"
			"version": "detect", // React version. "detect" automatically picks the version you have installed.
								 // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
		}
	},
	"rules": {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/no-unused-state": 1,
		"react/prop-types": 0,
		"react/jsx-filename-extension": [1, {
			"extensions": [".js", ".jsx"]
		}],
		"react/jsx-uses-react": 1, //防止反应被错误地标记为未使用
		"react/jsx-uses-vars": 2, //防止在JSX中使用的变量被错误地标记为未使用
		//禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
		"semi": [2, 'never'],
		//允许箭头函数参数不使用（）
		"arrow-parens": 0,
		//console发警告
		"no-console": 1,
		//未定义，给出警告
		"no-undef": 1,
		//空格和缩进可以混合
		"no-mixed-spaces-and-tabs": 0,
		//允许空白
		"no-irregular-whitespace": 0,
		//禁用一元操作符 ++ 和 --,允许在 for 循环的最后一个表达式中使用 ++ 和 --
		"no-plusplus": [2, {"allowForLoopAfterthoughts": true}],
		// 定义变量但未使用
		"no-unused-vars": ["warn", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false }]
	}
};
