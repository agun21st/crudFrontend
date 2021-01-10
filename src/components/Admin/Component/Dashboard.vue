<template>
  <div id="AdminDashboard" class="" style="background-color: #E0E0E0 !important; height: 100vh;">
    <v-row class="pa-3">
      <v-col cols="12">
        <div class="mb-5 hidden-md-and-up">
          <span style="font-size: 20px;" class="">Trade Accounts</span>
          <v-btn color="#ee6e52" class="white--text  mx-2" small @click="initialize"><v-icon left>mdi-refresh</v-icon>Refresh</v-btn>
          <!-- <v-btn color="teal" class="white--text " small @click="updateFxBookData">Update</v-btn> -->
        </div>
        <v-data-table
          :headers="headers"
          :items="userTradeAccounts"
          sort-by="id"
          sort-desc
          class="elevation-10"
          :loading="userCardLoading"
          loading-text="Loading... Please wait"
          :search="search"
          dense
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title class="hidden-sm-and-down">Trade Accounts</v-toolbar-title>
              <v-divider
                class="mx-4 hidden-sm-and-down"
                inset
                vertical
              ></v-divider>
              <v-btn color="#ee6e52" class="white--text hidden-sm-and-down" @click="initialize"><v-icon left>mdi-refresh</v-icon>Refresh</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search ..."
                single-line
                hide-details
                @focus="$event.target.select()"
                class="d-print-none mr-5"
                ></v-text-field>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab 
                    dark
                    color="teal" 
                    class="mb-2 white--text"
                    v-bind="attrs"
                    v-on="on"
                    v-show="role=='Super_Admin'"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
      
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="12"
                          md="5"
                        >
                          <v-radio-group
                            v-model="editedItem.tradeAccount"
                            column
                            class="m-0"
                          >
                            <v-radio
                              label="REAL"
                              value="Real"
                              color="teal"
                            ></v-radio>
                            <v-radio
                              label="DEMO"
                              value="Demo"
                              color="teal"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="7"
                        >
                          <v-autocomplete
                            v-model="editedItem.accountType"
                            :items="accountTypes"
                            label="Account Type"
                            required
                            :rules="[() => !!editedItem.accountType || 'This field is required']"
                            outlined
                            class="mx-5 px-5"
                            color="teal"
                          ></v-autocomplete>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.accountId"
                            label="Account_ID *"
                            color="teal"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.broker"
                            label="Broker_Name *"
                            color="teal"
                          ></v-text-field>
                        </v-col>
                        <!-- <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.accountPassword"
                            label="Password *"
                            color="teal"
                          ></v-text-field>
                        </v-col> -->
                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.tradeId"
                            label="Trade_ID"
                            color="teal"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.sessionId"
                            label="MyFxBook_Session"
                            color="teal"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
      
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="teal"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="teal"
                      text
                      @click="save"
                    >
                      Add
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm" :loading="deleteOKBtn">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.status="{ item }">
            <v-autocomplete
              v-model="item.status"
              :items="allStatus"
              :class="item.status=='Pending'? 'red--text': 'green--text'"
              color="teal"
              dense
              outlined
              hide-details
              style="width: 120px"
              @change="statusChange(item)"
            ></v-autocomplete>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
              v-show="role=='Super_Admin'"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
              v-show="role=='Super_Admin'"
            >
              mdi-delete
            </v-icon>
          </template>
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
      <v-col cols="12">
        <div class="my-3 hidden-md-and-up">
          <span style="font-size: 20px;" class="">All Trade History</span>
        </div>
        <v-data-table
          :headers="headers2"
          :items="myFxBook"
          sort-by="id"
          sort-desc
          class="elevation-10"
          dense
          style="margin-bottom: 300px"
          :loading="userCardLoading"
          loading-text="Loading... Please wait"
          :search="searchHistory"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title class="hidden-sm-and-down">All Trade History</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchHistory"
                append-icon="mdi-magnify"
                label="Search ..."
                single-line
                hide-details
                @focus="$event.target.select()"
                class="d-print-none mr-5"
                ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.updated_at="{ item }">
            {{new Date(item.updated_at).toDateString()}}
          </template>
          <template v-slot:no-data>
            <v-btn
              color="teal"
              @click="initialize"
              class="white--text"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
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
      userCardLoading: false,
      deleteOKBtn: false,
      userToken: User.getToken(),
      userId: User.id(),
      role: User.role(),
      getAllUser: [],
      userTradeAccounts: [],
      myFxBook: [],
      search: '',
      searchHistory: '',
      allStatus: [
        'Pending', 'Active', 'Inactive'
      ],
      accountTypes: [
        'MT4', 'MT5'
      ],
      headers: [
        { text: '#', value: 'id' },
        { text: 'Account', value: 'tradeAccount' },
        { text: 'Type', value: 'accountType' },
        { text: 'Account_ID', value: 'accountId', sortable: false },
        { text: 'Server', value: 'broker' },
        { text: 'Added_at', value: 'created_at'},
        // { text: 'Status', value: 'status', sortable: false },
        User.role()=='Super_Admin'?{ text: 'Actions', value: 'actions', sortable: false }:'',
      ],
      headers2: [
        {
          text: '#',
          align: 'start',
          value: 'id',
        },
        { text: 'Account_ID', value: 'accountId',  sortable: false},
        { text: 'Lots', value: 'lots'},
        { text: 'Pips', value: 'pips'},
        { text: 'Profit', value: 'profit'},
        { text: 'Balance', value: 'balance' },
        { text: 'Date', value: 'date'},
        { text: 'Updated_By', value: 'updated_by'},
        { text: 'Updated_at', value: 'updated_at'},
      ],
      dialog: false,
      dialogDelete: false,
      processing: false,
      editedIndex: -1,
      editedItem: {
        tradeAccount: 'Real',
        accountType: 'MT4',
        accountId: '',
        sessionId: '',
        tradeId: '',
        // accountPassword: '',
        broker: '',
      },
      defaultItem: {
        tradeAccount: 'Real',
        accountType: 'MT4',
        accountId: '',
        sessionId: '',
        tradeId: '',
        // accountPassword: '',
        broker: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Trade Account'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created() {
      // this.userTradeAccounts = this.$store.state.allTradeAccount[0]
      // this.myFxBook = this.$store.state.myFxBook[0]
      this.initialize()
      
    },
    mounted(){
      
    },
    methods: {
      initialize () {
        // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
            this.userCardLoading = true;
            return config;
        }, (error) => {
            this.userCardLoading = false;
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
            this.userCardLoading = false;
            return response;
        }, (error) => {
            this.userCardLoading = false;
            return Promise.reject(error);
        });

        this.$axios.get('https://app.forexstick.com/server/api/auth/getAllTradeAccount', {headers: {'Authorization': 'Bearer '+ this.userToken}})
          .then(res => {
            this.userTradeAccounts = res.data.tradeAccounts
            this.myFxBook = res.data.myFxBook
          })
          .catch(err => {
            console.log(err.response.data)
          })
      },
      // updateFxBookData(){
      //   // Add a request interceptor
      //   this.$axios.interceptors.request.use( (config) => {
      //       this.processing = true;
      //       return config;
      //   }, (error) => {
      //       this.processing = false;
      //       return Promise.reject(error);
      //   });

      //   // Add a response interceptor
      //   this.$axios.interceptors.response.use( (response) =>{
      //       this.processing = false;
      //       return response;
      //   }, (error) => {
      //       this.processing = false;
      //       return Promise.reject(error);
      //   });
      //   let formData = new FormData();
      //   formData.append('user_id', this.userId);
      //   this.$axios.post('/api/auth/updateFxBookData', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
      //     .then(res => {
      //       if(res.data.error){
      //         Swal.fire({
      //             icon: 'error',
      //             title: res.data.error,
      //             text: '',
      //         })
      //       }else{
      //           Toast.fire({
      //             icon: 'success',
      //             title: 'Last Day Account History '+res.data.success
      //           })
      //         this.myFxBook = res.data.myFxBook
      //       }  
      //     })
      //     .catch(err => {
      //       console.log(err.response.data)
      //     })
      // },
      usersTab(){
        this.$router.push({ name : 'Users'})
      },

      statusChange(item){
        if(item.sessionId != '' && item.tradeId != '' && item.sessionId != 'null' && item.tradeId != 'null'){
          // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
            this.userCardLoading = true;
            return config;
        }, (error) => {
            this.userCardLoading = false;
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
            this.userCardLoading = false;
            return response;
        }, (error) => {
            this.userCardLoading = false;
            return Promise.reject(error);
        });

        let formData = new FormData();
        formData.append('id', item.id);
        formData.append('status',item.status);
        formData.append('_method', 'PATCH');
        this.$axios.post('https://app.forexstick.com/server/api/auth/statusChange',formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
          .then(res => {
            this.userTradeAccounts = res.data.tradeAccounts
            // Toast.fire({
            //   icon: 'success',
            //   title: 'Status '+res.data.success+' successfully'
            // })
            this.$store.commit('updateSnackbar', {show: true, color: 'success', message: res.data.success})
          })
          .catch(err => {
            console.log(err.response.data)
          })
        }else{
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Must Need Session_ID and Trade_ID to Active this Trade Account.',
          //     text: 'Please Use Email and Password to Generate Session_ID and Trade_ID in MyFxBook_Generator Area.',
          // })
        }
      },

      editItem (item) {
        this.editedIndex = this.userTradeAccounts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.userTradeAccounts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        
      },

      deleteItemConfirm () {
        // this.userTradeAccounts.splice(this.editedIndex, 1)
        this.$axios.interceptors.request.use( (config) => {
              this.deleteOKBtn = true;
              return config;
          }, (error) => {
              this.deleteOKBtn = false;
              return Promise.reject(error);
          });
          // Add a response interceptor
          this.$axios.interceptors.response.use( (response) =>{
              this.deleteOKBtn = false;
              return response;
          }, (error) => {
              this.deleteOKBtn = false;
              return Promise.reject(error);
          });
          let formData = new FormData();
          formData.append('id', this.editedItem.id);
          formData.append('_method', 'DELETE');
          this.$axios.post('https://app.forexstick.com/server/api/auth/tradeAccountDelete', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
          .then(res => {
              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
              }else{
                this.userTradeAccounts = res.data.tradeAccounts
                // console.log(res.data)
                this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Trade Account Deleted Successfully from Server"})
                this.closeDelete()
              }
          })
          .catch(err => console.log(err+' from save() edit axios catch'))
      },

      close () {
        this.dialog = false
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
          formData.append('id', this.editedItem.id);
          formData.append('tradeAccount', this.editedItem.tradeAccount);
          formData.append('accountType', this.editedItem.accountType);
          formData.append('accountId', this.editedItem.accountId);
          formData.append('sessionId', this.editedItem.sessionId);
          formData.append('tradeId', this.editedItem.tradeId);
          formData.append('accountPassword', this.editedItem.accountPassword);
          formData.append('broker', this.editedItem.broker);
          formData.append('_method', 'PATCH');
          this.$axios.post('https://app.forexstick.com/server/api/auth/tradeAccountAdminUpdate', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
          .then(res => {
              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
              }else{
                  this.userTradeAccounts = res.data.tradeAccounts
                this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Trade Account Update Successfully in Our Server"})
              }
          })
          .catch(err => console.log(err+' from save() edit axios catch'))

        } else {

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
          formData.append('tradeAccount', this.editedItem.tradeAccount);
          formData.append('accountType', this.editedItem.accountType);
          formData.append('accountId', this.editedItem.accountId);
          formData.append('broker', this.editedItem.broker);

          this.$axios.post('https://app.forexstick.com/server/api/auth/addUserTradeAccount', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
            .then(res => {

              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
                return
            }else{

              if(res.data.userTradeAccounts.length != 0){
                this.userTradeAccounts =  res.data.userTradeAccounts

              }else{
                return
              }

              //reset
              this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
              })
              this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Your Trade Account Successfully Added in Our Server"})
            }
                
            })
            .catch(err => {
              console.log(err.response.data)
            })
        }
        this.close()
      },
    }
  }
</script>

<style>

</style>