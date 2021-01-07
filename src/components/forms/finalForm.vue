<template>
  <div class="back" @click="closeForm">
    <div class="formContainer col-md-6" style="flex-direction: column;" @click.stop>
      <div>
        <h3>經過計算後</h3>
        <ul class="nutritionList">
          <li>您的每日建議熱量為 <Counter
          :delay="delay"
          :endVal="calories"
          :options="options"
          @ready="onCalories"
        /> kcal</li>
          <li>您的蛋白質每日建議量為 <Counter
          :delay="delay"
          :endVal="protein"
          :options="options"
          @ready="onProtein"
        /> g</li>
          <li>您的碳水化合物每日建議量為<Counter
          :delay="delay"
          :endVal="carbo"
          :options="options"
          @ready="onCarbo"
        /> g</li>
          <li>您的脂肪每日建議最大值為<Counter
          :delay="delay"
          :endVal="fat"
          :options="options"
          @ready="onFat"
        /> g</li>
        </ul>
      </div>
      <router-link to="/foodlist">開始規劃飲食</router-link>
    </div>
  </div>
</template>

<script>
import Counter from 'vue-countup-v2'
export default {
  components: {
    Counter
  },
  data () {
    return {
      userTDEE: 0,
      target: {},
      calories: 0,
      protein: 0,
      carbo: 0,
      fat: 0,
      delay: 10,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  methods: {
    closeForm (e) {
      this.$router.push({ path: '/' })
    },
    userTdee () {
      const vm = this
      vm.userTDEE = localStorage.getItem('TDEE')
      vm.calories = Math.round(vm.userTDEE * 0.8)
      vm.protein = Math.round(vm.userTDEE * 0.8 * 0.3 / 4)
      vm.carbo = Math.round(vm.userTDEE * 0.8 * 0.4 / 4)
      vm.fat = Math.round(vm.userTDEE * 0.8 * 0.3 / 9)
      vm.target = {
        calories: Math.round(vm.userTDEE * 0.8),
        protein: Math.round(vm.userTDEE * 0.8 * 0.3 / 4),
        carbo: Math.round(vm.userTDEE * 0.8 * 0.4 / 4),
        fat: Math.round(vm.userTDEE * 0.8 * 0.3 / 9)
      }
      if (this.$store.state.token) {
        this.axios({
          url: `${process.env.VUE_APP_APIPATH}/api/target`,
          method: 'post',
          headers: {
            'auth-token': this.$store.state.token
          },
          data: {
            target: vm.target
          }
        }).then(() => this.$store.dispatch('getTarget'))
      }
      localStorage.setItem('target', JSON.stringify(vm.target))
    },
    onCalories (instance, CountUp) {
      const vm = this
      instance.update(vm.calories)
    },
    onProtein (instance, CountUp) {
      const vm = this
      instance.update(vm.protein)
    },
    onCarbo (instance, CountUp) {
      const vm = this
      instance.update(vm.carbo)
    },
    onFat (instance, CountUp) {
      const vm = this
      instance.update(vm.fat)
    }
  },
  created () {
    this.userTdee()
  }
}
</script>
