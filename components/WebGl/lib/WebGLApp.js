import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { SMAAEffect } from 'postprocessing'
import createTouches from 'touches'

export default class WebGLApp {
  constructor({ background = '#FF0000', canvas, postprocessing = true, ...options } = {}) {
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    })

    // Create GLTFLoader to load 3d objects (exported from Blender)
    this.gltfLoader = new GLTFLoader()

    // Create clock to handle composer delta
    this.clock = new THREE.Clock()

    // Create mouse point Vector
    this.mouseVector = new THREE.Vector2()

    // Touch handler (basic touch handler that propagates through the scene)
    this.touchHandler = createTouches(this.canvas, {
      target: this.canvas,
      filtered: true
    })

    this.touchHandler.on('start', (ev, pos) => this.traverse('onTouchStart', ev, pos))
    this.touchHandler.on('end', (ev, pos) => this.traverse('onTouchEnd', ev, pos))
    this.touchHandler.on('move', (ev, pos) => this.traverse('onTouchMove', ev, pos))

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

    if (this.postprocessing) {
      // Create composer for postprocessing
      this.composer = new EffectComposer(this.renderer)

      // Anti aliasing
      this.areaImage = new Image()
      this.areaImage.src = SMAAEffect.areaImageDataURL
      this.searchImage = new Image()
      this.searchImage.src = SMAAEffect.searchImageDataURL
      this.smaaEffect = new SMAAEffect(this.searchImage, this.areaImage, 1)

      //  Create render pass
      this.renderPass = new RenderPass(this.scene, this.camera)
      this.composer.addPass(this.renderPass)
    }

    // Start renderer
    this.render()

    // Add listeners
    this.addListeners()
  }

  render = () => {
    requestAnimationFrame(this.render)

    // Sync camera with users scroll position
    this.camera.position.y = -window.pageYOffset
    this.camera.updateProjectionMatrix()

    if (this.postprocessing) {
      const delta = this.clock.getDelta()
      this.composer.render(delta)
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }

  addListeners = () => {
    window.addEventListener('resize', this.resize, false)
    window.addEventListener('scroll', this.scroll, false)
    window.addEventListener('mousemove', this.mousemove, false)


    this.resize()
  }

  removeListeners = () => {
    window.removeEventListener('resize', this.resize, false)
    window.removeEventListener('scroll', this.scroll, false)
    window.removeEventListener('mousemove', this.mousemove, false)
  }

  resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const pixelRatio = window.devicePixelRatio

    // Set Renderer size
    this.renderer.setSize(width, height)

    // recursively tell all child objects to resize
    this.scene.traverse(obj => {
      if (typeof obj.resize === 'function') {
        obj.resize({
          width,
          height,
          pixelRatio,
        })
      }
    })
  }

  scroll = () => {
    console.log('scroll')
  }

  mousemove = (e) => {
    this.mouseVector.set(e.clientX, e.clientY)

    this.scene.traverse(obj => {
      if (typeof obj.mousemove === 'function') {
        obj.mousemove()
      }
    })
  }

  traverse = (fn, ...args) => {
    this.scene.traverse(child => {
      if (typeof child[fn] === 'function') {
        child[fn].apply(child, args)
      }
    })
  }
}
