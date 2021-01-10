<template>
  <div id="AdminDashboard" class="" style="background-color: #E0E0E0 !important; height: 100vh;">
    <v-row class="pa-3">
      <v-col cols="12" class="d-flex justify-center">
        <v-card class="text-center"
          max-width="400"
        >
          <v-toolbar
            color="teal"
            dark
          >
            <v-toolbar-title>MyFxBook Session & ID Generator</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-card-account-details-star</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-form>
                  <v-text-field
                    v-model="forexAccountId"
                    label="Forex Account ID"
                    placeholder="Enter Forex Account ID*"
                    outlined
                    append-icon="mdi-card-account-details-star"
                    color="teal"
                    type="number"
                    @focus="$event.target.select()"
                  ></v-text-field>
                  <v-text-field
                    v-model="myFxBookEmail"
                    label="Email"
                    placeholder="Enter MyFxBook User Email*"
                    outlined
                    append-icon="mdi-card-account-mail"
                    color="teal"
                    type="email"
                    @focus="$event.target.select()"
                  ></v-text-field>
                  <v-text-field
                    v-model="myFxBookPassword"
                    label="Password"
                    placeholder="Enter MyFxBook User Password*"
                    outlined
                    color="teal"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    @click:append="show3 = !show3"
                    @focus="$event.target.select()"
                    hide-details
                  ></v-text-field>
                </v-form>
              </v-col>
              <v-col cols="12">
                <v-btn color="teal" block @click="generate" class="white--text" :disabled="role != 'Super_Admin'">Generate</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="processing"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="#202c45"
        dark
      >
        <v-card-text style="color: #fff">
          Job is processing ..
          <v-progress-linear
            indeterminate
            color="#ee6e52"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import User from "../../../Helpers/User"
  export default {
    data: () => ({
      forexAccountId: '',
      myFxBookEmail: '',
      myFxBookPassword: '',
      userToken: User.getToken(),
      userId: User.id(),
      role: User.role(),
      processing: false,
      show3: false,
    }),

    computed: {
    },

    watch: {
    },

    created () {
    },

    methods: {
      initialize () {
        
      },
      generate(){
        if(this.myFxBookEmail != '' && this.myFxBookPassword != '' && this.forexAccountId != ''){
          // Add a request interceptor
          this.$axios.interceptors.request.use( (config) => {
              this.processing = true;
              return config;
          }, (error) => {
              this.processing = false;
              return Promise.reject(error);
          });

          // Add a response interceptor
          this.$axios.interceptors.response.use( (response) =>{
              this.processing = false;
              return response;
          }, (error) => {
              this.processing = false;
              return Promise.reject(error);
          });
          let formData = new FormData();
          formData.append('user_id', this.userId);
          formData.append('accountId', this.forexAccountId);
          formData.append('email', this.myFxBookEmail);
          formData.append('password', this.myFxBookPassword);
          this.$axios.post('https://app.forexstick.com/server/api/auth/myFxBookGenerator', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
            .then(res => {
              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
              }else{
                this.$store.commit('updateSnackbar', {show: true, color: 'success', message: res.data.success})
                this.$router.push({name : 'AdminDashboard'}).catch(()=>{})           
              }

            })
            .catch(err => {
              console.log(err.response.data)
            })
        }else{
          alert('must need account id, email & password')
        }
      }
    },
  }
</script>
<style>

</style>