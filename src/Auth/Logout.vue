<template>
    <div>

    </div>
</template>

<script>
  import User from "../Helpers/User"
  export default {
    created(){
  
      if(User.loggedIn())
      {
        User.logout();
        this.$store.dispatch("deleteCurrentUser")
        this.$store.dispatch("deleteCurrentFinance")
        this.$store.dispatch("deleteAllUser")
        this.$store.dispatch("deleteAllTradeAccount")
        this.$store.dispatch("deleteRegisterUser")
        this.$store.dispatch("deleteTradeInfo")
        this.$store.dispatch("deleteUserTradeAccount")
        this.$router.push({name : 'Login'}).catch(()=>{})
        this.$store.commit('updateSnackbar', {show: true, color: 'warning', message: 'You are Logged out Successfully'})
      }else{
        this.$router.push({name : 'Login'}).catch(()=>{})
      }
    },
  }
</script>
