<template>
<div>
  <Navbar></Navbar>
  <div class="container" style="padding-top: 71px;">
  <div class="row">
    <div class="col-md-6 foodList">
      <h1>食物查詢</h1>
      <div class="searchBar">
        <input type="text" style="width: 165px;">
        <a href="#" @click.prevent='searchFood'>搜尋</a>
        <a href="#" @click.prevent='showAll'>顯示全部</a>
      </div>
      <div class="nameList">
        <div class="foodInfo" v-for="items in resultFood" :key='items.id'>
          <a href="#" @click.prevent='toggleShow'>{{items.title}}</a>
          <div>
             <span class="addList" @click.prevent="addList(items.id)" style="color:green;">加入菜單<font-awesome-icon style="margin-left:5px;" :icon="['fas', 'plus']"/></span>
          </div>
          <div class="nutritions col-md-12"><p>每100g營養成分:</p>
            <ul>
              <li>熱量: {{items.calories}}g</li>
              <li>蛋白質: {{items.protein}}g</li>
              <li>碳水化合物: {{items.carbo}}g</li>
              <li>脂肪: {{items.fat}}g</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 foodPlan">
      <h1>食物規劃</h1>
      <p style="margin: 0;">點擊食物名稱即可輸入重量</p>
      <div class="nameList">
        <div class="foodInfo" v-for="items in planFoods" :key='items.id'>
          <a href="#" @click.prevent='toggleCalculate'>{{items.title}}</a>
          <span class="addList" @click.prevent="removeFood(items.id)" style="color:#a51e1e;">踢出菜單<font-awesome-icon style="margin-left:5px;" :icon="['fas', 'times']"/></span>
          <div class="plan-nutritions col-md-12">
            <input type="number" placeholder="輸入重量(公克)" v-model="foodWeight"><a href="#" @click.prevent="calculate(items, foodWeight)">加入</a>
            <p v-if="foodWeight">每{{foodWeight}}g營養成分:</p>
            <ul v-if="foodWeight">
              <li>熱量: {{Math.round(items.calories*foodWeight*0.01,2)}}g</li>
              <li>蛋白質: {{Math.floor(items.protein*foodWeight*0.01)}}g</li>
              <li>碳水化合物: {{Math.floor(items.carbo*foodWeight*0.01)}}g</li>
              <li>脂肪: {{Math.round(items.fat*foodWeight*0.01)}}g</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h1>今日飲食</h1>
      <ul class="todayFoods">
        <li v-for="item in eatFoods" :key="item.id">{{item.food}}: {{item.weight}}g</li>
      </ul>
      <ul class="resultNumbers">
        <li :class="caloriesNumber">總熱量:
        <Counter
          :delay="delay"
          :endVal="Math.round(calculateList.calories, 2)"
          :options="options"
          @ready="onCalories"
        /> kcal
        </li>
        <li v-if="calculateList.calories < target.calories">距離目標還有約{{Math.round(target.calories - calculateList.calories)}} kcal</li>
        <li v-else class="text-danger">熱量超標啦</li>
        <li :class="proteinNumber">總蛋白質:
        <Counter
          :delay="delay"
          :endVal="Math.round(calculateList.protein,2)"
          :options="options"
          @ready="onProtein"
        /> g</li>
        <li v-if="calculateList.protein < target.protein * 1.2">距離上限還有約{{Math.round(target.protein * 1.2 - calculateList.protein)}} g</li>
        <li v-else class="text-danger">蛋白質超標啦</li>
        <li :class="carboNumber">總碳水:
        <Counter
          :delay="delay"
          :endVal="Math.round(calculateList.carbo, 2)"
          :options="options"
          @ready="onCarbo"
        /> g</li>
        <li v-if="calculateList.carbo < target.carbo * 1.2">距離上限還有約{{Math.round(target.carbo * 1.2 - calculateList.carbo)}} g</li>
        <li v-else class="text-danger">碳水超標啦</li>
        <li :class="fatNumber">總脂肪:
        <Counter
          :delay="delay"
          :endVal="Math.round(calculateList.fat, 2)"
          :options="options"
          @ready="onFat"
        /> g</li>
        <li v-if="calculateList.fat < target.fat">距離上限還有約{{Math.round(target.fat - calculateList.fat)}} g</li>
        <li v-else class="text-danger">脂肪超標啦</li>
      </ul>
    </div>
    <div class="col-md-6">
      <Chart :chart-data="chartData"></Chart>
      <a class="clearbtn" href="#" @click.prevent="clear" v-if="calculateList.calories">重新計算</a>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Counter from 'vue-countup-v2'
