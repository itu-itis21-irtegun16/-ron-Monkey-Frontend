<template>
    <div>
        <v-card class="mx-auto" :color="message.color" :class="{'special-color' : message.color == 'special-color'}" dark  v-for="(message,index) in getMessageList" :key="index" style="margin-bottom: 20px">
            <v-card-title>
                <v-icon large left> mdi-message-text</v-icon>
                <span class="text-h6 font-weight-light">Iron Monkey</span>
            </v-card-title>
            
            <v-card-text class="text-h5 font-weight-bold">
                {{message.message}} 
            </v-card-text>

            <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                        <v-list-item-title>{{message.firstname}} {{message.lastname}}</v-list-item-title>
                        <v-list-item-title>{{calculateTime(index)}}</v-list-item-title>
                </v-list-item-content>


                <v-row align="center" justify="end">
                    <v-icon  @click="like(index)" class="mr-1 like-button" :class="{liked : checkLike(index)}"> mdi-heart</v-icon>
                    <span class="subheading mr-2">{{ message.like.length - 1 }} </span>
                    <span class="mr-1">·</span>
                    <v-icon  @click="dislike(index)" class="mr-1 dislike-button" :class="{disliked : checkDislike(index)}">mdi-thumb-down</v-icon>
                    <span class="subheading">{{ message.dislike.length - 1 }}</span>
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>
    </div>

</template>

<script>
import {mapGetters} from 'vuex'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en.json'


TimeAgo.setDefaultLocale(en)

export default {
    name : 'wise-saying',
    props : [
        'getMessageList'
    ],
    data : function() {
        return{
           
        }
    },
    computed : {
         ...mapGetters({
            userInfo : 'userInfo',
        }),
        
    },
    watch : {
        },
    methods : {
        calculateTime(index){
            const timeAgo = new TimeAgo('en')
            return timeAgo.format(new Date(this.getMessageList[index].createdAt))
        },
        like(index){
            var packet = {
                'isLiked' : this.checkLike(index),
                'isDisliked' : this.checkDislike(index),
                'user_id' : this.userInfo._id,
                'message' : this.getMessageList[index],
                'type' : 'like',
                'message_id' : this.getMessageList[index]._id
            }
            this.$store.dispatch("addLikeOrDislikeAction", packet);
        },
        dislike(index){
            var packet = {
                'isLiked' : this.checkLike(index),
                'isDisliked' : this.checkDislike(index),
                'user_id' : this.userInfo._id,
                'message' : this.getMessageList[index],
                'type' : 'dislike',
                'message_id' : this.getMessageList[index]._id
            }
            this.$store.dispatch("addLikeOrDislikeAction", packet);
        },
        checkLike(index){
            var check = false;
            const user = this.userInfo;
            const messageListBox = this.getMessageList[index].like;
            
            if(messageListBox)
            {
                messageListBox.forEach(element => {
                    if(element.id == user._id){
                        check = true;
                    }
                });
            }
            return check;
        },
        checkDislike(index){
            var check = false;
            const user = this.userInfo;
            const messageListBox = this.getMessageList[index].dislike;
            if(messageListBox)
            {
                messageListBox.forEach(element => {
                    if(element.id == user._id){
                        check = true;
                    }
                });
            }
            return check;
        },
    },
    created() {
        this.$store.dispatch("initMessageList")
    },
}
</script>

<style scoped>
    .liked {
        color: red;
    }

    .disliked {
        color: brown;
    }

    .v-icon::after {
        content: unset;
    }
    
    .subheading{
        margin-left: 10px;
    }

    .renk{
        background: -webkit-linear-gradient(left, grey, grey 30%, green 30%, white);
    }

    .special-color {
        background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet) !important;
    }

    .v-list-item__content {
        flex: 2;
    }
</style>