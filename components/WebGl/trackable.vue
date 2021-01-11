<template>
  <div class="dom">
    <slot>
      <p>Trackable component</p>
    </slot>
  </div>
</template>

<script>
import dom from 'gl/dom'

export default {
  mounted() {
    dom.register(this.$el)
  },

  beforeDestroy() {
    dom.unregister(this.$el)
  },
}
</script>

<style scoped>
.dom {
  border: 1px solid red;
}
</style>