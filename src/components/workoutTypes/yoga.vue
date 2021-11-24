<template>
  <div class="app-wrapper" style="margin-top:15px">
    <v-sheet class="mx-auto sheet-class" elevation="0" max-width="1200">
      <h2 v-if="workoutList">Create Workout Program</h2>
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows >
        <v-slide-item v-for="n in workoutList" :key="n.title">
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


    <v-divider v-if="workoutList" style="margin-bottom:15px"></v-divider>

    <h2 style="margin-bottom: 10px">Exercise List</h2>
    
    <v-card class="exercise-card">
      <v-list two-line>
        <template v-for="(item, index) in exerciseList">
          <v-subheader v-if="item.header" :key="item.header">
            {{ item.header }}
          </v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :style="isDesktop ? 'margin-left:220px' : 'margin-left:125px'" style="border-width: thin 3px 1px 3px;" :inset="item.inset"></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar :width="isDesktop ? '192px' : '96px'" :height="isDesktop ? '108px' : '54px'" style="border-radius: 0px !important">
              <img :src="item.avatar">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title :style="isDesktop ? 'font-size : 1.5rem' : '1rem' " v-html="item.title"></v-list-item-title>
              <!-- <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle> -->
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-icon :class="checkList(item) ? 'hasList' : ''" @click="addListExercise(item)" style="margin-right:10px" :style="isDesktop ? 'font-size : 40px' : 'font-size : 24px'">mdi-plus-circle-outline</v-icon>

            <v-icon @click="openPopup(item)" :style="isDesktop ? 'font-size : 40px' : 'font-size : 24px'">mdi-play-circle-outline</v-icon>
            
          </v-list-item>
        </template>
      </v-list>
    </v-card>


    <v-dialog v-model="getFilterDialog" persistent max-width="600px" >
      <app-muscle-filters></app-muscle-filters>
    </v-dialog>

    <v-dialog v-model="getExercisePopupDialog" persistent max-width="1200px" >
      <app-exercise-popup :item="exercise"></app-exercise-popup>
    </v-dialog>

  </div>
</template>

<script>
import muscleFilters from '../bodyPathFilters.vue'
import exercisePopup from '../exercisePopup.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components : {
    appMuscleFilters : muscleFilters,
    appExercisePopup : exercisePopup
  },
  data : function(){
    return {
      model : null,
      exercise : null,
      isDesktop : true,
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
        { divider: true, inset: true },
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
        { divider: true, inset: true },
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
        { divider: true, inset: true },
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
        { divider: true, inset: true },
        { 
          title : 'Chair Pose', 
          avatar : 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/chair-pose.jpg',
          difficulty : 3,
          equipment : 'none',
          impact_level : 'normal',
          category : 'yoga',
          stance : 'standing',
          focus_area : ['deltoids','lats','triceps','hamstring','quads'],
          video : 'https://storage.googleapis.com/sworkit-assets/video/ios/chair-pose.mp4'
        },
      ],
      workoutList : null
    }
  },
  computed : {
    ...mapGetters(['getFilterDialog','getExercisePopupDialog'])
  },
  methods : {
    ...mapMutations(['updateExerciseDialog']),
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
    }
  },
  mounted(){
       
    document.querySelectorAll('.v-list-item__content').forEach(element => {
      element.style.cssText = "flex : unset"
    })
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

  .v-list-item_content {
    flex: unset;
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

</style>