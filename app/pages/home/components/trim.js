import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {forwardRef,useImperativeHandle } from 'react'
// 内饰纹理数据
import front01 from '../../../assets/images/trim/front01.png'
import front02 from '../../../assets/images/trim/front02.png'
import front03 from '../../../assets/images/trim/front03.png'
import front04 from '../../../assets/images/trim/front04.png'
import front05 from '../../../assets/images/trim/front05.png'
import front06 from '../../../assets/images/trim/front06.png'

const textureLoader = new THREE.TextureLoader()

// 内饰组件
const Trim = forwardRef((props,ref) => {
	const {front,setRender} = props
	const trimCanvas = useRef()
	// 内饰全局场景
	let rendererTrim, sceneTrim, cameraTrim, controlsTrim, trimCube, animationFrameId


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
		setRender({
			name:'trim',
			value:{
				controlsTrim,sceneTrim,cameraTrim,rendererTrim
			}
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
			//将材质贴到正方体的6个面.
			const geometry = new THREE.BoxGeometry(1024, 1024, 1024)
			trimCube = new THREE.Mesh(
				geometry,
				materials
			)
		})
	}

	const init = ()=> {
		initPreTrim().then(() => {
			initTrim()
		})
	}
	useImperativeHandle(ref, () => {
		return {
			init
		}
	})

	return (<canvas ref={trimCanvas} style={{display: front}} id="trimCanvas"/>)
})

export {Trim}

