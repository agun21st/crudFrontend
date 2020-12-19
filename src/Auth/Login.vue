<template>
  <v-app class="login" style="background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);">
    <v-main>
      <v-container
        class=""
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="12"
            lg="6"
            style="display:flex; justify-content: center;"
          >
            <!-- Login Card -->
            <v-card 
              class="elevation-12 mt-16"
              width="500">
              <v-toolbar
                color="#202c45"
                dark
                flat
              >
                <v-toolbar-title>
                  User Login
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  WebDevs CRUD APP
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <!-- Login form -->
                <v-form
                  ref="form"
                  v-model="valid"
                  @submit.prevent="login"
                  aria-autocomplete="off"
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    prepend-icon="mdi-account-circle-outline"
                    autofocus
                    color="#ee6e52"
                    @focus="$event.target.select()"
                    aria-autocomplete="off"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="show3 ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    v-model="password"
                    @click:append="show3 = !show3"
                    prepend-icon="mdi-account-lock-outline"
                    color="#ee6e52"
                    @focus="$event.target.select()"
                    aria-autocomplete="off"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn
                    :disabled="!valid"
                    color="teal"
                    class="white--text"
                    type="submit"
                    @click="validate"
                    :loading="loginBtnLoading"
                    >
                    Login
                    </v-btn>
                  <v-spacer></v-spacer>
                    <v-btn
                      color="#ee6e52"
                      class="text-decoration-none"
                      router
                      to='/register'
                      text
                    >
                      Register
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- Loading modal -->
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="teal"
        dark
      >
        <v-card-text>
          Login is processing ..
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :color="loginMode"
      >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
  import axios from 'axios';
  import User from '../Helpers/User';
  export default {
    data: () => ({
      multiLine: true,
      snackbar: false,
      message: '',
      loginMode: '',
      loginBtnLoading: false,
      valid: true,
      checkbox: false,
      dialog: false,
      text: '',
      errors: '',
      email: '',
      userToken: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      show3: false,
      password: '',
      passwordRules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
    }),
    created(){ 
      if(User.loggedIn())
      {
        this.$router.push({name : 'Home'}).catch(()=>{})
      }else if(localStorage.getItem("logoutNow") == "logout"){
        this.message = 'You are Logged out. Please Login'
        this.loginMode = 'warning'
        this.snackbar = true
        localStorage.removeItem("logoutNow")
      }else if(localStorage.getItem("registerNow") == "registered"){
        this.message = 'Now you are a registered user. Please Login'
        this.loginMode = 'success'
        this.snackbar = true
        localStorage.removeItem("registerNow")
      }
    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
      },
    },
    computed: {
      
    },
    methods: {
      validate () {
        this.$refs.form.validate();
      },
      login: function(){
        // Add a request interceptor
        axios.interceptors.request.use( (config) => {
          this.dialog = true;
          this.loginBtnLoading = true;
          return config;
        }, (error) => {
          this.dialog = false;
          this.loginBtnLoading = false;
          return Promise.reject(error);
        });
        // Add a response interceptor
        axios.interceptors.response.use( (response) =>{
          this.dialog = false;
          this.loginBtnLoading = false;
          return response;
        }, (error) => {
          this.dialog = false;
          this.loginBtnLoading = false;
          return Promise.reject(error);
        });
        axios.post('http://localhost:8000/api/login', {'email' : this.email, 'password' : this.password})
        .then(res => {
          User.responseAfterLogin(res.data.success)
          // this.$store.commit("setCurrentUser", res.data.success.user)
          // this.$store.commit("setUserTradeAccount", res.data.success.userTradeAccount)
          // if(res.data.success.userFinance != ''){
          //   this.$store.commit("setCurrentFinance", res.data.success.userFinance)
          // }
          // if((this.$store.state.userInfo[0].role == 'Super_Admin') || (this.$store.state.userInfo[0].role == 'Admin')){
          //   this.$store.commit("setAllUser", res.data.success.allUser)
          //   this.$store.commit("setAllTradeAccount", res.data.success.allTradeAccount)
          //   if(res.data.success.myFxBook != ''){
          //     this.$store.commit("setMyFxBook", res.data.success.myFxBook)
          //   }
          //   this.$router.push({name : 'Admin'})
          // }else{
          //   this.$store.commit("setTradeInfo", res.data.success.lastFullTradeInfo)
          //   this.$router.push({name : 'User'})
          // }
          // console.log(res.data.success)
          localStorage.setItem("loginNow", "loggedIn")
          this.$router.push({name : 'Home'}).catch(()=>{})
        })
        .catch(err => {
          if(err.response)
          {
            this.message = 'Invalid Email or Password!'
            this.loginMode = 'error'
            this.snackbar = true
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