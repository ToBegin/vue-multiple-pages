<template>
  <div id="app">
    <p>three</p>
    <img :src="logo">
    <router-view/>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png'

export default {
  name: 'App',
  data () {
    return {
      logo: Logo
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #237dde;
  margin-top: 60px;
}
</style>
