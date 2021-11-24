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
                        <v-card-subtitle class="sub-title">
                            <span style="margin-right:5px" v-for="n in item.focus_area" :key="n">{{n}}</span>
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
import { mapMutations } from 'vuex'
export default {
    name : 'exercise-popup',
    props : [
        'item'
    ],
    data : function () {
        return {
            isDesktop : true
        }
    },
    methods : {
        ...mapMutations(['updateExerciseDialog']),
        closePopup(){
            this.updateExerciseDialog();
        }
    },
    mounted(){
    },
    created(){
        if(this.$isMobile()){
            this.isDesktop = false
        }
    }
    
}
</script>

<style scoped>
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
    }
</style>