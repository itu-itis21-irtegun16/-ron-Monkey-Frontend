<template>
    <v-card>
        <v-carousel
            mandatory
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
        >
            <v-carousel-item
            v-for="(slide, i) in items"
            :key="i"
            :src="slide.src"
            >
            <v-sheet
            >
                <v-row
                class="fill-height"
                align="center"
                justify="center"
                >
                <div class="text-h2">
                </div>
                </v-row>
            </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {
       items: [
          {
            src: 'https://images4.alphacoders.com/805/thumb-1920-805233.jpg',
          },
          {
            src: 'https://images2.alphacoders.com/734/thumb-1920-734941.jpg',
          }
        ],
      }
    },
  }
</script>