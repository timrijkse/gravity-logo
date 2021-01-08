import * as THREE from 'three'
import gsap from 'gsap'

export default class GModel extends THREE.Group {
  constructor({ webGLApp, ...options }) {
    super(options)

    this.webGLApp = webGLApp

    this.gltf = null
    this.gltfLoader = webGLApp.gltfLoader

    this.material = new THREE.MeshStandardMaterial({
      // eslint-disable-next-line unicorn/number-literal-case
      color: 0x010101,
      roughness: 0.5
    });

    const envMap = new THREE.TextureLoader().load();
    envMap.mapping = THREE.SphericalReflectionMapping;
    this.material.envMap = envMap;

    const roughnessMap = new THREE.TextureLoader().load();
    roughnessMap.magFilter = THREE.NearestFilter;
    this.material.roughnessMap = roughnessMap;

    this.material.metalness = 0

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
    this.isIntro = true

    const tweenObj = {
      rotationX: -0.25,
      rotationY: -0.5,
      scale: 300
    }

    const onUpdate = (e) => {
      this.gltf.scale.x = tweenObj.scale
      this.gltf.scale.y = tweenObj.scale
      this.gltf.scale.z = tweenObj.scale

      this.gltf.position.x = -70
      this.gltf.rotation.x = tweenObj.rotationX
      this.gltf.rotation.y = tweenObj.rotationY
    }

    const to = {
      rotationX: -0.1,
      rotationY: 0,
      scale: 80,
      ease: 'power4.out',
      onUpdate
    }

    this.animation = gsap.to(tweenObj, 3, to)

    const initial = new THREE.Color(this.material.color.getHex());
    gsap.to(initial, 3, {
      r: 0.006,
      g: 0.006,
      b: 0.006,
      ease: 'power4.out',
      onUpdate: () => {
        this.material.color = initial;
      },
      onComplete: () => {
        this.isIntro = false
      }
    });

    // gsap.fromTo(this.material, 1, {
    //   // eslint-disable-next-line unicorn/number-literal-case
    //   color: 0xffffff
    // }, {
    //   // eslint-disable-next-line unicorn/number-literal-case
    //   color: 0x101010
    // })
  }

  resize = () => {
    console.log('resize tha G')
  }

  mousemove = () => {
    if (this.isIntro) {
      // return
    }

    const maxRotation = 0.15

    const halfWidth = window.innerWidth / 2
    const halfHeight = window.innerHeight / 2

    const { x, y } = this.webGLApp.mouseVector

    const factorX = (((y + halfHeight) / window.innerHeight * 100) - 100) * 2
    const factorY = (((x + halfWidth) / window.innerWidth * 100) - 100) * 2

    gsap.to(this.target, 1, {
      x: maxRotation / 100 * factorX,
      y: maxRotation / 100 * factorY,
      ease: 'power4.out',
    })

    if (this.gltf) {
      gsap.to(this.gltf.rotation, 0.5, {
        x: this.target.x,
        y: this.target.y
      })

      this.gltf.position.x = -70
    }
  }
}