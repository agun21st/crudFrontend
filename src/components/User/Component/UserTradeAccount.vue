<template>
  <div id="UserTradeAccount" class="ma-5 depositeBgImage">
    <v-row v-show="hasAccount">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="userAccounts"
          sort-by="accountType"
          class="elevation-5"
          :loading="loading"
          :search="search"
          loading-text="Accounts is Loading... Please wait"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>My Trade Account</v-toolbar-title>
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
            </v-toolbar>
          </template>
          <template v-slot:item.status="{ item }">
            <span v-if="(item.status == 'Pending')">
                <v-chip class="" small color="#ee6e52" text-color="white">
                    {{item.status}}
                </v-chip>
            </span>
            <span v-if="(item.status == 'Active')">
                <v-chip class="" color="#202c45" text-color="#00d7ab">
                    {{item.status}}
                </v-chip>
            </span>
            <span v-if="(item.status == 'Inactive')">
                <v-chip class="" color="error" text-color="white">
                    {{item.status}}
                </v-chip>
            </span>
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
    <v-row dense class="dashboardBottom" v-show="addAccount">
      <v-col cols="12" md="6" class="">
        <v-card
        class="mx-auto"
        max-width="500"
        height="490"
        elevation="24"
      >
        <v-toolbar
          color="#202c45"
          dark
        >
          <v-spacer></v-spacer>
          <v-toolbar-title class="termsconditions">Terms and Conditions</v-toolbar-title>
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
                <v-list dense color="#202c45">
                  <v-list-item-group
                    class="#202c45"
                  >
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="item.icon" color="#00d7ab"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <!-- <v-list-item-title v-text="item.text"></v-list-item-title> -->
                        <p class="mobileFont">{{item.text}}</p>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      </v-col>
      <v-col cols="12" md="6">
          <v-card
          class="mx-auto"
          max-width="500"
          height="650"
          elevation="24"
        >
          <v-toolbar
            color="teal"
            dark
          >
            <v-spacer></v-spacer>
            <v-toolbar-title class="addtradeaccount">Add Trade Account</v-toolbar-title>
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
                <v-form
                  ref="form"
                  v-model="valid"
                >
                  <v-card-text style="font-size: 26px" class="d-flex justify-content-center">
                    <v-radio-group
                      v-model="tradeAccount"
                      row
                    >
                      <v-radio
                        label="REAL ACCOUNT"
                        value="Real"
                        color="#00d7ab"
                      ></v-radio>
                      <v-radio
                        label="DEMO ACCOUNT"
                        value="Demo"
                        color="#00d7ab"
                      ></v-radio>
                    </v-radio-group>
                  </v-card-text>
                    <v-autocomplete
                      v-model="accountType"
                      :items="accountTypes"
                      label="Select Account Type"
                      required
                      :rules="[() => !!accountType || 'This field is required']"
                      outlined
                      class="mx-5 px-5"
                      color="#00d7ab"
                    ></v-autocomplete>
                    <v-text-field
                      v-model="accountId"
                      label="MT4 / MT5 User ID"
                      type="text"
                      required
                      :rules="[() => !!accountId || 'This field is required']"
                      outlined
                      class="mx-5 px-5"
                      color="#00d7ab"
                    ></v-text-field>
                    <v-text-field
                      v-model="accountPassword"
                      label="MT4 / MT5 Account Password"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show3 ? 'text' : 'password'"
                      @click:append="show3 = !show3"
                      hint="At least 4 characters"
                      required
                      :rules="[passwordRules.required, passwordRules.min]"
                      outlined
                      class="mx-5 px-5"
                      color="#00d7ab"
                    ></v-text-field>
                    <v-text-field
                      v-model="broker"
                      label="MT4 / MT5 Broker Name"
                      outlined
                      type="text"
                      required
                      :rules="[() => !!broker || 'This field is required']"
                      class="mx-5 px-5"
                      color="#00d7ab"
                    ></v-text-field>
                    <v-checkbox
                      v-model="checkbox"
                      label="I accept Terms and Conditions"
                      required
                      :rules="[v => !!v || 'You must agree to continue!']"
                      color="#00d7ab"
                      class="mx-5 px-5 my-0 py-0"
                    ></v-checkbox>
                    <div class="text-center">
                    <v-btn
                      :disabled="!valid"
                      rounded
                      color="teal"
                      dark
                      large
                      class="mx-5 px-5 mb-5"
                      width="200px"
                      type="submit"
                      @click.prevent="tradeAccountSubmit"
                    >
                      Submit
                    </v-btn>
                    </div>
                  </v-form>
                </v-card>
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
          Storing Information is processing ..
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
    checkbox: false,
    show3: false,
    hasAccount: false,
    addAccount: false,
    deleteBtnLoading: false,
    valid: true,
    checkbox: false,
    dialog: false,
    tableDialog: false,
    dialogDelete: false,
    loading: false,
    tradeAccount: 'Real',
    accountType: '',
    accountId: '',
    accountPassword: '',
    broker: '',
    search: '',
    userToken: User.getToken(),
    passwordRules: {
        required: value => !!value || 'Password is required.',
        min: v => v.length >= 4 || 'Min 4 characters',
    },
    item: 1,
    accountTypes: [
      'MT4', 'MT5'
    ],
    items: [
      { text: 'Minimum Deposit $500 Upto $1,00,000', icon: 'mdi-cash-plus' },
      { text: 'Just Put Your MT4-MT5 Account Details ( User ID | Password | Server).', icon: 'mdi-account-key-outline' },
      { text: 'Weekly Profit Share 50%.', icon: 'mdi-cash-multiple' },
      { text: 'You have to pay our due within (Sat-Sun).', icon: 'mdi-cash-refund' },
      { text: 'Free 7 Days Trial Only For Demo Account.', icon: 'mdi-file-chart-outline' },
      { text: 'Risk Warning: Trading Derivatives carries a high level of risk to your capital.Trading Derivatives may not be suitable for all investors, so please ensure that you fully understand the risks involved and seek independent advice if necessary..', icon: 'mdi-fishbowl-outline' },
    ],
    headers: [
      // { text: '#', value: 'id' },
      {
        text: 'Account',
        align: 'start',
        value: 'tradeAccount',
      },
      { text: 'Type', value: 'accountType' },
      { text: 'User_ID', value: 'accountId' },
      { text: 'Server', value: 'broker' },
      { text: 'Status', value: 'status' },
      { text: 'Added_On', value: 'created_at' },
      // { text: 'Actions', value: 'actions', sortable: false },
    ],
    userAccounts: [],
    editedIndex: -1,
    editedItem: {
      tradeAccount: '',
      accountType: '',
      accountId: '',
      accountPassword: '',
      broker: '',
    },
    defaultItem: {
      tradeAccount: '',
      accountType: '',
      accountId: '',
      accountPassword: '',
      broker: '',
    },
  }),
  computed: {
    form () {
      return {
        accountType: this.accountType,
      }
    },

    formTitle () {
      return this.editedIndex === -1 ? 'New Account' : 'Edit Account'
    },
  },
  watch: {
    tableDialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created() {
    if(this.$store.state.userInfo.length == 0){
        this.$router.push({name : 'UserDashboard'}).catch(()=>{})
      }else{
        this.initialize()
      }
  },
  methods: {
    validate () {
        this.$refs.form.validate()
    },
    tradeAccountSubmit() {

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

      let formData = new FormData();

      formData.append('user_id', this.$store.state.userInfo[0].id);
      formData.append('tradeAccount', this.tradeAccount);
      formData.append('accountType', this.accountType);
      formData.append('accountId', this.accountId);
      formData.append('accountPassword', this.accountPassword);
      formData.append('broker', this.broker);

      this.$axios.post('https://app.forexstick.com/server/api/auth/addUserTradeAccount', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {

          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
        }else{

          if(res.data.userAccounts.length != 0){
            this.hasAccount = true
            this.addAccount = false
            this.userAccounts =  res.data.userAccounts
          }else{
            this.hasAccount = false
            this.addAccount = true
          }

          //reset
          this.tradeAccount = 'Real_Account'
          this.accountType = ''
          this.accountId = ''
          this.accountPassword = ''
          this.broker = ''
          this.checkbox = false

          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Your Trade Account Successfully Added in Our Server"})
        }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })
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

      formData.append('user_id', this.$store.state.userInfo[0].id);

      this.$axios.post('https://app.forexstick.com/server/api/auth/getUserTradeAccount', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {

          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
        }else{

          if(res.data.userAccounts.length != 0){
            this.hasAccount = true
            this.addAccount = false
            this.userAccounts =  res.data.userAccounts
          }else{
            this.hasAccount = false
            this.addAccount = true
          }
        }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    editItem (item) {
      this.editedIndex = this.userAccounts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.tableDialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.userAccounts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      // Add a request interceptor
      this.$axios.interceptors.request.use( (config) => {
          this.usersTableLoader = true;
          this.deleteBtnLoading = true;
          return config;
      }, (error) => {
          this.usersTableLoader = false;
          this.deleteBtnLoading = false;
          return Promise.reject(error);
      });

      // Add a response interceptor
      this.$axios.interceptors.response.use( (response) =>{
          this.usersTableLoader = false;
          this.deleteBtnLoading = false;
          return response;
      }, (error) => {
          this.usersTableLoader = false;
          this.deleteBtnLoading = false;
          return Promise.reject(error);
      });
      let formData = new FormData();
      formData.append('id', this.editedItem.id);
      formData.append('_method', 'DELETE');

      this.$axios.post('https://app.forexstick.com/server/api/auth/userAccountDelete', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {

          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
          }else{
            this.$store.commit('updateSnackbar', {show: true, color: 'warning', message: res.data.success})
            this.userAccounts = res.data.userAccounts
            this.closeDelete()
          }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },

    deleteItem (item) {
      this.editedIndex = this.userAccounts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    close () {
      this.tableDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
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

        let formData = new FormData();
        formData.append('id', this.userAccounts[this.editedIndex].id);
        formData.append('tradeAccount', this.editedItem.tradeAccount);
        formData.append('accountType', this.editedItem.accountType);
        formData.append('accountId', this.editedItem.accountId);
        formData.append('accountPassword', this.editedItem.accountPassword);
        formData.append('broker', this.editedItem.broker);
        formData.append('_method', 'PATCH');
        this.$axios.post('https://app.forexstick.com/server/api/auth/tradeAccountUpdate', formData,{headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {

            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: res.data.error,
                    text: '',
                })
            }else{
                this.userAccounts = res.data.userAccounts

                Swal.fire({
                icon: 'success',
                title: 'Your Trade Account Update Successfully in Our Server',
                text: 'Thank you!',
            })
            }
        })
        .catch(err => console.log(err+' from save() edit axios catch'))

      } else {
        // Add New Account Area

        // this.userAccounts.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>

<style>

</style>