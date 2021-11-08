<template>
  <v-card class="overflow-hidden" :class="isDesktop == true ? 'profile-card' : 'profile-card-mobile'" color="grey lighten-1" dark>
    <v-toolbar flat color="purple"> 
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        User Profile
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing" >
        <v-icon v-if="isEditing">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
        <v-text-field class="form-input" v-model="user.firstname" disabled color="white" label="Firstname"></v-text-field>

        <v-text-field class="form-input" v-model="user.lastname" disabled color="white" label="LastName" ></v-text-field>

        <v-text-field class="form-input" v-model="user.email" disabled color="white" label="Email" ></v-text-field>

        <v-text-field class="form-input"  v-model="user.password" disabled color="white" label="Password" ></v-text-field>

        <v-select v-model="user.gender" :items="items" label="Gender" :disabled="!isEditing" ></v-select>

        <v-text-field prepend-icon="mdi-cake" class="form-input"  v-model="convertDate" disabled color="white" label="Birthday" ></v-text-field>
        
        <v-text-field class="form-input"  v-model="user.wight" :disabled="!isEditing" color="white" suffix= "kg" label="Weight"></v-text-field>
        
        <div style="margin-bottom:15px" class="age" v-if="user.birthday"> Age : {{calculateAge}}  </div>
        
        <v-text-field class="form-input"  v-model="user.tall" :disabled="!isEditing" color="white" suffix= "cm" label="Tall "></v-text-field>

    </v-card-text>


    <v-divider></v-divider>

    <v-card-actions color="purple">
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="success" @click="save" >
        Save
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left >
      Your profile has been updated
    </v-snackbar>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(40) },
      lastname: { required, maxLength: maxLength(40) },
      email: { required, email },
      select: { required },
      
    },
    data () {
      return {
        hasSaved: false,
        isEditing: null,
        isDesktop : true,
        model: null,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
        items: [
            'Female',
            'Male',
            'Others',
        ],
        modal: false,
      }
    },
    computed : {
        ...mapGetters({
            user : 'userInfo'
        }),
        calculateAge: function() {
            let currentDate = new Date();
            let birthDate = new Date(this.user.birthday);
            let difference = currentDate - birthDate;
            let age = Math.floor(difference/31557600000);
            return age
        },
        convertDate(){
            return this.user.birthday.split('T')[0];
        },
    },
    methods: {
        
        save () {
            const updateUser = {
                'gender' : this.user.gender,
                'tall' : this.user.tall,
                'weight' : this.user.wight,
                'user_id' : this.user._id
            }
            this.$store.dispatch("updateUser",updateUser)
            this.isEditing = !this.isEditing
            this.hasSaved = true
            var user =  JSON.parse(localStorage.getItem('user'));
            user.wight = updateUser.weight;
            user.tall = updateUser.tall;
            user.gender = updateUser.gender;
            localStorage.setItem('user', JSON.stringify(user))
        },
    },
    created : function(){
        if(this.$isMobile()){
            this.isDesktop = false
        }
    }
  }
</script>

<style scoped>
    .profile-card {
        width: 65%;
        margin: 30px auto;
    }

    .profile-card-mobile{
        width: 90%;
        margin: 20px auto;
    }

    .form-input{
        font-size: 20px;
    }
</style>