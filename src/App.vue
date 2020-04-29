<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <bitcoin-info></bitcoin-info>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import BitcoinInfo from './components/BitcoinInfo.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    BitcoinInfo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
