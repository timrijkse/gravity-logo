import * as THREE from 'three'
import gsap from 'gsap'

export default class GModel extends THREE.Group {
  constructor({ webGLApp, ...options }) {
    super(options)

    this.webGLApp = webGLApp

    this.gltf = null
    this.gltfLoader = webGLApp.gltfLoader

    this.material = new THREE.MeshStandardMaterial({ color: 0x030303 })
    this.material.metalness = 1

    this.animation = null

    this.load()
  }

  load = () => {
    this.gltfLoader.load('https://5fd22b892c41540007d1b929--wonderful-fermi-90ef2a.netlify.app/models/XI/models/airJordanBlack_lookdev_painter_01.gltf', (gltf) => {
      this.gltf = gltf.scene

      this.gltf.scale.x = 80
      this.gltf.scale.y = 80
      this.gltf.scale.z = 80

      this.setMaterial()

      this.add(this.gltf)

      this.animate()
    })
  }

  setMaterial = () => {
    this.gltf.traverse((o) => {
      if (o.isMesh) o.material = this.material
    })

    this.gltf.castShadow = true
    this.gltf.receiveShadow = true
  }

  animate = () => {
    const tweenObj = {
      rotationX: 0.3,
      rotationY: 0.1,
      scale: 50
    }

    const onUpdate = (e) => {
      this.gltf.scale.x = tweenObj.scale
      this.gltf.scale.y = tweenObj.scale
      this.gltf.scale.z = tweenObj.scale

      this.gltf.rotation.x = tweenObj.rotationX
      this.gltf.rotation.y = tweenObj.rotationY
    }

    const to = {
      rotationX: -0.1,
      rotationY: 0,
      scale: 80,
      onUpdate
    }

    this.animation = gsap.to(tweenObj, 6, to)
  }

  resize = () => {
    console.log('resize tha G')
  }

  mousemove = () => {
    const target = {}

    target.x = (1 - this.webGLApp.mouseVector.x) * -0.002
    target.y = (1 - this.webGLApp.mouseVector.y) * -0.002

    // this.camera.position.y = -window.pageYOffset

    if (this.gltf) {
      this.gltf.rotation.x = target.x * 0.09
      this.gltf.rotation.y = target.y * 0.09
      this.gltf.position.x = -70
    }
  }
}