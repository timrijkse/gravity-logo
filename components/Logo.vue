<template>
  <div class="logo">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  Color,
  PointLight,
  // MeshStandardMaterial,
  CircleGeometry,
  MeshBasicMaterial,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector2,
  AmbientLight,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  GodRaysEffect,
  RenderPass,
  EffectPass,
  EffectComposer,
  SMAAEffect,
} from 'postprocessing'

// const m = { x: 0, y: 0 }
// const pos = { x: 0, y: 0 }
// const lightZoom = 10

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
      renderPass: null,
      effectPass: null,
      composer: null,
      circleMat: null,
      circle: null,
      godraysEffect: null,
      areaImage: null,
      searchImage: null,
      smaaEffect: null,
      spotlight: null,
      windowHalf: null,
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
    this.scene.background = new Color(0x020202)

    this.camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      5000
    )

    this.camera.rotation.y = (45 / 180) * Math.PI
    this.camera.position.x = 800
    this.camera.position.y = 100
    this.camera.position.z = 1000

    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.$refs.canvas,
    })

    this.renderer.setPixelRatio(
      window.devicePixelRatio > 2 ? window.devicePixelRatio : 2
    )

    console.log(this.renderer, window)

    this.addLights()

    this.addControls()

    this.createLoader()

    this.createGeo()

    this.godraysEffect = new GodRaysEffect(this.camera, this.circle, {
      resolutionScale: 1,
      density: 0.8,
      decay: 0.95,
      weight: 0.9,
      samples: 100,
    })

    this.renderPass = new RenderPass(this.scene, this.camera)
    this.effectPass = new EffectPass(this.camera, this.godraysEffect)
    this.effectPass.renderToScreen = true

    this.areaImage = new Image()
    this.areaImage.src = SMAAEffect.areaImageDataURL
    this.searchImage = new Image()
    this.searchImage.src = SMAAEffect.searchImageDataURL
    this.smaaEffect = new SMAAEffect(this.searchImage, this.areaImage, 1)
    this.effectPass = new EffectPass(
      this.camera,
      this.smaaEffect,
      this.godraysEffect
    )

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.effectPass)

    this.onResize()
    this.render()

    this.windowHalf = new Vector2(window.innerWidth / 2, window.innerHeight / 2)
    this.target = new Vector2()

    window.addEventListener('mousemove', this.onMouseMove, false)
  },

  methods: {
    render() {
      requestAnimationFrame(this.render)
      // this.cube.rotation.x += 0.01
      if (this.gltf) {
        // this.gltf.rotation.z += 0.01
        this.camera.lookAt(this.scene.position)
      }

      this.target.x = (1 - this.mouse.x) * 0.002
      this.target.y = (1 - this.mouse.y) * 0.002

      this.camera.rotation.x += 0.05 * (this.target.y - this.camera.rotation.x)
      this.camera.rotation.y += 0.05 * (this.target.x - this.camera.rotation.y)

      // this.renderer.render(this.scene, this.camera)
      this.composer.render(0.1)
    },

    onResize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },

    onMouseMove(event) {
      this.mouse.x = event.clientX - this.windowHalf.x
      this.mouse.y = event.clientY - this.windowHalf.x
    },

    addLights() {
      // eslint-disable-next-line unicorn/number-literal-case
      const hlLight = new AmbientLight(0x404040, 100)
      this.scene.add(hlLight)

      // eslint-disable-next-line unicorn/number-literal-case
      const directionalLight = new DirectionalLight(0xffffff, 100)
      directionalLight.position.set(0, 1, 0)
      directionalLight.castShadow = true
      this.scene.add(directionalLight)

      // eslint-disable-next-line unicorn/number-literal-case
      const light = new PointLight(0xc4c4c4, 10)
      light.position.set(0, 300, 500)
      this.scene.add(light)

      // eslint-disable-next-line unicorn/number-literal-case
      const light2 = new PointLight(0xc4c4c4, 10)
      light2.position.set(500, 100, 0)
      this.scene.add(light2)

      // eslint-disable-next-line unicorn/number-literal-case
      const light3 = new PointLight(0xc4c4c4, 10)
      light3.position.set(0, 100, -500)
      this.scene.add(light3)

      // eslint-disable-next-line unicorn/number-literal-case
      const light4 = new PointLight(0xc4c4c4, 10)
      light4.position.set(-500, 300, 500)
      this.scene.add(light4)
    },

    addControls() {
      this.controls = new OrbitControls(this.camera, this.$refs.canvas)

      this.controls.dispose()
      this.controls.update()
    },

    createGeo() {
      this.circleGeo = new CircleGeometry(220, 50)
      // eslint-disable-next-line unicorn/number-literal-case
      this.circleMat = new MeshBasicMaterial({ color: 0xffccaa })
      this.circle = new Mesh(this.circleGeo, this.circleMat)

      this.circle.position.set(-100, 100, -500)
      this.circle.scale.setX(1.2)
      this.scene.add(this.circle)
    },

    createCube() {
      // Plane Properties
      const planeWidth = 10
      const planeHeight = 10
      const planeWidthSegs = 1
      const planeHeightSegs = 1
      // eslint-disable-next-line unicorn/number-literal-case
      const planeColor = 0xffff00
      const planePosition = { x: 0, y: 0, z: -5 }

      const planeGeometry = new PlaneGeometry(
        planeWidth,
        planeHeight,
        planeWidthSegs,
        planeHeightSegs
      )
      const planeMaterial = new MeshLambertMaterial({ color: planeColor })
      const planeMesh = new Mesh(planeGeometry, planeMaterial)
      planeMesh.position.set(planePosition.x, planePosition.y, planePosition.z)
      planeMesh.receiveShadow = true
      planeMesh.castShadow = false
      planeMesh.rotation.x = -0.6
      this.scene.add(planeMesh)

      // this.cube.position.z = -5
      // this.cube.rotation.x = 0.5
      // this.cube.rotation.y = 5
    },

    createLoader() {
      this.loader = new GLTFLoader()

      this.loader.load('./logo-test.glb', (gltf) => {
        this.gltf = gltf.scene
        this.gltf.scale.set(100, 100, 100)

        //
        // this.gltf.position.z = 4
        this.gltf.rotation.x = 1
        // this.gltf.rotation.x = 1
        // this.gltf.position.x = -0.5
        // this.gltf.position.y = 0
        // this.gltf.position.z = 1

        // // eslint-disable-next-line unicorn/number-literal-case
        // const newMaterial = new MeshStandardMaterial({ color: 0xff0000 })

        // this.gltf.traverse((o) => {
        //   if (o.isMesh) o.material = newMaterial
        // })

        // this.gltf.castShadow = true
        // this.gltf.receiveShadow = true

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
  width: 100%;
  height: 100%;
}
</style>
