<template>
  <div id="UserDashboard" class="userDashboardBg">
    
    <v-container fluid style="overflow: auto">
      <div class="tradingview-widget-container">
        <div id="tradingview_380b5"></div>
        <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/EURUSD/?exchange=FOREXCOM" rel="noopener" target="_blank"><span class="blue-text">Forex Stick Chart</span></a> by TradingView</div>
      </div>
    </v-container>
  </div>
</template>

<script>
import User from "../../../Helpers/User"
export default {
  data: () => ({
    loading: false,
    accountId: '',
    userToken: User.getToken(),
    userId: User.id(),
    fxStickBalance: 0,
    tradeBalance: 0,
    lastDayProfit: 0,
    lastWeekProfit: 0,
    totalProfit: 0,
    fsPendingBalance: 0,
  }),
  created() {
    // this.initialize()
  },
  mounted(){
    const script = document.createElement("script");script.src = "https://s3.tradingview.com/tv.js";document.body.appendChild(script);script.addEventListener("load", this.setLoaded);
  },
  methods: {
    setLoaded(){
      new TradingView.widget(
        {
        "width": 1080,
        "height": 670,
        "symbol": "FOREXCOM:EURUSD",
        "interval": "D",
        "timezone": "Asia/Almaty",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": true,
        "hotlist": true,
        "calendar": true,
        "container_id": "tradingview_380b5"
        }
      );
    },
    initialize(){
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
      formData.append('user_id', this.userId);
      this.$axios.post('https://app.forexstick.com/server/api/auth/getLastDayTrade',formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.noRecord){
            alert(res.data.noRecord)
          }else if (res.data.error) {
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            console.log('res.data.error')
            console.log(res.data.error)
            console.log('res.data.error')
          }else{
            console.log(res.data.lastWeekProfit)
            this.accountId = res.data.tradeAccount.accountId
            this.tradeBalance = res.data.lastFullTradeInfo.balance
            this.lastDayProfit = res.data.LastTrade.profit
            this.lastWeekProfit = res.data.lastWeekProfit
            this.totalProfit = res.data.totalProfit
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