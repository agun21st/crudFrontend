<template>
  <div id="UserWithdrawal" class="">
    <v-row dense class="dashboardBottom">
      <v-col cols="12" class="max-auto">
        <v-container fluid>
          <div class="d-flex justify-space-between">
            <h3>Select an option for withdrawal</h3>
            <v-chip color="teal" text-color="white">${{availableCommissionMoney}} Cash</v-chip>
          </div>
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>Bitcoin<v-icon size="40" color="teal">mdi-bitcoin</v-icon></v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-form
                    ref="bitcoinForm"
                    v-model="valid"
                  >
                    <v-row>
                      <v-col cols="12" md="4" sm="12">
                        <v-text-field
                          v-model="bitcoinAmount"
                          :counter="6"
                          :rules="bitcoinAmountRules"
                          label="Enter withdrawal amount"
                          required
                          type="number"
                          @focus="$event.target.select()"
                          color="teal"
                          prepend-inner-icon="mdi-currency-usd"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="8" sm="12">
                        <v-text-field
                          v-model="bitcoinRef"
                          :counter="50"
                          :rules="bitcoinRefRules"
                          label="Enter Bitcoin Ref"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn
                      :disabled="!valid"
                      color="teal"
                      class="mr-4 white--text"
                      :loading="bitButtonLoading"
                      @click="bitcoinWithdrawal"
                    >
                      Submit
                    </v-btn>
                  </v-form>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                bKash
                <v-avatar size="35">
                  <img
                    src="/img/Logo/bKash_logo.png"
                    alt="bKash"
                  >
                </v-avatar>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-form
                    ref="bKashForm"
                    v-model="valid"
                  >
                    <v-row>
                      <v-col cols="12" md="4" sm="12">
                        <v-text-field
                          v-model="bKashAmount"
                          :counter="6"
                          :rules="bKashAmountRules"
                          label="Enter withdrawal amount"
                          required
                          type="number"
                          @focus="$event.target.select()"
                          color="teal"
                          prepend-inner-icon="mdi-currency-usd"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="8" sm="12">
                        <v-text-field
                          v-model="bKashNumber"
                          :counter="50"
                          :rules="bKashNumberRules"
                          label="Enter bKash Number"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn
                      :disabled="!valid"
                      color="teal"
                      class="mr-4 white--text"
                      :loading="bKashButtonLoading"
                      @click="bKashWithdrawal"
                    >
                      Submit
                    </v-btn>
                  </v-form>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Nagad
                <v-avatar size="35">
                  <img
                    src="/img/Logo/Nagad_logo.png"
                    alt="bKash"
                  >
                </v-avatar>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-form
                    ref="nagadForm"
                    v-model="valid"
                  >
                    <v-row>
                      <v-col cols="12" md="4" sm="12">
                        <v-text-field
                          v-model="nagadAmount"
                          :counter="6"
                          :rules="nagadAmountRules"
                          label="Enter withdrawal amount"
                          required
                          type="number"
                          @focus="$event.target.select()"
                          color="teal"
                          prepend-inner-icon="mdi-currency-usd"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="8" sm="12">
                        <v-text-field
                          v-model="nagadNumber"
                          :counter="50"
                          :rules="nagadNumberRules"
                          label="Enter Nagad Number"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn
                      :disabled="!valid"
                      color="teal"
                      class="mr-4 white--text"
                      :loading="nagadButtonLoading"
                      @click="nagadWithdrawal"
                    >
                      Submit
                    </v-btn>
                  </v-form>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Bank<v-icon size="40" class="ml-2" color="teal">mdi-bank-transfer</v-icon></v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-form
                    ref="bankForm"
                    v-model="valid"
                  >
                    <v-row>
                      <v-col cols="12" md="6" sm="12">
                        <v-text-field
                          v-model="bankAmount"
                          :counter="6"
                          :rules="bankAmountRules"
                          label="Enter withdrawal amount"
                          required
                          type="number"
                          @focus="$event.target.select()"
                          color="teal"
                          prepend-inner-icon="mdi-currency-usd"
                        ></v-text-field>
                        <v-text-field
                          v-model="bankName"
                          :counter="50"
                          :rules="bankNameRules"
                          label="Enter Bank Name"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                        <v-text-field
                          v-model="bankBranchName"
                          :counter="50"
                          :rules="bankBranchNameRules"
                          label="Enter Branch Name"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" sm="12">
                        <v-text-field
                          v-model="accountName"
                          :counter="50"
                          :rules="accountNameRules"
                          label="Enter Account Name"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                        <v-text-field
                          v-model="accountNumber"
                          :counter="50"
                          :rules="accountNumberRules"
                          label="Enter Account Number"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                        <v-text-field
                          v-model="accountMobileNumber"
                          :counter="50"
                          :rules="accountMobileNumberRules"
                          label="Enter Beneficiary Mobile Number"
                          required
                          @focus="$event.target.select()"
                          color="teal"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn
                      :disabled="!valid"
                      color="teal"
                      class="mr-4 white--text"
                      :loading="bankButtonLoading"
                      @click="bankWithdrawal"
                    >
                      Submit
                    </v-btn>
                  </v-form>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Paypal
                <v-avatar size="40" class="mr-2">
                  <img
                    src="/img/Logo/Paypal_logo.png"
                    alt="bKash"
                  >
                </v-avatar>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                  <v-form
                    ref="paypalForm"
                    v-model="valid"
                  >
                    <v-row>
                      <v-col cols="12" md="4" sm="12">
                        <v-text-field
                          v-model="paypalAmount"
                          :counter="6"
                          :rules="paypalAmountRules"
                          label="Enter withdrawal amount"
                          required
                          type="number"
                          @focus="$event.target.select()"
                          color="teal"
                          prepend-inner-icon="mdi-currency-usd"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="8" sm="12">
                        <v-text-field
                          v-model="paypalEmail"
                          label="Enter Paypal Email"
                          color="teal"
                          type="email"
                          @focus="$event.target.select()"
                          :counter="50"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-btn
                      :disabled="!valid"
                      color="teal"
                      class="mr-4 white--text"
                      :loading="paypalButtonLoading"
                      @click="paypalWithdrawal"
                    >
                      Submit
                    </v-btn>
                  </v-form>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-col>
      <v-col cols="12">
        <v-container fluid>
          <v-card>
          <v-card-title>
            All Request
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
              <v-data-table
              :headers="headers"
              :items="allRequest"
              sort-by="created_at"
              sort-desc
              :search="search"
              :loading="allReqestTableLoading"
              loading-text="Loading... Please wait"
              >
                <template v-slot:item.status="{ item }">
                  <span v-if="item.status == 'Processing'">
                    <v-chip
                      color="primary"
                      text-color="white"
                      x-small
                    >
                      <v-avatar left>
                        <v-icon x-small>mdi-exit-run</v-icon>
                      </v-avatar>
                      {{item.status}}
                    </v-chip>
                  </span>
                  <span v-else-if="item.status == 'Cancel'">
                    <v-chip
                        color="error"
                        text-color="white"
                        x-small
                    >
                        {{item.status}}
                        <v-avatar right>
                        <v-icon>mdi-cash-remove</v-icon>
                        </v-avatar>
                    </v-chip>
                  </span>
                  <span v-else>
                    <v-chip
                      color="success"
                      text-color="white"
                      x-small
                    >
                      {{item.status}}
                      <v-avatar right>
                        <v-icon>mdi-cash-check</v-icon>
                      </v-avatar>
                    </v-chip>
                  </span>
              </template>
            </v-data-table>
          </v-card>
        </v-container>
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
    valid: true,
    bitButtonLoading: false,
    allReqestTableLoading: false,
    bitcoinAmount: 0,
    availableCommissionMoney: 0,
    search: '',
    allRequest: [],
    headers: [
      {
        text: 'By',
        align: 'start',
        value: 'withdrawalBy',
      },
      { text: 'Amount', value: 'amount' },
      { text: 'Acc_Number', value: 'accountNumber' },
      { text: 'Bank', value: 'bank' },
      { text: 'Acc_Name', value: 'accountName'},
      { text: 'Branch', value: 'branch'},
      { text: 'Ben_Number', value: 'beneficiary' },
      { text: 'Last_Money', value: 'availableMoney' },
      { text: 'Status', value: 'status' },
    ],
    bitcoinAmountRules: [
      v => !!v || 'Withdrawal amount is required',
      v => (v && v > 0) || 'Withdrawal amount must be more than 0',
    ],
    bitcoinRef: '',
    bitcoinRefRules: [
      v => !!v || 'Bitcoin Ref code is required',
    ],

    bKashButtonLoading: false,
    bKashAmount: 0,
    bKashAmountRules: [
      v => !!v || 'Withdrawal amount is required',
      v => (v && v > 0) || 'Withdrawal amount must be more than 0',
    ],
    bKashNumber: '',
    bKashNumberRules: [
      v => !!v || 'bKash Number is required',
    ],
    nagadButtonLoading: false,
    nagadAmount: 0,
    nagadAmountRules: [
      v => !!v || 'Withdrawal amount is required',
      v => (v && v > 0) || 'Withdrawal amount must be more than 0',
    ],
    nagadNumber: '',
    nagadNumberRules: [
      v => !!v || 'Nagad Number is required',
    ],
    bankButtonLoading: false,
    bankAmount: 0,
    bankAmountRules: [
      v => !!v || 'Withdrawal amount is required',
      v => (v && v > 0) || 'Withdrawal amount must be more than 0',
    ],
    bankName: '',
    bankNameRules: [
      v => !!v || 'Bank Name is required',
    ],
    bankBranchName: '',
    bankBranchNameRules: [
      v => !!v || 'Bank Name is required',
    ],
    accountName: '',
    accountNameRules: [
      v => !!v || 'Bank Name is required',
    ],
    accountNumber: '',
    accountNumberRules: [
      v => !!v || 'Bank Name is required',
    ],
    accountMobileNumber: '',
    accountMobileNumberRules: [
      v => !!v || 'Bank Name is required',
    ],
    paypalButtonLoading: false,
    paypalAmount: 0,
    paypalAmountRules: [
      v => !!v || 'Withdrawal amount is required',
      v => (v && v > 0) || 'Withdrawal amount must be more than 0',
    ],
    paypalEmail: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  created() {
    this.initialize()
  },
  mounted(){
    // const script = document.createElement("script");script.src = "https://www.paypal.com/sdk/js?client-id=AenfVUqEbtC1OznVJ9wKaQ76Q4moKyuoKtlJjeWEtGHAfiwMQVmcGzcxJ6JzXmd1RE0SD6P2nEGo6KP3";
    // script.addEventListener("load", this.setLoaded);
    // document.body.appendChild(script);
  },
  methods: {
    initialize(){
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.allReqestTableLoading = true;
          return config;
      }, (error) => {
          this.allReqestTableLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.allReqestTableLoading = false;
          return response;
      }, (error) => {
          this.allReqestTableLoading = false;
          return Promise.reject(error);
      });
      let formData = new FormData();
      formData.append('user_id', this.userId);
      this.$axios.post('https://app.forexstick.com/server/api/auth/getAllWithdrawalRequest', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.success.length != 0){
            this.allRequest = res.data.success
          }else{
            console.log('else')
          }
          this.availableCommissionMoney = res.data.cMoney.cMoney
            
        })
        .catch(err => {
          console.log(err.response.data)
        })

    },
    bitcoinWithdrawal(){
      if(this.bitcoinAmount > this.availableCommissionMoney){
        this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Sorry!, Withdrawal Amount more than Available Commission Money"})
        return
      }
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.bitButtonLoading = true;
          return config;
      }, (error) => {
          this.bitButtonLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.bitButtonLoading = false;
          return response;
      }, (error) => {
          this.bitButtonLoading = false;
          return Promise.reject(error);
      });

      let formData = new FormData();

      formData.append('user_id', this.userId);
      formData.append('withdrawalBy', 'Bitcoin');
      formData.append('amount', this.bitcoinAmount);
      formData.append('accountNumber', this.bitcoinRef);
      formData.append('availableMoney', this.availableCommissionMoney);
      this.$axios.post('https://app.forexstick.com/server/api/auth/userBitcointWithdrawalRequest', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
      .then(res => {
        if(res.data.error){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
          return
      }else{
        if(res.data.success.length != 0){

          console.log('res.data.success')
          console.log(res.data.success)
          console.log('res.data.success')
          this.allRequest = res.data.success
          this.$refs.bitcoinForm.reset()
        }else{
          console.log("res")
        }
        this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Withdrawal Request Submitted."})
      }
          
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    bKashWithdrawal(){
      if(this.bKashAmount > this.availableCommissionMoney){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Sorry!, Withdrawal Amount more than Available Commission Money"})
        return
      }
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.bKashButtonLoading = true;
          return config;
      }, (error) => {
          this.bKashButtonLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.bKashButtonLoading = false;
          return response;
      }, (error) => {
          this.bKashButtonLoading = false;
          return Promise.reject(error);
      });
      let formData = new FormData();
      formData.append('user_id', this.userId);
      formData.append('withdrawalBy', 'bKash');
      formData.append('amount', this.bKashAmount);
      formData.append('accountNumber', this.bKashNumber);
      formData.append('availableMoney', this.availableCommissionMoney);
      this.$axios.post('https://app.forexstick.com/server/api/auth/bKashWithdrawal', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
      .then(res => {
        if(res.data.error){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
          return
      }else{
        if(res.data.success.length != 0){

          console.log('res.data.success')
          console.log(res.data.success)
          console.log('res.data.success')
          this.allRequest = res.data.success
          this.$refs.bKashForm.reset()
        }else{
          console.log("res")
        }
        this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Withdrawal Request Submitted."})
      }
          
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    nagadWithdrawal(){
      if(this.nagadAmount > this.availableCommissionMoney){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Sorry!, Withdrawal Amount more than Available Commission Money"})
        return
      }
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.nagadButtonLoading = true;
          return config;
      }, (error) => {
          this.nagadButtonLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.nagadButtonLoading = false;
          return response;
      }, (error) => {
          this.nagadButtonLoading = false;
          return Promise.reject(error);
      });
      let formData = new FormData();
      formData.append('user_id', this.userId);
      formData.append('withdrawalBy', 'Nagad');
      formData.append('amount', this.nagadAmount);
      formData.append('accountNumber', this.nagadNumber);
      formData.append('availableMoney', this.availableCommissionMoney);
      this.$axios.post('https://app.forexstick.com/server/api/auth/nagadWithdrawal', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
      .then(res => {
        if(res.data.error){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
          return
      }else{
        if(res.data.success.length != 0){

          console.log('res.data.success')
          console.log(res.data.success)
          console.log('res.data.success')
          this.allRequest = res.data.success
          this.$refs.nagadForm.reset()
        }else{
          console.log("res")
        }
        this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Withdrawal Request Submitted."})
      }
          
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    bankWithdrawal(){
      if(this.bankAmount > this.availableCommissionMoney){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Sorry!, Withdrawal Amount more than Available Commission Money"})
        return
      }
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.bankButtonLoading = true;
          return config;
      }, (error) => {
          this.bankButtonLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.bankButtonLoading = false;
          return response;
      }, (error) => {
          this.bankButtonLoading = false;
          return Promise.reject(error);
      });
      let formData = new FormData();
      formData.append('user_id', this.userId);
      formData.append('withdrawalBy', 'Bank');
      formData.append('amount', this.bankAmount);
      formData.append('accountNumber', this.accountNumber);
      formData.append('bank', this.bankName);
      formData.append('accountName', this.accountName);
      formData.append('branch', this.bankBranchName);
      formData.append('beneficiary', this.accountMobileNumber);
      formData.append('availableMoney', this.availableCommissionMoney);
      this.$axios.post('https://app.forexstick.com/server/api/auth/bankWithdrawal', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
      .then(res => {
        if(res.data.error){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
          return
      }else{
        if(res.data.success.length != 0){
          console.log('res.data.success')
          console.log(res.data.success)
          console.log('res.data.success')
          this.allRequest = res.data.success
          this.$refs.bankForm.reset()
        }else{
          console.log("res")
        }
        this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Withdrawal Request Submitted."})
      }
          
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    paypalWithdrawal(){
      if(this.paypalAmount > this.availableCommissionMoney){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Sorry!, Withdrawal Amount more than Available Commission Money"})
        return
      }
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.paypalButtonLoading = true;
          return config;
      }, (error) => {
          this.paypalButtonLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.paypalButtonLoading = false;
          return response;
      }, (error) => {
          this.paypalButtonLoading = false;
          return Promise.reject(error);
      });
      let formData = new FormData();
      formData.append('user_id', this.userId);
      formData.append('withdrawalBy', 'Paypal');
      formData.append('amount', this.paypalAmount);
      formData.append('accountNumber', this.paypalEmail);
      formData.append('availableMoney', this.availableCommissionMoney);
      this.$axios.post('https://app.forexstick.com/server/api/auth/paypalWithdrawal', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
      .then(res => {
        if(res.data.error){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
          return
      }else{
        if(res.data.success.length != 0){

          console.log('res.data.success')
          console.log(res.data.success)
          console.log('res.data.success')
          this.allRequest = res.data.success
          this.$refs.paypalForm.reset()
        }else{
          console.log("res")
        }
        this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Withdrawal Request Submitted."})
      }
          
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
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
                this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Account Deposited Successfully."})
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

<style scoped>

</style>