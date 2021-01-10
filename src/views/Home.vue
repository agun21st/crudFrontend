<template>
  <div></div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
  }),
  created(){
    console.log("I am from Home component")
    if(this.$store.state.userInfo.length == 0){
      this.$router.push({name : 'Index'}).catch(()=>{})
    }else{
      if((this.$store.state.userInfo[0].role == 'Super_Admin') || (this.$store.state.userInfo[0].role == 'Admin'))
      {
        this.$router.push({name : 'AdminPanel'}).catch(()=>{})
      }else{
        this.$router.push({name : 'UserPanel'}).catch(()=>{})
      }
    }
  }
};
</script>
