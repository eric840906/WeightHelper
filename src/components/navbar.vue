<template>
  <div>
    <input type="checkbox" name="" id="menu-ctrl" style="display: none;">
    <header>
      <nav class="top-nav">
        <div class="logo">
          <router-link
          class="navbar-brand"
          to="/"
          >WHelper
          </router-link>
        </div>
        <ul class="links">
          <li><router-link class="nav-item nav-link" to="/">Home</router-link></li>
          <li><router-link class="nav-item nav-link" to="/foodlist">飲食計算</router-link></li>
        </ul>
      </nav>
      <label for="menu-ctrl" class="triggerContainer" style="position: absolute">
          <div class="hamburger">
            <div></div>
            <div></div>
            <div></div>
          </div>
      </label>
        <!-- <router-link
          class="navbar-brand"
          to="/"
          >WHelper</router-link
        > -->
            <!-- <router-link class="nav-item nav-link" to="/">Home</router-link>
            <router-link class="nav-item nav-link" to="/foodlist"
              >飲食計算</router-link
            > -->
    </header>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.top-links {
  font-size: 18px;
}
.navbar-brand {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 30px;
}
.top-nav{
  position: fixed;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
  transition: 0.5s;
  background-color: black;
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
  display: none;
}
.hamburger{
  height: 50px;
  position: fixed;
  top: 9px;
  right: 13px;
  z-index: 999;
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  div{
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

@media (max-width: 425px) {
  .top-nav{
    .links{
      transform: translateY(-100%);
      opacity: 0;
      width: 100%;
      top: 10vh;
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
  #menu-ctrl:checked ~header {
    .links{
      transform: translateY(0);
      display: block;
      opacity: 1;
      height: 25vh;
    }
    .hamburger{
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
  }
}

</style>
