<template>
  <div>
    <div class="logout-block">
      <alert-icon/>
      <h5>Ready to log out?</h5>
      <button @click.prevent="logOut">Yes</button>
    </div>
  </div>
</template>

<script>
import alertIcon from 'vue-material-design-icons/AlertOutline.vue'
export default {
  components: {
    alertIcon
  },
  data: () => ({
  }),
  methods: {
    logOut () {
      localStorage.removeItem('target')
      this.$store.commit('LOGOUT')
      localStorage.setItem('WHUser', null)
      this.$modal.hideAll()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.logout-block{
  display: flex;
  text-align: center;
  flex-direction: column;
  .material-design-icon{
    color: #ff4436;
    svg{
      height: 50px;
      width: 50px;
    }
  }
  button{
    border: none;
    transition: all 0.3s ease;
    font-weight: 600;
    &:hover{
      background: #ff4436;
      color: #fff;
    }
  }
}
</style>
