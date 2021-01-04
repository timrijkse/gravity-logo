<template>
  <div class="logo">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import WebGLApp from './lib/WebGLApp'
import GModel from './scene/GModel'
import ParaImage from './scene/ParaImage'
import { addLights } from './scene/lights'

export default {
  data() {
    return {
      webGLApp: null,
    }
  },

  mounted() {
    // Initialze Three app
    this.webGLApp = new WebGLApp({
      canvas: this.$refs.canvas,
      postprocessing: true,
    })

    // ADD OBJECTS TO THE SCENE
    this.webGLApp.scene.gModel = new GModel({ webGLApp: this.webGLApp })
    this.webGLApp.scene.add(this.webGLApp.scene.gModel)

    this.webGLApp.scene.paraImage = new ParaImage({ webGLApp: this.webGLApp })
    this.webGLApp.scene.add(this.webGLApp.scene.paraImage)

    addLights(this.webGLApp)
  },

  beforeDestroy() {
    this.webGLApp.removeListeners()
  },
}
</script>

<style>
.logo {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.logo canvas {
  display: block;
}
</style>
