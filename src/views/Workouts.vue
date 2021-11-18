<template>
    <div>
        <v-container>
            <v-card dark :img="n.photo" :to="'workout' + n.route" class="custom-card" :class="{'mobile-card' : !isDesktop}" v-for="n in item" :key="n.name">
                <v-card-title class="justify-center custom-card-title" >
                    {{n.name}}
                </v-card-title>
            </v-card>
        </v-container>
    </div>
    
</template>

<script>
export default {
    name : 'workouts',
    data : function(){
        return {
            isDesktop : true,
            item : [
                { name : 'STRENGTH', route : '/strength' , photo : 'https://www.mensjournal.com/wp-content/uploads/mf/_main_strngman.jpg'},
                { name : 'YOGA', route : '/yoga' , photo : 'https://media.istockphoto.com/photos/woman-sitting-in-yoga-position-picture-id688086036?k=20&m=688086036&s=612x612&w=0&h=490ytT40j_ZF4r-2XN8SxZUHssJ7eK_6NA847gedrhk='},
                { name : 'STRETCHING', route : '/stretching' , photo : 'https://ak.picdn.net/shutterstock/videos/4536812/thumb/1.jpg'},
                { name : 'CARDIO', route : '/cardio' , photo : 'https://media.istockphoto.com/photos/below-view-of-athletic-people-cycling-on-stationary-bikes-in-a-gym-picture-id1199289629?k=20&m=1199289629&s=612x612&w=0&h=sfMrVneCO_W6UnJmx102KzNuicg90R7x_2DeBetSy4U='},
            ]
        }
    },
    methods : {
    },
    created(){
        if(this.$isMobile()) this.isDesktop = false
    }
}
</script>

<style scoped>
    .custom-card{
        width: 450px;
        height: 350px;
        border-radius: 10px;
        display: inline-block;
        margin: 30px 65px;
    }

    .mobile-card{
        width: 100%;
        height: 250px;
        border-radius: 10px;
        margin: 15px 0;
    }

    .custom-card-title{
        letter-spacing: 0.1125em;
        font-weight: bold;
        font-style: normal;
    }

</style>