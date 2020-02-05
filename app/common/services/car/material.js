import * as THREE from "three"

export default {
	main: [
		new THREE.MeshStandardMaterial({
			color: 0x7a7975, metalness: 1, roughness:0.3, name: 'silver', fog: true, refractionRatio: 0.98,
		}),
		new THREE.MeshStandardMaterial({
			color: 0xcccccc, metalness: 0.6, roughness: 0.3882092, name: 'white', fog: true, refractionRatio: 0.98
		}),
		new THREE.MeshStandardMaterial({
			color: 0x121f2e, metalness: 1, roughness: 0.3, name: 'darkBlue', fog: true, refractionRatio: 0.98
		}),
		new THREE.MeshStandardMaterial({
			color: 0x224088, metalness: 0.9, roughness: 0.3, name: 'blue', fog: true, refractionRatio: 0.98
		}),
		new THREE.MeshStandardMaterial({
			color: 0x786b65, metalness: 0.9, roughness: 0.3, name: 'gold', fog: true, refractionRatio: 0.98
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
	grayWhiteParts: [
		new THREE.MeshLambertMaterial({
			color: 0x000000, emissive: 0x090909, reflectivity: 0.7
		})
	]
}
