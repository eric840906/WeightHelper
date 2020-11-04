<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
export default {
  components: {
    Navbar
  },
  mounted () {
    if (window.scrollY > 0) {
      document.querySelector('Navbar').classList.add('.fixbar')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
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
.fixbar{
  position: fixed;
}
</style>
