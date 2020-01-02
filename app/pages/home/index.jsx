import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

// 渲染分组
import {glassMoulding} from "./util"

// 模型与材质
import car from '../../assets/models/envix.fbx'
import car1 from '../../assets/models/envix1.fbx'

import Tire_Road_A_c from '../../assets/models/Tire_Road_A_c.png'
import Glass_G from '../../assets/models/Glass_G.png'
import Tire_Road_A_nm from '../../assets/models/Tire_Road_A_nm.png'
import Glass from '../../assets/models/Glass.png'

const Home = () => {
	const mainCanvas = useRef()
	let renderer, scene, camera, stats,controls,light

	const animate = () => {
		requestAnimationFrame(animate)
		// 获取摄像机的位置
		const cameraPosition = controls.object.position
		// 设置光源位置
		light.position.set(cameraPosition.x, 300, cameraPosition.z)
		renderer.render(scene, camera)
		//controls.update()
		stats.update()
	}

	// 挂载后
	useEffect(() => {
		const container = document.createElement('div')
		document.body.appendChild(container)
		stats = new Stats()
		container.appendChild(stats.dom)
		// 设置宽高
		const width = window.innerWidth
		const height = window.innerHeight
		mainCanvas.current.width = window.innerWidth
		mainCanvas.current.height = window.innerHeight

		renderer = new THREE.WebGLRenderer({
			canvas: mainCanvas.current,
			antialias: true,              //抗锯齿
		})
		renderer.shadowMap.enabled = true // 设置是否开启投影, 开启的话, 光照会产生投影
		renderer.shadowMap.type = THREE.PCFSoftShadowMap  // 设置投影类型, 这边的柔和投影
		renderer.setClearColor(0x777777) // black

		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xa0a0a0)
		scene.fog = new THREE.Fog(0xa0a0a0, 200, 3500)

		// ground
		const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(3500, 3500), new THREE.MeshPhongMaterial({
			color: 0x999999,
			depthWrite: false
		}))
		mesh.rotation.x = -Math.PI / 2
		mesh.receiveShadow = true
		scene.add(mesh)

		camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 3000)
		camera.position.set(1100, 300, 100)

		//
		const light1 = new THREE.HemisphereLight(0xffffff, 0x000000, 0.4)
		const helper = new THREE.HemisphereLightHelper(light1, 5)
		scene.add(light1)

		light = new THREE.DirectionalLight(0xF5F5F5,0.7)
		light.position.set(100, 300, 0)
		light.castShadow = true
		light.shadow.camera.top = 50
		light.shadow.camera.bottom = -80
		light.shadow.camera.left = -250
		light.shadow.camera.right = 250
		light.shadow.camera.near = 0
		light.shadow.camera.far = 200
		const helper1 = new THREE.DirectionalLightHelper(light, 5)
		scene.add(light)
		//scene.add(helper1)
		const helper12= new THREE.CameraHelper(light.shadow.camera )
		//scene.add(helper12)

		const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000)
		grid.material.opacity = 0.2
		grid.material.transparent = true
		scene.add(grid)

		controls = new OrbitControls(camera, renderer.domElement)
		controls.target.set(0, 12, 0)
		controls.update()

		// model
		const loader = new FBXLoader()
		loader.load(car, object => {
			console.log('object', object)
			// 处理窗户镀铬
			const {children} = object
			for (let obj of children) {
				console.log('obj', obj)
				if (glassMoulding[obj.name]) {
					// 处理窗户装饰条

				}
			}
			scene.add(object)
			animate()
		})

		renderer.render(scene, camera)
	}, [])
	return (
		<canvas ref={mainCanvas} id="mainCanvas"/>
	)
}

export default Home
