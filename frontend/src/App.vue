<template>
  <div id="app">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
  name: 'App',
  components: {
    Menu
  },
  data () {
    return {
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;800&display=swap');

#app {
  font-family: proxima-nova, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: 'Raleway', sans-serif;
  background-color: #f1ffff;
  overflow: hidden;
  min-height: 100vh;
}
</style>
