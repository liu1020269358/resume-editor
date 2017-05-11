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

      { field: 'profile', icon: 'id', key: ['name', 'city', 'title', 'birthday'], type: 'object'},
      { field: 'workHistory', icon: 'work', key: ['company', 'content'], type: 'array'},
      { field: 'education', icon: 'book', key: ['school', 'content'], type: 'array'},
      { field: 'projects', icon: 'heart', key: ['name', 'content'], type: 'array'},
      { field: 'awards', icon: 'cup', key: ['name', 'content'], type: 'array'},
      { field: 'contacts', icon: 'phone', key: ['contact', 'content'], type: 'array'},

    ]
  },
  resume: {

  },
  mutations: {
    initState(state, payload){
      state.resumeConfig.map((item) => {
        if(item.type === 'array'){
          Vue.set(state.resume, item.field, [])
        }else if(item.type === 'object'){
          Vue.set(state.resume, item.field, {})
          item.key.map((key) => {
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
      Object.assign(state, payload)
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
    addResumeSubfield(state, { field }) {
      let empty = {}
      state.resume[field].push(empty)
      state.resume.config.filter((i) => i.field === field)[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },
    removeResumeSubfield(state, { field, index }) {
      state.resume[field].splice(index, 1)
    },
  }
})
