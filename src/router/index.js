import Vue from "vue";
import VueRouter from "vue-router";
// import all components
import Home from "../views/Home.vue";
import Login from "../Auth/Login.vue";
import Logout from "../Auth/Logout.vue";
import Register from "../Auth/Register.vue";
import User from '../Helpers/User';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home",
        name: "HomeComponent",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "HomeComponent" */ "../components/HomeComponent.vue"),
      },
      {
        path: "/crudProduct",
        name: "Crud_Product",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Crud_Product" */ "../views/Crud_Product.vue"),
      }
    ],
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
    path: '/login', 
    component: Login, 
    name:'Login'
  },
  { 
    path: '/register', 
    component: Register, 
    name:'Register'
  },
  { 
    path: '/logout', 
    component: Logout, 
    name:'Logout'
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
