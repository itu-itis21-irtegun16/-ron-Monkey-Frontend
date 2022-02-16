<template>
  <div class="app-wrapper" style="margin-top:15px">
    <v-sheet class="mx-auto sheet-class" elevation="0" max-width="1200" :class="isSave ? 'animate__animated animate__backOutUp' : ''">
      <h2 v-if="workoutList">Create Workout Program</h2>
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows >
        <v-slide-item v-for="n in workoutList" :key="n.title" class="animate__animated animate__backInLeft">
          <v-card  class="ma-4 selected-card-class" :height="isDesktop ?  250 : 200" :width="isDesktop ? 250 : 200">
            <v-card-title class="justify-center list-item-title">{{n.title}}</v-card-title>
            <video loop autoplay playsinline style="width:inherit" :src="n.video"></video>
            <v-divider></v-divider>
            <v-icon :class="isDesktop ?  'dnd-and-zone-icon' : 'dnd-and-zone-icon-mobile'">mdi-arrow-all</v-icon>
            <v-divider :style="isDesktop ? 'max-height:60px;min-height:60px' : 'max-height:38.5px;min-height:38.5px'" vertical></v-divider>
            <v-icon @click="deleteWorkoutfromList(n)" :class="isDesktop ? 'dnd-and-zone-delete-icon' : 'dnd-and-zone-delete-icon-mobile'">mdi-delete</v-icon>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-btn @click="saveWorkout()" v-if="workoutList" class="save-workout" dark> 
      Save Workout
    </v-btn>

    <v-divider v-if="workoutList" style="margin-bottom:15px"></v-divider>

    <h2 style="margin-bottom: 10px">Exercise List</h2>
    <v-btn @click="openFilter()" :small="!isDesktop" class="filter-button"  dark  >
      <v-badge v-if="getFilterNumber()" :content="getFilterNumber()" dark >
        <v-icon dark>
          mdi-format-list-bulleted-square
        </v-icon>
      </v-badge>

      <v-icon dark v-else> 
        mdi-format-list-bulleted-square
      </v-icon>

    </v-btn>
    
    <v-card class="exercise-card">
      <v-list two-line>
        <template v-for="(item, index) in exerciseList">
          <div :key="index" class="check-filter" v-if="checkFilter(item)">
            <v-list-item  :key="item.title">
              <v-list-item-avatar :width="isDesktop ? '192px' : '96px'" :height="isDesktop ? '108px' : '54px'" style="border-radius: 0px !important">
                <img :src="item.avatar">
              </v-list-item-avatar>

              <v-list-item-content class="text-left">
                <v-list-item-title :style="isDesktop ? 'font-size : 1.5rem' : '1rem' " v-html="item.title"></v-list-item-title>
                <!-- <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle> -->
              </v-list-item-content>

              <v-spacer></v-spacer>

              <v-icon :class="checkList(item) ? 'hasList' : ''" @click="addListExercise(item)" style="margin-right:10px" :style="isDesktop ? 'font-size : 40px' : 'font-size : 24px'">mdi-plus-circle-outline</v-icon>

              <v-icon @click="openPopup(item)" :style="isDesktop ? 'font-size : 40px' : 'font-size : 24px'">mdi-play-circle-outline</v-icon>
              
            </v-list-item>

            <v-divider v-if="exerciseList.length > index + 1" :key="index" :style="isDesktop ? 'margin-left:220px' : 'margin-left:125px'" style="border-width: thin 3px 1px 3px;" :inset="true"></v-divider>
          </div>
          
        </template>
      </v-list>
    </v-card>

    
    <v-dialog v-model="getWorkoutNameDialog" persistent max-width="600px">
      <v-card class="workout-name">
        <v-card-title class="justify-center workout-name-title">Save Workout</v-card-title>
        <v-card-text>
          <span  class="workout-fields">Workout Name <span style="color:red">*</span> </span>
          <v-alert type="error" v-model="workoutNameAlert" dismissible> {{errorMessage}} </v-alert>
          <v-text-field 
            @input="$v.workoutName.$touch()" 
            required 
            :counter="40" 
            :error-messages="workoutNameErrors"
            @blur="$v.workoutName.$touch()"
            class="workout-fields-input" v-model="workoutName" outlined label="Enter workout name"
            ></v-text-field>
          <span class="workout-fields">Workout Time <span style="color:red">*</span> </span>
          <v-row>
            <v-col cols="12" sm="6" md="6" :style="[!isDesktop ? {'padding-bottom' : '0'} : {}]">
              <v-select 
              required
              @change="$v.workoutTimeHour.$touch()"
              @blur="$v.workoutTimeHour.$touch()"
              :error-messages="workoutTimeHourErrors"
              class="workout-fields-input" :items="Hours" v-model="workoutTimeHour" outlined label="Hour"></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="6"  :style="[!isDesktop ? {'padding-top' : '0'} : {}]">
              <v-select 
              required
              @change="$v.workoutTimeMins.$touch()"
              @blur="$v.workoutTimeMins.$touch()"
              :error-messages="workoutTimeMinsErrors"
              class="workout-fields-input" :items="Mins" v-model="workoutTimeMins" outlined label="Minute"></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions style="padding:unset">
          <v-spacer></v-spacer>
          <v-btn @click="closeWorkoutName()" color="red">Close</v-btn>
          <v-btn @click="saveWorkoutName()" :disabled="disableCondition" color="green">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="getFilterDialog" persistent max-width="600px" >
      <app-muscle-filters></app-muscle-filters>
    </v-dialog>

    <v-dialog v-model="getExercisePopupDialog" persistent max-width="1200px" >
      <app-exercise-popup :item="exercise"></app-exercise-popup>
    </v-dialog>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import muscleFilters from '../bodyPathFilters.vue'
