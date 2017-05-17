<!--顶栏-->
<template>
  <div id="topbar">
    <div class="wrapper">
      <!--logo区-->
      <span class="log">Resumer</span>
      <!--注册，登录-->
      <div class="actions">
        <!--登录后，显示欢迎信息和登出按钮-->
        <div v-if="logined">
          <span class="welcome">你好，{{user.username}}</span>
          <a href="#" class="button" @click.prevent="signOut">登出</a>
        </div>
        <!--未登录时，显示注册和登录按钮-->
        <div v-else>
          <a href="#" class="button btn-primary" @click.prevent=" signUpDialogVisible = true">注册</a>
          <a href="#" class="button" @click.prevent="signInDialogVisible = true">登录</a>
        </div>
      </div>
    </div>
    <!--登录和注册的弹窗-->
    <NewDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <!--触发success事件后执行登录-->
      <SignUpForm @success="signIn($event)"/>
    </NewDialog>
    <NewDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <SignInForm @success="signIn($event)"/>
    </NewDialog>
  </div>
</template>

<script>
  import NewDialog from './NewDialog'
  import SignUpForm from './SignUpForm'
  import SignInForm from './SignInForm'
  import AV from '../lib/leancloud'

  export default{
    name: 'Topbar',
    created(){

    },
    data () {
      return {
        //默认情况下弹窗是不可见的
        signUpDialogVisible: false,
        signInDialogVisible: false
      }
    },
    computed: {
      user(){
        return this.$store.state.user
      },
      logined(){
          return this.user.id
      }
    },
    //登录和登出的表单都包裹在Dialog组件里
    components: {
      NewDialog,
      SignUpForm,
      SignInForm
    },
    methods: {
      //登出的方法
      signOut(){
        AV.User.logOut()
        this.$store.commit('removeUser')
      },
      //登录的方法
      signIn(user){
        this.signUpDialogVisible = false
        this.signInDialogVisible = false
        this.$store.commit('setUser', user)
      }
    }
  }
</script>

<style scoped>
  #topbar{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
  }
  .wrapper{
    min-width: 1024px;
    max-width: 1440px;
    margin: 0 auto;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 16px;
  }
  .logo{
    font-size: 24px;
    color: #000000;
  }

  .actions{
    display: flex;
  }
  .welcome{
    margin-right: .5em;
  }
</style>
