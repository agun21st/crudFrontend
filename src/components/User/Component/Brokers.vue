<template>
  <div id="ServicesWeProvide" class=" my-5">
      <h1 class="text-center mb-5">Recommended Broker</h1>
      <v-row>
        <v-col 
          cols="12" 
          md="6" 
          sm="12"
          data-aos="fade-left"
          data-aos-duration="1000" 
          data-aos-easing="ease-in-sine"
          >
          <v-card
            class="mx-auto"
            max-width="344"
            elevation="24"
          >
            <v-img
              :src="'/img/Brokers/OctaFX.png'"
              height="200px"
            ></v-img>
            <v-card-actions class="my-5">
              <v-btn
                color="#ee6e52"
                block
                class="white--text"
                @click="goOctaFX"
                elevation="10"
              >
                SIGN UP
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col 
          cols="12" 
          md="6" 
          sm="12"
          class="text-left"
          data-aos="fade-right"
          data-aos-duration="1000" 
          data-aos-easing="ease-in-sine"
          >
          <v-card
            class="mx-auto"
            max-width="344"
            elevation="24"
          >
            <v-img
              :src="'/img/Brokers/icMarket.png'"
              height="200px"
            ></v-img>
            <v-card-actions class="my-5">
              <v-btn
                color="#ee6e52"
                block
                class="white--text"
                @click="goicMarket"
                elevation="10"
              >
                SIGN UP
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({

  }),
  methods: {

    goOctaFX(){
      window.open('https://my.octafx.com/signup/?refid=ib4071815', '_blank');
    },
    goicMarket(){
      window.open('https://www.icmarkets.com/?camp=49157', '_blank');
    }

  }
}
</script>

<style>

</style>