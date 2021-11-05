<template>
    <div>
        <v-speed-dial style="position: fixed" v-model="fab" :bottom="bottom" :right="right" :transition="transition">
            <template v-slot:activator>
                <v-btn v-model="fab" color="blue darken-2" dark fab>
                    <v-icon v-if="fab">
                        mdi-close
                    </v-icon>
                    <v-icon v-else>
                        mdi-plus-outline
                    </v-icon>
                </v-btn>
            </template>
            <v-btn @click="scrollDown" fab dark small color="red">
                <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo" @click="dialogOpen">
                <v-icon>mdi-pencil</v-icon>
            </v-btn> 
            <v-btn @click="scrollUp" fab dark small color="green">
                <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
        </v-speed-dial>

        <v-dialog persistent transition="dialog-top-transition" v-model="getDialog" max-width="290">
            <app-new-saying></app-new-saying>
        </v-dialog>
    </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'

import newSaying from './newSaying.vue'

  export default {
    name : 'deneme',
    components : {
        appNewSaying : newSaying
    },
   
    data: () => ({
      direction: 'top',
      fab: false,
      right: true,
      bottom: true,
      transition: 'slide-y-reverse-transition',
      dialog: false,
    }),
    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },
    computed : {
      ...mapGetters([
        'getDialog'
      ])
    },
    methods : {
        ...mapMutations([
          'updateDialog'
        ]),
        scrollUp(){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        scrollDown(){
            window.scrollTo({top : document.body.scrollHeight, behavior: 'smooth'});
        },
        dialogOpen(){
          this.updateDialog();
        }
    }
  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>