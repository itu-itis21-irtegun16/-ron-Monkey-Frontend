<template>
    <v-container>
        <v-toolbar dark color="blue darken-3" class="mb-1">
            <template>
                <v-select class="mr-2" v-model="sortBy" solo-inverted append-icon="mdi-arrow-down-left" hide-details :items="keys" persistent-placeholder placeholder="Sort By"></v-select>
                <v-spacer></v-spacer>
                <v-btn-toggle  class="mr-2" v-model="sortDesc" mandatory >
                    <v-btn :large="isDesktop" depressed color="blue" :value="false">
                        <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn :large="isDesktop" depressed color="blue" :value="true">
                        <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                </v-btn-toggle>
                <v-spacer></v-spacer>
                <v-icon @click="sortedArray(sortBy,sortDesc)">mdi-filter</v-icon>
            </template>
        </v-toolbar>
        <v-row style="margin-top: 10px">
            <v-col v-if="isDesktop" sm="8">
                <app-wise-saying :getMessageList="getMessageList"></app-wise-saying>
            </v-col>
            <v-col v-else sm="12">
                <app-wise-saying :getMessageList="getMessageList"></app-wise-saying>
            </v-col>
            <v-col sm="4" v-if="isDesktop">
                <app-new-saying></app-new-saying>
            </v-col>
        </v-row>
        <app-new-saying-mobile v-if="!isDesktop"></app-new-saying-mobile>
    </v-container>
</template>

<script>
import wiseSaying from '../components/wise-saying.vue'
import newSaying from '../components/newSaying.vue'
import speedDial from '../components/newSaying-mobile.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'wise-saying',
    components : {
        appWiseSaying : wiseSaying,
        appNewSaying : newSaying,
        appNewSayingMobile : speedDial
    },
    computed : {
         ...mapGetters({
            userInfo : 'userInfo',
            getMessageList: 'getMessageList',

        }),
        
    },
    data : function(){
        return {
            isDesktop : true,
            sortBy: '',
            keys : [
                'Like',
                'Dislike',
                'Date'
            ],
            sortDesc: false,
        }
    },
    methods:{
        sortedArray: function(value,sortable) {
            function compare(a, b) {
                switch (value) {
                    case 'Like':
                        if(sortable){
                            if (a.like.length < b.like.length) return 1;
                            if (a.like.length > b.like.length) return -1;
                        }else {
                            if (a.like.length < b.like.length) return -1;
                            if (a.like.length > b.like.length) return 1;
                        }
                        break;
                    case 'Dislike':
                       if(sortable){
                            if (a.dislike.length < b.dislike.length) return 1;
                            if (a.dislike.length > b.dislike.length) return -1;
                        }else {
                            if (a.dislike.length < b.dislike.length) return -1;
                            if (a.dislike.length > b.dislike.length) return 1;
                        }
                        break;
                    case 'Date':
                        if(sortable){
                            if (a.createdAt < b.createdAt) return 1;
                            if (a.createdAt > b.createdAt) return -1;
                        }else {
                            if (a.createdAt < b.createdAt) return -1;
                            if (a.createdAt > b.createdAt) return 1;
                        }
                        break;
                    default:
                        break;
                }
            }
            return this.getMessageList.sort(compare)
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

</style>