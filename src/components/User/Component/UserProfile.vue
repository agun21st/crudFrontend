<template>
    <v-container fluid style="display: flex; justify-content: center;">
      <v-card
        color="#202c45"
        dark
        class="elevation-10"
        max-width="400"
        :loading="loadingProfile"
      >
      <template slot="progress">
        <v-progress-linear
          color="teal"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
        <v-row>
          <v-col cols="12" md="5" sm="12" class="py-0 my-0">
            <v-card-title style="color: #00d7ab">My Profile</v-card-title>
          </v-col>
          <v-col cols="12" md="7" sm="12" class="py-0 my-0">
            <v-card-text style="color: #00d7ab">
              <!-- The Quick Brown Fox Jumps Over The Lazy Dog! -->
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="7" sm="12" class="py-0 my-0">
            <v-card-text class="py-0 my-0 pr-0">
              <v-text-field
                color="#00d7ab"
                required
                v-model="UserTitle"
                type="text"
                style="font-size: 14px"
                outlined
                label="Full Name"
                :readonly="EditUpdate"
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="5" sm="12" class="py-0 my-0">
              <v-card-text class="py-0 my-0 pl-0">
                <v-text-field
                color="#00d7ab"
                required
                v-model="imUsername"
                type="text"
                style="font-size: 14px"
                outlined
                :label="imName"
                :readonly="EditUpdate"
                ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12" class="py-0 my-0">
            <v-card-text class="py-0 my-0">
              <v-text-field
                color="#00d7ab"
                v-model="UserEmail"
                type="email"
                style="font-size: 16px"
                clear-icon="py-0 my-0"
                outlined
                label="Email"
                readonly
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12" class="">
            <v-card-text class="text-center">
              <v-btn
                rounded
                color="#00d7ab"
                dark
                block
                v-show="EditUpdate"
                @click="EditUpdate = !EditUpdate"
              >
                <v-icon left>mdi-pencil</v-icon>Edit
              </v-btn>
              <v-btn
                rounded
                color="#00d7ab"
                dark
                block
                v-show="!EditUpdate"
                @click="updateProfile"
              >
                <v-icon left>mdi-content-save-outline</v-icon>Update
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
</template>

<script>
import User from "../../../Helpers/User"
export default {

    data: () => ({
      UserTitle: '',
      imUsername: '',
      imName: '',
      UserEmail: '',
      EditUpdate: true,
      loadingProfile: false,
      nameRules: {
        required: value => !!value || 'Required.'
      },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      userid: User.id(),
      userToken: User.getToken(),

    }),
    mounted: function() {
      this.initialize()
    },
    created() {
      
      if(this.$store.state.userInfo == '' || this.$store.state.userInfo == 'undefined'){
        this.$router.push({name : 'UserDashboard'}).catch(()=>{})
      }else{
        this.UserTitle = this.$store.state.userInfo[0].name
        this.imUsername = this.$store.state.userInfo[0].imUsername
        this.imName = this.$store.state.userInfo[0].imName
        this.UserEmail = this.$store.state.userInfo[0].email
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
      initialize: function(){
        
      },

      updateProfile: function(){
        this.EditUpdate = !this.EditUpdate
      }
    }
  }
</script>

<style>

</style>