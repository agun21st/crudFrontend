<template>
  <NavComponent/>
</template>

<script>
import NavComponent from "@/components/NavComponent.vue";
export default {
  name: "Home",
  components: {
    NavComponent
  },
  data: () => ({
    
  }),
  created(){
    this.$router.push({name : 'HomeComponent'}).catch(()=>{})
  }
};
</script>
