<template>
  <v-container :class="{customContainer : isDesktop}">
    <v-row class="fill-height calendar">
      <v-col>

        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn :x-small="!isDesktop" :class="{'mr-4' : isDesktop , 'mr-1' : !isDesktop}" outlined   color="grey darken-2" @click="setToday">Today</v-btn>
            <v-btn :class="{'small-btn' : !isDesktop}" fab text :small="!isDesktop" color="grey darken-2" @click="prev">
              <v-icon :small="!isDesktop">
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn :class="{'small-btn' : !isDesktop}" fab text :small="!isDesktop"  color="grey darken-2" @click="next" >
              <v-icon :small="!isDesktop">
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title :class="{'small-title' : !isDesktop}" v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="isDesktop" class="mr-3" outlined color="grey darken-2" @click="updateAddEventDialog()">Add Event</v-btn>
              <v-menu bottom right >
              <template v-slot:activator="{ on, attrs }">
                <v-btn :x-small="!isDesktop" outlined color="grey darken-2" v-bind="attrs" v-on="on" >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>


        <v-sheet height="600">
          <v-calendar event-ripple ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" @change="updateRange" ></v-calendar>

          <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x >
            <v-card color="grey lighten-4" min-width="350px" flat >
              <v-toolbar :color="selectedEvent.color" dark >
                <v-btn icon @click="deleteEvent(selectedEvent.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <!-- <span v-html="selectedEvent.details"></span> -->
                <form v-if="currentlyEditing != selectedEvent.id">
                  {{selectedEvent.details}}
                </form>
                <form v-else>
                  <v-text-field v-model="selectedEvent.details" type="text" placeholder="add note" style="width:100%" :min-height="100">

                  </v-text-field>
                </form>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">Close</v-btn>
                <v-btn text v-if="currentlyEditing !== selectedEvent.id" @click.prevent="editEvent(selectedEvent)">Edit</v-btn>
                <v-btn text v-else @click.prevent="updateEvent(selectedEvent)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

        </v-sheet>

        <v-speed-dial v-if="!isDesktop" style="position: fixed" v-model="fab" :bottom="bottom" :right="right" :transition="transition">
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
            <v-btn fab dark small color="indigo" @click="dialogOpen">
                <v-icon>mdi-pencil-plus-outline</v-icon>
            </v-btn> 
        </v-speed-dial>
        <v-dialog v-model="getAddEventDialog" persistent max-width="600px">
          <app-add-event ></app-add-event>
        </v-dialog>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import addEvent from './addEvents.vue'
import {mapGetters,mapMutations} from 'vuex'

  export default {
    name: 'calender',
    components : {
      appAddEvent : addEvent
    },
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      isDesktop : true,
      name: null,
      details: null,
      start: null,
      end: null,
      color: "1976d2",
      currentlyEditing : null,
      dialog : false,
      direction: 'top',
      fab: false,
      right: true,
      bottom: true,
      transition: 'slide-y-reverse-transition',
    }),
    computed : {
      ...mapGetters(['getAddEventDialog','getEvents'])
    },
    methods: {
      ...mapMutations(['updateAddEventDialog']),
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange () {
        const events = []
          
        const random_id = Math.floor(Math.random()*2)

        events.push({
          name: 'eğlence',
          details : 'lets try',
          start: '2021-11-11 01:08:15',
          end: '2021-11-11 01:09:15',
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !false,
          id: random_id
        })
        console.log(this.getEvents)
        this.events = this.getEvents
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      deleteEvent(ev){
        console.log(ev)
      },
      editEvent(ev){
        this.currentlyEditing = ev.id
      },
      updateEvent(ev){
        this.events.forEach(element=>{
          if(element.id == ev.id){
            element.details = this.selectedEvent.details;
            this.selectedOpen = false;
            this.currentlyEditing = null; 
          }
        })
      },
      dialogOpen(){
        this.updateAddEventDialog();
        if(this.isDesktop){
          document.querySelector('.v-dialog').style.cssText = "box-shadow: unset; overflow-y: unset; border-radius: 20px"
        }else {
          setTimeout(() => {
            document.querySelector('.v-dialog').style.cssText = "border-radius: 20px"
          }, 250);
        }
      },
    },
    created() {
      if(this.$isMobile()){
        this.isDesktop = false
      }
    },
    mounted () {
      this.$refs.calendar.checkChange();
    },
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
  }
</script>

<style scoped>
  .customContainer {
    max-width: 80%;
    justify-content: center;
  }

  .calendar {
    text-align: center;
    padding: 10px;
  }

  .small-btn{
    width: 20px;
  }

  .small-title{
    font-size: 14px;
  }

  /* >>> .v-dialog{
    box-shadow: unset;
    overflow-y: unset;
  } */

</style>