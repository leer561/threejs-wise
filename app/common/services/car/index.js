// 车辆外观相关的处理
import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader"
import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare.js'
// 加载器

import carGltf from "../../../assets/gltf/modelDraco.gltf"
import shadowImage from "../../../assets/images/ferrari_ao.png"
import Glass_baseColor from '../../../assets/gltf/Glass_baseColor.png'
import Tire_baseColor from '../../../assets/gltf/Tire_baseColor.png'
import light_baseColor from '../../../assets/gltf/light_baseColor.png'
import LightOff from '../../../assets/gltf/light_off.png'
import LightOn from '../../../assets/gltf/light_on.png'
import flareFront from '../../../assets/images/flare-front.jpg'

import * as carParts from './util'
import material from "./material"
import JFC_Tire from "../../../assets/models/JFC_Tire.jpg"

const textureLoader = new THREE.TextureLoader()
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('static/draco/')
dracoLoader.setDecoderConfig({type: 'object'})
dracoLoader.preload()
loader.setDRACOLoader(dracoLoader)

export class Car {
	constructor(scene) {
		this.car = null
		this.carParts = carParts.partsArray
		this.scene = scene
		this.light = {} // 开关灯贴图素材
		this.shadow = null //关灯时隐藏阴影
		this.zhongkong = null
	}

	// 初始化加载模型
	init() {
		return new Promise((resolve, reject) => {
			loader.load(carGltf, object => {

					// 处理窗户镀铬
					const grayWhiteMat = material.grayWhiteParts[0]
					this.car = object.scene
					const {children} = this.car

					// 遍历处理零件
					for (let obj of children) {

						// 处理窗户装饰条
						if (carParts.glassMoulding[obj.name]) {
							// 处理窗户装饰条
							this.carParts.glassMoulding.push(obj)
						}

						// 车身
						if (carParts.carBody[obj.name]) {
							// 添加车身
							this.carParts.body.push(obj)
						}

						// 车灯
						if (carParts.carLight[obj.name]) {
							// 添加车身
							this.carParts.lights.push(obj)

						}

						// 车玻璃
						if (carParts.carGlass[obj.name]) {
							// 添加车身
							this.carParts.glass.push(obj)
						}

						// 中控
						if (obj.name === 'zhongkong') {
							// 添加中控
							this.zhongkong = obj
						}

						// 灰色偏白色部件
						if (carParts.grayWhiteParts[obj.name]) {
							// 添加车身
							obj.material = grayWhiteMat
						}

						// 白色部件
						if (carParts.whiteParts[obj.name]) {
							// 添加车身
							//obj.material = materialsLib.whiteParts[0]
						}

						// 灰色部件
						if (carParts.grayParts[obj.name]) {
							// 添加车身
							//obj.material = materialsLib.grayParts[0]
						}

						// 车轮部件
						if (carParts.carWheels[obj.name]) {
							// 添加车身
							this.carParts.wheels.push(obj)
						}

						// 车轮胎
						if (carParts.carTire[obj.name]) {
							this.carParts.tire.push(obj)
						}

						// 可动的分组
						if (carParts.touchParts[obj.name]) {
							if (carParts.touchParts[obj.name] === 'leftDoor') {
								this.carParts.leftDoor.push(obj)
							} else {
								this.carParts.trunk.push(obj)
							}
						}

					}

					// shadow
					const texture = textureLoader.load(shadowImage)
					this.shadow = new THREE.Mesh(
						new THREE.PlaneBufferGeometry(0.61 * 420, 1.4 * 400),
						new THREE.MeshBasicMaterial({
							map: texture, opacity: 0.4, transparent: true
						})
					)
					this.shadow.rotation.x = -Math.PI / 2
					this.shadow.renderOrder = 2
					this.car.add(this.shadow)

					this.materialWheels()
					this.renderGlass()
					this.updateMaterials(material.main[1])
					// 尾灯
					this.scene.add(this.car)
					resolve(this.car)
					this.preload()

				},
				function (xhr) {
					console.log((xhr.loaded / xhr.total * 100) + '% loaded')
				},
				// called when loading has errors
				function (error) {
					console.log('An error happened', error)
				})
		})

	}

	// 增加车轮纹理
	materialWheels() {
		textureLoader.load(JFC_Tire, texture => {
			this.carParts.tire.forEach(part => {
				part.material.bumpMap = texture
				part.material.bumpScale = 0.2
				part.material.needsUpdate = true
			})
		})
	}

	// 渲染玻璃
	renderGlass() {
		// 渲染玻璃
		this.carParts.glass.forEach(part => {
			part.material.transparent = true
			part.material.opacity = 0.9
		})
	}

	// 渲染车辆
	updateMaterials(bodyMat) {
		this.carParts.body.forEach(part => part.material = bodyMat)
	}

	// 预加载开关灯素材
	preload() {
		textureLoader.load(LightOn, texture => {
			texture.encoding = THREE.sRGBEncoding
			this.light.on = texture
		})
		textureLoader.load(LightOff, texture => {
			texture.encoding = THREE.sRGBEncoding
			this.light.off = texture
		})

		textureLoader.load(flareFront, texture => {
			this.light.flareFront = texture
			const light1 = new THREE.PointLight(0xffffff, 10, 6)
			light1.position.set(8.4, 8.5, 23.7)
			this.scene.add(light1)
			const lensFlare = new Lensflare()
			lensFlare.addElement(new LensflareElement(texture, 2048, 0, light1.color))
			light1.add(lensFlare)
			const light2 = new THREE.PointLight(0xffffff, 10, 6)
			const lensFlare1 = new Lensflare()
			lensFlare1.addElement(new LensflareElement(texture, 2048, 0, light1.color))
			light2.add(lensFlare1)
			light2.position.set(-8, 8.5, 24)
			this.scene.add(light2)

			// 暂时隐藏
			light1.visible = false
			light2.visible = false
			this.light.headLight1 = light1
			this.light.headLight2 = light2
		})
	}

	// 开灯
	lightSwitch(switchData) {
		// 处理尾灯贴图 true为开灯
		const lightTexture = switchData ? this.light.on : this.light.off
		this.shadow.visible = !switchData
		this.light.headLight1.visible = switchData
		this.light.headLight2.visible = switchData
		this.carParts.lights.forEach(part => {
			part.material.map.image = lightTexture.image
			part.material.map.needsUpdate = true
		})

	}
}

