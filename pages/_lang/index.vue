<template>
  <section class="container">
    <Head/>
    <Carousel/>
    <Trend/>
    <Prompt/>
    <!-- <Notice/> -->
    <!-- <Cooperation/> -->
    <About/>
    <!-- <Footer/> -->
  </section>
</template>

<script>
import Head from '~/components/public/Head.vue'
import Carousel from '~/components/home/Carousel.vue'
import Trend from '~/components/home/Trend.vue'
import Prompt from '~/components/home/Prompt.vue'
// import Notice from '~/components/home/Notice.vue'
// import Cooperation from '~/components/home/Cooperation.vue'
import About from '~/components/home/About.vue'
// import Footer from '~/components/home/Footer.vue'

export default {
  components: {
    Head,
    Carousel,
    Trend,
    Prompt,
    // Notice,
    // Cooperation,
    About,
    // Footer
  },
  head () {
    return {
      title: 'Coinmarket '+this.$t('common.header.Home'),
      meta: [
        { hid: 'description', name: 'description', content: 'Coinmarket '+this.$t('common.header.Home') }
      ]
    }
  },
  mounted: function() {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
