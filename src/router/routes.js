import Vue from "vue";
import VueRouter from "vue-router";
import User from "../Helpers/User.js";
// import all components
import Index from "../views/Index.vue";
import Home from "../views/Home.vue";
import Login from "../Auth/Login.vue";
import Logout from "../Auth/Logout.vue";
import Register from "../Auth/Register.vue";
import AdminPanel from "../views/Admin/Panel.vue";
import UserPanel from "../views/User/Panel.vue";
import PageNotFound from "../views/PageNotFound.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    // name: 'PageNotFound',
    component: PageNotFound,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if(User.loggedIn() && localStorage.getItem('hashjwttempkey') != null)
      {
        next();

      }else{
        next("/login")
      }
    },
  },
  {
    path: '/admin', 
    name: 'AdminPanel', 
    component: AdminPanel,
    children: [
      {
          path: 'dashboard', 
          name: 'AdminDashboard',
          // component: AdminDashboard,
          component: () => import(/* webpackChunkName: "AdminDashboard" */"../components/Admin/Component/Dashboard.vue"),
      },
      {
          path: 'users', 
          name: 'Users',
          // component: AdminUsers,
          component: () => import(/* webpackChunkName: "AdminUsers" */"../components/Admin/Component/Users.vue"),
      },
      {
        path: 'withdrawalRequest', 
        name: 'WithdrawalRequest',
        // component: WithdrawalRequest,
        component: () => import(/* webpackChunkName: "WithdrawalRequest" */"../components/Admin/Component/WithdrawalRequest.vue"),
      },
      {
        path: 'myFxBook', 
        name: 'MyFxBook',
        // component: MyFxBook,
        component: () => import(/* webpackChunkName: "MyFxBook" */"../components/Admin/Component/MyFxBook.vue"),
    },
    {
        path: 'logout', 
        name: Logout,
        component: Logout,
    },
        
    ],
    beforeEnter: (to, from, next) => {
        if(User.loggedIn() && localStorage.getItem('hashjwttempkey') !== null)
            {
            next();
        }else{
            next('/login');
        }
    },
  },
  {
    path: '/User', 
    name: 'UserPanel', 
    component: UserPanel,
    children: [
      {
          path: 'liveChart', 
          name: 'LiveChart',
          // component: LiveChart,
          component: () => import(/* webpackChunkName: "LiveChart" */"../components/User/Component/LiveChart.vue"),
      },
      {
        path: 'broker', 
        name: 'Broker',
        // component: BrokersComponent,
        component: () => import(/* webpackChunkName: "BrokersComponent" */"../components/User/Component/Brokers.vue"),
      },
      {
          path: 'tradeHistory', 
          name: 'TradeHistory',
          // component: TradeHistory,
          component: () => import(/* webpackChunkName: "TradeHistory" */"../components/User/Component/TradeHistory.vue"),
      },
      {
          path: 'userWithdrawal', 
          name: 'UserWithdrawal',
          // component: UserWithdrawal,
          component: () => import(/* webpackChunkName: "UserWithdrawal" */"../components/User/Component/UserWithdrawal.vue"),
      },
      {
          path: 'copyTrading', 
          name: 'CopyTrading',
          // component: CopyTrading,
          component: () => import(/* webpackChunkName: "CopyTrading" */"../components/User/Component/CopyTrading.vue"),
      },
      {
          path: 'liveChart', 
          name: 'LiveChart',
          // component: LiveChart,
          component: () => import(/* webpackChunkName: "LiveChart" */"../components/User/Component/LiveChart.vue"),
      },
      {
          path: 'myAffiliats', 
          name: 'MyAffiliats',
          // component: MyAffiliats,
          component: () => import(/* webpackChunkName: "MyAffiliats" */"../components/User/Component/MyAffiliate.vue"),
      },
      {
          path: 'forexTutorial', 
          name: 'ForexTutorial',
          // component: ForexTutorial,
          component: () => import(/* webpackChunkName: "ForexTutorial" */"../components/User/Component/ForexTutorial.vue"),
      },
      {
          path: 'deposit', 
          name: 'UserDeposit',
          // component: UserDeposit,
          component: () => import(/* webpackChunkName: "UserDeposit" */"../components/User/Component/UserDeposit.vue"),
      },
      {
          path: 'profile', 
          name: 'UserProfile',
          // component: UserProfile,
          component: () => import(/* webpackChunkName: "UserProfile" */"../components/User/Component/UserProfile.vue"),
      },
      {
          path: 'logout', 
          name: Logout,
          component: Logout,
      },
    ],
    beforeEnter: (to, from, next) => {
        if(User.loggedIn() && localStorage.getItem('hashjwttempkey') !== null)
            {
            next();
        }else{
            next('/login');
        }
    },
  },
  { 
    path: '/login', 
    name:'Login',
    component: Login, 
    beforeEnter: (to, from, next) => {
      if(!User.loggedIn() && localStorage.getItem('hashjwttempkey') === null)
      {
        next();
      }else{
          next('/');
      }
    },
  },
  { 
    path: '/register', 
    component: Register, 
    name:'Register'
  },
  { 
    path: '/register/:refId',
    component: Register, 
    name:'Register',
    beforeEnter: (to, from, next) => {
        if(!User.loggedIn()){
            next();
        }else{

            next('/');
        }
    },
},
  { 
    path: '/logout', 
    component: Logout, 
    name:'Logout'
  },
  { 
    path: '/index', 
    name:'Index',
    component: Index, 
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
