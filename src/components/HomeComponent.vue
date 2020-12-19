<template>
  <v-container fluid style="background: linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%);
 background-blend-mode: normal,color-burn; height: 150vh;">
    <v-card
      class="mx-auto my-5"
      max-width="1000"
      :loading="cardLoader"
    >
      <template slot="progress">
        <v-progress-linear
          color="primary"
          height="5"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-toolbar
        dense
        color="teal"
      >
        <v-toolbar-title class="white--text">All Products</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <!-- all product display here -->
        <v-row dense>
          <v-col
            cols="12"
            md="4"
            sm="12"
            v-for="product in products"
            :key="product.id"            
          >
            <v-card
            >
              <v-img
                :src="product.image"
                :lazy-src="product.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="220px"
                contain
              >
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular indeterminate color="primary lighten-1"></v-progress-circular>
                    </v-row>
                </template>
                <v-card-title>{{product.title}}</v-card-title>
              </v-img>
              <v-card-actions>
                <v-card-subtitle>Price: ${{product.price}}</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-btn color="primary">
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-text>
                <v-expansion-panels accordion focusable flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Product Description
                    </v-expansion-panel-header>
                    <v-expansion-panel-content style="text-align: justify">
                      {{product.description}}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :color="snackbarColor"
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
  </v-container>
</template>

<script>
  import axios from 'axios';
  import User from '../Helpers/User';
  export default {
    name: "HomeComponent",
    data: () => ({
      show: false,
      show2: false,
      show3: false,
      cardLoader: false,
      multiLine: true,
      snackbar: false,
      message: '',
      snackbarColor: '',
      user_name: User.name(),
      role: User.role(),
      userid: User.id(),
      userToken: User.getToken(),
      products: [],
      cards: [
        { title: 'Jacket', 
          src: 'https://gearmoose.com/wp-content/uploads/2019/11/Best-Mens-Leather-Jackets.jpg', 
          flex: 4,  
          price: 900,
          description: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape."},
        { title: 'Joe Sunglasses', src: 'https://gearmoose.com/wp-content/uploads/2020/12/Barton_Perreira_007_Joe_Sunglasses.jpg', flex: 4 },
        { title: 'Plastic Watch', src: 'https://gearmoose.com/wp-content/uploads/2020/12/Tom_Ford_002_Watch.jpg', flex: 4 },
      ],
    }),
    created(){
      if(localStorage.getItem("loginNow") != null){
        this.message = 'You are Logged in'
        this.snackbarColor = 'success'
        this.snackbar = true
        localStorage.removeItem("loginNow")
      }
      this.initialize()
    },
    methods:{
      initialize () {
        // Add a request interceptor
        axios.interceptors.request.use( (config) => {
            this.cardLoader = true;
            return config;
        }, (error) => {
            this.cardLoader = false;
            return Promise.reject(error);
        });
        // Add a response interceptor
        axios.interceptors.response.use( (response) =>{
            this.cardLoader = false;
            return response;
        }, (error) => {
            this.cardLoader = false;
            return Promise.reject(error);
        });
        axios.get('http://localhost:8000/api/auth/getAllProducts', { headers: {'Authorization': 'Bearer '+ this.userToken }})
        .then(res => {
            if(res.data.error){
                alert(res.data.error)
                console.log(res.data.error)
            }else{
                this.products = res.data.success
            }
        })
        .catch(err => console.log(err+' from save() axios catch'))
      },
    }
  };
</script>
