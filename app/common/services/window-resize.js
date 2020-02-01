// 调整分辨率的方法

const onWindowResize = (camera,renderer) => {
	const {innerWidth,innerHeight} = window
	camera.aspect = innerWidth / innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(innerWidth, innerHeight)
}

export {onWindowResize}
