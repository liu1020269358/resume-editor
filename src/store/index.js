import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'book' },
        { field: 'projects', icon: 'heart' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' },
      ],
      profile: {
        name: '名字',
        city: '城市',
        title: '头衔',
        birthday: '生日',
      },
      workHistory: [
        { company: 'AL', content: '我的第二份工作是' },
        { company: 'TX', content: '我的第一份工作是' },
      ],
      education: [
        { school: 'AL', content: '文字' },
        { school: 'TX', content: '文字' },
      ],
      projects: [
        { name: 'project A', content: '文字' },
        { name: 'project B', content: '文字' },
      ],
      awards: [
        { name: 'awards A', content: '文字' },
        { name: 'awards B', content: '文字' },
      ],
      contacts: [
        { contact: 'phone', content: '13812345678' },
        { contact: 'qq', content: '12345678' },
      ],
    }
  },
  mutations: {
    initState(state, payload){
      Object.assign(state, payload)
    },
    increment(state){
      state.count++
    },
    switchTab(state, payload){
      state.selected = payload
      localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume(state, {field, subfield, value}){
      field[subfield] = value;
      localStorage.setItem('state', JSON.stringify(state))
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
    },
    removeUser(state){
      state.user.id = null
    }
  }
})
