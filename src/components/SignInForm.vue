<template>
  <div>
    <!--表单提交后调用signIn，并阻止冒泡-->
    <form @submit.prevent="signIn">
      <div class="row">
        <label>用户名</label>
        <input type="text" required v-model="formData.username">
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" required v-model="formData.password">
      </div>
      <div class="submit">
        <input type="submit" value="提交" class="button">
        <span>{{errorMessage}}</span>
      </div>
    </form>
  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'SignInForm',
    data(){
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: ''
      }
    },
    methods: {
      signIn(){
        /*
        从表单中获取用户名和密码，调用leancloud提供的API实现登录功能
        如果登录成功，触发'success'事件，
        */
        let {username,password} = this.formData
        AV.User.logIn(username, password).then(() => {
          this.$emit('success', getAVUser())
        }, (error) => {
          this.errorMessage = getErrorMessage(error)
        });
      }
    }
  }
</script>
<style scoped>
  .row{
    margin-bottom: 1em;

  }
  .row label{
    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
  }
  .row input{
    border: 1px solid #ddd;
    box-shadow: inset 0 1px 3px 0 rgba(0,0,0,25);
    width: 12em;
    height: 2em;
    padding:0 8px;
  }
  .submit{
    margin-top: 2em;
  }
</style>
