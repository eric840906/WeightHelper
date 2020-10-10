<template>
  <div class="back">
    <div class="formContainer col-md-6" style="flex-direction: column;">
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
      console.log(vm.target)
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

<style lang="scss">
  .back{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    top: 9px;
    left: 0;
    background: #000000cf;
    height: 100%;
    .formContainer{
      position: relative;
      background: white;
      height: auto;
      height: 570px;
      align-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .nextForm{
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
  .nutritionList{
    padding: 0;
    list-style: none;
  }
</style>
