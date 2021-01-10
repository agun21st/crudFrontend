<template>
  <div id="forexTutorial" class=" ma-md-10">
        <v-layout row>
            <v-flex md7>
                <v-card elevation="10" max-height="500">
                    <v-toolbar color="teal" dense>
                        <v-toolbar-title class="white--text">
                            Forex Video Tutorial
                        </v-toolbar-title>
                    </v-toolbar>
                    <iframe 
                        width="100%" 
                        height="500"
                        class="iframeHeight"
                        src="https://www.youtube.com/embed/86MKzstijzI?list=PLQRvVvdFVeOsz9iNzuBsoU8MVCvzy_n6c" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </v-card>
            </v-flex>
            <v-flex md4 class="mx-md-5">
                <v-card elevation="10" max-height="500">
                <v-toolbar color="teal" dense>
                    <v-toolbar-title class="white--text">
                        How to open an forex account?
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-actions>
                    <v-btn 
                        class="text-decoration-none" 
                        color="teal"
                        outlined 
                        :href="'files/ForexAccountOpenTutorial.pdf'"
                        download
                        block
                        target="_blank"
                    >
                        Download PDF
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({

  }),
  methods: {


  }
}
</script>

<style>

</style>