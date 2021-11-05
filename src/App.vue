<template>
  <v-app class="vue-app">
    <!-- <header>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    </header> -->
    <navbar></navbar>
    <router-view/>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue'
import appFooter from './components/footer.vue'

import {mapMutations} from 'vuex'



export default {
  name: 'App',
  components : {
    navbar,
    appFooter
  },
  computed : {
  },
  methods : {
    ...mapMutations([
      'setUser',
      'setToken'
      ])
  },
  created(){
    if(localStorage.getItem('token')){
      this.setUser(JSON.parse(localStorage.getItem('user')));
      this.setToken(localStorage.getItem('token'))
    }
  }
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

  .vue-app {
    background: rgba(243,245,248,255) !important;
  }

</style>


