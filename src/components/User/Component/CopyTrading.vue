<template>
  <div id="UserDeposit" class="ma-5">
    <v-row dense class="dashboardBottom">
      <v-col cols="12" class="max-auto">
          <v-card
            class="mx-auto"
            max-width="600"
            :loading="cardLoading"
            elevation="15"
          >
            <template slot="progress">
              <v-progress-linear
                color="error"
                height="5"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-toolbar
              color="teal"
              dark
              dense
            >
              <v-toolbar-title>Select Copy Account</v-toolbar-title>
            </v-toolbar>
        
            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="(account, index) in tradeAccounts"
                  :key="index"
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-card>
                    <v-img
                      :src="cardImage"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                    >
                      <v-card-title> FX-avengers-{{index+1}}</v-card-title>
                    </v-img>
        
                    <v-card-actions>
                      <v-btn text color="teal" class="white--text">Minimum Deposit $100</v-btn>
                      <v-spacer></v-spacer>
        
                      <v-btn color="teal" class="white--text" @click="goCopyTradePage(account.accountId)">
                        Select
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
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
    cardLoading: false,
    cardImage: '/img/bg/forexLogo.jpg',
    cards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
    ],
    tradeAccounts: [],
  }),
  created() {
    // console.log(this.cards[0].src)
    this.initialize()
  },
  mounted(){
    
  },
  methods: {
    initialize(){
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.cardLoading = true;
          return config;
      }, (error) => {
          this.cardLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.cardLoading = false;
          return response;
      }, (error) => {
          this.cardLoading = false;
          return Promise.reject(error);
      });
      // let formData = new FormData();
      // formData.append('user_id', this.userId);
      this.$axios.get('https://app.forexstick.com/server/api/auth/getAllTradeAccount', {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.tradeAccounts.length != 0){
            this.tradeAccounts = res.data.tradeAccounts
          }else{
            console.log('else')
          }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })

    },
    goCopyTradePage(tradeId){
      let win = window.open("https://www.octafx.com/copy-trade/master/"+tradeId, '_blank');
      win.focus();
      // console.log("https://aff.forexstick.com/copy-trade/master/"+tradeId)
    },
  }
}
</script>

<style>

</style>