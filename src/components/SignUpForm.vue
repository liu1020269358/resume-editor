<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="row">
        <label>用户名</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="submit">
        <input type="submit" value="提交" class="button">
        <span class="errorMessage">{{errorMessage}}</span>
      </div>
    </form>
  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'SignUpForm',
    data(){
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: ''
      }
    },
    methods:{
      //注册成功后，触发success事件，立即登录
      signUp(){
        let {username, password} = this.formData
        var user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.signUp().then(() => {
          this.$emit('success', getAVUser())
        }, (error) => {
            this.errorMessage = getErrorMessage(error)
        })
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
