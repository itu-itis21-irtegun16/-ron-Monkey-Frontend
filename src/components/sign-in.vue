<template>
    <v-card light class="sign-card" :class="{cardSize : isDesktop }">
         <v-img
            class="white--text align-end"
            height="200px"
            src="https://picsum.photos/1920/1080?random"
            lazy-src
            style="margin-bottom: 20px"
        >
        </v-img>
        <v-alert type="error" v-model="alert" dismissible >
            {{errorMessage}}
        </v-alert>
        <form>
            <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn :disabled="disableCheck" color="green" class="mr-4 submit-clear-button" @click="submit">submit</v-btn>
            <v-btn color="red" class="submit-clear-button" @click="clear">clear</v-btn>
        </form>
        

        <v-card-actions class="card-actions">
            <router-link to="/register" style="text-decoration: none">
                <v-btn >Create a new account</v-btn>
            </router-link>
        </v-card-actions>
        <v-checkbox v-model="deneme"></v-checkbox>
        
    </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
    name: 'sign-in',
    mixins: [validationMixin],
    validations: {
      email: { required, email },
    },

    data: () => ({
        deneme: false,
        email: '',
        show1: false,
        password: '',
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
        },
        isSignIn: true,
        isDesktop: true,
        alert: false,
        errorMessage: '',
    }),

    computed : {
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        disableCheck(){
            if(this.emailErrors.length > 0 || this.password == '') return true
            return false;
        }
    },
    methods : {
        ...mapMutations([
            'setUser',
            'setToken'
        ]),
        submit : function(){
            this.$v.$touch();
            let user = {
                email : this.email,
                password : this.password
            }

            this.$axios.post('http://3.144.72.23:3000/sign-in', user)
                .then(res =>{
                    if(res.status === 200){
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user', JSON.stringify(res.data.user))
                        this.setUser(res.data.user);
                        this.setToken(res.data.token);
                        this.$router.push('/')
                    }
                }, err =>{
                    if(err.response.status === 401){
                        var errorData = err.response.data;
                        if(errorData.title == 'wrong password'){
                            this.alert = true;
                            this.errorMessage = 'Wrong Password'
                            setTimeout(() => {
                                this.alert = false;
                                this.errorMessage = ''
                            }, 4000);
                        }else{
                            this.alert = true;
                            this.errorMessage = 'User Not Found'
                            setTimeout(() => {
                                this.alert = false;
                                this.errorMessage = ''
                            }, 4000);
                        }
                    }
                })
        },
        clear : function(){
            this.$v.$reset()
            this.email = '',
            this.password = ''
        },
        
    },
    created : function(){
        if(this.$isMobile()){
            this.isDesktop = false
        }
    },
}
</script>

<style scoped>
    .sign-card{
        padding: 20px;
        
    }

    .cardSize{
        margin: auto;
        width: 50%;
    }

    .card-actions{
        justify-content: center;
        margin: 20px;
    }

    .submit-clear-button{
      width: 47%;
      margin-top: 12px;
    }
</style>