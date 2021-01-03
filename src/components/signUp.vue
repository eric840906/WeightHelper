<template>
  <div class="login-block">
    <div class="form-title"><sign-up-icon/><h3>Sign up</h3></div>
    <form action="" @submit.prevent="register">
      <div class="form-row">
        <input type="text" id="name" class="custom-input" v-model="userName" autocomplete="none" required>
        <label for="name" class="label-name">
          <span class="content-name">Name</span>
        </label>
      </div>
      <div class="form-row">
        <input type="text" id="email" class="custom-input" v-model="userEmail" autocomplete="none" required>
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
        <label for="" style="color: #ff4436;"><alert-icon/>註冊失敗</label>
      </div>
      <div v-show="successText">
        <label for="" style="color: #29aa1d;"><check-icon/>註冊成功</label>
      </div>
      <div class="form-row">
        <input type="submit" value="Sign up" class="form-btn">
      </div>
    </form>
  </div>
</template>

<script>
import checkIcon from 'vue-material-design-icons/Check.vue'
import alertIcon from 'vue-material-design-icons/AlertOutline.vue'
import signUpIcon from 'vue-material-design-icons/Draw.vue'
export default {
  data: () => ({
    userName: '',
    userEmail: '',
    userPass: '',
    errorText: false,
    successText: false
  }),
  components: {
    checkIcon,
    alertIcon,
    signUpIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeWindow () {
      this.$emit('closeWindow')
      this.successText = false
      this.errorText = false
    },
    async register () {
      try {
        const response = await this.axios.post(`${process.env.VUE_APP_APIPATH}/api/auth/register`, {
          name: this.userName,
          email: this.userEmail,
          password: this.userPass
        })
        if (response.status === 200) {
          this.successText = true
          this.errorText = false
          this.userName = ''
          this.userEmail = ''
          this.userPass = ''
        } else {
          this.errorText = true
          this.successText = false
        }
      } catch (error) {
        console.log(error)
        this.successText = false
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
  .close-btn{
    position: absolute;
    border: none;
    background: transparent;
    top: 0;
    right: 0;
  }
  .login-block{
    padding: 30px;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
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
