<template>
    <v-card class="sign-card"  light :class="{cardSize : isDesktop }">
        <v-img
            class="white--text align-end"
            height="200px"
            src="https://picsum.photos/1920/1080?random"
            lazy-src
            style="margin-bottom: 20px"
        >
        </v-img>
        <v-card-title style="padding: 0; font-size: 1em; font-weight:500;">We will be happy to see you amoung us.</v-card-title>

        <form style="margin-bottom: 20px;">
            <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="40"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            ></v-text-field>

             <v-text-field
            v-model="lastname"
            :error-messages="lastNameErrors"
            :counter="40"
            label="Lastname"
            required
            @input="$v.lastname.$touch()"
            @blur="$v.lastname.$touch()"
            ></v-text-field>

            <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
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

            <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            label="Gender"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
            ></v-select>

            <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Birthday"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                light
                reactive
                v-model="date"
                scrollable
                >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(date)"
                >
                    OK
                </v-btn>
                </v-date-picker>
            </v-dialog>
            
            <div class="age" v-if="date"> Age : {{calculateAge}}  </div>
            
            <v-text-field
              v-model="weight"
              label="Weight"
              suffix= "kg"
            ></v-text-field>

            <v-text-field
              v-model="tall"
              label="Tall"
              suffix="cm"
            ></v-text-field>
            

            <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn color="green" class="mr-4 submit-clear-button" @click="submit">submit</v-btn>
            <v-btn color="red" class="submit-clear-button" @click="clear">clear</v-btn>
        </form>
        
        <v-card-actions class="is-user">
          <router-link to="/sign-in" style="text-decoration: none">
            <v-btn>Already have an account</v-btn>
          </router-link>
        </v-card-actions>
    </v-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'


  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(40) },
      lastname: { required, maxLength: maxLength(40) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
        name: '',
        lastname: '',
        email: '',
        select: null,
        weight: null,
        tall: null,
        items: [
        'Female',
        'Male',
        'Others',
        ],
        checkbox: false,
        date: null, 
        modal: false,
        show1: false,
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
        isDesktop : true
    }),
    

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Gender is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 40 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      lastNameErrors () {
        const errors = []
        if (!this.$v.lastname.$dirty) return errors
        !this.$v.lastname.maxLength && errors.push('Lastname must be at most 40 characters long')
        !this.$v.lastname.required && errors.push('Lastname is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      calculateAge: function() {
        let currentDate = new Date();
        let birthDate = new Date(this.date);
        let difference = currentDate - birthDate;
        let age = Math.floor(difference/31557600000);
        return age
      }
    },

    methods: {
      submit () {
        this.$v.$touch();
        let newUser = {
          firstname : this.name,
          lastname : this.lastname,
          password : this.password,
          email : this.email,
          gender : this.select,
          birthday : this.date,
          weight : this.weight,
          tall : this.tall
        }
        this.$axios.post('http://3.139.54.157:8080/register', newUser)
          .then(res => {
            if(res.status == 200){
              this.$router.push('/sign-in');
            }
          }, err =>{
            console.log(err.response)
          })
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.lastname = ''
        this.email = ''
        this.select = null,
        this.date = null    ,
        this.checkbox = false,
        this.weight = null,
        this.tall = null,
        this.password = ''
      }
    },
    created : function(){
        if(this.$isMobile()){
            this.isDesktop = false
        }
    }
  }
</script>

<style scoped>
    .sign-card {
        padding: 20px;
    }

    .cardSize{
        margin: auto;
        width: 50%;
    }

    .age{
      margin-bottom: 10px;
    }

    .is-user{
      justify-content: center;
    }

    .submit-clear-button{
      width: 47%;
    }
</style>