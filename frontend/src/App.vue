<template>
  <v-app>
    <Menu></Menu>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  data: () => ({
    //
  }),
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

#app {
  font-family: 'Open Sans', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #CBF7ED;
  overflow: hidden;
  min-height: 100vh;
}
</style>