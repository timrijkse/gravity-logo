<template>
  <div class="page" :style="{ height: `${pageHeight}px` }">
    <div ref="page" class="page-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  data() {
    return {
      tl: new gsap.timeline({ paused: true }),
      proxyTween: gsap.to({}, 0.2, { paused: true }),
      scrollPosition: 0,
      pageHeight: 0,
    }
  },

  mounted() {
    this.onLoadComplete()
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll, false)
    gsap.ticker.remove('tick', this.onTick)
  },

  methods: {
    onLoadComplete() {
      gsap.defaultEase = 'linear.none'

      gsap.set(document.body, {
        height: this.$refs.page.getBoundingClientRect().height,
      })

      this.createTimeline()

      window.addEventListener('scroll', this.onScroll, false)
      this.onScroll()

      this.onTick()

      this.isLoaded = true
    },

    createTimeline() {
      const { page } = this.$refs
      const { height } = page.getBoundingClientRect()

      this.pageHeight = height

      this.tl.fromTo(
        page,
        1,
        {
          y: 0,
        },
        {
          y: -height,
          onUpdate: () => {
            this.$emit('scroll', parseInt(this.$refs.page._gsap.y))
          },
        },
        0
      )
    },

    onScroll() {
      const totalHeight = this.$refs.page.getBoundingClientRect().height
      const windowHeight = window.innerHeight
      const scrollTop = window.pageYOffset

      gsap.set(document.body, {
        height: totalHeight,
      })

      const scrollPercent = Math.max(
        scrollTop / (totalHeight - windowHeight),
        0
      )

      this.proxyTween.progress(scrollPercent).pause()
    },

    onTick() {
      requestAnimationFrame(this.onTick)

      let progress = this.tl.progress()
      progress += (this.proxyTween.progress() - progress) * 0.05

      // console.log(progress)

      this.tl.progress(progress)
    },
  },
}
</script>

<style scoped>
.page {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
}

.page-inner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>