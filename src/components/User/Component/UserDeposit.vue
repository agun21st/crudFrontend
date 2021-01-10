<template>
  <div id="UserDeposit" class="ma-5">
    <v-row dense class="dashboardBottom">
      <v-col cols="12" class="max-auto">
          <v-card
          class="mx-auto"
          max-width="500"
          height="335"
          elevation="24"
        >
          <v-toolbar
            color="#202c45"
            dark
          >
            <v-spacer></v-spacer>
            <v-toolbar-title class="toolbarText">Diposit FX Stick Balance</v-toolbar-title>
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
                  <v-card-text class="selectPaymentMethod" style="font-size: 30px; text-align: center">Select payment method</v-card-text>
                  <v-row class="ma-5">
                    <v-col cols="12 text-center">
                      <a href="" class="blockoPayBtn" data-toggle="modal" data-uid=5cf905a8023a11eb data-price=25><img width=180 :src="'/img/paymentImage/pay_with_bitcoin.png'"></a>
                    </v-col>
                  </v-row>
                  <v-row class="ma-5">
                    <v-col cols="12 text-center">
                      <a href="" data-toggle="modal" data-target="#PaypalModal"><img width=180 :src="'/img/paymentImage/PaypalBottun.png'"></a>
                    </v-col>
                  </v-row>
                  <!-- The Paypal Modal -->
                  <div class="modal fade" id="PaypalModal">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                      
                        <!-- Modal Header -->
                        <div class="modal-header">
                          <h4 class="modal-title">Enter Deposit Amount</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <!-- Modal body -->
                        <div class="modal-body">
                          <input type="text" class="form-control" id="amount" placeholder="Ammount" aria-describedby="inputGroupPrepend" required>
                        </div>
                        
                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <div id="paypal-button-container" class="w-100"></div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <!-- Paypal Modal end -->
                  <v-card-actions>

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
  }),
  created() {
  },
  mounted(){
    const script = document.createElement("script");script.src = "https://www.paypal.com/sdk/js?client-id=AenfVUqEbtC1OznVJ9wKaQ76Q4moKyuoKtlJjeWEtGHAfiwMQVmcGzcxJ6JzXmd1RE0SD6P2nEGo6KP3";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      window.paypal.Buttons({
        createOrder: function(data, actions) {
          var inputVal = document.getElementById("amount").value;
          return actions.order.create({purchase_units: [{amount: {value: inputVal}}]});
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            var inputVal = document.getElementById("amount").value;
            let formData = new FormData();
            formData.append('user_id', this.userId);
            formData.append('payBy', 'Paypal');
            formData.append('amount', inputVal);
            formData.append('details', details);

            this.$axios.post('https://app.forexstick.com/server/api/auth/paypalPayment', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
            .then(res => {

              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
                return
              }else{
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Account Deposited Successfully."})
                this.$store.commit("setCurrentUser", res.data.success)
              }
                
            })
            .catch(err => {
              console.log(err.response.data)
            })
            this.close()
            alert('Transaction completed by ' + details.payer.name.given_name);
            document.getElementById("amount").value = "";
          });
        }
      }).render("#paypal-button-container");
    },
  }
}
</script>

<style>

</style>