import Chart from '@/components/chart.vue'
import Navbar from '@/components/navbar.vue'
export default {
  components: {
    Chart,
    Counter,
    Navbar
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
      foods: [],
      resultFood: [],
      planFoods: [],
      eatFoods: [],
      foodWeight: '',
      calculateList: {
        calories: 0,
        carbo: 0,
        protein: 0,
        fat: 0
      },
      graphData: [],
      chartData: {
        labels: ['carbo', 'protein', 'fat', 'other'],
        datasets: [
          {
            label: ['carbo', 'protein', 'fat', 'other'],
            backgroundColor: ['#28a745', '#ffeeba', '#dc3545', '#000000'],
            data: [0, 0, 0, 0]
          }
        ]
      },
      target: {}
    }
  },
  methods: {
    getFood () {
      const vm = this
      const api = 'https://fierce-coast-04542.herokuapp.com/posts'
      const request = new XMLHttpRequest()
      request.open('GET', api)
      request.send()
      request.onload = function () {
        vm.foods = JSON.parse(this.response)
      }
    },
    searchFood () {
      const vm = this
      vm.resultFood = []
      const words = document.querySelector('input').value
      if (words) {
        vm.foods.forEach(food => {
          if (food.title.includes(words)) {
            vm.resultFood.push(food)
          }
        })
      }
    },
    toggleShow (e) {
      e.target.nextElementSibling.nextElementSibling.classList.toggle('show')
    },
    toggleCalculate (e) {
      const vm = this
      const items = document.querySelectorAll('.plan-nutritions.show')
      const inputs = document.querySelectorAll('.plan-nutritions input')
      e.target.nextElementSibling.nextElementSibling.classList.toggle('show')
      items.forEach(item => item.classList.remove('show'))
      inputs.forEach(item => item.focus())
      vm.foodWeight = ''
    },
    showAll () {
      const vm = this
      vm.resultFood = vm.foods
    },
    addList (id) {
      const vm = this
      const canAdd = this.planFoods.some(planfood => planfood.title === vm.foods[id - 1].title)
      if (!canAdd) {
        vm.planFoods.push(vm.foods[id - 1])
      } else {
        console.log('加過了')
      }
      localStorage.setItem('currentList', JSON.stringify(vm.planFoods))
    },
    removeFood (id) {
      const vm = this
      const removeItem = vm.planFoods.find(planFood => planFood.id === id)
      const removeIndex = vm.planFoods.indexOf(removeItem)
      vm.planFoods.splice(removeIndex, 1)
      localStorage.setItem('currentList', JSON.stringify(vm.planFoods))
    },
    getList () {
      const vm = this
      vm.planFoods = localStorage.getItem('currentList') ? JSON.parse(localStorage.getItem('currentList')) : []
    },
    calculate (food, weight) {
      const vm = this
      if (weight < 0) return
      vm.calculateList.calories += food.calories * weight * 0.01
      vm.calculateList.carbo += food.carbo * weight * 0.01
      vm.calculateList.protein += food.protein * weight * 0.01
      vm.calculateList.fat += food.fat * weight * 0.01
      vm.drawChart(vm.calculateList)
      vm.foodRecord(food, weight)
      vm.foodWeight = ''
      localStorage.setItem('currentCalc', JSON.stringify(vm.calculateList))
    },
    foodRecord (food, weight) {
      const vm = this
      const foodInfo = {
        food: food.title,
        weight: weight
      }
      const canAdd = vm.eatFoods.some(item => item.food === foodInfo.food)
      const foodIndex = vm.eatFoods.findIndex(item => item.food === foodInfo.food)
      if (!canAdd) {
        vm.eatFoods.push(foodInfo)
      } else {
        vm.eatFoods[foodIndex].weight = vm.eatFoods[foodIndex].weight * 1 + foodInfo.weight * 1
      }
      localStorage.setItem('todayFoods', JSON.stringify(vm.eatFoods))
    },
    drawChart (calculateList) {
      const vm = this
      const carboPercent = (calculateList.carbo * 4) / calculateList.calories
      const proteinPercent = (calculateList.protein * 4) / calculateList.calories
      const fatPercent = (calculateList.fat * 9) / calculateList.calories
      const leftOver = (calculateList.calories - (calculateList.fat * 9) - (calculateList.protein * 4) - (calculateList.carbo * 4)) / calculateList.calories
      vm.chartData = {
        labels: ['carbo', 'protein', 'fat', 'other'],
        datasets: [
          {
            label: ['carbo', 'protein', 'fat', 'other'],
            backgroundColor: ['#28a745', '#ffeeba', '#dc3545', '#000000'],
            data: [Math.round(carboPercent * 100), Math.round(proteinPercent * 100), Math.round(fatPercent * 100), Math.round(leftOver * 100)]
          }
        ]
      }
      localStorage.setItem('currentChart', [Math.round(carboPercent * 100), Math.round(proteinPercent * 100), Math.round(fatPercent * 100), Math.round(leftOver * 100)])
    },
    preDraw () {
      const vm = this
      vm.chartData.datasets[0].data = localStorage.getItem('currentChart') ? localStorage.getItem('currentChart').split(',') : [0, 0, 0, 0]
    },
    getCalc () {
      const vm = this
      vm.calculateList = JSON.parse(localStorage.getItem('currentCalc')) || {
        calories: 0,
        carbo: 0,
        protein: 0,
        fat: 0
      }
    },
    clear () {
      const vm = this
      vm.chartData = {
        labels: ['carbo', 'protein', 'fat', 'other'],
        datasets: [
          {
            label: ['carbo', 'protein', 'fat', 'other'],
            backgroundColor: ['#28a745', '#ffeeba', '#dc3545', '#000000'],
            data: [0, 0, 0, 0]
          }
        ]
      }
      vm.calculateList.calories = 0
      vm.calculateList.carbo = 0
      vm.calculateList.protein = 0
      vm.calculateList.fat = 0
      vm.eatFoods = []
      localStorage.setItem('currentCalc', JSON.stringify(vm.calculateList))
      localStorage.setItem('currentChart', [0, 0, 0, 0])
      localStorage.setItem('todayFoods', JSON.stringify(vm.eatFoods))
    },
    getToday () {
      const vm = this
      vm.eatFoods = JSON.parse(localStorage.getItem('todayFoods'))
    },
    getTarget () {
      const vm = this
      vm.target = JSON.parse(localStorage.getItem('target'))
    },
    onCalories: function (instance, CountUp) {
      const vm = this
      instance.update(vm.calculateList.calories)
    },
    onProtein: function (instance, CountUp) {
      const vm = this
      instance.update(vm.calculateList.protein)
    },
    onCarbo: function (instance, CountUp) {
      const vm = this
      instance.update(vm.calculateList.carbo)
    },
    onFat: function (instance, CountUp) {
      const vm = this
      instance.update(vm.calculateList.fat)
    }
  },
  created () {
    this.getFood()
    this.getToday()
    this.getTarget()
    this.getList()
    this.getCalc()
    this.preDraw()
  },
  computed: {
    caloriesNumber () {
      return this.calculateList.calories > this.target.calories ? 'text-danger' : this.calculateList.calories < this.target.calories - 200 ? 'text-danger' : 'text-success'
    },
    proteinNumber () {
      return this.calculateList.protein > this.target.protein * 1.2 ? 'text-danger' : this.calculateList.protein < this.target.protein * 0.8 ? 'text-danger' : 'text-success'
    },
    carboNumber () {
      return this.calculateList.carbo > this.target.carbo * 1.2 ? 'text-danger' : this.calculateList.carbo < this.target.carbo * 0.8 ? 'text-danger' : 'text-success'
    },
    fatNumber () {
      return this.calculateList.fat > this.target.fat || this.calculateList.fat < this.target.fat * 0.5 ? 'text-danger' : 'text-success'
      // 'text-danger': calculateList.fat > target.fat || calculateList.fat < target.fat * 0.5
    }
  }
}
</script>

