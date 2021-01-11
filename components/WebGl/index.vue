<template>
  <div class="webgl">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import WebGLApp from './lib/WebGLApp'
import GModel from './scene/GModel'
import ParaImage from './scene/ParaImage'
import Plane from './scene/Plane'
import DomImage from './scene/DomImage'
import { addLights } from './scene/lights'
import { addPostProcessing } from './scene/postprocessing'

export default {
  props: {
    scrollPosition: Number,
  },

  data() {
    return {
      webGLApp: null,
    }
  },

  watch: {
    scrollPosition: function (oldValue, newValue) {
      if (!this.webGLApp) {
        return
      }

      this.webGLApp.scroll(newValue)
    },
  },

  mounted() {
    // Initialze Three app
    this.webGLApp = new WebGLApp({
      canvas: this.$refs.canvas,
      postprocessing: addPostProcessing(),
    })

    // Renderer background
    this.webGLApp.renderer.setClearColor(0x080808, 1)

    // ADD OBJECTS TO THE SCENE
    this.webGLApp.scene.gModel = new GModel({ webGLApp: this.webGLApp })
    this.webGLApp.scene.add(this.webGLApp.scene.gModel)

    this.webGLApp.scene.paraImage = new ParaImage({ webGLApp: this.webGLApp })
    // this.webGLApp.scene.add(this.webGLApp.scene.paraImage)

    this.webGLApp.scene.plane = new Plane({ webGLApp: this.webGLApp })
    // this.webGLApp.scene.add(this.webGLApp.scene.plane)

    // Render dom elements to THREE
    document.querySelectorAll('[data-webgl').forEach((el) => {
      this.webGLApp.scene.image = new DomImage({ webGLApp: this.webGLApp, el })
      // this.webGLApp.scene.add(this.webGLApp.scene.image)
    })

    addLights(this.webGLApp)
  },

  beforeDestroy() {
    this.webGLApp.removeListeners()
  },
}
</script>

<style>
.webgl {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 100vh;
  width: 100%;
  height: 100%;
}

.logo canvas {
  display: block;
}

.element {
  background-color: #fff;
}
</style>
