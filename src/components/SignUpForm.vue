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
      <div class="actions">
        <input type="submit" value="提交">
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

<style scoped lang="scss">
  .row{
    margin-bottom: 1em;
      > label{
        display: flex;
        justify-content: space-between;
        margin-bottom: .5em;
      }
  }
  .actions{
    margin-top: 2px;
      > input{
        padding: .5em 1em;
        border: 1px solid #999;
        border-radius: .2em;
        background-color: #fff;
        cursor: pointer;
      }
  }

</style>
