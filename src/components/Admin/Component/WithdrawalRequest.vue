<template>
  <div class="withdrawalRequest">
    <v-card class="ma-5">
        <v-data-table
        :headers="headers"
        :items="withdrawals"
        sort-by="created_at"
        sort-desc
        class="elevation-5"
        :loading="tableLoading"
        :search="search"
        >
            <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>All Request</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    class="mr-3"
                ></v-text-field>
                <v-dialog
                v-model="dialog"
                max-width="500px"
                >
                <!-- <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                    New Item
                    </v-btn>
                </template> -->
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
                                    md="3"
                                >
                                    <v-text-field
                                        v-model="editedItem.amount"
                                        label="Withdrawal Amount*"
                                        :rules="[() => !!editedItem.amount || 'This field is required']"
                                        required
                                        prepend-inner-icon="mdi-currency-usd"
                                        type="number"
                                        color="teal"
                                        hide-details
                                        :readonly="editedItem.status == 'Paid'"
                                        @focus="$event.target.select()"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="9"
                                >
                                    <v-text-field
                                        v-model="editedItem.accountNumber"
                                        label="Account Number*"
                                        :rules="[() => !!editedItem.accountNumber || 'This field is required']"
                                        required
                                        prepend-inner-icon="mdi-account-details"
                                        color="teal"
                                        hide-details
                                        :readonly="editedItem.status == 'Paid'"
                                        @focus="$event.target.select()"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                >
                                    <v-autocomplete
                                        v-model="editedItem.status"
                                        :rules="[() => !!editedItem.status || 'This field is required']"
                                        :items="statusItem"
                                        label="Status*"
                                        placeholder="Select Status"
                                        required
                                        color="#ee6e52"
                                        prepend-inner-icon="mdi-list-status"
                                        chips
                                        clearable
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="save()"
                            >
                                Save
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
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.amount="{ item }">
                ${{item.amount}}
            </template>
            <template v-slot:item.availableMoney="{ item }">
                ${{item.availableMoney}}
            </template>
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
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <!-- <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon> -->
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
    </v-card>
  </div>
</template>

<script>
    import User from "../../../Helpers/User"
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      tableLoading: false,
      search: '',
      availableMoney: 0,
      statusItem: [
          'Processing',
          'Paid',
          'Cancel'
      ],
      headers: [
        {
          text: 'By',
          align: 'start',
          value: 'withdrawalBy',
        },
        { text: 'Amount', value: 'amount' },
        { text: 'Acc_Number', value: 'accountNumber' },
        { text: 'Bank', value: 'bank' },
        { text: 'Acc_Name', value: 'accountName' },
        { text: 'Branch', value: 'branch' },
        { text: 'Ben_Mobile', value: 'beneficiary' },
        { text: 'Last_Money', value: 'availableMoney' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      withdrawals: [],
      editedIndex: -1,
      userToken: User.getToken(),
      userId: User.id(),
      editedItem: {
        amount: '',
        accountNumber: '',
        status: '',
      },
      defaultItem: {
        amount: '',
        accountNumber: '',
        status: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Withdrawal Request' : 'Edit Withdrawal Request'
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
            this.tableLoading = true;
            return config;
        }, (error) => {
            this.tableLoading = false;
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
            this.tableLoading = false;
            return response;
        }, (error) => {
            this.tableLoading = false;
            return Promise.reject(error);
        });
        this.$axios.get('https://app.forexstick.com/server/api/auth/getAllRequest', {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
        }else{
          if(res.data.success.length != 0){
            this.withdrawals = res.data.success
          }
        }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })
      },

      editItem (item) {
        this.editedIndex = this.withdrawals.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.availableMoney = item.availableMoney
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.withdrawals.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.withdrawals.splice(this.editedIndex, 1)
        this.closeDelete()
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
            if(parseInt(this.editedItem.amount) > parseInt(this.availableMoney)){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: "Sorry!, Withdrawal Amount more than Available Commission Money"})
                return
            }
            // Add a request interceptor
            this.$axios.interceptors.request.use( (config) => {
                this.tableLoading = true;
                return config;
            }, (error) => {
                this.tableLoading = false;
                return Promise.reject(error);
            });

            // Add a response interceptor
            this.$axios.interceptors.response.use( (response) =>{
                this.tableLoading = false;
                return response;
            }, (error) => {
                this.tableLoading = false;
                return Promise.reject(error);
            });
            let formData = new FormData();
            formData.append('user_id', this.userId);
            formData.append('id', this.editedItem.id);
            formData.append('amount', this.editedItem.amount);
            formData.append('accountNumber', this.editedItem.accountNumber);
            formData.append('status', this.editedItem.status);
            formData.append('_method', 'PATCH');
            this.$axios.post('https://app.forexstick.com/server/api/auth/updateWithdrawalRequest', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
            .then(res => {
            if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
                return
            }else{
            if(res.data.success.length != 0){
                this.withdrawals = res.data.success
            }
            }
                
            })
            .catch(err => {
            console.log(err.response.data)
            })
        } else {
          this.withdrawals.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>

</style>