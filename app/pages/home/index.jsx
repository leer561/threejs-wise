import Stats from 'three/examples/jsm/libs/stats.module.js'

import {OutLook} from './components/out-look'
import {Trim} from "./components/trim"
import {ShowCar} from "./components/show-car"

// 首页组件
const Home = () => {
	// 全局变量 供渲染函数使用
	let renderData = {
		car: null,
		trim: null,
		stats: null
	}

	const carTrim = useRef()

	// 绘图cancans变量切换
	const [front, setFront] = useState(true)

	// 共同渲染函数
	const render = () => {
		requestAnimationFrame(render)
		const {car, trim, stats} = renderData
		const time = -performance.now() / 1000

		// 车辆部分
		if (car) {
			const {grid, renderer, scene, camera, wheels,controls} = car
			controls.update()
			//console.log('scene',scene)
			// if(scene.environment){
			// 	console.log('controls.getAzimuthalAngle()',controls.getAzimuthalAngle())
			// 	console.log('controls.getPolarAngle()',controls.getPolarAngle())
			// 	scene.environment.rotation = controls.getAzimuthalAngle()
			// }
			grid.position.z = (time) % 5
			renderer.render(scene, camera)
			// 车轮部分
			// if (wheels) {
			// 	const wheelsLength = wheels.length
			// 	for (let i = 0; i < wheelsLength; i++) {
			// 		wheels[i].rotation.x = -(time * Math.PI)
			// 	}
			// }
		}
		if(stats){
			stats.update()
		}

		if (trim) {
			const {controlsTrim,sceneTrim,cameraTrim,rendererTrim} = trim
			controlsTrim.update() // required when damping is enabled
			rendererTrim.render(sceneTrim, cameraTrim)
		}
	}

	// 设置全局变量
	const setRender = data => renderData[data.name] = data.value

	// 初始化
	const init = () => {
		const container = document.createElement('div')
		document.body.appendChild(container)
		renderData.stats = new Stats()
		container.appendChild(renderData.stats.dom)
		render()
	}

	// 挂载后
	useEffect(() => {
		init()
	}, [carTrim])

	return (
		<div>
			<OutLook switchFunc={() => setFront(false)} front={front ? 'block' : 'none'}
					 setRender={data => setRender(data)}
					 trimInit = {()=>carTrim.current.init()}
			/>
			<Trim front={front ? 'none' : 'block'} ref={carTrim} setRender={data => setRender(data)}/>
			<ShowCar front={front ? 'none' : 'block'} switchFunc={() => setFront(true)}/>
		</div>
	)
}

export default Home
