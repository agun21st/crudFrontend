<template>
  <div id="AdminDashboard" class="" style="background-color: #E0E0E0 !important; height: 100vh;">
    <v-row class="pa-3">
      <v-col cols="12" v-show="!affiliateTable">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="users"
            sort-by="id"
            sort-desc=""
            class="elevation-5"
            :search="search"
            :loading="usersTableLoader"
            loading-text="Loading... Please wait"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>All Users</v-toolbar-title>
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
                  class="mr-5"
                ></v-text-field>
                <v-dialog
                  v-model="dialog"
                  max-width="650px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="teal"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left>mdi-plus</v-icon> Create User
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
                            sm="6"
                            md="6"
                            xs="12"
                          >
                            <v-text-field
                              v-model="editedItem.name"
                              label="Full Name*"
                              color="teal"
                              prepend-icon="mdi-account-tie-outline"
                              required
                              @focus="$event.target.select()"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            xs="12"
                          >
                            <v-autocomplete
                              v-model="editedItem.country"
                              :items="countries"
                              label="Select Country*"
                              color="teal"
                              prepend-icon="mdi-home-city"
                              required
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            xs="12"
                          >
                            <v-text-field
                              v-model="editedItem.email"
                              label="Email*"
                              color="teal"
                              prepend-icon="mdi-gmail"
                              type="email"
                              required
                              @blur="emailCheck"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            xs="12"
                          >
                            <v-text-field
                              color="teal"
                              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show3 ? 'text' : 'password'"
                              v-model="editedItem.password"
                              label="Password*"
                              hint="At least 4 characters"
                              prepend-icon="mdi-account-lock-outline"
                              @click:append="show3 = !show3"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="5"
                          >
                          <v-text-field
                              v-model="editedItem.mobile"
                              label="Mobile Number*"
                              color="teal"
                              prepend-icon="mdi-account-tie-outline"
                              required
                              counter="15"
                              @focus="$event.target.select()"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="3"
                          >
                            <div>IM</div>
                            <v-radio-group
                              v-model="editedItem.imName"
                              column
                              class="mt-0"
                            >
                              <v-radio
                                color="teal"
                                value="Skype"
                              >
                                <template v-slot:label>
                                  <div>Skype</div>
                                </template>
                              </v-radio>
                              <v-radio
                                color="teal"
                                value="Telegram"
                              >
                                <template v-slot:label>
                                  <div>Telegram</div>
                                </template>
                              </v-radio>
                            </v-radio-group>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            xs="12"
                          >
                            <v-text-field
                              v-model="editedItem.imUsername"
                              label="IM Username*"
                              color="teal"
                              @focus="$event.target.select()"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="3"
                          >
                            <v-autocomplete
                              v-model="editedItem.role"
                              :items="allStatus"
                              color="teal"
                              outlined
                              hide-details
                              label="User Type"
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="9"
                          >
                            <v-autocomplete
                              v-model="editedItem.flwAccounts"
                              :items="followingAccounts"
                              color="teal"
                              label="Select Accounts"
                              multiple
                              chips
                              hint="Accounts Following List"
                              persistent-hint
                              clearable
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                          >
                            <v-text-field
                              v-model="editedItem.commission"
                              label="Affiliate Commission*"
                              color="teal"
                              prepend-icon="mdi-percent-outline"
                              @focus="$event.target.select()"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                          >
                            <v-text-field
                              v-model="editedItem.cMoney"
                              label="Commission Money*"
                              color="teal"
                              prepend-icon="mdi-currency-usd"
                              @focus="$event.target.select()"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        @click="close"
                        dark
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="teal"
                        @click="save"
                        :loading="saveBtnLoading"
                        dark
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
                      <v-btn color="error" text @click="deleteItemConfirm" :loading="deleteBtnLoading">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.commission="{ item }">
              {{item.commission}}%
            </template>
            <template v-slot:item.cMoney="{ item }">
              ${{item.cMoney}}
            </template>
            
            <!-- <template v-slot:item.role="props">
              <v-edit-dialog
                :return-value.sync="props.item.role"
                large
                persistent
                @save="save"
                @cancel="closeEditModal"
              >
                <div>{{ props.item.role }}</div>
                <template v-slot:input>
                  <div class="mt-4 title">
                    Update Role
                  </div>
                  <v-text-field
                    v-model="props.item.role"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                    autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template> -->
            <template v-slot:item.imUsername="{ item }">
              <span v-if="item.imUsername">
                {{item.imName}} : {{item.imUsername}}
              </span>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  @click="deleteItem(item)"
                  v-if="$store.state.userInfo[0].role == 'Super_Admin' || $store.state.userInfo[0].role == 'Admin'"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-delete
                </v-icon>
                </template>
                <span>Delete</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    @click="showAffiliates(item)"
                    v-if="$store.state.userInfo[0].role == 'Super_Admin' || $store.state.userInfo[0].role == 'Admin'"
                    right
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-account-supervisor-circle
                  </v-icon>
                </template>
                <span>Show_Affiliates</span>
              </v-tooltip>

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
      </v-col>
      <v-col cols="12" class="m-3" v-show="affiliateTable">
        <v-data-table
          :headers="headers2"
          :items="getAffiliates"
          sort-by="created_at"
          sort-desc
          class="elevation-5"
          :loading="loading"
          :search="search2"
          loading-text="Accounts is Loading... Please wait"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{affiliateOwner}} ({{commission}}%)</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer class="d-none d-md-block"></v-spacer>
                <v-text-field
                v-model="search2"
                append-icon="mdi-magnify"
                label="Search ..."
                single-line
                hide-details
                @focus="$event.target.select()"
                class="d-print-none mr-5"
                ></v-text-field>
                <!-- <v-btn color="teal" class="white--text" @click="initialize"><v-icon left>mdi-refresh</v-icon>Refresh</v-btn> -->
                <v-btn color="teal" class="white--text" @click="affiliateTable = !affiliateTable"><v-icon left>mdi-keyboard-backspace</v-icon>Back</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.created_at="{ item }">
            <span v-if="item.created_at">
                {{new Date(item.created_at).toISOString().substr(0, 10)}}
            </span>
          </template>
          <template v-slot:item.cMoney="props">
            <v-edit-dialog
              :return-value.sync="props.item.cMoney"
              large
              persistent
              @save="cMoneySave(props.item)"
              @cancel="cancel"
            >
              <div>${{ props.item.cMoney }}</div>
              <template v-slot:input>
                <div class="mt-4 title">
                  Update Commission Money
                </div>
                <v-text-field
                  v-model="props.item.cMoney"
                  label="Edit"
                  single-line
                  autofocus
                  type="number"
                  color="teal"
                  prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
              </template>
            </v-edit-dialog>
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
      dialog: false,
      dialogDelete: false,
      usersTableLoader: false,
      deleteBtnLoading: false,
      commission: 0,
      search: '',
      search2: '',
      loading: false,
      saveBtnLoading: false,
      securityCode: '',
      show3: false,
      affiliateTable: false,
      affiliateOwner: '',
      affiliateOwnerId: 0,
      userToken: User.getToken(),
      userId: User.id(),
      // max25chars: v => v.length <= 25 || 'Input too long!',
      userEditId: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Country', value: 'country' },
        // { text: 'FXSB', value: 'fsBalance' },
        // { text: 'TB', value: 'taBalance' },
        { text: 'Following', value: 'followingAccounts' },
        { text: 'Commission', value: 'commission' },
        { text: 'Com_Money', value: 'cMoney' },
        // { text: 'Trader', value: 'traderType' },
        // { text: 'IM', value: 'imUsername' },
        { text: 'Role', value: 'role'},
        // { text: 'Code', value: 'securityCode' },
        // { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headers2: [
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
      getAffiliates: [],
      users: [],
      inputValue: '',
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        country: '',
        password: '',
        mobile: '',
        // traderType: 'Experienced',
        imName: 'Skype',
        imUsername: '',
        role: 'User',
        flwAccounts: [],
        fsBalance: 0,
        taBalance: 0,
        commission: 0,
        cMoney: 0,
      },
      defaultItem: {
        name: '',
        email: '',
        country: '',
        password: '',
        // traderType: 'Experienced',
        mobile: '',
        imName: 'Skype',
        imUsername: '',
        role: 'User',
        flwAccounts: [],
        fsBalance: 0,
        taBalance: 0,
        commission: 0,
        cMoney: 0,
      },
      followingAccounts: [],
      getFlAccounts: '',
      allStatus: [
        'User', 'Admin'
      ],
      countries: [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 
        'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 
        'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 
        'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 
        'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 
        'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 
        'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 
        'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 
        'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 
        'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 
        'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 
        'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 
        'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 
        'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 
        'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 
        'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia',
        'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 
        'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 
        'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 
        'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 
        'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 
        'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 
        'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 
        'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 
        'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 
        'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 
        'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Create New User' : 'Edit Existing User'
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
      if(this.$store.state.userInfo.length==0){
        this.assignUserState()
      }
      this.initialize()
    },

    methods: {
      initialize () {
        // Add a request interceptor
        this.$axios.interceptors.request.use( (config) => {
            this.usersTableLoader = true;
            return config;
        }, (error) => {
            this.usersTableLoader = false;
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.$axios.interceptors.response.use( (response) =>{
            this.usersTableLoader = false;
            return response;
        }, (error) => {
            this.usersTableLoader = false;
            return Promise.reject(error);
        });
        this.$axios.get('https://app.forexstick.com/server/api/auth/getFollowingAccounts', {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
        }else{
          if(res.data.accountId){
            this.followingAccounts = res.data.accountId
          }
          this.users = res.data.getAllUser
        }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })
      },
      assignUserState(){
        let formData = new FormData();
        formData.append('id', this.userId);
        this.$axios.post('https://app.forexstick.com/server/api/auth/assignUserState', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
        }else{

          if(res.data.success){
            this.$store.commit("setCurrentUser", res.data.success);
          }
        }
            
        })
        .catch(err => {
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: err})
          console.log(err.response.data)
        })
      },
      cMoneySave(item){
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
        formData.append('affiliateOwnerId', this.affiliateOwnerId);
        formData.append('id', item.id);
        formData.append('cMoney', item.cMoney);
        formData.append('_method', 'PATCH');
        this.$axios.post('https://app.forexstick.com/server/api/auth/updateCMoney', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
        .then(res => {
          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            return
        }else{

          if(res.data.getAffiliates){
            this.getAffiliates = res.data.getAffiliates
          }
        }
            
        })
        .catch(err => {
          console.log(err.response.data)
        })
      },
      cancel(){

      },
      showAffiliates(item){
        this.affiliateTable = !this.affiliateTable
        this.affiliateOwner = item.name
        this.affiliateOwnerId = item.securityCode
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
        formData.append('id', item.id);
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
      emailCheck: function(){
        
        if(this.editedIndex > -1){
          return
        }
        let formData = new FormData();
        formData.append('email', this.editedItem.email);

        this.$axios.post('https://app.forexstick.com/server/api/emailCheck', formData, {})
        .then(res => {

          if(res.data.error){
            this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
            this.editedItem.email = ''
            return
          }else{
            console.log("else")
          }
            
        })
        .catch(err => {
            if(err.data.error)
            {
              this.$store.commit('updateSnackbar', {show: true, color: 'error', message: err.data.error})
              this.errors = err.data.error,
              console.log(err.data.error);
            }
        })
      },
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        if(item.followingAccounts != null){
          this.editedItem.flwAccounts = item.followingAccounts.split(" ");
        }
        this.userEditId = item.id
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        // this.users.splice(this.editedIndex, 1)
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

          this.$axios.post('https://app.forexstick.com/server/api/auth/deleteUserAccount', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
            .then(res => {

              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
                return
              }else{
                this.$store.commit('updateSnackbar', {show: true, color: 'warning', message: res.data.success})
                this.users = res.data.getAllUser
                this.closeDelete()
              }
                
            })
            .catch(err => {
              console.log(err.response.data)
            })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeEditModal () {
        
        alert('Cancel')
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
          // console.log(this.editedItem.flwAccounts == undefined)
          if(this.editedItem.flwAccounts != undefined){
            this.editedItem.flwAccounts.forEach(el => {
              this.getFlAccounts += el+' '
            });
          }
          // Add a request interceptor
          this.$axios.interceptors.request.use( (config) => {
              this.usersTableLoader = true;
              this.saveBtnLoading = true;
              return config;
          }, (error) => {
              this.usersTableLoader = false;
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });

          // Add a response interceptor
          this.$axios.interceptors.response.use( (response) =>{
              this.usersTableLoader = false;
              this.saveBtnLoading = false;
              return response;
          }, (error) => {
              this.usersTableLoader = false;
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });
          let formData = new FormData();
          formData.append('id', this.userEditId);
          formData.append('name', this.editedItem.name);
          formData.append('email', this.editedItem.email);
          formData.append('country', this.editedItem.country);
          formData.append('password', this.editedItem.password);
          formData.append('mobile', this.editedItem.mobile);
          // formData.append('traderType', this.editedItem.traderType);
          if(this.editedItem.flwAccounts != undefined){
            formData.append('getFlAccounts', this.getFlAccounts);
          }else{
            formData.append('getFlAccounts', '');
          }
          formData.append('imName', this.editedItem.imName);
          formData.append('imUsername', this.editedItem.imUsername);
          formData.append('role', this.editedItem.role);
          // formData.append('fsBalance', this.editedItem.fsBalance);
          // formData.append('taBalance', this.editedItem.taBalance);
          formData.append('commission', this.editedItem.commission);
          formData.append('cMoney', this.editedItem.cMoney);
          formData.append('addedById', this.userId);
          formData.append('addedByName', this.$store.state.userInfo[0].name);
          formData.append('_method', 'PATCH');

          this.$axios.post('https://app.forexstick.com/server/api/auth/adminUserEdit', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
            .then(res => {

              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
                return
              }else{
                this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Account Updated Successfully."})
                this.users = res.data.success
                this.getFlAccounts = ''
                this.close()
              }
                
            })
            .catch(err => {
              console.log(err.response.data)
            })

        } else {
          // Add a request interceptor
          this.$axios.interceptors.request.use( (config) => {
              this.usersTableLoader = true;
              this.saveBtnLoading = true;
              return config;
          }, (error) => {
              this.usersTableLoader = false;
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });

          // Add a response interceptor
          this.$axios.interceptors.response.use( (response) =>{
              this.usersTableLoader = false;
              this.saveBtnLoading = false;
              return response;
          }, (error) => {
              this.usersTableLoader = false;
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });

          this.securityCode = Math.floor(100000 + Math.random() * 900000)

          let formData = new FormData();
          formData.append('name', this.editedItem.name);
          formData.append('email', this.editedItem.email);
          formData.append('country', this.editedItem.country);
          formData.append('password', this.editedItem.password);
          formData.append('traderType', this.editedItem.traderType);
          formData.append('imName', this.editedItem.imName);
          formData.append('imUsername', this.editedItem.imUsername);
          formData.append('mobile', this.editedItem.mobile);
          formData.append('role', this.editedItem.role);
          formData.append('fsBalance', this.editedItem.fsBalance);
          formData.append('taBalance', this.editedItem.taBalance);
          formData.append('commission', this.editedItem.commission);
          formData.append('cMoney', this.editedItem.cMoney);
          formData.append('securityCode', this.securityCode);

          this.$axios.post('https://app.forexstick.com/server/api/auth/adminUserCreate', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
            .then(res => {

              if(res.data.error){
                this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
                return
              }else{
                this.$store.commit('updateSnackbar', {show: true, color: 'success', message: "Account Created Successfully."})
                this.users = res.data.success
                console.log("this.users")
                console.log(this.users)
                this.getFlAccounts = ''
                this.close()
              }
                
            })
            .catch(err => {
              console.log(err.response.data)
            })
        }
      },
    },
  }
</script>
<style>

</style>