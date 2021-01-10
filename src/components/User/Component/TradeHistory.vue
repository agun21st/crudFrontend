<template>
  <div id="UserDashboard" class="ma-3 depositeBgImage">
    <v-row dense class="dashboardBottom">
      <v-col 
        cols="12" 
        md="3" 
        sm="12" 
        class="max-auto"
        v-for="(trade, index) in liveTrades"
        :key="index"
      >
        <v-card
        max-width="350"
        elevation="10"
        :loading="loading"
        class="mx-2"
      > 
        <template slot="progress">
          <v-progress-linear
            color="#ee6e52"
            height="5"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-toolbar
          color="teal"
          dark
          dense
        >
          <v-toolbar-title>FX-avengers-{{trade.accountId}}</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-row dense>
            <v-col
            cols="12"
            >
              <v-alert
                border="left"
                colored-border
                color="#ee6e52"
                elevation="2"
                dense
              >
                <div style="font-size: 16px; font-weight: 600;">
                  <span>
                    Server:
                  </span>
                  <span style="float:right; color: #ee6e52">
                    {{trade.serverName}}
                  </span>
                </div>
                <div style="font-size: 16px; font-weight: 600;">
                  <span>
                    Gain:
                  </span>
                  <span style="float:right">
                    {{trade.gain}}
                  </span>
                </div>
                <div style="font-size: 16px;">
                  <span>
                    Abs. Gain: 
                  </span>
                  <span style="float:right">
                    {{trade.absGain}}
                  </span>
                </div>
              </v-alert>
              <v-alert
                border="left"
                colored-border
                color="deep-purple accent-4"
                elevation="2"
                dense
              >
                <div style="font-size: 16px; font-weight: 600;">
                  <span>
                    Daily:
                  </span>
                  <span style="float:right">
                    {{trade.daily}}
                  </span>
                </div>
                <div style="font-size: 16px;">
                  <span>
                    Monthly
                  </span>
                  <span style="float:right">
                    {{trade.monthly}}
                  </span>
                </div>
                <div style="font-size: 16px;">
                  <span>
                    Drawdown: 
                  </span>
                  <span style="float:right">
                    {{trade.drawdown}}
                  </span>
                </div>
              </v-alert>
              <v-alert
                border="left"
                colored-border
                color="green"
                elevation="2"
                dense
              >
                <div style="font-size: 16px; font-weight: 600;">
                  <span>
                    Deposits:
                  </span>
                  <span style="float:right">
                    {{trade.deposits}}
                  </span>
                </div>
                <div style="font-size: 16px;">
                  <span>
                    Withdrawals: 
                  </span>
                  <span style="float:right">
                    {{trade.withdrawals}}
                  </span>
                </div>
              </v-alert>
              <v-alert
                border="left"
                colored-border
                color="info"
                elevation="2"
                dense
              >
                <div style="font-size: 16px; font-weight: 600;">
                  <span>
                    Balance:
                  </span>
                  <span style="float:right">
                    {{trade.balance}}
                  </span>
                </div>
                <!-- <div>
                  <span>
                    Highest: 
                  </span>
                  <span style="float:right">
                    {{highest}}
                  </span>
                </div> -->
                <div style="font-size: 16px; font-weight: 600;">
                  <span>
                    Last Profit:
                  </span>
                  <span style="float:right">
                    {{trade.lastProfit}}
                  </span>
                </div>
                <div style="font-size: 16px;">
                  <span>
                    Total Profit: 
                  </span>
                  <span style="float:right">
                    {{trade.profit}}
                  </span>
                </div>
              </v-alert>
              <v-alert
                border="left"
                colored-border
                color="error"
                elevation="2"
                dense
              >
                <div style="font-size: 16px; font-weight: 600;">
                  <span>
                    Updated:
                  </span>
                  <span style="float:right">
                    {{new Date(trade.updated_at).toISOString().substr(0, 10)}}
                  </span>
                </div>
                <div style="font-size: 16px;">
                  <span>
                    First Trade: 
                  </span>
                  <span style="float:right">
                    {{new Date(trade.firstTradeDate).toISOString().substr(0, 10)}}
                  </span>
                </div>
                <div style="font-size: 16px;">
                  <span>
                    Creation Date:
                  </span>
                  <span style="float:right">
                    {{new Date(trade.creationDate).toISOString().substr(0, 10)}}
                  </span>
                </div>
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      </v-col>
    </v-row>
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
  </div>
</template>

<script>
import User from "../../../Helpers/User"
export default {
  data: () => ({
    loading: false,
    dialog: false,
    userToken: User.getToken(),
    userId: User.id(),
    liveTrades: [],
  }),
  created() {
    this.initialize()
  },
  watch:{
  },
  mounted(){
  },
  methods: {
    initialize(){
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.dialog = true;
          return config;
      }, (error) => {
          this.dialog = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.dialog = false;
          return response;
      }, (error) => {
          this.dialog = false;
          return Promise.reject(error);
      });
      // let formData = new FormData();
      // formData.append('user_id', this.userId);
      this.$axios.get('https://app.forexstick.com/server/api/auth/getAccountStatus', {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.noRecord){
            alert(res.data.noRecord)
          }else if (res.data.error) {
            console.log('res.data.error')
            console.log(res.data.error)
            console.log('res.data.error')
          }else{
            if(res.data.lastFullTradeInfo != null){
              // console.log(res.data.lastFullTradeInfo)
              this.liveTrades = res.data.lastFullTradeInfo
            }else{
              console.log(res.data.lastFullTradeInfo)
            }
            // console.log(res.data.lastFullTradeInfo)
          }
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>

</style>