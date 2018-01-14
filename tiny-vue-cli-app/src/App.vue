<template>
  <div id="app">
    <h1>Tiny Vue-cli App</h1>
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Nav
  }
};
</script>

<style>
</style>
