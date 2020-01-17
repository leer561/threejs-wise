import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {Interaction} from 'three.interaction'

// 渲染分组
import {touchParts, glassMoulding, carBody, carGlass, whiteParts, grayParts, carWheels, carTire, carLight, grayWhiteParts} from "./util"

// 模型与材质
import car from '../../assets/models/envix.fbx'
import car1 from '../../assets/models/envix1.FBX'

import Tire_Road_A_c from '../../assets/models/Tire_Road_A_c.png'
import Glass_G from '../../assets/models/Glass_G.png'
import Tire_Road_A_nm from '../../assets/models/Tire_Road_A_nm.png'
import Glass from '../../assets/models/Glass.png'
import quarry_01_1k from '../../assets/images/quarry_01_1k.hdr'
import Ground from '../../assets/images/ground.jpg'
import shadowImage from '../../assets/images/ferrari_ao.png'

import JFC_Tire from '../../assets/models/JFC_Tire.jpg'

import LightOff from '../../assets/models/light_off.png'
import LightOn from '../../assets/models/light_on.png'

// gltf模型载入
import carGltf from '../../assets/gltf/gltf.gltf'
import fltfBin from '../../assets/gltf/gltf.bin'
import Glass_baseColor from '../../assets/gltf/Glass_baseColor.png'
import Tire_baseColor from '../../assets/gltf/Tire_baseColor.png'
import light_baseColor from '../../assets/gltf/light_baseColor.png'

// 内饰纹理数据
import front01 from '../../assets/images/trim/front01.png'
import front02 from '../../assets/images/trim/front02.png'
import front03 from '../../assets/images/trim/front03.png'
import front04 from '../../assets/images/trim/front04.png'
import front05 from '../../assets/images/trim/front05.png'
import front06 from '../../assets/images/trim/front06.png'

// 可触发物件
import flare from '../../assets/images/flare.png'
import dot_orange from '../../assets/images/dot_orange.png'

import materialsLib from './material'

