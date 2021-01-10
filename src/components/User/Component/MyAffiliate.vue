<template>
  <div id="UserDeposit" class="ma-5">
    <v-row dense class="dashboardBottom">
      <v-col cols="12" class="max-auto">
          <v-card
          class="mx-auto"
          max-width="600"
          elevation="10"
        >
          <v-toolbar
            color="#202c45"
            dark
          >
            <v-spacer></v-spacer>
            <v-toolbar-title class="toolbarText">My Affiliate Link </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container fluid>
            <v-row dense>
              <v-col
              cols="12"
              >
                <v-card
                  color="#202c45"
                  dark
                  class="elevation-10"
                >
                  <v-card-text>
                    <v-hover v-slot="{ hover }">
                      <v-alert
                      text
                      color="#00d7ab"
                      icon="mdi-account-network"
                      border="left"
                      class="m-0"
                      >
                        <div class="d-flex justify-space-between">
                          <p class="m-0">{{affLink}}</p>
                          <v-btn
                            icon
                            color="error"
                            v-show="hover ? hover : false"
                            @click="copyRef"
                            small
                            class="mr-3"
                          >
                            <v-icon left>mdi-content-copy</v-icon>Copy
                          </v-btn>
                        </div>
                      </v-alert>
                    </v-hover>
                    <p class="m-0 p-0">{{linkCopied}}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" class="m-3">
        <v-data-table
          :headers="headers"
          :items="getAffiliates"
          sort-by="created_at"
          sort-desc
          class="elevation-5"
          :loading="loading"
          :search="search"
          loading-text="Accounts is Loading... Please wait"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Affiliates ({{commission}}%)</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer class="d-none d-md-block"></v-spacer>
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search ..."
                single-line
                hide-details
                @focus="$event.target.select()"
                class="d-print-none mr-5"
                ></v-text-field>
                <v-btn color="teal" class="white--text" @click="initialize">Refresh Table</v-btn>
                <!-- <v-btn fab color="error" @click="dailyGain"><v-icon>mdi-plus</v-icon></v-btn> -->
            </v-toolbar>
          </template>
          <template v-slot:item.created_at="{ item }">
            <span v-if="item.created_at">
                {{new Date(item.created_at).toISOString().substr(0, 10)}}
            </span>
          </template>
          <!-- <template v-slot:item.actions="{ item }">
            <v-icon
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template> -->
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import User from "../../../Helpers/User"
export default {
  data: () => ({
    userToken: User.getToken(),
    userId: User.id(),
    affLink: '',
    linkCopied: '',
    commission: 0,
    transparent: 'rgba(255, 255, 255, 0)',
    loading: false,
    search: '',
    getAffiliates: [],
    headers: [
      // { text: '#', value: 'id' },
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Country', value: 'country' },
      { text: 'Join_Date', value: 'created_at' },
      { text: 'Commission_Money', value: 'cMoney' },
      // { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  created() {
    this.initialize()
  },
  mounted(){
    // this.affLink = 'https://cli.forexstick.com/register/'+this.$store.state.userInfo[0].securityCode
    this.affLink = 'https://app.forexstick.com/register/'+this.$store.state.userInfo[0].securityCode
  },
  methods: {
    copyRef(){
        navigator.clipboard.writeText(this.affLink)
        this.linkCopied = 'Link Copied Successfully!'
    },
    initialize () {
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.loading = true;
          return config;
      }, (error) => {
          this.loading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.loading = false;
          return response;
      }, (error) => {
          this.loading = false;
          return Promise.reject(error);
      });
      let formData = new FormData();
      formData.append('id', this.userId);
      this.$axios.post('https://app.forexstick.com/server/api/auth/getAffiliates', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
        }else{

          if(res.data.getAffiliates){
            this.getAffiliates = res.data.getAffiliates
            this.commission = res.data.commission
          }
        }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
  }
}
</script>

<style>

</style>