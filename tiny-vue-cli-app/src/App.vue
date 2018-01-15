<template>
  <div id="app">
    <h1>Tiny Vue-cli App</h1>
    <Nav
      :ni="navItem"/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Nav,
  },
  data() {
    return {
      navItem: {
        main: '/',
        rightHere: 'right-here',
      },
    };
  },
};
</script>

<style>
#app {
  margin: 0 auto;
  padding: 30px;
  max-width: 1100px;
  background-color: papayawhip;
  box-sizing: border-box;
}
</style>
