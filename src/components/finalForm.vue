<template>
  <div class="back">
    <div class="formContainer col-md-6" style="flex-direction: column;">
      <div>
        <h3>經過計算後</h3>
        <ul class="nutritionList">
          <li>您的每日建議熱量為{{Math.round(userTDEE*0.8)}} kcal</li>
          <li>您的每日建議蛋白質為{{Math.round(userTDEE*0.8*0.3 / 4)}} g</li>
          <li>您的每日建議碳水化合物為{{Math.round(userTDEE*0.8*0.4 / 4)}} g</li>
          <li>您的每日建議脂肪最大值為{{Math.round(userTDEE*0.8*0.3 / 9)}} g</li>
        </ul>
      </div>
      <router-link to="/foodlist">開始規劃飲食</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userTDEE: 0,
      target: {}
    }
  },
  methods: {
    userTdee () {
      const vm = this
      vm.userTDEE = localStorage.getItem('TDEE')
      vm.target = {
        calories: Math.round(vm.userTDEE * 0.8),
        protein: Math.round(vm.userTDEE * 0.8 * 0.3 / 4),
        carbo: Math.round(vm.userTDEE * 0.8 * 0.4 / 4),
        fat: Math.round(vm.userTDEE * 0.8 * 0.3 / 9)
      }
      console.log(vm.target)
      localStorage.setItem('target', JSON.stringify(vm.target))
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
