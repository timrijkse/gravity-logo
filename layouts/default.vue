<template>
  <div>
    <client-only>
      <WebGl />
    </client-only>
    <div class="page-container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import WebGl from '@/components/WebGl'

export default {
  components: {
    WebGl,
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

body {
  min-height: 10000px;
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
  z-index: 2;
}
</style>
