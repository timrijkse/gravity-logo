<template>
  <div class="logo" @mousemove="onMouseMove">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import WebGLApp from './lib/WebGLApp'
import G from './scene/G'

const PAGES = {
  HOME: 'HOME',
  NEWS: 'NEWS',
}

export default {
  data() {
    return {
      webGLApp: null,
      sceneState: {
        pages: PAGES,
        activePage: PAGES.HOME,
      },
      canvas: null,
    }
  },

  mounted() {
    // Initialze Three app
    this.webGLApp = new WebGLApp({
      canvas: this.$refs.canvas,
    })

    // Pass events to Three app
    window.addEventListener('resize', this.onResize, false)
    window.addEventListener('scroll', this.onScroll, false)

    // Initial resize event
    this.onResize()

    // ADD OBJECTS TO THE SCENE
    this.webGLApp.scene.g = new G({ webGLApp: this.webGLApp })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize, false)
    window.removeEventListener('scroll', this.onScroll, false)
  },

  methods: {
    onResize(e) {
      const { innerWidth, innerHeight } = window
      this.webGLApp.resize(innerWidth, innerHeight)
    },

    onScroll(e) {
      console.log('onScroll', e.pageYOffset)
      this.webGLApp.scroll()
    },

    onMouseMove(e) {
      this.webGLApp.mousemove(e.clientX, e.clientY)
    },
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
