import * as THREE from 'three'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {Interaction} from 'three.interaction'

import {OutLook} from './components/out-look'

// 内饰纹理数据
import front01 from '../../assets/images/trim/front01.png'
import front02 from '../../assets/images/trim/front02.png'
import front03 from '../../assets/images/trim/front03.png'
import front04 from '../../assets/images/trim/front04.png'
import front05 from '../../assets/images/trim/front05.png'
import front06 from '../../assets/images/trim/front06.png'


// 加载器
const textureLoader = new THREE.TextureLoader()
// 首页组件
const Home = () => {
	// 外观绘图
	const carCanvas = useRef()
	const trimCanvas = useRef()
	// 绘图cancans变量切换
	const [front, setFront] = useState(true)

	// 内饰全局场景
	let rendererTrim, sceneTrim, cameraTrim, controlsTrim, trimCube


	// 初始化内饰场景
	const initTrim = () => {
		if (!trimCube) return
		trimCube.geometry.scale(1, 1, -1)
		rendererTrim = new THREE.WebGLRenderer({canvas: trimCanvas.current})
		rendererTrim.setPixelRatio(window.devicePixelRatio)
		rendererTrim.setSize(window.innerWidth, window.innerHeight)
		//rendererTrim.appendChild(rendererTrim.domElement)

		sceneTrim = new THREE.Scene()

		cameraTrim = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1024)
		cameraTrim.position.z = 0.01

		controlsTrim = new OrbitControls(cameraTrim, rendererTrim.domElement)
		controlsTrim.enableZoom = false
		controlsTrim.enablePan = false
		controlsTrim.enableDamping = true
		controlsTrim.dampingFactor = 0.1
		controlsTrim.rotateSpeed = -0.26
		sceneTrim.add(trimCube)

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
			console.log('materials', materials)
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
		initPreTrim().then(() => initTrim())

	}

	// 挂载后
	useEffect(() => {
		init()
	}, [])

	return (
		<div>
			<OutLook ref={carCanvas} switchFunc={()=>setFront(false)} front={front?'block':'none'} id="carCanvas"/>
			<canvas ref={trimCanvas} style={{display: !front?'block':'none'}} id="trimCanvas"/>
		</div>
	)
}

export default Home
