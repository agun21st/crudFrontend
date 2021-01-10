<template>
  <div></div>
</template>

<script>
import User from "../Helpers/User"
export default {
  data: () => ({
    userToken: User.getToken(),
    userId: User.id(),
  }),
  created(){
    if(this.$store.state.userInfo.length==0){
      this.assignUserState()
    }
  },
  methods:{
    assignUserState(){
      let formData = new FormData();
      formData.append('id', this.userId);
      this.$axios.post('https://app.forexstick.com/server/api/auth/assignUserState', formData, {headers: {'Authorization': 'Bearer '+ this.userToken}})
      .then(res => {
        if(res.data.error){
          this.$store.commit('updateSnackbar', {show: true, color: 'error', message: res.data.error})
          return
      }else{

        if(res.data.success){
          this.$store.commit("setCurrentUser", res.data.success);
          if((this.$store.state.userInfo[0].role == 'Super_Admin') || (this.$store.state.userInfo[0].role == 'Admin'))
          {
            this.$router.push({name : 'AdminPanel'}).catch(()=>{})
          }else{
            this.$router.push({name : 'UserPanel'}).catch(()=>{})
          }
        }
      }
          
      })
      .catch(err => {
        this.$store.commit('updateSnackbar', {show: true, color: 'error', message: err})
        console.log(err.response.data)
      })
    },
  }
}
</script>

<style>

</style>