<template>
  <div>
    <ul>
      <li><router-link :to="ni.main">Main😎</router-link></li>
      <li><router-link :to="ni.rightHere">Where?🤔</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['ni'],
  name: 'Nav',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
