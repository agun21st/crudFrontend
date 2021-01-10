<template>
  <v-app class="login">
    <video autoplay muted loop>
          <source :src="'/videos/Login.mp4'" type="video/mp4">
    </video>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="12"
            md="4"
          >
            <v-card class="elevation-12" v-show="loginCard">
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
                  <!-- <v-img :src="'/img/Logo/Ai_Logo.png'" width="160"></v-img> -->
                  Forex Stick Affiliates
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  @submit.prevent="login"
                  autocomplete
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
                    autocomplete
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
                    autocomplete
                  ></v-text-field>
                  <!-- <small class="cyan accent-4 text-white p-2" v-if="errors != ''">{{ errors }}</small> -->
                  <v-card-actions>
                    <v-btn
                    color="#ee6e52"
                    class="text-decoration-none"
                    router
                    to='/register'
                    text
                  >
                    Register
                  </v-btn>
                  <v-spacer></v-spacer>
                    <v-btn text color="teal" @click="forgetPasswordBtn" small>
                      Forget Password?
                    </v-btn>
                    <v-btn
                    :disabled="!valid"
                    color="teal"
                    class="white--text"
                    type="submit"
                    @click="validate"
                    :loading="loginBtn"
                  >
                    Login
                  </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
            <!-- Forget Password Enter Email -->
            <v-card class="elevation-12" v-show="resetPass">
              <v-toolbar
                color="#202c45"
                dark
                flat
              >
                <v-toolbar-title>
                  Reset Password
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  <!-- <v-img :src="'/img/Logo/Ai_Logo.png'" width="160"></v-img> -->
                  Forex Stick Affiliates
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  @submit.prevent="holdResetPasswordByEmail"
                  autocomplete
                >
                  <v-text-field
                    v-model="resetEmail"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    prepend-icon="mdi-account-circle-outline"
                    autofocus
                    color="#ee6e52"
                    @focus="$event.target.select()"
                    autocomplete
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn
                    color="#ee6e52"
                    class=" text-decoration-none"
                    @click="forgetPasswordBtn"
                    text
                  >
                    Login
                  </v-btn>
                  <v-spacer></v-spacer>
                    <v-btn
                    :disabled="!valid"
                    color="teal"
                    class="white--text"
                    type="submit"
                    @click="validate"
                  >
                    Reset Password
                  </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
            <!-- OTP Dialog -->
            <v-card class="elevation-12" width="450" height="400" v-show="otpCard">
              <v-toolbar
                color="#202c45"
                dark
                flat
              >
                <v-toolbar-title>
                  Enter 6 Digit OTP
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  <!-- <v-img :src="'/img/Logo/Ai_Logo.png'" width="160"></v-img> -->
                  Forex Stick Affiliates
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text style="margin-top: 50px">
                <v-form
                  ref="form"
                  v-model="valid"
                > 
                  <v-card-text style="font-size: 20px">
                    Check Your Email Inbox / Spam Folder
                  </v-card-text>
                  <v-text-field
                    v-model="userOtpCode"
                    :rules="[otpRules.required]"
                    label="Enter 6 digit OTP Code"
                    required
                    prepend-icon="mdi-qrcode-edit"
                    color="#ee6e52"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-subtitle 
                :style="{color: otpTextColor, fontWeight: 600}" 
                class="mt-0 pt-0"
                v-text="doNotRefresh"
                >
                </v-card-subtitle>
              <v-card-actions class="">
                  <v-btn
                    :disabled="!valid"
                    color="#ee6e52"
                    class="white--text"
                    type="submit"
                    @click.prevent="openChangePasswordDialog"
                    block
                    large
                  >
                    Submit
                  </v-btn>
              </v-card-actions>
            </v-card>
            <!-- Enter New Password -->
            <v-card class="elevation-12" width="450" height="400" v-show="newPasswordCard">
              <v-toolbar
                color="#202c45"
                dark
                flat
              >
                <v-toolbar-title>
                  Enter New Password
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  <!-- <v-img :src="'/img/Logo/Ai_Logo.png'" width="160"></v-img> -->
                  aff.forexstick.com
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text style="margin-top: 50px">
                <v-form
                  ref="form"
                  v-model="valid"
                > 
                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="show3 ? 'text' : 'password'"
                    label="Enter New Password Here"
                    hint="At least 8 characters"
                    v-model="newPassword"
                    @click:append="show3 = !show3"
                    prepend-icon="mdi-account-lock-outline"
                    color="#ee6e52"
                    @focus="$event.target.select()"
                    autocomplete
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="">
                  <v-btn
                    :disabled="!valid"
                    color="#ee6e52"
                    class="white--text"
                    type="submit"
                    @click.prevent="changePassword"
                    block
                    large
                  >
                    Submit
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
  </v-app>
</template>

