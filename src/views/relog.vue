<template>
  <div class="error-page">
    <img src="../assets/image/relog.png" alt="">
    <h4>You must log in first to visit this page</h4>
  </div>
</template>

<script>
import login from '@/components/login.vue'
export default {
  created () {
    setTimeout(() => this.$modal.show(login, {}, { height: 'auto', width: '300px' }), 1000)
  }
}
</script>

<style lang="scss" scoped>
  .error-page{
    height: 93vh;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
