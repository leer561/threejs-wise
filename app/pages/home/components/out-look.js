// 车辆外观所用的组件

import * as THREE from "three"
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {Interaction} from "three.interaction"
// 素材
import {onWindowResize} from '../../../common/services/window-resize'
import dot_orange from "../../../assets/images/dot_orange.png"
import venice_sunset_off from '../../../assets/images/venice_sunset_off.hdr'
import venice_sunset_1k from '../../../assets/images/venice_sunset_1k.hdr'
import quarry from '../../../assets/images/quarry_01_1k.hdr'
import quarryOff from '../../../assets/images/quarry_01_1k_off.hdr'
import groundLight from '../../../assets/images/ground-lightmap.png'

// 其他
import {Car} from '../../../common/services/car'
import {LeftDoorAnimate} from './left-door-animate'
import {OutColors} from "./out-colors"
import {LightSwitch} from "./light-switch"

const textureLoader = new THREE.TextureLoader()

const OutLook = ({front, switchFunc, setRender, trimInit}) => {
	// 设置sate
	const [instanceCar, setInstanceCar] = useState(null)
	const [hdrCubeRenderTarget, setHdrCubeRenderTarget] = useState(null)
	const [hdrCubeRenderOffTarget, setHdrCubeRenderOffTarget] = useState(null)
	const [hdrEnvironment, setHdrEnvironment] = useState(null)
	const [hdrEnvironmentOff, setHdrEnvironmentOff] = useState(null)
	const [scene, setScene] = useState(null)
	const [ground, setGround] = useState(null)
	const [lightHolder, setLightHolder] = useState(null)
	// 外观绘图
	const mainCanvas = useRef()

	// 车辆全局场景
	let renderer, camera, controls, grid

	// 预加载环境素材
	const preEnvironmentLoad = (pmremGenerator, scene) => {
		new RGBELoader()
			.setDataType(THREE.UnsignedByteType)
			.load(quarryOff, function (hdrEquirect) {
				setHdrCubeRenderOffTarget(pmremGenerator.fromEquirectangular(hdrEquirect))
				hdrEquirect.dispose()
				pmremGenerator.dispose()
			})
		new RGBELoader()
			.setDataType(THREE.UnsignedByteType)
			.load(venice_sunset_off, function (hdrEquirect) {
				setHdrEnvironmentOff(pmremGenerator.fromEquirectangular(hdrEquirect))
				hdrEquirect.dispose()
				pmremGenerator.dispose()
			})
		// 设置开灯后的灯光射线
		textureLoader.load(groundLight, texture => {
			const geometry = new THREE.PlaneGeometry(512, 512, 10)
			const material = new THREE.MeshBasicMaterial({
				map: texture, transparent: true,
				opacity: 0.3
			})
			const lightHolder = new THREE.Mesh(geometry, material)
			setLightHolder(lightHolder)
			lightHolder.rotation.x = -Math.PI / 2
			lightHolder.visible = false
			scene.add(lightHolder)
		})
	}

	// 初始化
	const init = () => {

		// 相机
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000)
		camera.position.set(60, 20, 40)
		//const helper = new THREE.CameraHelper( camera )
		// 场景
		const scene = new THREE.Scene()
		setScene(scene)
		//scene.add(new THREE.AxesHelper(500))
		//scene.add( helper )

		const ground = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(5000, 5000),
			new THREE.MeshBasicMaterial( { color: 0x6e6a62, depthWrite: false } )
		)
		setGround(ground)
		ground.rotation.x = -Math.PI / 2
		ground.renderOrder = 1
		scene.add(ground)

		grid = new THREE.GridHelper(5000, 80, 0x000000, 0x000000)
		grid.material.opacity = 0.1
		grid.material.depthWrite = false
		grid.material.transparent = true
		scene.add(grid)

		// 渲染器
		renderer = new THREE.WebGLRenderer({antialias: true, canvas: mainCanvas.current})
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.outputEncoding = THREE.sRGBEncoding
		renderer.toneMapping = THREE.ACESFilmicToneMapping

		// 处理器
		const pmremGenerator = new THREE.PMREMGenerator(renderer)
		pmremGenerator.compileEquirectangularShader()

		new RGBELoader()
			.setDataType(THREE.UnsignedByteType)
			.load(quarry, function (hdrEquirect) {
				const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect)
				setHdrCubeRenderTarget(hdrCubeRenderTarget)
				hdrEquirect.dispose()
				pmremGenerator.dispose()
				scene.background = hdrCubeRenderTarget.texture
			})
		new RGBELoader()
			.setDataType(THREE.UnsignedByteType)
			.load(venice_sunset_1k, function (hdrEquirect) {
				const hdrEnvironment = pmremGenerator.fromEquirectangular(hdrEquirect)
				setHdrEnvironment(hdrEnvironment)
				hdrEquirect.dispose()
				pmremGenerator.dispose()
				scene.environment = hdrEnvironment.texture
			})

		// 处理控制器
		controls = new OrbitControls(camera, renderer.domElement)
		controls.maxPolarAngle = Math.PI * 0.45
		controls.minPolarAngle  = Math.PI * 0.2
		controls.minDistance = 50
		controls.maxDistance = 100
		controls.enableDamping = true
		controls.dampingFactor = 0.1
		controls.rotateSpeed = 0.26
		controls.target.set(0, 0, 0)

		// 设置渲染数据
		setRender({
			name: 'car',
			value: {scene, grid, camera, renderer, controls}
		})

		window.addEventListener('resize', () => onWindowResize(camera, renderer), false)

		// 绑定事件处理
		const interaction = new Interaction(renderer, scene, camera)

		//初始化车辆
		const car = new Car(scene)
		setInstanceCar(car)
		car.init().then((carScene => {
			// 整体缩放模型大小
			car.car.scale.set(0.12, 0.12, 0.12)
			//car.car.position.set(0, 0, 0)
			//controls.target.set(0, 0, 0)
			camera.lookAt(car.car.position)
			// 车辆模型加载完后，预加载内饰图片
			trimInit()
			// 预加载开关灯素材
			preEnvironmentLoad(pmremGenerator, scene)
			// 再次设置渲染数据,增加轮子
			setRender({
				name: 'car',
				value: {scene, grid, camera, renderer, controls, wheels: car.carParts.wheels}
			})

			const {children} = carScene
			// 处理灯光部分的环境贴图
			new RGBELoader()
				.setDataType(THREE.UnsignedByteType)
				.load(venice_sunset_1k, function (hdrEquirect) {
					const hdrEnvironment = pmremGenerator.fromEquirectangular(hdrEquirect)
					car.carParts.lights.forEach(part => {
						part.material.envMap = hdrEnvironment.texture
						part.material.needsUpdate = true
					})
				})
			// 遍历处理零件
			for (let obj of children) {
				// 使用精灵增加可碰触物件
				if (obj.name === 'Door_LF_Paint') {
					const spriteMap = textureLoader.load(dot_orange)
					const spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: 0xffffff})
					const sprite = new THREE.Sprite(spriteMaterial)
					sprite.position.set(92, 87, 0)
					sprite.scale.set(12, 12, 1.0)
					obj.add(sprite)

					// 添加动画类
					const group = new THREE.Group()

					// 添加一个父级网格 设置透明
					car.carParts.leftDoor.forEach(part => group.add(part))
					car.car.add(group)
					// TODO 镜头移动
					const leftDoorAnimate = new LeftDoorAnimate(group)

					sprite.on('click', ev => {
						leftDoorAnimate.play(() => {
							switchFunc()
						})
					})
				}
			}
		}))

	}

	// 环境改变
	const changeEnvironment = signal => {
		const backgroundHdr = signal ? hdrCubeRenderOffTarget : hdrCubeRenderTarget
		const hdrEnv = signal ? hdrEnvironmentOff : hdrEnvironment
		const groundColor = signal ? 0x020202 : 0x6e6a62
		scene.background = backgroundHdr.texture
		scene.environment = hdrEnv.texture
		ground.material.color = new THREE.Color(groundColor)
		lightHolder.visible = signal
	}

	// 挂载后
	useEffect(() => {
		init()
	}, [])
	return (
		<div style={{display: front}}>
			<OutColors car={instanceCar}/>
			<LightSwitch car={instanceCar} changeEnvironment={(signal) => changeEnvironment(signal)}/>
			<canvas ref={mainCanvas} id="mainCanvas"/>
		</div>)
}

export {OutLook}
