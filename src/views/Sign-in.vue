<template>
    <v-container>
        <sign-in></sign-in>
        <router-view/>
    </v-container>
</template>

<script>
import signIn from '../components/sign-in.vue'

export default {
    name : 'Sign-in',
    components : {
        signIn
    }
}
</script>