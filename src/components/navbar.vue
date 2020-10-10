<template>
  <div>
    <header>
      <nav class="main-nav navbar navbar-expand-md navbar-dark fixed-top bg-black" style="width: 100%;">
        <a
          class="navbar-brand"
          href="#"
          >WHelper</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto top-links">
            <router-link class="nav-item nav-link" to="/intro">Home</router-link>
            <router-link class="nav-item nav-link" to="/foodlist"
              >飲食計算</router-link
            >
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  mounted () {
    $(window).on('scroll', function () {
      if ($(window).scrollTop()) {
        $('.main-nav').addClass('bg-trans-bl')
      } else {
        $('.main-nav').removeClass('bg-trans-bl')
      }
    })
  }
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
.main-nav{
  width: 100%;
  transition: 0.5s;
  background-color: black;
}

</style>
