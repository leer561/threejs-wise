// 提供渲染数据服务
// 不能直接更改，同时渲染浏览器负担太重

const renderData = {
	car: null,
	trim: null,
	cache: {}
}

const setRenderData = data => {
	if (data.name === 'cache') {
		Object.assign(renderData.cache, data.value)
	} else {
		renderData[data.name] = data.value
	}
}
const renderCar = ()=>{
	setRenderData({name:'trim',value:null})
	setRenderData({name:'car',value:renderData.cache.car})
}
const renderTrim = ()=>{
	setRenderData({name:'car',value:null})
	setRenderData({name:'trim',value:renderData.cache.trim})
}
export {renderData, setRenderData,renderCar,renderTrim}
