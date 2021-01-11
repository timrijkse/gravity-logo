<template>
  <div>
    <client-only>
      <WebGl :scroll-position="scrollPosition" />
    </client-only>
    <SmoothScroll @scroll="onScroll">
      <div class="page-container">
        <Nuxt />
      </div>
    </SmoothScroll>
  </div>
</template>

<script>
import WebGl from '@/components/WebGl'
import SmoothScroll from '@/components/WebGl/SmoothScroll'

export default {
  components: {
    WebGl,
    SmoothScroll,
  },

  data() {
    return {
      scrollPosition: 0,
    }
  },

  methods: {
    onScroll(scrollPosition) {
      this.scrollPosition = scrollPosition
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.page-container {
  position: relative;
  width: 100%;
  min-height: 10000px;
  z-index: 2;
}
</style>
