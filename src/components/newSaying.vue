<template>
    <v-card class="custom-card">
        <v-icon @click="updateDialog" class="close-icon">mdi-close-thick</v-icon>
        <label class="title" >Say Something</label> 
        <v-textarea outlined clearable v-model="message" clear-icon="mdi-close-circle" style="margin-top: 5px"></v-textarea>
        <v-row justify="space-around" class="row-class">
            <v-chip-group mandatory light active-class="selected-color animate__animated animate__flash" v-model="selectedColor" >
                <v-chip text-color="white" filter @click="selectColor(index)" class="select-color" v-for="(item,index) in chipSelector" :key="item" :color="item" ></v-chip>

                <v-chip text-color="white" @click="selectColor(6)" filter class="select-color special-color"></v-chip>
            </v-chip-group>
        </v-row> 
        <v-card-actions class="card-action">
            <v-btn  outlined @click="sendEffect" class="animate__animated" :class="{animate__bounceOutRight : isSent}">
                <v-icon>mdi-send</v-icon>
                <span style="margin-left: 5px">SEND</span>
            </v-btn>
        </v-card-actions>
        
    </v-card>
    
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import "animate.css"

export default {
    name: 'newSaying',
    data : function(){
        return{
            message : '',
            user : null,
            chipSelector : [
                '#26c6da', '#000', '#006400', '#cd853f', '#ffc0cb', '#1c0f45'
            ],
            selectedColor : '#26c6da',
            isSent : false,
            isDesktop : true,
        }
    },
    computed : {
        ...mapGetters([
            'userInfo'
        ])
    },
    methods : {
        ...mapMutations(['updateDialog']),
        sendEffect(){
            this.isSent = true,
            this.sentMessage();
        },
        selectColor(index){
            if(index !=5) this.selectedColor = this.chipSelector[index];
            else this.selectedColor = 'special-color'
        },
        sentMessage(){
            const user = this.userInfo
            const packet = {
                'user' : user._id,
                'message' : this.message,
                'color' : this.chipSelector[this.selectedColor] || 'special-color'
            }
            this.$store.dispatch("saveNewMessage", packet);
            setTimeout(() => {
                this.isSent = false
                this.message = ''
                this.updateDialog();
            }, 1000);
        }
    },
    created() {
      if(this.$isMobile()){
        this.isDesktop = false
      }
    }
}
</script>

<style scoped>

    .custom-card{
        padding: 20px;
        text-align: center;
        justify-content: center;
        position: sticky;
        top: 85px;
    }

    .title{ 
        font-size: 16px;
        font-weight: bold;
    }

    .v-icon::after {
        content: unset;
    }

    button.v-icon.notranslate.v-icon--link.mdi.mdi-send.theme--light:hover {
        color: blue;
    }

    .select-color{
        width: 27px;
        height: 27px;
        border: 1px solid gray;
        border-color: gray !important;
    }
    .v-chip-group .v-chip {
        margin: 4px 3px 4px 3px;
    }

    .special-color {
        background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet) !important;
    }

    .filter{
        color: white;
    }

    .img-class {
        position: absolute;
        opacity: 0.1;
        background-size: contain;
    }

    .card-action{
        margin-top: 10px;
        justify-content: center;
    }

    .close-icon{
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 24px;
        padding: 5px;
        color: darkred;
    }
</style>