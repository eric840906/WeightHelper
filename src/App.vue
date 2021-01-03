<template>
  <div id="app">
    <v-dialog />
    <modal name="modal"/>
    <Alert></Alert>
    <Navbar @drawerToggle='drawer = !drawer' :toggle='drawer'></Navbar>
    <sideBar :sidebarToggle='drawer' @selfToggle='drawer = !drawer' @loginShow='toggleLogin' @signUpShow='toggleSignup' @addModalShow='showAddModal' @logoutShow='showLogout'></sideBar>
    <div style="padding-top: 7vh"></div>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import sideBar from '@/components/sideBar.vue'
import login from '@/components/login.vue'
import signUp from '@/components/signUp.vue'
import Alert from '@/components/Alert.vue'
import addFood from './components/addFood.vue'
import logout from '@/components/logout.vue'
export default {
  components: {
    Navbar,
    sideBar,
    Alert
  },
  data: () => ({
    drawer: false,
    loginForm: false,
    signUpForm: false
  }),
  methods: {
    toggleSignup () {
      this.$modal.show(signUp, {}, { height: 'auto', width: '300px' })
    },
    toggleLogin () {
      this.$modal.show(login, {}, { height: 'auto', width: '300px' })
      // this.loginForm = !this.loginForm
      // this.signUpForm = false
    },
    showLogout () {
      this.$modal.show(logout, {}, { height: 'auto', width: '300px' })
    },
    showAddModal () {
      this.$modal.show(addFood, {}, { height: 'auto', width: '300px' })
    },
    closeModal () {
      console.log(123)
    }
  },
  created () {
    this.$store.commit('CHECK_USER', JSON.parse(localStorage.getItem('WHUser')) || null)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
body{
    &::-webkit-scrollbar {
      width: 0.3em;
      height: 0em;
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.185);
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darken($background, 75%);
      border-radius: 20px;
    }
}
#app{
  font-family: 'Noto Sans TC', sans-serif;
  background-color: $background;
  *{
    &::-webkit-scrollbar {
      width: 0.3em;
      height: 0em;
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.185);
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darken($background, 75%);
      border-radius: 20px;
    }
  }
  section+section{
    margin-top: 20px;
  }
  .vue-dialog{
    text-align: center;
    // top: 50% !important;
    // left: 50% !important;
    // transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0 0px 9px 3px #00000066;
    button{
      transition: 0.3s ease;
      font-size: 16px;
      &:hover{
        background-color: #d4d4d4;
        color: rgb(8, 8, 8);
      }
      &:focus{
        outline: none
      }
    }
  }
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
