<template>
    <!-- Navigation Panel Area -->
    <v-card
      class="mx-auto overflow-hidden"
      width="100%"
      height="100%"
      flat
      tile
    >
      <v-app-bar
        color="primary"
      >
        <v-toolbar-title class="white--text">CRUD APP</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-show="userIsLoggedIn" v-for="item in items" :key="item.title" class="hidden-sm-and-down">
          <v-btn :to="item.link" link route text class="text-decoration-none white--text">
              <v-icon left>{{item.icon}}</v-icon>{{item.title}}
          </v-btn>
      </v-toolbar-items>
        <v-app-bar-nav-icon v-show="userIsLoggedIn" @click="drawer = true" class="hidden-md-and-up white--text"></v-app-bar-nav-icon>
      </v-app-bar>
      <!-- Mobile View Menu -->
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
        >
        <v-list nav dense>
          <v-list-item 
          v-for="item in items2" 
          :key="item.title"
          :to="item.link"
          link
          class="text-decoration-none"
          >
              <v-list-item-icon>
                  <v-icon>{{item.icon}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                  <v-list-item-title>
                      {{item.title}}
                  </v-list-item-title>
              </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <!-- Router View Area -->
        <router-view />
    <!-- Router View Area -->
    </v-card>
</template>

<script>
import User from '../Helpers/User';
export default {
    name: "NavComponent",
    data: () => ({
    user_name: User.name(),
    role: User.role(),
    userid: User.id(),
    userToken: User.getToken(),
    userIsLoggedIn: false,
    drawer: false,
    items: [
        { title: 'Home', link: '/home', icon: 'mdi-home-circle' },
        { title: 'CRUD', link: '/crudProduct', icon: 'mdi-view-grid-plus-outline' },
        { title: 'Logout', link: '/logout', icon: 'mdi-logout'},
    ],
    items2: [
        { title: 'Home', link: '/home', icon: 'mdi-home-circle' },
        { title: 'CRUD', link: '/crudProduct', icon: 'mdi-view-grid-plus-outline' },
        { title: 'Logout', link: '/logout', icon: 'mdi-logout'},
    ],
  }),
  created(){
      console.log("Nav is created");
      console.log(User.loggedIn())
      if(User.loggedIn()){
          this.userIsLoggedIn = true
      }

  }
}
</script>

<style>

</style>