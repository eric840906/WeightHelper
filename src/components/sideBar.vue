<template>
  <div style="display:flex; z-index:6">
    <div class="sidebar-container primary lighten-3" :class="{'sidebar-active' : sidebarToggle}">
      <!-- <a class="sidebar-btn" @click.prevent="selfToggle"><menu-icon /></a> -->
      <a href="#" class="sidebar-config"><cog-icon/></a>
      <div class="userblock" v-if="this.$store.state.user">
        <img src="../assets/image/guest.jpg" alt="" class="user-pic">
        <div class="user-name"><user-icon/>{{this.$store.state.user.name}}</div>
        <div class="user-email"><mail-icon/>{{this.$store.state.user.email}}</div>
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
    mailIcon
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
      // this.$store.commit('LOGOUT')
      // localStorage.setItem('WHUser', null)
      // console.log(123)
      // this.$modal.show('dialog', {
      //   title: '<h4 style="color: #ff4436;"><svg data-v-2020db48="" fill="currentColor" width="80" height="80" viewBox="0 0 24 24" class="material-design-icon__svg"><path data-v-2020db48="" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"><title data-v-2020db48="">Alert Outline icon</title></path></svg><h4>確定要登出嗎?</h4>',
      //   buttons: [
      //     {
      //       title: '確定',
      //       handler: () => {
      //         this.$store.commit('LOGOUT')
      //         localStorage.setItem('WHUser', null)
      //         this.$modal.hide('dialog')
      //       }
      //     }
      //   ]
      // })
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
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
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
  // &:hover{
  //   color: lighten($background-text, 20%);
  // }
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
  // background-image: linear-gradient(332deg, $tab-color 79%, #ffffff 125%);
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