import exercisePopup from '../exercisePopup.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  mixins: [validationMixin],

  validations: {
    workoutName: { required, maxLength: maxLength(40) },
    workoutTimeHour: { required },
    workoutTimeMins : { required }
    
  },

  components : {
    appMuscleFilters : muscleFilters,
    appExercisePopup : exercisePopup
  },
  data : function(){
    return {
      isSave : false,
      page: 1,
      model : null,
      exercise : null,
      isDesktop : true,
      muscleArray : [
        'biceps',
        'deltoids',
        'forearms',
        'triceps',
        'trapezius',
        'lats',
        'abs',
        'obliques',
        'pectorals',
        'adductors',
        'calves',
        'hamstrings',
        'glutes',
        'quads'
      ],
      exerciseList : [
        { 
          title : 'Airplane Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/airplane-pose-left-kids.jpg',
          difficulty : 5,
          equipment : 'none',
          impact_level : 'low',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['trapezius','lats','hamstrings','glutes'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/airplane-pose-left-kids.mp4'
        },
        { 
          title : 'Bridge Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/bridge-pose.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['trapezius','lats','hamstrings','glutes'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/bridge-pose.mp4'
        },
        { 
          title : 'Camel Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/camel-pose.jpg',
          difficulty : 4,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['trapezius','abs','quads'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/camel-pose.mp4'
        },
        { 
          title : 'Cat Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/cat-pose.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['trapezius','lats','abs'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/cat-pose.mp4'
        },
        { 
          title : 'Child Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/child-pose.jpg',
          difficulty : 1,
          equipment : 'None',
          impact_level : 'Normal',
          category : 'Yoga',
          stance : 'Floor',
          focus_area : ['lats','glutes','quads'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/child-pose.mp4'
        },
        { 
          title : 'Cow Face Fold', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/cow-face-fold-left.jpg',
          difficulty : 3,
          equipment : 'none',
          impact_level : 'Normal',
          category : 'Yoga',
          stance : 'Floor',
          focus_area : ['glutes','quads'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/cow-face-fold-left.mp4'
        },
        { 
          title : 'Cow Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/cow-pose.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'low',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['deltoids','lats','trapezius','abs'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/cow-pose.mp4'
        },
        { 
          title : 'Crow Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/crow-pose.jpg',
          difficulty : 4,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','lats','triceps','abs'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/crow-pose.mp4'
        },
        { 
          title : 'Downward Dog', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/downward-dog.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','trapezius','triceps','hamstrings','abs','calves','pectorals'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/downward-dog.mp4'
        },
        { 
          title : 'Eagle Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/eagle-pose-left.jpg',
          difficulty : 3,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['deltoids','lats','glutes','quads','calves'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/eagle-pose-left.mp4'
        },
        { 
          title : 'Fish Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/fish-pose.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'low',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['deltoids','trapezius'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/fish-pose.mp4'
        },
        { 
          title : 'Forward Fold', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/forward-fold.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'low',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['lats','hamstrings'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/forward-fold.mp4'
        },
        { 
          title : 'Forward Fold Hands Behind', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/forward-fold-hands-behind.jpg',
          difficulty : 3,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','pectorals','glutes','hamstrings'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/forward-fold-hands-behind.mp4'
        },
        { 
          title : 'Four Limbs Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/four-limbs-pose.jpg',
          difficulty : 2,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['deltoids','trapezius','triceps','abs'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/four-limbs-pose.mp4'
        },
        { 
          title : 'Four-Limbed Staff Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/four-limbed-staff-pose.jpg',
          difficulty : 4,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['deltoids','trapezius','triceps','abs'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/four-limbed-staff-pose.mp4'
        },
        { 
          title : 'Half Spinal Twist', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/half-spinal-twist.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'low',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['glutes','lats'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/half-spinal-twist.mp4'
        },
        { 
          title : 'Head to Knee', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/head-to-knee-left.jpg',
          difficulty : 4,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['lats','glutes','hamstrings','adductors'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/head-to-knee-left.mp4'
        },
        { 
          title : 'Headstand', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/headstand.jpg',
          difficulty : 5,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['deltoids','lats','triceps','hamstrings','quads','biceps','forearms','abs','trapezius','glutes'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/headstand.mp4'
        },
        { 
          title : 'Hero Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/hero-pose.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'low',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['quads'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/hero-pose.mp4'
        },
        { 
          title : 'Lay on Back', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/lay-on-back.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['lats'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/lay-on-back.mp4'
        },
        { 
          title : 'Low Lunge', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/low-lunge-left-forward.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['calves','glutes','hamstrings','quads'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/low-lunge-left-forward.mp4'
        },
        { 
          title : 'Mountain Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/mountain-pose.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'low',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['lats'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/mountain-pose.mp4'
        },
        { 
          title : 'Pigeon Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/pigeon-pose-left.jpg',
          difficulty : 2,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['glutes', 'hamstrings','quads'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/pigeon-pose-left.mp4'
        },
        { 
          title : 'Plank Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/plank-pose.jpg',
          difficulty : 4,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'floor',
          focus_area : ['deltoids','abs'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/plank-pose.mp4'
        },
        {  
          title : 'Plow', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/plow.jpg',
          difficulty : 5,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','biceps','forearms','adductors','abs','lats','triceps','trapezius'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/plow.mp4'
        },
        { 
          title : 'Prayer Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/prayer-pose.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','lats','triceps','hamstrings','quads'],
          video : ''
        },
        { 
          title : 'Prep for Shoulder Stand', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/prep-for-shoulder-stand.jpg',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','lats','triceps','hamstrings','quads'],
          video : ''
        },
        { 
          title : '', 
          avatar : '',
          difficulty : 1,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','lats','triceps','hamstrings','quads'],
          video : ''
        },
      ],
      workoutList : null,
      workoutName : '',
      workoutTimeHour : null,
      workoutTimeMins : null,
      Hours : ['0','1','2','3','4','5'],
      Mins : ['0', '15', '30', '45'],
      workoutNameAlert : false,
      errorMessage : ''


    }
  },
  computed : {
    ...mapGetters(['getFilterDialog','getExercisePopupDialog','getMuscleFilters','getWorkoutNameDialog','userInfo']),
    workoutNameErrors(){
        const errors = []
        if (!this.$v.workoutName.$dirty) return errors
        !this.$v.workoutName.maxLength && errors.push('Workout name must be at most 40 characters long')
        !this.$v.workoutName.required && errors.push('Workout name is required.')
        return errors
    },
    workoutTimeHourErrors () {
        const errors = []
        if (!this.$v.workoutTimeHour.$dirty) return errors
        !this.$v.workoutTimeHour.required && errors.push('Hour is required')
        return errors
    },
    workoutTimeMinsErrors () {
        const errors = []
        if (!this.$v.workoutTimeMins.$dirty) return errors
        !this.$v.workoutTimeMins.required && errors.push('Minute is required')
        return errors
    },
    disableCondition(){
      if(
        this.workoutNameErrors.length > 0 || this.workoutName == '' ||
        this.workoutTimeHourErrors.length > 0 || this.workoutTimeHour == null ||
        this.workoutTimeMinsErrors.length > 0 || this.workoutTimeMins == null
      ) return true;
      return false;
    }
  },
  methods : {
    ...mapMutations(['updateExerciseDialog','updateFilterDialog','updateWorkoutNameDialog']),
    openPopup(val){
      this.exercise = val;
      this.updateExerciseDialog();
    },
    addListExercise(val){
      if(this.workoutList){
        var check = false;
        this.workoutList.forEach(element => {
          if(element.title == val.title) check = true;
        })
        if(!check)
          this.workoutList.push(val)
        else {
          alert('zaten var')
        }
      } 
      else {
        this.workoutList = [];
        this.workoutList.push(val)
      }
    },
    checkList(val){
      var check= false;
      if(this.workoutList){
        this.workoutList.forEach(element => {
          if(val.title == element.title){
            check = true;
          }
        })
      }
      return check;
    },
    deleteWorkoutfromList(val){
      this.workoutList.forEach((element,index) =>{
        if(element.title == val.title){
          this.workoutList.splice(index,1)
          if(this.workoutList.length == 0){
            this.workoutList = null;
          } 
          return;
        }
      })
    },
    openFilter(){
      this.updateFilterDialog();
    },
    checkFilter(val){
      if(this.checkFilterIsNull()) return true;
      var checkVal = false;
      val.focus_area.forEach(element =>{
        if(this.getMuscleFilters[element] == true) checkVal =  true 
      })
      return checkVal;
    },
    checkFilterIsNull(){
      var checkValue = true;
      this.muscleArray.forEach(element => {
        if(this.getMuscleFilters[element] == true){
          checkValue = false;
        } 
      })
      return checkValue;
    },
    getFilterNumber(){
      var counter = 0;
      this.muscleArray.forEach(element => {
        if(this.getMuscleFilters[element] == true) counter ++;
      })
      return counter;
    },
    saveWorkout(){
      this.updateWorkoutNameDialog();
    },
    closeWorkoutName(){
      this.workoutTimeHour = null;
      this.workoutTimeMins = null;
      this.workoutName = '';
      this.updateWorkoutNameDialog();
    },
    saveWorkoutName(){
      this.userInfo.workoutPrograms.forEach(element => {
        if(element.workoutName == this.workoutName){
          this.workoutNameAlert = true;
          this.errorMessage = 'Workout name already exist';
          setTimeout(() => {
            this.workoutNameAlert = false;
            this.errorMessage = ''
          }, 4000);

        }
      })
      if(!this.workoutNameAlert){
        var payload = {
          workoutList : this.workoutList,
          workoutName : this.workoutName,
          workoutTime : Number(this.workoutTimeHour) * 60 + Number(this.workoutTimeMins),
          user_id : this.userInfo._id
        }
        this.$store.dispatch('saveWorkout',payload);
        this.updateWorkoutNameDialog();
        this.isSave = true;
        setTimeout(() => {
          this.workoutName = '';
          this.workoutList = null;
          this.workoutTimeMins = null;
          this.workoutTimeHour = null;
          this.isSave = false;
        }, 750);
      }
    },
  },
  created(){
    if(this.$isMobile()){
      this.isDesktop = false
    }
  }
  
}
</script>

<style scoped lang="css">
  .sheet-class {
    background-color: unset;
    box-shadow: unset;
  }

  .selected-card-class{
    border-radius: 10px;
  }

  .app-wrapper{
    justify-content: center;
    text-align: center;
  }

  .exercise-card{
    margin-bottom: 30px;
  }

  .v-list-item.theme--light >>> .v-list-item_content {
    flex: unset;
  }

  @media screen and (min-width: 1000px) {
    .v-dialog__content >>> .v-dialog{
      box-shadow: unset;
      margin-top: 80px;
      max-height: 90%;
      overflow-y: unset;
    }
  }

  .v-dialog__content >>> .v-dialog{
    box-shadow: unset;
    margin-top: 80px;
    max-height: 90%;
  }

  

  .hasList{
    display: none;
  }

  .list-item-title{
    padding: 5px;
  }

  .dnd-and-zone-icon{
    position: absolute;
    left: 47.5px;
    top: 203px;
    font-size: 30px;
  }

  .dnd-and-zone-icon-mobile{
    position: absolute;
    left: 38px;
    top: 170px;
    font-size: 24px;
  }

  .dnd-and-zone-delete-icon{
    position: absolute;
    font-size: 30px;
    top: 203px;
    left: 172.5px;
  }

  .dnd-and-zone-delete-icon-mobile{
    position: absolute;
    font-size: 24px;
    top: 170px;
    left: 138px;
  }

  .filter-button{
    display: flex;
    margin-left: auto;
    margin-right: 5px;
  }

  .save-workout{
    margin-bottom: 10px;
  }

  .workout-name{
    padding: 15px;
    border-radius: 6px;
  }

  .workout-name-title{
    margin-bottom: 10px;
  }

  .workout-fields{
    font-weight: bold;
    margin-bottom: 10px;
  }

  .workout-fields-input{
    margin-top: 10px;
  }
</style>