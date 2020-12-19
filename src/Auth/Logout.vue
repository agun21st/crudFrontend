<template>
    <div>
        <!-- Notification -->
        <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :color="loginMode"
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
    </div>
</template>

<script>
  import User from '../Helpers/User';
  export default {
    data: () => ({
        multiLine: true,
        snackbar: false,
        message: '',
        loginMode: '',
    }),
    created(){
        if(User.loggedIn())
        {
            User.logout();
            localStorage.setItem("logoutNow", "logout")
            this.$router.push({name : 'Login'})
        }else{
            this.$router.push({name : 'Login'})
        }
    },
  }
</script>
