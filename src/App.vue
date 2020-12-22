<template>
  <div id="app">
    <Navbar></Navbar>
    <div style="padding-top: 7vh"></div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
#app{
  font-family: 'Noto Sans TC', Avenir, Helvetica, Arial, sans-serif;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
a{
  &:hover{
    text-decoration: none;
  }
}

</style>
