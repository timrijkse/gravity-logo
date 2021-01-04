<template>
  <div>
    <div class="container">
      <client-only>
        <WebGl />
      </client-only>
    </div>
    <!-- <h1>Gravity</h1> -->
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

body {
  min-height: 10000px;
}

.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

h1 {
  position: absolute;
  left: 50%;
  top: 800px;
  background: red;
  padding: 30px;
}
</style>
