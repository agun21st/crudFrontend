<template>
  <v-app class="register registerPage">
    <video autoplay muted loop>
          <source :src="'/videos/Register.mp4'" type="video/mp4">
    </video>
      <v-container
        class=""
        fluid
      >
        <v-row v-show="!otpCodeForm">
          <v-col
            cols="12"
            class="d-flex justify-center align-center mt-5"
          >
            <v-card class="elevation-12" width="500">
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
                  <!-- <v-img :src="'/img/Logo/Ai_Logo.png'" width="160"></v-img> -->
                  Forex Stick Affiliates
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text class="p-4">
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
                    <v-col cols="12" md="6" sm="12">
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
                    <v-col cols="12" md="6" sm="12">
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
                    <v-col cols="12" class="my-0 py-0">
                      <v-text-field
                        v-model="userMobileNumber"
                        :counter="15"
                        :rules="[() => !!userMobileNumber || 'This field is required']"
                        label="Mobile Number*"
                        hint="Enter your active mobile number"
                        required
                        color="#ee6e52"
                        prepend-icon="mdi-card-account-phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" sm="12">
                      <v-autocomplete
                        v-model="country"
                        :rules="[() => !!country || 'This field is required']"
                        :items="countries"
                        label="Country*"
                        placeholder="Select Country..."
                        required
                        color="#ee6e52"
                        prepend-icon="mdi-home-city"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4" sm="12">
                      <v-text-field
                        label="Referral ID"
                        filled
                        v-model="refId"
                        v-show="refId !=0 "
                        :readonly="refId !=0 "
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" sm="12" class="my-0 py-0">
                      <v-radio-group
                        v-model="imessenger"
                        column
                      >
                        <v-radio
                          color="#ee6e52"
                          value="Skype"
                        >
                          <template v-slot:label>
                            <div>Skype <v-icon>mdi-skype</v-icon></div>
                          </template>
                        </v-radio>
                        <v-radio
                          color="#ee6e52"
                          value="Telegram"
                        >
                          <template v-slot:label>
                            <div>Telegram <v-icon>mdi-telegram</v-icon></div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="8" sm="12" class="d-flex align-items-center py-0 my-0">
                      <v-text-field
                        v-model="messengerId"
                        :counter="30"
                        :rules="[() => !!messengerId || 'This field is required']"
                        label="Skype/Telegram/ICQ*"
                        hint="Enter your Skype/Telegram/ICQ Username"
                        required
                        color="#ee6e52"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="p-4">
                <v-btn
                    color="#ee6e52"
                    class="text-decoration-none  mr-3"
                    router
                    to='/login'
                    text
                  >
                    Login
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!valid"
                    color="teal"
                    class="white--text ml-3"
                    type="submit"
                    @click.prevent="tempRegisterDataHolder"
                    :loading="registerBtn"
                  >
                    Register
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-show="otpCodeForm" style="margin-top: 100px">
          <v-col
            cols="12"
            class="d-flex justify-center align-center"
          >
            <v-card class="elevation-12" width="450" height="400">
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
                    @click.prevent="register"
                    block
                    large
                  >
                    Submit
                  </v-btn>
                  <!-- <v-spacer></v-spacer>
                  <v-btn
                    color="#ee6e52"
                    class="text-decoration-none white--text mr-3"
                    router
                    to='/login'
                  >
                    Login
                  </v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
  export default {
    data: () => ({
      dialog: false,
      otpCodeForm: false, 
      registerBtn: false, 
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
      userMobileNumber: '',
      country: '',
      refId: 0,
      countries: [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 
        'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 
        'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 
        'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 
        'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 
        'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 
        'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 
        'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 
        'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 
        'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 
        'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 
        'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 
        'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 
        'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 
        'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 
        'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia',
        'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 
        'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 
        'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 
        'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 
        'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 
        'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 
        'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 
        'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 
        'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 
        'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 
        'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'
      ],

    }),
    created(){
      if(this.$route.params.refId > 0){
        this.refId = this.$route.params.refId
      }
    },
    mounted() {

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

        this.$axios.post('https://app.forexstick.com/server/api/emailCheck', formData, {})
        .then(res => {

          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            this.email = ''
            return
          }
            
        })
        .catch(err => {
            // this.snackbar = true;
            if(err.data.error)
            {
              this.$store.commit('updateSnackbar', {show: true, color: 'error', message: 'Invalid Email or Password!'})
              this.errors = err.data.error,
              console.log(err.data.error);
            }
        })
      },
      tempRegisterDataHolder: function(){

        this.otpCodeForm = !this.otpCodeForm

        this.sixDigitNumber = Math.floor(100000 + Math.random() * 900000)

        // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
            this.dialog = true;
            this.valid = false;
            this.registerBtn = true;
            return config;
        }, (error) => {
            this.dialog = false;
            this.valid = false;
            this.registerBtn = false;
            return Promise.reject(error);
        });
        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
            this.dialog = false;
            this.valid = false;
            this.registerBtn = false;
            return response;
        }, (error) => {
            this.dialog = false;
            this.valid = false;
            this.registerBtn = false;
            return Promise.reject(error);
        });

        let formData = new FormData();
        formData.append('email', this.email);
        formData.append('otpCode', this.sixDigitNumber);

        this.$axios.post('https://app.forexstick.com/server/api/sendEmail', formData, {})
        .then(res => {

          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
          }else{

            this.$store.commit('updateSnackbar', {show: true, color: 'success', message: res.data.success})
          }
            
        })
        .catch(err => {
            if(err.data.error)
            {
              this.errors = err.data.error,
              this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Invalid Email or Password!"})
              console.log(err.data.error);
            }
        })

      },
      register: function(){

        if(this.userOtpCode != this.sixDigitNumber){
          this.doNotRefresh = 'You Entered Wrong OTP. Please Check Your Email'
          this.otpTextColor = 'red'
          return
        }

        this.securityCode = Math.floor(100000 + Math.random() * 900000)

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
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('country', this.country);
        formData.append('imName', this.imessenger);
        formData.append('imUsername', this.messengerId);
        formData.append('mobile', this.userMobileNumber);
        formData.append('securityCode', this.securityCode);
        if(this.refId > 0){
          formData.append('refId', this.refId);
        }else{
          formData.append('refId', 0);
        }
        this.$axios.post('https://app.forexstick.com/server/api/register', formData, {})
        .then(res => {

          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
          }else{
              this.$router.push({name : 'Login'})
              this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Account Registration Successfully Done."})
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