import {LeftDoorAnimate} from './left-door'
// 加载器
const textureLoader = new THREE.TextureLoader()
const clock = new THREE.Clock()
// 首页组件
const Home = () => {
	// 外观绘图
	const mainCanvas = useRef()
	const trimCanvas = useRef()
	// 绘图cancans变量切换
	const [front, setFront] = useState('block')
	const [trim, setTrim] = useState('none')

	// 车辆全局场景
	let renderer, scene, camera, stats, controls, envMap, grid, car

	// 内饰全局场景
	let rendererTrim, sceneTrim, cameraTrim, controlsTrim,trimCube
	// 动画需要变量
	let leftDoorAnimate, group
	// 车辆部件
	const carParts = {
		body: [],
		rims: [],
		glass: [],
		glassMoulding: [],
		wheels: [],
		tire: [],
		lights: [],
		leftDoor: [],
		trunk: []
	}

	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	const render = () => {
		requestAnimationFrame(render)
		const time = -performance.now() / 1000
		// camera.position.x = 5
		// camera.position.y = 1.5
		// camera.position.z = 3
		// camera.lookAt(0, 0.5, 0)

		for (let i = 0; i < carParts.wheels.length; i++) {
			carParts.wheels[i].rotation.x = -(time * Math.PI)
		}

		grid.position.z = (time) % 5
		renderer.render(scene, camera)
		stats.update()

		if(controlsTrim){
			controlsTrim.update() // required when damping is enabled
			rendererTrim.render( sceneTrim, cameraTrim )
		}
	}

	// 渲染车辆
	const updateMaterials = () => {
		// const bodyMat = materialsLib.main[4]
		// const glassMouldingMat = materialsLib.glassMoulding[0]
		//
		// carParts.body.forEach(part => part.material = bodyMat)
		// carParts.glassMoulding.forEach(part => part.material = glassMouldingMat)
	}

	// 增加车轮纹理
	const materialWheels = () => {
		textureLoader.load(JFC_Tire, texture => {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping
			//texture.repeat = THREE.RepeatWrapping
			// 载入另一个凹凸纹理
			const mat = new THREE.MeshStandardMaterial({
				map: texture,
				color: 0x222222,
				emissive: 0x333333,
				emissiveMap: texture
			})

			//const mat =new THREE.MeshLambertMaterial({color: 0x111111})
			carParts.tire.forEach(part => part.material = mat)
		})
	}

	// 渲染玻璃
	const renderGlass = () => {
		// 渲染玻璃
		carParts.glass.forEach(part => {
			part.material.transparent = true
			part.material.opacity = 0.9
		})
	}

	// 开灯
	const lightOn = () => {
		// 处理尾灯贴图
		// textureLoader.load(LightOn, texture => {
		// 	texture.encoding = THREE.sRGBEncoding
		// 	console.log('carParts.lights.', carParts.lights)
		// 	carParts.lights.forEach(part => part.material.map.image  = texture.image)
		// })
	}

	// 动画处理
	const animated = () => {
		// 找到前门
		group = new THREE.Group()
		// 添加一个父级网格 设置透明
		carParts.leftDoor.forEach(part => {
			//part.material.side = THREE.DoubleSide
			group.add(part)

			// 双面渲染部分
			//if(part)
		})
		car.add(group)
		leftDoorAnimate = new LeftDoorAnimate(group)
		leftDoorAnimate.play(() => {
			setFront('none')
			setTrim('block')
		})
	}

	// 初始化内饰场景
	const initTrim = ()=>{
		if(!trimCube) return
		trimCube.geometry.scale( 1, 1, - 1 )
		rendererTrim = new THREE.WebGLRenderer({canvas: trimCanvas.current})
		rendererTrim.setPixelRatio(window.devicePixelRatio)
		rendererTrim.setSize(window.innerWidth, window.innerHeight)
		//rendererTrim.appendChild(rendererTrim.domElement)

		sceneTrim = new THREE.Scene()

		cameraTrim = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1024 )
		cameraTrim.position.z = 0.01

		controlsTrim = new OrbitControls( cameraTrim, rendererTrim.domElement )
		controlsTrim.enableZoom = false
		controlsTrim.enablePan = false
		controlsTrim.enableDamping = true
		controlsTrim.dampingFactor = 0.1
		controlsTrim.rotateSpeed = - 0.26
		sceneTrim.add( trimCube )

	}

	// 初始化车辆
	const initCar = () => {

		// 车轴材质
		const grayWhiteMat = materialsLib.grayWhiteParts[0]

		const loader = new GLTFLoader()
		loader.load(carGltf, object => {
				console.log('object', object)
				// 处理窗户镀铬
				car = object.scene
				const {children} = car
				for (let obj of children) {

					// 处理增加可碰触物件
					if (obj.name === 'Door_LF_Paint') {
						// 生成可触碰点
						const geometry = new THREE.CircleGeometry(10, 160)
						textureLoader.load(dot_orange, texture => {
							const mat = new THREE.MeshStandardMaterial({
								map: texture,
								transparent: true,
								opacity: 0.99,
								//color:0x37c1b4
							})
							const leftDoorTouch = new THREE.Mesh(geometry, mat)
							obj.add(leftDoorTouch)
							leftDoorTouch.position.set(91, 87, 0)
							leftDoorTouch.rotateY(1.57)
							leftDoorTouch.on('click', function (ev) {
								animated()
							})
						})
					}

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

					// 车灯
					if (carLight[obj.name]) {
						// 添加车身
						carParts.lights.push(obj)
					}

					// 车玻璃
					if (carGlass[obj.name]) {
						// 添加车身
						carParts.glass.push(obj)
					}

					// 灰色偏白色部件
					if (grayWhiteParts[obj.name]) {
						// 添加车身
						obj.material = grayWhiteMat
					}

					// 白色部件
					if (whiteParts[obj.name]) {
						// 添加车身
						//obj.material = materialsLib.whiteParts[0]
					}

					// 灰色部件
					if (grayParts[obj.name]) {
						// 添加车身
						//obj.material = materialsLib.grayParts[0]
					}

					// 车轮部件
					if (carWheels[obj.name]) {
						// 添加车身
						carParts.wheels.push(obj)
					}

					// 车轮胎
					if (carTire[obj.name]) {
						carParts.tire.push(obj)
					}

					// 可动的分组
					if (touchParts[obj.name]) {
						if (touchParts[obj.name] === 'leftDoor') {
							carParts.leftDoor.push(obj)
						} else {
							carParts.trunk.push(obj)
						}
					}

				}
				car.scale.set(0.01, 0.01, 0.01)

				// shadow
				const texture = new THREE.TextureLoader().load(shadowImage)
				const shadow = new THREE.Mesh(
					new THREE.PlaneBufferGeometry(0.61 * 420, 1.4 * 400),
					new THREE.MeshBasicMaterial({
						map: texture, opacity: 0.4, transparent: true
					})
				)
				shadow.rotation.x = -Math.PI / 2
				shadow.renderOrder = 2
				car.add(shadow)

				updateMaterials()
				materialWheels()
				renderGlass()
				// 尾灯
				scene.add(car)
				//animated(object)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded')
			},
			// called when loading has errors
			function (error) {
				console.log('An error happened', error)
			})

	}
	// 初始化渲染内饰
	const initPreTrim = () => {
		const textures = [front04, front02, front01, front06, front03, front05]
		return Promise.all(textures.map(val => {
			//加载图片, 新建材质, 传给下一个步骤.
			return new Promise(resolve => {
				textureLoader.load(val, texture => {
					resolve(new THREE.MeshBasicMaterial({
						map: texture,
						transparent: true,
						opacity: 0.99
					}))
				})
			})
		})).then(function (materials) {
			console.log('materials',materials)
			//将材质贴到正方体的6个面.
			const geometry = new THREE.BoxGeometry(1024, 1024, 1024)
			trimCube = new THREE.Mesh(
				geometry,
				materials
			)
		})
	}

	const init = () => {
		// 状态
		const container = document.createElement('div')
		document.body.appendChild(container)
		stats = new Stats()
		container.appendChild(stats.dom)

		// 相机
		camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200)
		camera.position.set(5, 2.5, 5)
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
		renderer = new THREE.WebGLRenderer({antialias: true, canvas: mainCanvas.current})
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
				envMap = pmremGenerator.fromEquirectangular(texture).texture
				pmremGenerator.dispose()
				scene.background = envMap
				scene.environment = envMap
			})

		// 处理镜头
		controls = new OrbitControls(camera, renderer.domElement)
		controls.maxPolarAngle = Math.PI * 0.5
		controls.minDistance = 1
		controls.maxDistance = 300

		window.addEventListener('resize', onWindowResize, false)

		// 绑定事件处理
		const interaction = new Interaction(renderer, scene, camera)

		// 初始化
		render()
		initCar()
		initPreTrim().then(()=>initTrim())

	}

	// 挂载后
	useEffect(() => {
		init()
	}, [])

	return (
		<div>
			<canvas ref={mainCanvas} style={{display: front}} id="mainCanvas"/>
			<canvas ref={trimCanvas} style={{display: trim}} id="trimCanvas"/>
		</div>
	)
}

export default Home
