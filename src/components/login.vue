<template>
  <div class="login-block">
    <div class="form-title" v-if="!successText"><login-icon/><h3>Log in</h3></div>
    <div v-if="successText" class="success-block">
      <div v-if="loading">
        <font-awesome-icon class="fa-spin" style="font-size: 50px" :icon="['fas', 'circle-notch']"/>
        <h4>正在讀取使用者資料</h4>
      </div>
      <div v-else>
        <check-icon/>
        <h4>登入成功!</h4>
      </div>
    </div>
    <form action="" @submit.prevent="checkUser" v-else>
      <div class="form-row">
        <input type="text" id="email"  class="custom-input" v-model="userEmail" required>
        <label for="email" class="label-name">
          <span class="content-name">Email</span>
        </label>
      </div>
      <div class="form-row">
        <input type="password" id="password" class="custom-input" v-model="userPass" required>
        <label for="password" class="label-name">
          <span class="content-name">Password</span>
        </label>
      </div>
      <div v-show="errorText">
        <label for="" style="color: #ff4436;"><alert-icon/>登入失敗</label>
      </div>
      <div class="form-row">
        <input type="submit" value="Log in" class="form-btn">
      </div>
    </form>
  </div>
</template>

<script>
import alertIcon from 'vue-material-design-icons/AlertOutline.vue'
import checkIcon from 'vue-material-design-icons/Check.vue'
import loginIcon from 'vue-material-design-icons/LoginVariant.vue'
export default {
  data: () => ({
    userEmail: '',
    userPass: '',
    errorText: false,
    successText: false,
    loading: false
  }),
  components: {
    alertIcon,
    checkIcon,
    loginIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async checkUser () {
      try {
        const response = await this.axios.post(`${process.env.VUE_APP_APIPATH}/api/auth/login`, {
          email: this.userEmail,
          password: this.userPass
        })
        if (response.status === 200) {
          this.$store.commit('LOGIN_SUCCESS', response)
          console.log(response)
          localStorage.setItem('WHUser', JSON.stringify(response.data))
          this.axios({
            url: `${process.env.VUE_APP_APIPATH}/api/target`,
            methods: 'get',
            headers: {
              'auth-token': response.data
            }
          }).then(response => localStorage.setItem('target', JSON.stringify(response.data.target))).then(() => {
            this.successText = true
            this.loading = true
            setTimeout(() => { this.loading = false }, 1000)
            setTimeout(() => this.$modal.hideAll(), 2000)
            this.axios({
              url: `${process.env.VUE_APP_APIPATH}/api/auth/getuser`,
              method: 'post',
              headers: {
                'auth-token': this.$store.state.token
              }
            }).then(response => this.$store.commit('GET_USER_INFO', response.data))
              .catch(error => console.log(error))
          }).then(() => {
            if (localStorage.getItem('target') === 'undefined') {
              this.$router.push({ path: '/startForm' })
            } else {
              this.$router.push({ path: '/foodlist' })
            }
          }
          )
        } else {
          this.errorText = true
        }
      } catch (error) {
        console.log(error)
        this.errorText = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
@import '@/assets/scss/customForm.scss';
  .form-btn{
    background: darken($background, 5%);
    border: none;
    transition: all 0.3s ease-in;
    &:hover{
      background: darken($background, 15%);
      color: darken($background, 65%);
    }
  }
  .login-block{
    padding: 30px;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
  }
  .success-block{
    color: #29aa1d;
    text-align: center;
    .material-design-icon{
      svg{
        width: 50px;
        height: 50px;
      }
    }
  }
  .login-block.active{
    display: flex;
  }
  .form-row{
    justify-content: space-between;
    flex-direction: column;
  }
  .form-row+.form-row{
    margin-top: 10px;
  }
  .form-title{
    .material-design-icon{
      svg{
        width: 30px;
        height: 30px;
      }
    }
    margin-bottom: 40px;
    text-align: center;
  }
</style>
