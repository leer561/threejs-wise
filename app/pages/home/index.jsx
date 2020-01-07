import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'

// 渲染分组
import {glassMoulding, carBody,carGlass,whiteParts,grayParts} from "./util"

// 模型与材质
import car from '../../assets/models/envix.fbx'
import car1 from '../../assets/models/envix1.fbx'

import Tire_Road_A_c from '../../assets/models/Tire_Road_A_c.png'
import Glass_G from '../../assets/models/Glass_G.png'
import Tire_Road_A_nm from '../../assets/models/Tire_Road_A_nm.png'
import Glass from '../../assets/models/Glass.png'

import quarry_01_1k from '../../assets/images/quarry_01_1k.hdr'

import Ground from '../../assets/images/ground.jpg'

const Home = () => {
	const materialsLib = {
		main: [
			new THREE.MeshStandardMaterial( {
				color: 0xff4400, metalness: 1.0, roughness: 0.2, name: 'orange'
			} ),
			new THREE.MeshStandardMaterial( {
				color: 0x001166, metalness: 1.0, roughness: 0.2, name: 'blue'
			} ),
			new THREE.MeshStandardMaterial( {
				color: 0x990000, metalness: 1.0, roughness: 0.2, name: 'red'
			} ),
			new THREE.MeshStandardMaterial( {
				color: 0x000000, metalness: 1.0, roughness: 0.4, name: 'black'
			} ),
			new THREE.MeshStandardMaterial( {
				color: 0xfefefe, metalness: 0.2, roughness: 0.2, name: 'white'
			} ),
			new THREE.MeshStandardMaterial( {
				color: 0xffffff, metalness: 1.0, roughness: 0.2, name: 'metallic'
			} ),
		],
		glass: [
			new THREE.MeshPhysicalMaterial( {
				color: 0xffffff, metalness: 1, roughness: 0, transparency: 0.5, transparent: true, name: 'clear'
			} ),
			new THREE.MeshPhysicalMaterial( {
				color: 0x000000, metalness: 1, roughness: 0, transparency: 0.7, transparent: true, name: 'smoked'
			} ),
			new THREE.MeshPhysicalMaterial( {
				color: 0x001133, metalness: 1, roughness: 0, transparency: 0.7, transparent: true, name: 'blue'
			} ),
		],
		glassMoulding: [
			new THREE.MeshStandardMaterial( {
				color: 0xffffff, metalness: 1.0, roughness: 0, name: 'metallic'
			} ),
			new THREE.MeshStandardMaterial( {
				color: 0x000000, metalness: 1.0, roughness: 0.4, name: 'black'
			} )
		],
		whiteParts:[
			new THREE.MeshStandardMaterial( {
				color: 0xeaebf0, metalness: 1.0, roughness: 0.1, name: 'metallic'
			} )
		],
		grayParts:[
			new THREE.MeshStandardMaterial( {
				color: 0x332e32, metalness: 1.0, roughness: 0.1, name: 'metallic'
			} )
		]
	}

	const mainCanvas = useRef()
	// 全局场景
	let renderer, scene, camera, stats, controls, light, grid
	// 车辆部件
	const carParts = {
		body: [],
		rims: [],
		glass: [],
		glassMoulding: [],
		wheels: []
	}

	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	const render = () => {
		const time = -performance.now() / 1000
		camera.position.x = Math.cos(time / 10) * 6
		camera.position.y = 1.5
		camera.position.z = Math.sin(time / 10) * 6
		camera.lookAt(0, 0.5, 0)
		grid.position.z = -(time) % 5
		renderer.render(scene, camera)
		stats.update()
	}

	// 渲染车辆
	const updateMaterials = () => {
		const bodyMat = materialsLib.main[4]
		const glassMouldingMat = materialsLib.glassMoulding[0]
		const glassMat = materialsLib.glass[0]

		carParts.body.forEach( part => part.material = bodyMat )
		carParts.glassMoulding.forEach( part => part.material = glassMouldingMat )
		carParts.glass.forEach(part => part.material = glassMat )
	}

	// 初始化车辆
	const initCar = () => {
		const loader = new FBXLoader()
		loader.load(car, object => {
			console.log('object', object)
			// 处理窗户镀铬
			const {children} = object
			for (let obj of children) {
				console.log('obj', obj)
				// 处理窗户装饰条
				if (glassMoulding[obj.name]) {
					// 处理窗户装饰条
					carParts.glassMoulding.push(obj)
				}

				// 车身
				if (carBody[obj.name]) {
					// 添加车身
					carParts.body.push(obj)
				}

				// 车玻璃
				if (carGlass[obj.name]) {
					// 添加车身
					carParts.glass.push(obj)
				}

				// 白色部件
				if (whiteParts[obj.name]) {
					// 添加车身
					obj.material = materialsLib.whiteParts[0]
				}

				// 灰色部件
				if (grayParts[obj.name]) {
					// 添加车身
					obj.material = materialsLib.grayParts[0]
				}
			}
			object.scale.set(0.01, 0.01, 0.01)
			updateMaterials()
			scene.add(object)
		})

	}


	const init = () => {
		// 状态
		const container = document.createElement('div')
		document.body.appendChild(container)
		stats = new Stats()
		container.appendChild(stats.dom)

		// 相机
		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200)

		// 场景
		scene = new THREE.Scene()
		// scene.fog = new THREE.Fog( 0xd7cbb1, 1, 80 )

		const ground = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(400, 400),
			new THREE.MeshBasicMaterial({color: 0x6e6a62, depthWrite: false})
		)
		ground.rotation.x = -Math.PI / 2
		ground.renderOrder = 1
		scene.add(ground)
		grid = new THREE.GridHelper(400, 80, 0x000000, 0x000000)
		grid.material.opacity = 0.1
		grid.material.depthWrite = false
		grid.material.transparent = true
		scene.add(grid)

		// 渲染器
		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)
		container.appendChild(renderer.domElement)
		renderer.outputEncoding = THREE.sRGBEncoding
		renderer.toneMapping = THREE.ACESFilmicToneMapping

		// 处理器
		const pmremGenerator = new THREE.PMREMGenerator(renderer)
		pmremGenerator.compileEquirectangularShader()
		new RGBELoader()
			.setDataType(THREE.UnsignedByteType)
			.load(quarry_01_1k, function (texture) {
				const envMap = pmremGenerator.fromEquirectangular(texture).texture
				pmremGenerator.dispose()
				scene.background = envMap
				scene.environment = envMap
			})

		window.addEventListener('resize', onWindowResize, false)
		renderer.setAnimationLoop(render)

		// 初始化
		initCar()

	}

	// 挂载后
	useEffect(() => {
		init()
	}, [])
	return (
		<canvas ref={mainCanvas} id="mainCanvas"/>
	)
}

export default Home
