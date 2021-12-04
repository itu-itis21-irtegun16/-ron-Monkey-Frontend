<template>
    <v-card dark class="exercise-popup-card">
        <v-card-title class="justify-center title">{{item.title}}</v-card-title>

        <div :style="!isDesktop ? 'display : unset' : ''" class="exercise-wrapper">

            <div class="right-column">
                <video :style="!isDesktop ? 'width:100%' : ''" class="exercise-video" :src="item.video" loop autoplay playsinline></video>
            </div>

            <div class="left-column">
                <div :style="!isDesktop ? 'grid-column-gap : 12px' : '' " class="exercise-details">
                    <v-card light class="exercise-features">
                        <v-card-title class="justify-center box-title">Difficulty</v-card-title>
                        
                        <v-card-subtitle class="sub-title">
                            <v-icon color="red" v-for="n in item.difficulty" :key="n">
                                mdi-fire
                            </v-icon>
                        </v-card-subtitle>
                    </v-card>

                    <v-card light class="exercise-features">
                        <v-card-title class="justify-center box-title">Equipment</v-card-title>
                        <v-card-subtitle class="sub-title">{{item.equipment}}</v-card-subtitle>
                    </v-card>

                    <v-card light class="exercise-features">
                        <v-card-title class="justify-center box-title">Impact Level</v-card-title>
                        <v-card-subtitle class="sub-title">{{item.impact_level}}</v-card-subtitle>
                    </v-card>

                    <v-card light class="exercise-features">
                        <v-card-title class="justify-center box-title">Category</v-card-title>
                        <v-card-subtitle class="sub-title">{{item.category}}</v-card-subtitle>
                    </v-card>

                    <v-card light class="exercise-features">
                        <v-card-title class="justify-center box-title">Stance</v-card-title>
                        <v-card-subtitle class="sub-title">{{item.stance}}</v-card-subtitle>
                    </v-card>

                    <v-card light class="exercise-features">
                        <v-card-title class="justify-center box-title">Focus Area</v-card-title>
                        <v-card-subtitle class="sub-title text-overflow-class">
                            <p style="margin-bottom:0px;margin-right:5px;text-transform:capitalize;display:inline-block" v-for="n in item.focus_area" :key="n">{{n}}</p>
                             <v-dialog v-model="getHoverEffectDialog" persistent max-width="600px">
                                <app-body-path-filters :items="hoverMuscle"></app-body-path-filters>
                            </v-dialog>
                        </v-card-subtitle>
                    </v-card>

                </div>
            </div>



        </div>


        <v-divider style="margin:15px 0px"></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn light @click="closePopup()">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import bodyPathFilters from './bodyPathHover.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
    name : 'exercise-popup',
    props : [
        'item'
    ],
    components : {
        appBodyPathFilters : bodyPathFilters
    },
    data : function () {
        return {
            isDesktop : true,
            hoverEffect :  false,
            focusArea : null,
            hoverMuscle : {
                biceps : false,
                deltoids : false,
                forearms : false,
                triceps : false,
                trapezius : false,
                lats : false,
                abs : false,
                obliques : false,
                pectorals : false,
                adductors : false,
                calves : false,
                hamstrings : false,
                glutes : false,
                quads : false,
            },
        }
    },
    computed : {
        ...mapGetters(['getHoverEffectDialog'])
    },
    methods : {
        ...mapMutations(['updateExerciseDialog', 'updateHoverEffectDialog']),
        closePopup(){
            this.hoverMuscle = {
                biceps : false,
                deltoids : false,
                forearms : false,
                triceps : false,
                trapezius : false,
                lats : false,
                abs : false,
                obliques : false,
                pectorals : false,
                adductors : false,
                calves : false,
                hamstrings : false,
                glutes : false,
                quads : false,
            }
            this.updateExerciseDialog();
        },
        openPopup(val){
            val.forEach(element => {
                this.hoverMuscle[element] = true;
            });
            this.updateHoverEffectDialog();
        },
        mouseOver(){
            this.openPopup(this.item.focus_area)
        },
    },
    mounted(){
        var focus_area = document.querySelectorAll('.exercise-features.v-card.v-sheet.theme--light')[5];
        focus_area.addEventListener("mouseover", this.mouseOver);
    },
    created(){
        if(this.$isMobile()){
            this.isDesktop = false
        }
    }
    
}
</script>

<style scoped>

    .v-dialog__content >>> .v-dialog{
        box-shadow: unset;
    }

    .exercise-popup-card{
        border-radius: 20px;
        padding: 25px;
    }

    .exercise-wrapper{
        display: flex;
        flex-direction: row-reverse;
    }

    .exercise-video{
        width: 600px;
        border-radius: 6px;
    }

    .title{
        font-size: 30px !important;
        margin-bottom: 15px;
    }

    .box-title{
        padding-bottom: 0px;
        font-size: 16px;
    }

    .exercise-features{
        width: 250px;
        height: 104.5px;
        border-radius: 6px;
    }

    .right-column{
        flex: 1;
    }

    .left-column{
        flex: 1;
    }

    .exercise-details{
        display: grid;
        grid-column-gap: 0px;
        grid-row-gap: 12px;
        grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    }

    .sub-title {
        margin: auto;
        text-align: center;
        padding: 6px;
        text-transform: capitalize;
    }

    .text-overflow-class {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>