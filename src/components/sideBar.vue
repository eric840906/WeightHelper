<template>
  <div style="display:flex; z-index:6">
    <div class="sidebar-container primary lighten-3" :class="{'sidebar-active' : sidebarToggle}">
      <!-- <a class="sidebar-btn" @click.prevent="selfToggle"><menu-icon /></a> -->
      <a href="#" class="sidebar-config"><cog-icon/></a>
      <div class="userblock" v-if="userInfo">
        <div class="avatar">
          <div class="loading-block" v-show="this.$store.state.loading">
            <font-awesome-icon class="fa-spin" style="font-size: 50px" :icon="['fas', 'circle-notch']"/>
          </div>
          <img src="../assets/image/guest.jpg" alt="" class="user-pic" v-if="userImage==='data:image/png;base64, '">
          <img :src="userImage" alt="" class="user-pic" v-else>
          <button class="avatar-btn" @click.prevent="changeAvatar"><camera-icon/></button>
        </div>
        <div class="user-name"><user-icon/>{{userInfo.name}}</div>
        <div class="user-email"><mail-icon/>{{userInfo.email}}</div>
      </div>
      <div class="userblock" v-else>
        <img src="../assets/image/guest.jpg" alt="" class="user-pic">
        <div class="user-name">guest</div>
      </div>
      <nav>
        <ul class="sidebar-menu">
          <li v-for="link in navLinks" :key="link.linkName">
            <router-link class="black--text sidebar-link" :to="link.link"><component :is="link.icon"></component><span class="link-name">{{link.linkName}}</span>
            </router-link>
          </li>
          <li v-if="this.$store.state.token">
            <a href="#" @click.prevent="addModalShow" class="sidebar-link"><add-food-icon/>Add food</a>
          </li>
          <li v-if="!this.$store.state.token">
            <a href="#" @click.prevent="signUpShow" class="sidebar-link"><sign-up-icon/>Sign up</a>
          </li>
          <li>
            <a href="#" @click.prevent="logOut" class="sidebar-link" v-if="this.$store.state.token"><logout-icon/>Log out</a>
            <a href="#" @click.prevent="loginShow" class="sidebar-link" v-else><login-icon/>Log in</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="sidebar-background" @click.prevent="selfToggle">
    </div>
  </div>
</template>

<script>
import homeIcon from 'vue-material-design-icons/Home.vue'
import planIcon from 'vue-material-design-icons/GoogleAnalytics.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import loginIcon from 'vue-material-design-icons/LoginVariant.vue'
import signUpIcon from 'vue-material-design-icons/Draw.vue'
import logoutIcon from 'vue-material-design-icons/LogoutVariant.vue'
import addFoodIcon from 'vue-material-design-icons/PencilPlusOutline.vue'
import chartIcon from 'vue-material-design-icons/ChartTimelineVariantShimmer.vue'
import userIcon from 'vue-material-design-icons/AccountCircle.vue'
import mailIcon from 'vue-material-design-icons/Email.vue'
import cameraIcon from 'vue-material-design-icons/CameraEnhanceOutline.vue'

export default {
  components: {
    homeIcon,
    planIcon,
    MenuIcon,
    CogIcon,
    loginIcon,
    signUpIcon,
    logoutIcon,
    addFoodIcon,
    chartIcon,
    userIcon,
    mailIcon,
    cameraIcon
  },
  props: {
    sidebarToggle: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    navLinks: [
      {
        linkName: 'Home',
        icon: 'home-icon',
        link: '/'
      },
      {
        linkName: 'Diet plan',
        icon: 'plan-icon',
        link: '/foodlist'
      },
      {
        linkName: 'Analyze',
        icon: 'chart-icon',
        link: '/analyze'
      }
    ]
  }),
  methods: {
    logOut () {
      this.$emit('logoutShow')
    },
    selfToggle () {
      this.$emit('selfToggle')
    },
    loginShow () {
      this.$emit('loginShow')
    },
    signUpShow () {
      this.$emit('signUpShow')
    },
    addModalShow () {
      this.$emit('addModalShow')
    },
    changeAvatar () {
      this.$emit('changeAvatar')
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user
    },
    userImage () {
      return this.$store.state.image
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
.router-link-exact-active{
  background-color: #000;
  color: #fff;
  border-radius: 7px;
  box-shadow: inset 0 0px 5px 0px darken($background, 20%);
}
a{
  text-decoration: none;
  color: #fff;
}
.userblock{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-pic{
    border-radius: 50%;
    width: 109px;
    margin-top: 50px;
    align-self: center;
  }
  .material-design-icon{
    svg{
      height: 20px;
      vertical-align: sub;
    }
  }
}
.loading-block{
  position: absolute;
  background: black;
  top: 50%;
  left: 51%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar{
  position: relative;
  .avatar-btn{
    position: absolute;
    top: 29px;
    background: #ffffff1f;
    color: white;
    border-radius: 100%;
    height: 35px;
    width: 35px;
    text-align: center;
    padding: 0px;
    border: none;
    border-width: thin;
    right: -19px;
    border-color: white;
  }
}
.sidebar-background{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: none;
  background: #00000059;
  z-index: 6;
}
.sidebar-container{
  background-color: #000;
  display: flex;
  flex-direction: column;
  width: 260px;
  position: fixed;
  top: 0;
  transform: translateX(-260px);
  height: 100%;
  z-index: 10;
  transition: 0.3s transform;
  .sidebar-menu{
    li+li{
      margin-top: 20px
    }
  }
  .sidebar-btn{
    @extend %round-click-btn;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
  }
  nav{
    margin-top: 20px;
  }
  ul{
    margin: 0;
    padding: 10px;
    list-style: none;
    display: flex;
    flex-direction: column;
    li{
      position: relative;
      text-align: start;
      line-height: 2;
      .sidebar-link{
        position: relative;
        width: 100%;
        display: block;
        padding-left: 20px;
        .material-design-icon{
          margin-right: 20px;
          vertical-align: baseline;
        }
        .link-name{
          vertical-align: middle;
          line-height: 35px;
        }
      }
      .sidebar-link-cover{
        display: flex;
        width: 100%;
        line-height: 3;
        @extend %btn-cover;
      }
    }
  }
  .dropdown-list{
    max-height: 28vh;
    overflow: auto;
  }
  .sidebar-config{
    @extend %round-click-btn;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.dropdown-link{
  &::after{
    content: "";
    position: absolute;
    margin-left: .255em;
    vertical-align: .255em;
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 18px;
  }
}
.sidebar-active{
  transform: translateX(0px);
  box-shadow: 7px 0px 6px -1px rgba(0, 0, 0, 0.2);
}
.sidebar-active~.sidebar-background{
  display: block;
}
.user-info-block{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  .user-img{
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
  .user-email{
    a{
      color:#00000066;
    }
  }
}
</style>