<style lang="scss">
  .foodList, .foodPlan{
    margin-top: 20px;
  }
  .nutritions, .plan-nutritions{
    display: none;
    margin-left: 15px;
  }
  .nameList{
    overflow-y: scroll;
    overflow-x: hidden;
    height: 40vh;
  }
  .show{
    display: block;
  }
  .foodInfo{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    a{
      width: 60%;
    }
    &:hover{
      background-color: #b4dcff;
    }
    &:nth-child(2n){
      background-color: aliceblue;
      &:hover{
        background-color: #b4dcff;
      }
    }
  }
  .addList{
    margin-left: auto;
    cursor: pointer;
    ::after{
      content: "";
    }
    &:hover{
      color: blue;
    }
  }
  .todayFoods{
    list-style: decimal;
  }
  .resultNumbers{
    li{
      &:nth-child(2n){
        list-style: none;
      }
    }
  }
  .clearbtn{
    width: 100%;
    text-align: center;
    display: block;
    border: 1px solid;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .searchBar{
    display: flex;
    a{
        &:last-child{
          margin-left: auto;
        }
      }
  }
  @media (max-width: 426px) {
    .searchBar{
      justify-content: space-between;
      a{
        &:last-child{
          margin-left: 0;
        }
      }
    }
  }
</style>
