<template>
      <v-card class="dialog-card" >
            <v-card-title class="justify-center">
            <span class="text-h5">Add New Event</span>
            </v-card-title>
        <v-card-text>
            <v-row>

            <!-- Event Name -->
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="eventName" label="Event name" required ></v-text-field>
              </v-col>
            <!-- Event Name -->

            <!-- Event Type -->
              <v-col cols="12" sm="6">
                <v-select v-model="program" :items="getWorkouts" label="Workout Program" required ></v-select>
              </v-col>
            <!-- Event Type -->

            <!-- Event Date -->
              <v-col cols="12" sm="6" md="6" >
                <v-menu  ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" ></v-text-field>
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
              <v-col cols="12" sm="6" md="6">
                <v-menu ref="menu3" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time" label="Time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" ></v-text-field>
                    </template>
                    <v-time-picker format="24hr" v-if="menu2" v-model="time" full-width @click:minute="$refs.menu3.save(time)" ></v-time-picker>
                </v-menu>
              </v-col>
            <!-- Event Time -->

              <!-- <v-col cols="12" sm="6">
                <v-autocomplete v-model="auto" 
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests" 
                  multiple
                ></v-autocomplete>
              </v-col> -->

            </v-row>

          <!-- <small style="color:red">*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateAddEventDialog()" >Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveEvent()" > Save </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapMutations,mapGetters } from  'vuex'
  export default {
    mixins: [validationMixin],

    validations: {
      workoutName: { required, maxLength: maxLength(40) },
      workoutTimeHour: { required },
      workoutTimeMins : { required }
      
    },

    data: () => ({
        eventName : '',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false,
        time: '',
        menu2: false,
        program : null,
        auto : null
    }),
    computed : {
      ...mapGetters(['userInfo']),
      getWorkouts(){
        var workoutNames = [];
        this.userInfo.workoutPrograms.forEach(element => {
          workoutNames.push(element.workoutName);
        });
        return workoutNames;
      }
    },
    methods : {
        ...mapMutations(['updateAddEventDialog']),
        saveEvent(){
            this.updateAddEventDialog();
            var event = {
                'name' : this.eventName,
                'start' : this.date + ' ' + this.time,
                'end' : this.date + ' ' + this.time,
                'details'  : this.program,
                'color' : 'red',
                'timed' : !false,
                'id' : Math.floor(Math.random()*2)
            }
            if(this.time != ''){
              this.userInfo.workoutPrograms.forEach(element =>{
                if(element.workoutName == this.program){
                  var updateHours = new Date(event.end);
                  updateHours.setMinutes(updateHours.getMinutes() + element.workoutTime)
                  event.end = this.date + ' ' + updateHours.getHours() + ':' + updateHours.getMinutes();
                }
              });
            }else {
              event.start = this.date;
              event.end = this.date
            }
            var packet = {
              eventDetails : event,
              user_id : this.userInfo._id 
            }
            this.$store.dispatch('saveEvent',packet);
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.time = '';
            this.eventName = '';
            this.program = null;
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