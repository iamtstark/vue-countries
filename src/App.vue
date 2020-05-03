<template>
  <div id="app">
    <el-container>
      <el-header class="site-header"><p>Countries</p></el-header>
      <el-main><p>Hello world</p></el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
    }
  }
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    font-family: 'Helvetica', 'Arial', 'sans-serif';
    line-height: 1.5;
  }
  .site-header {
    background: #b3c0d1;
    display: flex;
    align-content: center;
  }
</style>
