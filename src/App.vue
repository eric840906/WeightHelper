<template>
  <div id="app">
    <Navbar></Navbar>
    <div style="padding-top: 7vh"></div>
    <transition name="fade">
      <router-view/>
    </transition>
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

.fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
    transition-duration: .25s;
  }

.fade-enter-active {
  transition-delay: .25s;
}
.fade-enter{
  opacity: 0;
  transform: translateX(-200px);
}
.fade-leave-active {
  opacity: 0;
  transform: translateX(200px);
}

</style>
