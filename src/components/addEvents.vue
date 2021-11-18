<template>
      <v-card class="dialog-card" >
            <v-card-title>
            <span class="text-h5">Add New Event</span>
            </v-card-title>
        <v-card-text>
            <v-row>

            <!-- Event Name -->
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="eventName" label="Event name*" required ></v-text-field>
              </v-col>
            <!-- Event Name -->

            <!-- Event Date -->
              <v-col cols="12" sm="6" md="4" >
                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" label="Chose date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu1.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
              </v-col>
            <!-- Event Date -->

            <!-- Event Time -->
              <v-col cols="12" sm="6" md="4">
                <v-menu ref="menu3" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time" label="Chose time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" ></v-text-field>
                    </template>
                    <v-time-picker format="24hr" v-if="menu2" v-model="time" full-width @click:minute="$refs.menu3.save(time)" ></v-time-picker>
                </v-menu>
              </v-col>
            <!-- Event Time -->

            <!-- Event Type -->

              <v-col cols="12" sm="6">
                <v-select v-model="age" :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required ></v-select>
              </v-col>

            <!-- Event Type -->




              <v-col cols="12" sm="6">
                <v-autocomplete v-model="auto" 
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests" 
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>

          <small style="color:red">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateAddEventDialog()" >Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveEvent()" > Save </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import { mapMutations } from  'vuex'
  export default {
    data: () => ({
        eventName : '',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false,
        time: '',
        menu2: false,
        age : null,
        auto : null
    }),
    methods : {
        ...mapMutations(['updateAddEventDialog','addEvent']),
        saveEvent(){
            this.updateAddEventDialog();
            var event = {
                'name' : this.eventName,
                'start' : this.date + ' ' + this.time,
                'end' : this.date + ' ' +this.time,
                'details'  : this.age,
                // 'event_auto'  : this.auto,
                'color' : 'red',
                'timed' : !false,
                'id' : Math.floor(Math.random()*2)
            }
            this.addEvent(event);
        }
    },
  }
</script>

<style scoped>
    .dialog-card{
        border-radius: 20px;
        padding: 25px;
    }
</style>