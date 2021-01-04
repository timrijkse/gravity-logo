import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class WebGLApp {
  constructor({ background = '#FF0000', canvas, ...options } = {}) {
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    })

    // Create composer for postprocessing
    this.composer = new EffectComposer(this.renderer)

    // Create GLTFLoader to load 3d objects (exported from Blender)
    this.gltfLoader = new GLTFLoader()

    // Create clock to handle composer delta
    this.clock = new THREE.Clock()

    // Create mouse point Vector
    this.mouseVector = new THREE.Vector2()

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      5000
    )

    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 1000

    // Create scene
    this.scene = new THREE.Scene()

    // Start renderer
    this.render()
  }

  render = () => {
    requestAnimationFrame(this.render)

    // Sync camera with users scroll position
    this.camera.position.y = -window.pageYOffset

    // this.renderer.render(this.scene, this.camera)
    const delta = this.clock.getDelta()
    this.composer.render(delta)
  }

  resize = (width, height) => {
    this.renderer.setSize(width, height)
  }

  scroll = () => {
    console.log('lekker scrolle')
  }

  mousemove = (mouseX, mouseY) => {
    this.mouseVector.x = mouseX
    this.mouseVector.y = mouseY
  }
}
