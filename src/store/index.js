/*
 使用Vuex实现单向绑定
 这样，用户如果改变页面上的数据，那么把变动手动收集，合并到原来的数据里
 这样的好处是可以更好的控制数据，所有的改变都会被记录
*/

import Vuex from 'vuex'
import Vue from 'vue'
import AV from '../lib/leancloud'
import getAVUser from '../lib/getAVUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    /*
      保存着resume各项的信息
      field是大项内容的名字
      keys是各小项内容的名字
      type是该项内容能否扩展
    */
    resumeConfig: [
      { field: 'profile', keys: ['name', 'city', 'title', 'birthday']},
      { field: 'workHistory', type: 'active', keys: ['company', 'details']},
      { field: 'education', type: 'active', keys: ['school', 'details']},
      { field: 'projects', type: 'active', keys: ['name', 'details']},
      { field: 'awards', type: 'active', keys: ['name', 'details']},
      { field: 'contacts', type: 'active', keys: ['contact']},
    ],
    resume: {
      id: ''
    }
  },
  mutations: {
    //初始化用户数据结构
    initState(state){
      state.resumeConfig.map((item) => {
        if(item.type === 'active'){
          Vue.set(state.resume, item.field, [])
        }else{
          Vue.set(state.resume, item.field, {})
        item.keys.map((key) => {
          Vue.set(state.resume[item.field], key, '')
          })
        }
      })
    },
    //tab切换
    switchTab(state, payload){
      state.selected = payload
    },
    //更新resume数据，同时保存在localStorage中
    updateResume(state, {field, subfield, value}){
      field[subfield] = value;
      localStorage.setItem('resume', JSON.stringify(state.resume))
    },
    //设置用户的信息，比如id，username，在登录之后调用
    setUser(state, payload){
      Object.assign(state.user, payload)
    },
    //移除用户的信息，在登出之后调用
    removeUser(state){
      state.user.id = ''
    },
    /*
     在某个标签页（大项内容）增加输入框（小项内容）
     比如在“教育经历”这一栏，每个教育经历包括“学校”和“细节”这两个输入框
     “教育经历”(resume.education)对应着field
    */
    addResumeSubfield(state, {field}){
      let empty = {}
      console.log(state.resume[field])
      state.resume[field].push(empty)

      state.resumeConfig.filter((i) => {
        return i.field === field
      })[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },
    //删除输入框（小项内容）
    removeResumeSubfield(state, {field, index}){
      state.resume[field].splice(index, 1)
    },
    //设置resume的id
    setResumeId(state, {id}){
      state.resume.id = id
    },
    //设置resume的各项内容数据
    setResume(state, resume){
      state.resumeConfig.map(({field}) => {
        Vue.set(state.resume, field, resume[field])
      })
    }
  },
  actions: {
    //保存resume数据于服务器上，基于leancloud的API实现
    saveResume({state, commit}, payload){
      var Resume = AV.Object.extend('Resume')
      var resume = new Resume()
      if(state.resume.id){
        resume.id = state.resume.id
      }
      resume.set('profile', state.resume.profile)
      resume.set('workHistory', state.resume.workHistory)
      resume.set('education', state.resume.education)
      resume.set('projects', state.resume.projects)
      resume.set('awards', state.resume.awards)
      resume.set('contacts', state.resume.contacts)
      resume.set('owner_id', getAVUser().id)
      var acl = new AV.ACL()
      acl.setPublicReadAccess(true)
      acl.setWriteAccess(AV.User.current(), true)
      resume.setACL(acl)
      resume.save().then(function (response) {
        if(!state.resume.id){
          commit('setResumeId', { id: response.id})
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    //从服务器上获取resume数据
    fetchResume({commit}, payload){
      var query = new AV.Query('Resume')
      query.equalTo('owner_id', getAVUser().id)
      query.first().then((resume) => {
        if(resume){
          let obj = resume.attributes
          obj['id'] = resume.id
          commit('setResume', obj)
        }
      })
    },
  }
})
