<template>
  <div class="logo" @mousedown="enableGlitch" @mouseup="disableGlitch">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import WebGLApp from './lib/WebGLApp'

export default {
  data() {
    return {
      webGLApp: null,
      canvas: null,
    }
  },

  mounted() {
    this.webGLApp = new WebGLApp({
      canvasRef: this.$refs.canvas,
    })
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
