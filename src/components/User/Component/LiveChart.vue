<template>
  <div id="UserDashboard" class="">
    
    <v-container fluid style="overflow: auto">
      <div class="tradingview-widget-container">
        <div id="tradingview_380b5"></div>
        <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/EURUSD/?exchange=FOREXCOM" rel="noopener" target="_blank"><span class="blue-text">Forex Live Chart</span></a> by TradingView</div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  created() {
  },
  mounted(){
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    document.body.appendChild(script);
    // script.addEventListener("load", this.setLoaded);
    setTimeout(() => {
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
          });
      }, 1000);
  },
  methods: {
    setLoaded(){
      
    },
  }
}
</script>

<style>

</style>