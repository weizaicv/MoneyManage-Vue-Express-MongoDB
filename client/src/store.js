import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from "jwt-decode";

Vue.use(Vuex)

//方便调试 
const types = {
  SET_IS_AUTNENTIATED:'SET_IS_AUTNENTIATED',
  SET_USER:'SET_USER'
}

const state = {
  isAuthentiated: false, //是否登录认证成功
  user: {} //登录后存储用户信息
}

const getters = {
  isAuthentiated: state => state.isAuthentiated,
  user: state => {
    let userinfo = state.user;
    //如果 state 里面获取不到，那么从localStorage里面获取
    if(!Object.keys(userinfo).length){
      userinfo = jwt_decode(localStorage.getItem('eleToken')) || null;
      console.log(userinfo)
    }
    return userinfo;
  },
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state,isAuthentiated){
    state.isAuthentiated = isAuthentiated ? isAuthentiated : false ;
  },
  [types.SET_USER](state,user){
    state.user = user ? user : {} ;
  },
}


const actions = {
  setIsAutnenticated: ({commit}, isAuthentiated) => {
    commit(types.SET_IS_AUTNENTIATED, isAuthentiated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentStatus: ({commit}) => {
    console.log('触发清除')
    commit(types.SET_IS_AUTNENTIATED,false);
    commit(types.SET_USER,null);
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
