<template>
  <div class="logo" @mousedown="enableGlitch" @mouseup="disableGlitch">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  PlaneGeometry,
  DoubleSide,
  PointLight,
  CircleGeometry,
  HemisphereLight,
  Clock,
  MeshBasicMaterial,
  Mesh,
  // TextureLoader,
  Vector2,
  AmbientLight,
  MeshStandardMaterial,
  Geometry,
  ParticleBasicMaterial,
  Vertex,
  Vector3,
  ParticleSystem,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { TweenMax } from 'gsap'

import { NoiseEffect, EffectPass, SMAAEffect } from 'postprocessing'

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      geometry: null,
      cube: null,
      gltf: null,
      controls: null,
      loader: null,
      circleGeo: null,
      clock: null,
      renderPass: null,
      effectPass: null,
      glitchPass: null,
      composer: null,
      circleMat: null,
      circle: null,
      godraysEffect: null,
      areaImage: null,
      searchImage: null,
      light1: null,
      light2: null,
      light3: null,
      light4: null,
      light5: null,
      smaaEffect: null,
      spotlight: null,
      windowHalf: null,
      assets: [],
      target: {
        x: 0,
        y: 0,
      },
      mouse: {
        x: 0,
        y: 0,
      },
    }
  },

  mounted() {
    this.scene = new Scene()
    // eslint-disable-next-line unicorn/number-literal-case
    // const textureLoader = new TextureLoader()
    // this.scene.background = textureLoader.load('./bg.png')

    this.camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      5000
    )

    // this.camera.rotation.y = (45 / 180) * Math.PI
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 1000

    this.clock = new Clock()

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.$refs.canvas,
    })

    // this.renderer.setPixelRatio(2)

    // console.log(this.renderer, window)

    this.addLights()

    this.addControls()

    this.createLoader()

    this.createGeo()

    this.createCube()

    this.glitchEffect = new NoiseEffect()

    this.glitchPass = new GlitchPass(32)

    this.renderPass = new RenderPass(this.scene, this.camera)

    this.areaImage = new Image()
    this.areaImage.src = SMAAEffect.areaImageDataURL
    this.searchImage = new Image()
    this.searchImage.src = SMAAEffect.searchImageDataURL
    this.smaaEffect = new SMAAEffect(this.searchImage, this.areaImage, 1)

    this.effectPass = new EffectPass(this.camera, this.glitchEffect)
    this.effectPass.renderToScreen = false

    this.composer = new EffectComposer(this.renderer)

    this.glitchPass.renderToScreen = false
    this.glitchPass.goWild = true
    this.glitchPass.enabled = false

    this.composer.addPass(this.renderPass)

    this.composer.addPass(this.glitchPass)

    // this.composer.addPass(this.effectPass)
    // this.composer.addPass(glitchPass)
    // this.composer.addPass(eff)

    this.onResize()
    this.render()

    this.windowHalf = new Vector2(window.innerWidth / 2, window.innerHeight / 2)
    this.target = new Vector2()

    this.addParticles()

    setTimeout(() => {
      this.enableGlitch()
      setTimeout(() => {
        this.disableGlitch()
      }, 300)
    }, 2000)

    window.addEventListener('mousemove', this.onMouseMove, false)
  },

  methods: {
    render() {
      requestAnimationFrame(this.render)
      // this.cube.rotation.x += 0.01
      if (this.gltf) {
        // this.gltf.rotation.z += 0.01
        // this.camera.lookAt(this.scene.position)
      }

      this.target.x = (1 - this.mouse.x) * -0.002
      this.target.y = (1 - this.mouse.y) * -0.002

      this.camera.position.y = -window.pageYOffset

      if (this.gltf) {
        this.gltf.rotation.x = this.target.x * 0.09
        this.gltf.rotation.y = this.target.y * 0.09
        this.gltf.position.x = -70
      }

      // this.renderer.render(this.scene, this.camera)
      const delta = this.clock.getDelta()
      this.composer.render(delta)
    },

    onResize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },

    onMouseMove(event) {
      const mouse = { ...this.mouse }
      TweenMax.to(mouse, 3, {
        x: event.clientX - this.windowHalf.x,
        y: event.clientY - this.windowHalf.y,
        onUpdate: (tween) => {
          this.mouse.x = mouse.x
          this.mouse.y = mouse.y
        },
      })
    },

    addParticles() {
      // create the particle variables
      const particleCount = 1800
      const particles = new Geometry()
      const pMaterial = new ParticleBasicMaterial({
        // eslint-disable-next-line unicorn/number-literal-case
        color: 0xffffff,
        size: 20,
      })

      // now create the individual particles
      for (let p = 0; p < particleCount; p++) {
        // create a particle with random
        // position values, -250 -> 250
        const pX = 0 // Math.random() * 500 - 250
        const pY = 0 // Math.random() * 500 - 250
        const pZ = 0 // Math.random() * 500 - 250
        const particle = new Vertex(new Vector3(pX, pY, pZ))

        // add it to the geometry
        particles.vertices.push(particle)
      }

      // create the particle system
      const particleSystem = new ParticleSystem(particles, pMaterial)

      // add it to the scene
      this.scene.add(particleSystem)
    },

    addLights() {
      // eslint-disable-next-line unicorn/number-literal-case
      const hlLight = new AmbientLight(0x040404, 100)
      this.scene.add(hlLight)

      // eslint-disable-next-line unicorn/number-literal-case
      const directionalLight = new DirectionalLight(0x040404, 100)
      directionalLight.position.set(0, 1, 0)
      directionalLight.castShadow = true
      this.scene.add(directionalLight)

      // eslint-disable-next-line unicorn/number-literal-case
      this.light = new PointLight(0xffffff, 15)
      this.light.position.set(0, 300, 500)
      this.scene.add(this.light)

      // eslint-disable-next-line unicorn/number-literal-case
      this.light2 = new PointLight(0xffffff, 15)
      this.light2.position.set(500, 100, 0)
      this.scene.add(this.light2)

      // eslint-disable-next-line unicorn/number-literal-case
      this.light3 = new PointLight(0xffffff, 5)
      this.light3.position.set(0, 100, -500)
      this.scene.add(this.light3)

      // eslint-disable-next-line unicorn/number-literal-case
      this.light4 = new PointLight(0xffffff, 20)
      this.light4.position.set(-500, 300, 500)
      this.scene.add(this.light4)

      // eslint-disable-next-line unicorn/number-literal-case
      this.light5 = new HemisphereLight(0xffffff, 0xffffff, 0)
      this.light5.castShadow = true
      this.scene.add(this.light5)
    },

    addControls() {
      // this.controls = new OrbitControls(this.camera, this.$refs.canvas)
      // this.controls.dispose()
      // this.controls.update()
    },

    createGeo() {
      this.circleGeo = new CircleGeometry(100, 100)
      // eslint-disable-next-line unicorn/number-literal-case
      this.circleMat = new MeshBasicMaterial({ color: 0xff0000 })
      // this.circleMat.visible = false
      this.circle = new Mesh(this.circleGeo, this.circleMat)

      this.circle.position.set(0, 0, 0)
      // this.scene.add(this.circle)
    },

    createCube() {
      const geometry = new PlaneGeometry(500, 500, 0)
      const material = new MeshBasicMaterial({
        // eslint-disable-next-line unicorn/number-literal-case
        color: 0xffff00,
        side: DoubleSide,
      })
      const plane = new Mesh(geometry, material)
      plane.receiveShadow = true
      this.scene.add(plane)
    },

    enableGlitch() {
      // this.composer.addPass(this.glitchPass)
      this.glitchPass.enabled = true
    },

    disableGlitch() {
      this.glitchPass.enabled = false
    },

    createLoader() {
      this.loader = new GLTFLoader()

      this.loader.load('./logo-test4.glb', (gltf) => {
        this.gltf = gltf.scene
        this.gltf.scale.set(80, 80, 80)

        //
        // this.gltf.rotation.y = -0.5
        // this.gltf.rotation.y = -0.1
        // this.gltf.rotation.x = 1.1
        // this.gltf.rotation.y = 1.1
        // this.gltf.rotation.x = 1
        // this.gltf.position.x = -0.5
        // this.gltf.position.y = 0
        // this.gltf.position.z = 1

        // eslint-disable-next-line unicorn/number-literal-case
        const newMaterial = new MeshStandardMaterial({ color: 0x030303 })
        newMaterial.metalness = 1

        this.gltf.traverse((o) => {
          if (o.isMesh) o.material = newMaterial
        })

        this.gltf.castShadow = true
        this.gltf.receiveShadow = true

        const bla = { x: 10.3, y: 0.1, scale: 50 }
        const bla2 = { x: -0.1, y: 0, scale: 80 }

        TweenMax.to(bla, 6, {
          ...bla2,
          // repeat: -1,
          // yoyo: true,
          onUpdate: (tween) => {
            if (this.gltf) {
              this.gltf.rotation.x = bla.x
              this.gltf.rotation.y = bla.y
              this.gltf.scale.x = bla.scale
              this.gltf.scale.y = bla.scale
            }
          },
        })

        this.scene.add(this.gltf)
      })
    },
  },
}
</script>

<style>
.logo {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.logo canvas {
  display: block;
  /* width: 100%;
  height: 100%; */
}
</style>
