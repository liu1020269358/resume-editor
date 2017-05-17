<template>
  <div>
    <div class="page">
      <header>
        <Topbar/>
      </header>
      <main>
        <ResumeEditor/>
        <ResumePreview/>
      </main>
    </div>
  </div>
</template>

<script>
  import Topbar from './Topbar'
  import ResumeEditor from './ResumeEditor'
  import ResumePreview from './ResumePreview'

  export default {
    name: 'Resume',
    // 将整个页面分为三个部分（组件）：顶栏（Topbar），编辑区（ResumeEditor），预览区（ResumePreview）
    components: {
      Topbar,
      ResumeEditor,
      ResumePreview
    },
    created(){

    }
  }
</script>
