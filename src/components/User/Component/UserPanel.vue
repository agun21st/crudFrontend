<template>
  <v-app class="user">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      class="elevation-10"
      color="#202c45"
    >
      <div class="text-center pt-5">
        <v-badge
          bordered
          bottom
          color="#00d7ab"
          offset-x="25"
          offset-y="25"
          overlap
        >
        <v-avatar
        size="100px"
        item
        >
          <v-img
            :src="`/img/Avatar/${getUserImage}`"
            alt="img"
          ></v-img>
        </v-avatar>
        </v-badge>
          <p class="mb-0 pt-3" style="color: #00d7ab; font-size: 18px">{{user_name}}</p>
      </div>
      <v-list>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
            style="color: #009688"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="py-1" >
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.action"
              link
              class="text-decoration-none"
            >
              <v-list-item-action v-if="child.icon" class="py-1" >
                <v-icon style="color: #00d7ab !important">{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="py-1" >
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            :key="item.text"
            link
            :to="item.action"
            class="text-decoration-none"
          >
            <v-list-item-action class="py-1" style="color: #00d7ab">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="py-1" style="color: #00d7ab">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#202c45"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title
          class="ml-0 pl-2"
          @click="dashboard"
          style="cursor: pointer"
        >
          <v-toolbar-title>
              <!-- <v-img :src="'/img/Logo/Ai_Logo.png'" width="160"></v-img> -->
              Forex Stick Affiliates
          </v-toolbar-title>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <marquee width="800px" class="hidden-sm-and-down" style="color: #00d7ab; font-size: 20px" behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();">
        {{userNoticeMessages}}  
      </marquee>
      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            large
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar
              size="32px"
              item
            >
                <v-img
                  :src="`/img/Avatar/${getUserImage}`"
                  alt="img"
                ></v-img>
              </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img 
                  :src="`/img/Avatar/${getUserImage}`"
                  alt="img">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user_name }}</v-list-item-title>
                <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
              </v-list-item-content>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="red--text"
                        icon
                        @click="logout"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-logout</v-icon>
                      </v-btn>
                    </template>
                    <span>Logout</span>
                  </v-tooltip>
                </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            large
            v-bind="attrs"
            v-on="on"
            @click="themeSwitch"
            class="mr-2"
          >
          <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </template>
        <span>Black/White</span>
      </v-tooltip> -->
    </v-app-bar>
    
    <v-main  style="background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);">
        <div class="max-auto" style="background-color: #202c45">
          <marquee width="100%" class="hidden-md-and-up" style="color: #00d7ab; font-size: 20px" behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();">
            {{userNoticeMessages}}  
          </marquee>
        </div>
        <router-view></router-view>
    </v-main>
    <!-- <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn> -->
    <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :color="loginMode"
      >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import User from "../../../Helpers/User"
export default {
    data: () => ({
      multiLine: true,
      snackbar: false,
      message: '',
      loginMode: '',
      user_name: User.name(),
      role: User.role(),
      fav: true,
      userNoticeMessages: '',
      menu: false,
      hints: true,
      theme: false,
      dialog: false,
      drawer: null,
      mini: true,
      userid: User.id(),
      userToken: User.getToken(),
      userImage: '',
      items: [
        // { icon: 'mdi-desktop-mac-dashboard', text: 'Dashboard', action: 'dashboard'},
        { icon: 'mdi-chart-areaspline', text: 'Live Chart', action: 'liveChart'},
        // { icon: 'mdi-chart-bar-stacked', text: 'Trade Account', action: 'tradeAccount'},
        { icon: 'mdi-chart-scatter-plot-hexbin', text: 'Brokers', action: 'broker'},
        { icon: 'mdi-content-duplicate', text: 'Copytrading', action: 'copyTrading'},
        { icon: 'mdi-chart-bar-stacked', text: 'Trading History', action: 'tradeHistory'},
        { icon: 'mdi-account-group', text: 'My Affiliates', action: 'myAffiliats'},
        { icon: 'mdi-cast-education', text: 'Forex Tutorial', action: 'forexTutorial'},
        { icon: 'mdi-cash-refund', text: 'Withdrawal', action: 'userWithdrawal'},
        { icon: 'mdi-cash-refund', text: 'Daily Updates', action: ''},
        { icon: 'mdi-account-tie', text: 'My Profile', action: 'profile'},
        { icon: 'mdi-logout', text: 'Logout', action: 'logout'},
      ],
    }),
    computed: {
      getUserImage(){

        return this.userImage
      }
    },
    created(){

      if(this.$store.state.userInfo.length == 0){
        this.$router.push({name : 'Index'}).catch(()=>{})
        this.userImage = this.$store.state.userInfo[0].image
        this.userMessage()
      }
      const path = "/liveChart"
      if(this.$route.path == path || this.$route.path == '/user/liveChart'){  
        this.$router.push({name : 'LiveChart'}).catch(()=>{})
      }
    },
    mounted(){
    },
    methods: {
      userMessage(){
        this.$axios.get('https://app.forexstick.com/server/api/auth/getUserNotice', {headers: {'Authorization': 'Bearer '+ this.userToken}})
          .then(res => {
            this.userNoticeMessages =  (res.data.userNoticeMessages != '')? res.data.userNoticeMessages : 'Welcome to Forex Stick Affiliates'
          })
          .catch(err => {
            console.log(err.response.data)
          })
      },
      initialize(){
        let formData = new FormData();
        formData.append('id', this.userid);
        this.$axios.post('https://app.forexstick.com/server/api/auth/getUserDetails', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
          .then(res => {
            this.$store.commit("setCurrentUser", res.data.user)
            this.userImage = this.$store.state.userInfo[0].image
            this.userNoticeMessages =  (res.data.userNoticeMessages != '')? res.data.userNoticeMessages : 'Welcome to Forex Stick Affiliates'
            if((this.$store.state.userInfo[0].role == 'Super_Admin') || (this.$store.state.userInfo[0].role == 'Admin')){
              this.$router.push({name : 'Admin'})
            }
              
          })
          .catch(err => {
            console.log(err.response.data)
          })

      },
      logout(){
        this.$router.push({name : 'Logout'})
      },
      themeSwitch(){
        this.theme = !this.theme
      },
      dashboard(){
        const path = "user/dashboard"
        if(this.$route.path != path){
          this.$router.push({name : 'UserDashboard'}).catch(()=>{})
        }
      },
    },
    watch: {
      theme: function(old){
        this.$vuetify.theme.dark = old
      }
    }
  }
</script>

<style scoped>

</style>