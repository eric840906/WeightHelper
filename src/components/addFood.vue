<template>
  <div class="add-block">
    <div class="form-title"><add-food-icon/><h3>Add food</h3></div>
    <form action="" @submit.prevent="register">
      <div class="form-row">
        <input type="text" id="name" class="custom-input" v-model="foodName" autocomplete="none" required>
        <label for="name" class="label-name">
          <span class="content-name">Name</span>
        </label>
      </div>
      <div class="form-row">
        <input type="number" id="calories" v-model="foodCalories" class="custom-input" required>
        <label for="calories" class="label-name">
          <span class="content-name"><span>Calories</span><small>(kcal per 100g)</small></span>
        </label>
      </div>
      <div class="form-row">
        <input type="number" id="protein" v-model="foodProtein" class="custom-input" required>
        <label for="protein" class="label-name">
          <span class="content-name">Protein<small>(g per 100g)</small></span>
        </label>
      </div>
      <div class="form-row">
        <input type="number" id="carbo" v-model="foodCarbo" class="custom-input" required>
        <label for="carbo" class="label-name">
          <span class="content-name">Carbo<small>(g per 100g)</small></span>
        </label>
      </div>
      <div class="form-row">
        <input type="number" id="fat" v-model="foodFat" class="custom-input" required>
        <label for="fat" class="label-name">
          <span class="content-name">Fat<small>(g per 100g)</small></span>
        </label>
      </div>
      <div v-show="successText">
        <label for="" style="color: #29aa1d;"><check-icon/>加入成功</label>
      </div>
      <div v-show="errorText">
        <label for="" style="color: #ff4436;"><alert-icon/>{{errorText}}</label>
      </div>
      <div class="form-row">
        <input type="submit" value="Add" class="form-btn">
      </div>
    </form>
  </div>
</template>

<script>
import checkIcon from 'vue-material-design-icons/Check.vue'
import alertIcon from 'vue-material-design-icons/AlertOutline.vue'
import addFoodIcon from 'vue-material-design-icons/PencilPlusOutline.vue'
export default {
  data: () => ({
    foodName: '',
    foodProtein: '',
    foodCarbo: '',
    foodCalories: '',
    foodFat: '',
    errorText: false,
    successText: false
  }),
  components: {
    checkIcon,
    alertIcon,
    addFoodIcon
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
      this.successText = ''
      this.errorText = false
    },
    async register () {
      try {
        const response = await this.axios({
          url: `${process.env.VUE_APP_APIPATH}/api/foodlist`,
          method: 'post',
          headers: {
            'auth-token': this.$store.state.token
          },
          data: {
            name: this.foodName,
            calories: this.foodCalories,
            protein: this.foodProtein,
            carbo: this.foodCarbo,
            fat: this.foodFat
          }
        })
        console.log(response)
        if (response.status === 200) {
          this.successText = true
          this.errorText = false
          this.$store.dispatch('getFood')
        } else {
          this.errorText = true
          this.successText = false
        }
      } catch (error) {
        console.log(error.response)
        this.successText = false
        this.errorText = error.response.data
        if (error.response.data.includes('Invalid token')) {
          this.$store.state.token = null
        }
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
  .add-block{
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
  .info-block{
    display: flex;
    justify-content: space-between;
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
