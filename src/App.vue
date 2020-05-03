<template>
  <div id="app">
    <el-container>
      <el-header class="site-header"><p>Countries</p></el-header>
      <el-main>
        <CountriesTable></CountriesTable>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import CountriesTable from './components/CountriesTable';
  export default {
    name: 'app',
    components: {
      CountriesTable
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
    background: #f14d4e;
    display: flex;
    align-content: center;
    p {
      color: white;
    }
  }
</style>
