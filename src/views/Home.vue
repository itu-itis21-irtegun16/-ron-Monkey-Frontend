<template>
  <v-container>
    <slider></slider>
    <benefits-sports></benefits-sports>
    <router-view/>
  </v-container>
</template>

<script>
import slider from '../components/slider.vue'
import benefitsSports from '../components/benefits-sports.vue'

  export default {
    name: 'Home',

    components : {
      slider,
      benefitsSports
    },
  }
</script>
