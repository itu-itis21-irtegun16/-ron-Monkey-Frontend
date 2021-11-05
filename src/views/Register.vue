<template>
    <v-container>
        <register> </register>
        <router-view/>
    </v-container>
</template>

<script>
import register from '../components/register.vue'

export default {
    name : 'Register',
    components : {
        register
    }
}
</script>