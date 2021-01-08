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

    this.target = { x: 0, y: 0 }

    this.animation = null

    this.load()
  }

  load = () => {
    this.gltfLoader.load('./logo-test4.glb', (gltf) => {
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

    gsap.to(this.target, 1, {
      x: (1 - this.webGLApp.mouseVector.x) * -0.002,
      y: (1 - this.webGLApp.mouseVector.y) * -0.002
    })

    if (this.gltf) {
      gsap.to(this.gltf.rotation, 1, {
        x: this.target.x * 0.09,
        y: this.target.y * 0.09
      })

      // this.camera.position.y = -window.pageYOffset


      this.gltf.position.x = -70
    }
  }
}