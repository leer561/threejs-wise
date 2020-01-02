import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import car from '../../assets/models/envix.fbx'
import car1 from '../../assets/models/envix1.fbx'

import Tire_Road_A_c from '../../assets/models/Tire_Road_A_c.png'
import Glass_G from '../../assets/models/Glass_G.png'
import Tire_Road_A_nm from '../../assets/models/Tire_Road_A_nm.png'
import Glass from '../../assets/models/Glass.png'

const Home = () => {
	const mainCanvas = useRef()
	let  renderer,scene,camera,stats, composer, pass

	const animate = ()=>{
		requestAnimationFrame( animate )
		stats.begin()
		for ( let i = 0; i < scene.children.length; i ++ ) {
			let child = scene.children[ i ]
			child.rotation.x += 0.005
			child.rotation.y += 0.01
		}
		composer.render()
		stats.end()
	}

	// 挂载后
	useEffect(() => {
		const container = document.createElement( 'div' )
		document.body.appendChild( container )
		stats = new Stats()
		container.appendChild( stats.dom )
		// 设置宽高
		const width = window.innerWidth
		const height = window.innerHeight
		mainCanvas.current.width = window.innerWidth
		mainCanvas.current.height  = window.innerHeight

		renderer = new THREE.WebGLRenderer({
			canvas: mainCanvas.current
		})
		renderer.setSize( width, height )
		renderer.setPixelRatio( window.devicePixelRatio )
		renderer.setClearColor(0x000000) // black

		scene = new THREE.Scene()
		scene.background = new THREE.Color( 0xa0a0a0 )
		scene.fog = new THREE.Fog( 0xa0a0a0, 200, 3500 )

		// ground
		const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) )
		mesh.rotation.x = - Math.PI / 2
		mesh.receiveShadow = true
		scene.add( mesh )

		camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 3000 )
		camera.position.set( 1100, 300, 300 )
		camera.aspect = width / height
		camera.updateProjectionMatrix()

		let light = new THREE.HemisphereLight( 0xffffff, 0x444444 )
		light.position.set( 0, 200, 0 )
		scene.add( light )

		light = new THREE.DirectionalLight( 0xffffff )
		light.position.set( 0, 200, 100 )
		light.castShadow = true
		light.shadow.camera.top = 180
		light.shadow.camera.bottom = - 100
		light.shadow.camera.left = - 120
		light.shadow.camera.right = 120
		scene.add( light )

		const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 )
		grid.material.opacity = 0.2
		grid.material.transparent = true
		scene.add( grid )

		const controls = new OrbitControls( camera, renderer.domElement )
		controls.target.set( 0, 12, 0 )
		controls.update()

		// model
		const loader = new FBXLoader()
		loader.load( car, function ( object ) {
			console.log(1111)
			scene.add( object )
			animate()
		} )

		// SMAA
		composer = new EffectComposer( renderer )
		composer.setSize( width, height )
		composer.addPass( new RenderPass( scene, camera ) )
		pass = new SMAAPass( window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio() )
		composer.addPass( pass )

	}, [])
	return (
		<canvas ref={mainCanvas} id="mainCanvas"  ></canvas>
	)
}

export default Home
