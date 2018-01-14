<template>
  <div>
    <ul>
      <li><a :href="main">Main😎</a></li>
      <li><a :href="rightHere">Where?🤔</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      main: '#/',
      rightHere: '#/right-here'
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
