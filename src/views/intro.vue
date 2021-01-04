<template>
  <div>
    <section class="banner">
      <div class="circle xxlarge shade1"></div>
      <div class="circle xlarge shade2"></div>
      <div class="circle large shade3"></div>
      <div class="circle mediun shade4"></div>
      <div class="circle small shade5"></div>
      <div class="title">
        <h1 class="name">WEIGHT</h1>
        <span class="subName">HELPER</span>
      </div>
      <button class="startbtn" @click.prevent="start">GET STARTED</button>
      <!-- <router-link to="/startForm" class="startbtn">GET STARTED</router-link> -->
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/components/login.vue'
export default {
  methods: {
    async start () {
      const checkStart = () => {
        this.$modal.show('dialog', {
          title: '尚未登入',
          text: '需要登入嗎? (登入後可以將計算結果紀錄在帳號中)',
          buttons: [
            {
              title: 'YES',
              handler: () => {
                this.$modal.hide('dialog')
                this.$modal.show(login, {}, { height: 'auto', width: '300px' })
              }
            },
            {
              title: 'NO',
              handler: () => {
                this.$modal.hide('dialog')
                this.$router.push({ path: '/startForm' })
              }
            }
          ]
        })
      }
      // if has token
      if (this.$store.state.token) {
        try {
          const api = `${process.env.VUE_APP_APIPATH}/api/check` // 用API抓使用者資料確認登入權限
          const response = await this.axios({
            url: api,
            method: 'post',
            headers: {
              'auth-token': this.$store.state.token
            }
          })
          if (response.data === 'success') {
            this.$router.push({ path: '/startForm' })
          }
        } catch (error) {
          this.$store.state.token = null
          checkStart()
        }
      } else {
        checkStart()
      }
    }
  }
}
</script>

<style lang="scss">
  .banner{
    // background: linear-gradient(329deg, #000000d4 50%, transparent 50%) center center/ 100% 100%, url(https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80);
    position: relative;
    overflow: hidden;
    height: 93vh;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .title{
      font-family: 'Bungee', cursive;
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
    font-family: 'Bungee', cursive;
    border: none;
    color: white;
    position: absolute;
    bottom: 10%;
    right: 10%;
    background: #000000cf;
    border-radius: 8px;
    padding: 0px 10px;
    line-height: 3;
    text-align: center;
    transition: 0.2s ease-out;
    animation: flash 0.85s infinite;
    &:hover{
      color: white;
      text-decoration: none;
      transform: scale(1.3);
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
      // background: linear-gradient(324deg, #000000d4 50%, transparent 50%) center center/ 100% 100%, url(https://images.unsplash.com/photo-1585349294456-f9a9b6fdea8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80);
      background-position: left;
    }
  }
  @media (max-width: 425px) {
    .banner{
      // background: url(https://images.unsplash.com/photo-1585349294456-f9a9b6fdea8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80);
      background-position: left;
    }
  }
  // background
  .circle{
    position: absolute;
    border-radius: 50%;
    background: white;
    animation: rippleMain 15s infinite;
    box-shadow: 0px 0px 1px 0px #508fb9;
    @media (max-width: 768px) {
      animation: rippleSmall 15s infinite;
    }
  }

  .small{
    width: 200px;
    height: 200px;
    left: -100px;
    bottom: -100px;
  }

  .medium{
    width: 400px;
    height: 400px;
    left: -200px;
    bottom: -200px;
  }

  .large{
    width: 600px;
    height: 600px;
    left: -300px;
    bottom: -300px;
  }

  .xlarge{
    width: 800px;
    height: 800px;
    left: -400px;
    bottom: -400px;
  }

  .xxlarge{
    width: 1000px;
    height: 1000px;
    left: -500px;
    bottom: -500px;
  }

  .shade1{
    opacity: 0.2;
  }
  .shade2{
    opacity: 0.5;
  }

  .shade3{
    opacity: 0.7;
  }

  .shade4{
    opacity: 0.8;
  }

  .shade5{
    opacity: 0.9;
  }

  @keyframes rippleMain{
    0%{
      transform: scale(1);
      background: #ffddc1;
    }
    20%{
      transform: scale(1.2);
      background: #c1cdff;
    }
    40%{
      transform: scale(0.8);
      background: #c1ffc1;
    }
    60%{
      transform: scale(1.4);
      background: #c1cdff;
    }
    80%{
      transform: scale(0.7);
      background: #ffc1c1;
    }
    100%{
      transform: scale(1);
      background: #ffddc1;
    }
  }
  @keyframes rippleSmall{
    0%{
      transform: scale(0.5);
      background: #ffddc1;
    }
    20%{
      transform: scale(0.6);
      background: #c1cdff;
    }
    40%{
      transform: scale(0.4);
      background: #c1ffc1;
    }
    60%{
      transform: scale(0.7);
      background: #c1cdff;
    }
    80%{
      transform: scale(0.35);
      background: #ffc1c1;
    }
    100%{
      transform: scale(0.5);
      background: #ffddc1;
    }
  }

</style>
