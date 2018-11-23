<template>
  <div id="app">
    <main-header></main-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascipt-6">
import MainHeader from 'components/header/m-header'
import Tab from 'components/tab/tab'

export default {
  name: 'app',
  components: {
    MainHeader,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
