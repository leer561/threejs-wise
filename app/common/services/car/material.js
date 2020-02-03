import * as THREE from "three"

export default {
	main: [
		new THREE.MeshStandardMaterial({
			color: 0xABABAB, metalness: 0, roughness: 0.3882092, name: 'silver',fog: true,refractionRatio: 0.98,
		}),
		new THREE.MeshStandardMaterial({
			color: 0x888888, metalness: 0, roughness: 0.3882092, name: 'white',fog: true,refractionRatio: 0.98
		}),
		new THREE.MeshStandardMaterial({
			color: 0x00153f, metalness: 0, roughness:0.3882092, name: 'darkBlue',fog: true,refractionRatio: 0.98
		}),
		new THREE.MeshStandardMaterial({
			color: 0x1650BE, metalness: 0, roughness: 0.3882092, name: 'blue',fog: true,refractionRatio: 0.98
		}),
		new THREE.MeshStandardMaterial({
			color: 0x917F71, metalness: 0, roughness: 0.3882092, name: 'gold',fog: true,refractionRatio: 0.98
		}),
	],
	glass: [
		new THREE.MeshPhysicalMaterial({
			color: 0x000000, metalness: 1, roughness: 0, transparency: 0.5, transparent: true, name: 'clear'
		}),
		new THREE.MeshPhysicalMaterial({
			color: 0x000000, metalness: 1, roughness: 0, transparency: 0.7, transparent: true, name: 'smoked'
		}),
		new THREE.MeshPhysicalMaterial({
			color: 0x001133, metalness: 1, roughness: 0, transparency: 0.7, transparent: true, name: 'blue'
		}),
	],
	glassMoulding: [
		new THREE.MeshStandardMaterial({
			color: 0xffffff, metalness: 1.0, roughness: 0, name: 'metallic'
		}),
		new THREE.MeshStandardMaterial({
			color: 0x000000, metalness: 1.0, roughness: 0.4, name: 'black'
		})
	],
	whiteParts: [
		new THREE.MeshStandardMaterial({
			color: 0xeeeeee, metalness: 1.0, roughness: 0.1, name: 'metallic'
		})
	],
	grayParts: [
		new THREE.MeshStandardMaterial({
			color: 0x333333, metalness: 1.0, roughness: 0.1, name: 'metallic'
		})
	],
	grayWhiteParts:[
		new THREE.MeshLambertMaterial({
			color: 0x000000, emissive: 0x090909,reflectivity: 0.7
		})
	]
}
