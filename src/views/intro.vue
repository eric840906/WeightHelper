<template>
  <div>
    <section class="banner">
      <div class="title">
        <h1 class="name">WEIGHT</h1>
        <span class="subName">HELPER</span>
      </div>
      <router-link to="/startForm" class="startbtn">GET STARTED</router-link>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
}
</script>

<style lang="scss">
  .banner{
    background: linear-gradient(329deg, #000000d4 50%, transparent 50%) center center/ 100% 100%, url(https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80);
    height: 93vh;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .title{
      color: white;
      width: 100%;
      text-align: end;
      .name{
        margin: 15% 13% 0 0;
      }
      .subName{
        margin-right: 7%;
        font-size: 24px;
      }
    }
  }
  .startbtn{
    color: white;
    position: absolute;
    bottom: 10%;
    right: 10%;
    background: #000000cf;
    border-radius: 8px;
    width: 118px;
    line-height: 3;
    text-align: center;
    transition: 0.3s linear;
    animation: flash 0.85s infinite;
    &:hover{
      color: white;
      text-decoration: none;
      width: 140px;
      font-size: 20px;
    }
  }
  @keyframes flash {
    50%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @media (max-width: 768px) {
    .banner{
      background: linear-gradient(324deg, #000000d4 50%, transparent 50%) center center/ 100% 100%, url(https://images.unsplash.com/photo-1585349294456-f9a9b6fdea8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80);
      background-position: left;
    }
  }
  @media (max-width: 425px) {
    .banner{
      background: url(https://images.unsplash.com/photo-1585349294456-f9a9b6fdea8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80);
      background-position: left;
      .title{
        color: black;
      }
    }
  }
</style>
