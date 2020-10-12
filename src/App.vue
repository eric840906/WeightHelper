<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
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
</style>
