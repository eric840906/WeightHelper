<template>
  <div>
    <header>
      <nav class="top-nav">
        <div class="logo">
          <router-link
          class="navbar-brand"
          to="/"
          >WHelper
          </router-link>
        </div>
      </nav>
      <button for="menu-ctrl" class="triggerContainer" style="position: absolute"  @click.prevent='drawerToggle'>
          <div class="hamburger" :class="{'active': toggle}">
            <div></div>
            <div></div>
            <div></div>
          </div>
      </button>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    drawerToggle () {
      this.$emit('drawerToggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.fixbar{
  position: fixed;
}
.top-links {
  font-size: 18px;
}
.navbar-brand {
  font-family: 'Bungee', cursive;
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 30px;
}
.top-nav{
  position: fixed;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
  transition: 0.5s;
  background-color: black;
  box-shadow: 0 4px 5px 0px #0000005e;
  a{
    color: white;
  }
  .logo{
    display: flex;
    align-items: center;
    a{
      margin-left: 16px;
    }
  }
  .links{
    z-index: 1;
    font-size: 18px;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    transition: 0.3s linear;
    justify-content: center;
    a{
      &:hover{
        color: wheat;
      }
    }
    li{
      display: inline;
      align-self: center;
    }
  }
}
.triggerContainer{
  display: block;
}
.hamburger{
  height: 5vh;
  position: fixed;
  top: 1vh;
  right: 13px;
  z-index: 999;
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  div{
    background: white;
    height: 10px;
    &:first-child{
      content: "";
      transition: 0.3s linear;
      border: 1px solid white;
      width: 49px;
      border-radius: 20px;
      border-width: medium;
    }
    &:nth-child(2){
      content: "";
      transition: 0.3s linear;
      border: 1px solid white;
      width: 49px;
      border-radius: 20px;
      border-width: medium;
    }
    &:last-child{
      content: "";
      transition: 0.3s linear;
      border: 1px solid white;
      width: 49px;
      border-radius: 20px;
      border-width: medium;
    }
  }
}
.hamburger.active{
  div{
    &:first-child{
      transform: translateX(1000%);
    }
    &:nth-child(2){
      transform: rotate(405deg);
      border-color: white;
      position: absolute;
    }
    &:last-child{
      position: absolute;
      border-color: white;
      transform: rotate(-225deg);
    }
  }
}

@media (max-width: 425px) {
  .top-nav{
    .links{
      transform: translateY(-100%);
      opacity: 0;
      width: 100%;
      top: 7vh;
      height: 20vh;
      background-color: black;
      flex-direction: column;
      position: absolute;
      text-align: center;
    }
  }
  .triggerContainer{
    display: block;
  }
}

</style>
