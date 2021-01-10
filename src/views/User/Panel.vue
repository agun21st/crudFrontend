<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <NavDrawer/>
    <v-container fluid>
        <router-view/>
    </v-container>
  </v-app>
</template>

<script>
  import NavDrawer from '@/components/User/Panel/NavDrawer';

  export default {
    name: 'Panel',
    components: {
      NavDrawer,
    },
    data: () => ({
      multiLine: true,
    }),
    beforeCreate(){
      this.$router.push({name : 'LiveChart'}).catch(()=>{})
    }
  }
</script>

<style scoped>

</style>