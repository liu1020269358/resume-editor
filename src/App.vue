<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import AV from './lib/leancloud'
  import getAVUser from './lib/getAVUser'

  export default {
    name: 'app',
    created(){
      /*
        在载入页面后，初始化用户数据结构
        然后判断用户是否已登录。
        若已登录，则从后台读取resume
        若未登录，则从localStorage读取resume
      */
      this.$store.commit('initState')
      let user = getAVUser() //获取当前用户
      this.$store.commit('setUser', user)
      if(user.id){
        this.$store.dispatch('fetchResume').then(() => {
          this.restoreResumeFromLocalStorage()
        })
      }else{
        this.restoreResumeFromLocalStorage()
      }
    },
    methods: {
      restoreResumeFromLocalStorage(){
        let resume = localStorage.getItem('resume')
        if(resume){
          this.$store.commit('setResume', JSON.parse(resume))
        }
      },
    }
  }
</script>

<style>
  ol, ul, li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .page{
    height:100vh;
    display: flex;
    flex-direction: column;
    background-color: #EAEBEC;
  }
  .page>main{
    flex-grow: 1;
    min-width: 1024px;
    max-width: 1440px;
    margin-top: 16px;
    margin-bottom:16px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    align-self: center;
    box-sizing: border-box;
  }

  #resumeEditor{
    min-width: 35%;
    background-color: #444;
  }
  #resumePreview{
    flex-grow: 1;
    margin-left: 16px;
    background-color: #777;
  }

  .button{
    width: 72px;
    height: 32px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    background-color: #ddd;
    color: #222;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
  .button:hover{
    box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
  }
  .btn-primary{
    background-color: #02af5f;
    color: white;
  }
  .btn-small{
    height: 24px;
    font-size: inherit;
    width: auto;
    padding-left: 1em;
    padding-right: 1em;
  }
</style>
