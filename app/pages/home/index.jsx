import Stats from 'three/examples/jsm/libs/stats.module.js'

import {OutLook} from './components/out-look'
import {Trim} from "./components/trim"
import {renderData, setRenderData} from "../../common/services/render-data"
// 首页组件
const Home = () => {
	// 全局变量 供渲染函数使用
	let stats

	const carTrim = useRef()

	// 绘图cancans变量切换
	const [front, setFront] = useState(true)

	// 共同渲染函数
	const render = () => {
		requestAnimationFrame(render)
		const {car, trim} = renderData
		const time = -performance.now() / 1000
		console.log('renderData',renderData)
		// 车辆部分
		if (car) {
			console.log('car')
			const {grid, renderer, scene, camera, wheels, controls} = car
			controls.update()
			grid.position.z = (time) % 100
			renderer.render(scene, camera)
			// 车轮部分
			if (wheels) {
				const wheelsLength = wheels.length
				for (let i = 0; i < wheelsLength; i++) {
					wheels[i].rotation.x = -(time * Math.PI)
				}
			}
		}
		if (stats) {
			stats.update()
		}

		if (trim) {
			console.log('trim')
			const {controlsTrim, sceneTrim, cameraTrim, rendererTrim} = trim
			controlsTrim.update() // required when damping is enabled
			rendererTrim.render(sceneTrim, cameraTrim)
		}
	}

	// 初始化
	const init = () => {
		const container = document.createElement('div')
		document.body.appendChild(container)
		stats = new Stats()
		container.appendChild(stats.dom)
		render()
	}

	// 挂载后
	useEffect(() => {
		init()
	}, [carTrim])

	return (
		<div>
			<OutLook switchFunc={() => setFront(false)} front={front ? 'block' : 'none'}
					 trimInit={() => carTrim.current.init()}
			/>
			<Trim front={front ? 'none' : 'block'} ref={carTrim}
				  switchFunc={() => setFront(true)}/>
		</div>
	)
}

export default Home
