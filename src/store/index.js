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
    resumeConfig: [
      { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday']},
      { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'details']},
      { field: 'education', icon: 'book', type: 'array', keys: ['school', 'details']},
      { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'details']},
      { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'details']},
      { field: 'contacts', icon: 'phone', type: 'array', keys: ['contact', 'content']},
    ],
    resume: {
      id: ''
    }
  },
  mutations: {
    initState(state, payload){
      state.resumeConfig.map((item) => {
        if(item.type === 'array'){
          Vue.set(state.resume, item.field, [])
        }else{
          Vue.set(state.resume, item.field, {})
        item.keys.map((key) => {
          Vue.set(state.resume[item.field], key, '')
          })
        }
      })
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
      state.user.id = ''
    },
    addResumeSubfield(state, {field}){
      let empty = {}
      state.resume[field].push(empty)
      state.resumeConfig.filter((i) => {
        return i.field === field
      })[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },
    removeResumeSubfield(state, {field, index}){
      state.resume[field].splice(index, 1)
    },
  }
})
