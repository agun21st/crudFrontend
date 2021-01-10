import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    snackbar: {
      show: false,
      color: 'cyan',
      message: 'Your Job Successfully Done!'
    },
    userInfo: [],
  },

  mutations: {

    setCurrentUser(state, payload)
    {
      state.userInfo = []
      state.userInfo.push(payload)
    },

    updateSnackbar(state, payload)
    {
      state.snackbar.show = payload.show
      state.snackbar.color = payload.color
      state.snackbar.message = payload.message
    },

    setMyFxBook(state, payload)
    {
      state.myFxBook = []
      state.myFxBook.push(payload)
    },
    setTradeInfo(state, payload)
    {
        state.tradeInfo = []
        state.tradeInfo.push(payload)
    },
    setCurrentFinance(state, payload)
    {
        state.userFinance.push(payload)
    },
    setAllUser(state, payload)
    {
        state.allUser.push(payload)
    },
    setAllTradeAccount(state, payload)
    {
        state.allTradeAccount.push(payload)
    },
    setUserTradeAccount(state, payload){
        state.userTradeAccount.push(payload)
    },
    setRegisterUser(state, payload)
    {
        state.registerUser.push(payload)
    },

    deleteCurrentFinance(state)
    {
        state.userFinance = []
    },
    deleteAllUser(state)
    {
        state.allUser = []
    },
    deleteAllTradeAccount(state)
    {
        state.allTradeAccount = []
    },
    deleteUserTradeAccount(state)
    {
        state.UserTradeAccount = []
    },
    deleteRegisterUser(state)
    {
        state.registerUser = []
    },

    deleteCurrentUser(state)
    {
        state.userInfo = []
    },
    deleteTradeInfo(state)
    {
        state.tradeInfo = []
    },
    deleteMyFxBook(state)
    {
        state.myFxBook = []
    }
  },

  actions: {
    deleteMyFxBook(context)
    {
      context.commit('deleteMyFxBook')
    },
    deleteTradeInfo(context)
    {
        context.commit('deleteTradeInfo')
    },
    deleteCurrentUser(context)
    {
        context.commit('deleteCurrentUser')
    },
    deleteCurrentFinance(context)
    {
        context.commit('deleteCurrentFinance')
    },
    deleteAllUser(context)
    {
        context.commit('deleteAllUser')
    },
    deleteAllTradeAccount(context)
    {
        context.commit('deleteAllTradeAccount')
    },
    deleteUserTradeAccount(context)
    {
        context.commit('deleteUserTradeAccount')
    },
    deleteRegisterUser(context)
    {
        context.commit('deleteRegisterUser')
    },
  },
  modules: {}
});
