<template>
  <v-app class="register registerPage" style="background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);">
    <v-main>
      <v-container
        class=""
        fluid
      >
        <v-row 
        >
          <v-col
            cols="12"
            class="d-flex justify-center align-center mt-16"
          >
            <!-- Registration form -->
            <v-card class="elevation-12" width="450">
              <v-toolbar
                color="#202c45"
                dark
                flat
              >
                <v-toolbar-title>
                  Register Form
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  CRUD APP
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                >
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field
                        v-model="name"
                        :counter="30"
                        :rules="[nameRules.required]"
                        label="Full Name*"
                        required
                        prepend-icon="mdi-account-tie"
                        color="#ee6e52"
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail*"
                        required
                        prepend-icon="mdi-email-check"
                        color="#ee6e52"
                        @blur="emailCheck"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[passwordRules.required, passwordRules.min]"
                        :type="show3 ? 'text' : 'password'"
                        v-model="password"
                        label="Password*"
                        hint="At least 8 characters"
                        prepend-icon="mdi-account-lock-outline"
                        @click:append="show3 = !show3"
                        color="#ee6e52"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="">
                <v-btn
                  :disabled="!valid"
                  color="teal"
                  class="white--text ml-3"
                  type="submit"
                  @click.prevent="register"
                  :loading="regiBtnLoader"
                >
                  Register
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="#ee6e52"
                    class="text-decoration-none mr-3"
                    router
                    to='/login'
                    text
                  >
                    Login
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- loading modal -->
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="#ee6e52"
        dark
      >
        <v-card-text>
          Registration is processing ..
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>


<script>
  import axios from 'axios';
  import User from '../Helpers/User';
  export default {
    data: () => ({
      dialog: false,
      regiBtnLoader: false, 
      valid: true,
      imessenger: 'Skype',
      traderType: 'Experienced',
      otpTextColor: 'teal',
      securityCode: '',
      name: '',
      userOtpCode: '',
      sixDigitNumber: '',
      doNotRefresh: 'Do no refresh this page.',
      registerData: [],
      nameRules: {
        required: value => !!value || 'Required.'
      },
      otpRules: {
        required: value => !!value || 'Required.'
      },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      show3: false,
      password: '',
      passwordRules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      checkbox: false,
      messengerId: '',
      country: '',
      refId: 0,

    }),
    created(){
      if(User.loggedIn())
      {
        this.$router.push({name : 'Home'}).catch(()=>{})
      }
    },
    mounted() {

      if(this.$route.params.refId > 0){

        this.refId = this.$route.params.refId

      }
    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
      },
    },
    computed: {
      form () {
        return {
          country: this.country,
        }
      },
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      emailCheck: function(){
        let formData = new FormData();
        formData.append('email', this.email);
        axios.post('http://localhost:8000/api/emailCheck', formData, {})
        .then(res => {
          if(res.data.error){
            alert(res.data.error);
            console.log(res.data.error);
            this.email = ''
            return
          }else{
            console.log(res.data);
          }
        })
        .catch(err => {
            // this.snackbar = true;
            if(err.response)
            {
              // Toast.fire({
              //   icon: 'error',
              //   title: 'Invalid Email or Password!'
              // }),
              this.message = 'Invalid Email or Password!'
              this.loginMode = 'error'
              this.snackbar = true
              this.errors = err.response.data.error,
              console.log(err.response.data);
            }
        })
      },
      register: function(){
        // Add a request interceptor
        axios.interceptors.request.use( (config) => {
            this.dialog = true;
            this.regiBtnLoader = true;
            this.valid = false;
            return config;
        }, (error) => {
            this.dialog = false;
            this.regiBtnLoader = false;
            this.valid = true;
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use( (response) =>{
            this.dialog = false;
            this.regiBtnLoader = false;
            this.valid = true;
            return response;
        }, (error) => {
            this.dialog = false;
            this.regiBtnLoader = false;
            this.valid = true;
            return Promise.reject(error);
        });

        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('password', this.password);

        axios.post('http://localhost:8000/api/register', formData, {})
        .then(res => {

          if(res.data.error){
            alert(res.data.error);
            console.log(res.data.error);
            return
          }else{
            localStorage.setItem("registerNow", "registered")
            this.$router.push({name : 'Login'}).catch(()=>{})
          }
            
        })
        .catch(err => {
            // this.snackbar = true;
            if(err.response)
            {
              this.errors = err.response.data.error,
              console.log(err.response.data);
            }
        })
      }
    },
  }
</script>

<style>

</style>