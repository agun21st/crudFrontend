<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar
      v-model="$store.state.snackbar.show"
      :multi-line="multiLine"
      :timeout="6000"
      :color="$store.state.snackbar.color"
      shaped
      >
      {{ $store.state.snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="$store.commit('updateSnackbar', {show: false})"
          >
            Close
          </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    multiLine: true,
  })
};
</script>
