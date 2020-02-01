// 车辆外观相关的处理
import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

// 加载器
import carGltf from "../../../assets/gltf/gltf.gltf"
import dot_orange from "../../../assets/images/dot_orange.png"
import shadowImage from "../../../assets/images/ferrari_ao.png"
import LightOff from '../../../assets/models/light_off.png'
import LightOn from '../../../assets/models/light_on.png'

import * as carParts from './util'
import material from "./material"
import JFC_Tire from "../../../assets/models/JFC_Tire.jpg"

import {LeftDoorAnimate} from './left-door'
const loader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

export class Car {
	constructor(scene) {
		this.car = null
		this.carParts = carParts.partsArray
		this.scene = scene
	}

	// 初始化加载模型
	init(){
		loader.load(carGltf, object => {
				console.log('object', object)
				// 处理窗户镀铬
				const grayWhiteMat = material.grayWhiteParts[0]
				this.car = object.scene
				const {children} = this.car

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
						sprite.on('click', ev=> {
							this.animated()
						})
					}

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
				this.car.scale.set(0.01, 0.01, 0.01)

				// shadow
				const texture = textureLoader.load(shadowImage)
				const shadow = new THREE.Mesh(
					new THREE.PlaneBufferGeometry(0.61 * 420, 1.4 * 400),
					new THREE.MeshBasicMaterial({
						map: texture, opacity: 0.4, transparent: true
					})
				)
				shadow.rotation.x = -Math.PI / 2
				shadow.renderOrder = 2
				this.car.add(shadow)

				this.updateMaterials()
				this.materialWheels()
				this.renderGlass()
				// 尾灯
				this.scene.add(this.car)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded')
			},
			// called when loading has errors
			function (error) {
				console.log('An error happened', error)
			})
	}

	// 开车门动画
	animated(){
		// 找到前门
		const group = new THREE.Group()
		// 添加一个父级网格 设置透明
		this.carParts.leftDoor.forEach(part =>group.add(part))
		this.car.add(group)
		const leftDoorAnimate = new LeftDoorAnimate(group)
		leftDoorAnimate.play(() => {
			// 转换场景
		})
	}

	// 增加车轮纹理
	materialWheels () {
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
			this.carParts.tire.forEach(part => part.material = mat)
		})
	}

	// 渲染玻璃
	renderGlass  () {
		// 渲染玻璃
		this.carParts.glass.forEach(part => {
			part.material.transparent = true
			part.material.opacity = 0.9
		})
	}

	// 渲染车辆
	updateMaterials (){
		// const bodyMat = materialsLib.main[4]
		// const glassMouldingMat = materialsLib.glassMoulding[0]
		//
		// carParts.body.forEach(part => part.material = bodyMat)
		// carParts.glassMoulding.forEach(part => part.material = glassMouldingMat)
	}

	// 开灯
	lightOn = () => {
		// 处理尾灯贴图
		textureLoader.load(LightOn, texture => {
			texture.encoding = THREE.sRGBEncoding
			console.log('carParts.lights.', carParts.lights)
			this.carParts.lights.forEach(part => part.material.map.image  = texture.image)
		})
	}
}