<script>
  import User from "../Helpers/User"
  export default {
    data: () => ({
      showClientIp: '',
      fullGeoLocation: '',
      multiLine: true,
      loginCard: true,
      resetPass: false,
      otpCard: false,
      newPasswordCard: false,
      snackbar: false,
      message: '',
      loginMode: '',
      valid: true,
      checkbox: false,
      dialog: false,
      loginBtn: false,
      text: '',
      errors: '',
      email: '',
      resetEmail: '',
      userToken: '',
      userOtpCode: '',
      newPassword: '',
      otpTextColor: 'teal',
      doNotRefresh: 'Do no refresh this page.',
      sixDigitNumber: '',
      otpRules: {
        required: value => !!value || 'Required.'
      },
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
      // // this.getClientIP()
      // if(User.loggedIn())
      // {
      //   // Toast.fire({
      //   //   icon: 'warning',
      //   //   title: 'You are already Logged in :)'
      //   // }),
      //   this.$router.push({name : '/'})
      // }
    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
      },
    },
    computed: {
      
    },
    mounted(){
    },
    methods: {
      // getClientIP(){
      //   fetch('https://api.ipify.org?format=json')
      //   .then(x => x.json())
      //   .then(({ ip }) => {
      //       this.showClientIp = ip;
      //   });
      //   fetch('https://geo.ipify.org/api/v1?apiKey=at_i9dr3uK3OLZ5JDUtdpyUkFCJpXBYl&ipAddress='+this.showClientIp)
      //   .then(res => res.json())
      //   .then(res => {
      //     this.fullGeoLocation = res
      //   })
      // },
      validate () {
        this.$refs.form.validate();
      },
      forgetPasswordBtn(){
        this.loginCard = !this.loginCard
        this.resetPass = !this.resetPass
      },
      holdResetPasswordByEmail(){

        this.sixDigitNumber = Math.floor(100000 + Math.random() * 900000)
        // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
            this.dialog = true;
            this.valid = false;
            return config;
        }, (error) => {
            this.dialog = false;
            this.valid = false;
            return Promise.reject(error);
        });
        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
            this.dialog = false;
            this.valid = false;
            return response;
        }, (error) => {
            this.dialog = false;
            this.valid = false;
            return Promise.reject(error);
        });
        let formData = new FormData();
        formData.append('email', this.resetEmail);
        formData.append('otpCode', this.sixDigitNumber);
        this.$axios.post('https://app.forexstick.com/server/api/sendResetEmail', formData, {})
        .then(res => {
          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
          }else{
            this.otpCard = !this.otpCard 
            this.resetPass = !this.resetPass

          }
            
        })
        .catch(err => {
            // this.snackbar = true;
            if(err.response)
            {
              this.errors = err.data.error,
              this.$store.commit('updateSnackbar', {show: true, color: 'error', message: err.data.error})
              console.log(err.response.data);
            }
        })
      },
      openChangePasswordDialog(){
        if(this.userOtpCode != this.sixDigitNumber){
          this.doNotRefresh = 'You Entered Wrong OTP. Please Check Your Email'
          this.otpTextColor = 'red'
          return
        }else{
          this.otpCard = !this.otpCard 
          this.newPasswordCard = !this.newPasswordCard 
        }

      },
      changePassword(){
        // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
            this.dialog = true;
            this.valid = false;
            return config;
        }, (error) => {
            this.dialog = false;
            this.valid = true;
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
            this.dialog = false;
            this.valid = true;
            return response;
        }, (error) => {
            this.dialog = false;
            this.valid = true;
            return Promise.reject(error);
        });

        let formData = new FormData();
        formData.append('email',this.resetEmail);
        formData.append('password',this.newPassword);
        formData.append('_method', 'PATCH');
        this.$axios.post('https://app.forexstick.com/server/api/updatePassword', formData, {})
        .then(res => {
          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
          }else{
              this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Account Password Reset Successfully."})
              location.reload();
          }
        })
        .catch(err => {
            // this.snackbar = true;
            if(err.response)
            {
              this.errors = err.data.error,
              console.log(err.data.error);
            }
        })
      },
      login: function(){
        // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
          this.dialog = true;
          this.loginBtn = true;
          return config;
        }, (error) => {
          this.dialog = false;
          this.loginBtn = false;
          return Promise.reject(error);
        });
        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
          this.dialog = false;
          this.loginBtn = false;
          return response;
        }, (error) => {
          this.dialog = false;
          this.loginBtn = false;
          return Promise.reject(error);
        });
        this.$axios.post('https://app.forexstick.com/server/api/login', {
          'email' : this.email, 'password' : this.password,
          // 'ip' : this.fullGeoLocation.ip, 'country' : this.fullGeoLocation.location.country,
          // 'region' : this.fullGeoLocation.location.region, 'city' : this.fullGeoLocation.location.city,
          // 'lat' : this.fullGeoLocation.location.lat, 'lng' : this.fullGeoLocation.location.lng,
          // 'postalCode' : this.fullGeoLocation.location.postalCode, 'timezone' : this.fullGeoLocation.location.timezone,
          // 'geonameId' : this.fullGeoLocation.location.geonameId,
          // 'asn' : this.fullGeoLocation.as.asn, 'name' : this.fullGeoLocation.as.name, 
          // 'route' : this.fullGeoLocation.as.route, 'domain' : this.fullGeoLocation.as.domain,
          // 'type' : this.fullGeoLocation.as.type, 'isp' : this.fullGeoLocation.isp,
          // 'proxy' : this.fullGeoLocation.proxy.proxy, 'vpn' : this.fullGeoLocation.proxy.vpn,
          // 'top' : this.fullGeoLocation.proxy.tor,
        })
        .then(res => {
          
          User.responseAfterLogin(res.data.success)
          this.$store.commit("setCurrentUser", res.data.success.user)
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
          // console.log('this.$store.state.userInfo')
          // console.log(this.$store.state.userInfo[0].role)
          // console.log('this.$store.state.userInfo')


          // if (this.$store.state.userInfo[0].role === 'Super_Admin' || this.$store.state.userInfo[0].role === 'Admin') {
          //   this.$router.push({name : 'AdminPanel'}).catch(()=>{})
          // }else{
          //   alert('Your are a User');
          // }
          this.$store.commit('updateSnackbar', {show: true, color: 'success', message: 'Logged in Successfully :)'})
          // console.log('Your IP is '+res.data.myIp)
          this.$router.push({name : 'Home'}).catch(()=>{})
        })
        .catch(err => {
          if(err.response)
          {
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: 'Invalid Email or Password!'})

            this.errors = err.response.data.error,
            console.log('err.response.data');
            console.log(err.response.data);
          }
        })
      
      }
    },
  }
</script>

<style>

</style>