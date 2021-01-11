<template>
  <div>
    <div class="page">
      <Splash />
      <h2>Hallo</h2>
      <img src="bg.png" data-webgl="image" />
    </div>
  </div>
</template>

<script>
import Splash from '@/components/Splash'

export default {
  components: {
    Splash,
  },
}
</script>

<style>
.page {
  width: 100%;
  opacity: 0;
}

.page h2 {
  outline: 1px solid red;
  position: relative;
  top: 100px;
  margin: 32px;
}

.page img {
  display: block;
  width: 400px;
  margin: 0 auto;
}
</style>
