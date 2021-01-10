<template>
    <nav>
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
                    :src="getUserImage!=''? '/img/Avatar/'.getUserImage: '/img/Avatar/DefaultAvatar.png'"
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
                    :src="getUserImage!=''? '/img/Avatar/'.getUserImage: '/img/Avatar/DefaultAvatar.png'"
                    alt="img">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{user_name}}</v-list-item-title>
                    <v-list-item-subtitle>{{role}}</v-list-item-subtitle>
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
        <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        class="elevation-10"
        color="teal"
        :mini-variant="expandOnHover"
        mini-variant-width="100"
        :expand-on-hover="expandOnHover"
        
        >
        <div class="text-center pt-5">
            <p class="f20 white--text my-0 py-0">Admin</p>
            <v-avatar
            size="50px"
            item
            >
                <v-img
                    :src="getUserImage!=''? '/img/Avatar/'.getUserImage: '/img/Avatar/DefaultAvatar.png'"
                    alt="img"
                ></v-img>
            </v-avatar>
            <p class="mb-0" style="color: #fff; font-size: 18px">{{user_name}}</p>
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
                dense
                >
                <v-list-item-action v-if="child.icon" class="py-1">
                    <v-icon>{{ child.icon }}</v-icon>
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
                dense
            >
                <v-list-item-action class="py-1" style="color: #fff">
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                <v-list-item-title class="py-1" style="color: #fff">
                    {{ item.text }}
                </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </template>
        </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import User from "../../../Helpers/User"
export default {
    data: () => ({
        drawer: true,
        userImage: '',
        userNoticeMessages: '',
        menu: false,
        user_name: User.name(),
        role: User.role(),
        items: [
        { icon: 'mdi-desktop-mac-dashboard', text: 'Dashboard', action: 'dashboard'},
        { icon: 'mdi-account-group', text: 'Users', action: 'users'},
        { icon: 'mdi-cash-refund', text: 'Withdrawal Request', action: 'withdrawalRequest'},
        { icon: 'mdi-qrcode-scan', text: 'Session Generator', action: 'myFxBook'},
        { icon: 'mdi-message-processing', text: 'Notifications', action: ''},
        // { icon: 'mdi-chart-bar-stacked', text: 'Trade Account', action: 'tradeAccount'},
        // { icon: 'mdi-cash-plus', text: 'Deposit', action: 'deposit'},
        // { icon: 'mdi-account-tie', text: 'My Profile', action: 'profile'},
        { icon: 'mdi-logout', text: 'Logout', action: 'logout'},
      ],
    }),
    created(){
    },
    computed: {
      getUserImage(){
        return this.userImage
      },
      expandOnHover(){
          return this.$vuetify.breakpoint.lgAndUp
      }
    },
    methods: {
        dashboard(){
            const path = "/dashboard"
            if(this.$route.path == path || this.$route.path == '/admin/dashboard')
            {
                this.$router.push({name : 'AdminPanel'}).catch(()=>{})
            }
        },
        logout(){
            this.$router.push({name : 'Logout'}).catch(()=>{})
        },
    }
}
</script>

<style>

</style>