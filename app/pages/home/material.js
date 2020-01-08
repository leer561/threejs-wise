import * as THREE from "three"

export default {
	main: [
		new THREE.MeshStandardMaterial({
			color: 0xff4400, metalness: 1.0, roughness: 0.2, name: 'orange'
		}),
		new THREE.MeshStandardMaterial({
			color: 0x001166, metalness: 1.0, roughness: 0.2, name: 'blue'
		}),
		new THREE.MeshStandardMaterial({
			color: 0x990000, metalness: 1.0, roughness: 0.2, name: 'red'
		}),
		new THREE.MeshStandardMaterial({
			color: 0x000000, metalness: 1.0, roughness: 0.4, name: 'black'
		}),
		new THREE.MeshStandardMaterial({
			color: 0xfafafa, metalness: 0.1, roughness: 0.2, name: 'white'
		}),
		new THREE.MeshStandardMaterial({
			color: 0xffffff, metalness: 1.0, roughness: 0.2, name: 'metallic'
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
