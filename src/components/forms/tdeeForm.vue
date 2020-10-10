<template>
  <div class="back">
    <div class="formContainer col-md-6">
      <div>
        <h3>您的基礎代謝率為 <Counter
          :delay="delay"
          :endVal="userBMR"
          :options="options"
          @ready="onBMR"
        /></h3>
        <span>請選擇您的活動量</span>
        <ul class="exerciseList">
          <li><a href="#" @click.prevent="noEx">久坐</a></li>
          <li><a href="#" @click.prevent="lowEx">低(每周運動1~3天)</a></li>
          <li><a href="#" @click.prevent="midEx">中(每周運動3~5天)</a></li>
          <li><a href="#" @click.prevent="highEx">高(每周運動6~7天)</a></li>
          <li><a href="#" @click.prevent="exhighEx">極高</a></li>
        </ul>
      </div>
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
      delay: 10,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
      userBMR: 0
    }
  },
  methods: {
    userBmr () {
      const vm = this
      vm.userBMR = localStorage.getItem('BMR')
    },
    noEx () {
      const vm = this
      console.log(vm.userBMR * 1.2)
      localStorage.setItem('TDEE', vm.userBMR * 1.2)
      vm.$router.push('/finalForm')
    },
    lowEx () {
      const vm = this
      console.log(vm.userBMR * 1.375)
      localStorage.setItem('TDEE', vm.userBMR * 1.375)
      vm.$router.push('/finalForm')
    },
    midEx () {
      const vm = this
      console.log(vm.userBMR * 1.55)
      localStorage.setItem('TDEE', vm.userBMR * 1.55)
      vm.$router.push('/finalForm')
    },
    highEx () {
      const vm = this
      console.log(vm.userBMR * 1.725)
      localStorage.setItem('TDEE', vm.userBMR * 1.725)
      vm.$router.push('/finalForm')
    },
    exhighEx () {
      const vm = this
      console.log(vm.userBMR * 1.9)
      localStorage.setItem('TDEE', vm.userBMR * 1.9)
      vm.$router.push('/finalForm')
    },
    onFat (instance, CountUp) {
      const vm = this
      instance.update(vm.userBMR)
    }
  },
  created () {
    this.userBmr()
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
  .exerciseList{
    padding: 0;
    list-style: none;
    li{
      line-height: 2;
    }
  }
</style>
