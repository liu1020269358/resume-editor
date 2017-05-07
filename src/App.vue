<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'

  import Topbar from './components/Topbar'
  import ResumeEditor from './components/ResumeEditor'
  import ResumePreview from './components/ResumePreview'

  export default {
    name: 'app',
    data: function(){
      return {
          text: '你好'
        }
    },
  components: {Topbar, ResumeEditor, ResumePreview}
  }
</script>

<style>
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
    width: 35%;
  }
  #resumePreview{
    flex-grow: 1;
    margin-left: 16px;
  }
</style>
