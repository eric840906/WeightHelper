<template>
<div style="padding-bottom: 3vh;">
  <div class="container">
  <section class="row">
    <div class="col-md-6">
      <div class="foodList">
        <h4 class="block-title">
          <search-icon/>食物查詢
        </h4>
        <div class="searchBar">
          <input type="text" style="width: 165px;">
          <a href="#" @click.prevent='searchFood'>搜尋</a>
          <a href="#" @click.prevent='showAll'>顯示全部</a>
        </div>
        <div class="instruction">
          <div class="icon-info">
            <p><meat-icon/>: 蛋白質類</p>
            <p><grain-icon/>: 碳水類</p>
            <p><oil-icon/>: 油脂類</p>
          </div>
        </div>
        <div class="nameList">
          <div class="foodInfo" v-for="items in resultFood" :key='items._id'>
            <a href="#" @click.prevent='toggleShow'><component :is="`${(items.carbo > items.fat && items.carbo > items.protein) ? 'grain-icon' : (items.protein > items.fat && items.protein > items.carbo) ? 'meat-icon': 'oil-icon'}`"/>{{items.name}}</a>
            <div>
              <span class="addList" @click.prevent="addList(items._id)" style="color:green;">加入菜單<font-awesome-icon style="margin-left:5px;" :icon="['fas', 'plus']"/></span>
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
    </div>
    <div class="col-md-6">
      <div class="foodPlan">
        <h4 class="block-title">
          <plan-icon/>菜單規劃
        </h4>
        <div class="instruction">
          <p style="margin: 0;">點擊食物名稱即可輸入重量</p>
          <div class="icon-info">
            <p><meat-icon/>: 蛋白質類</p>
            <p><grain-icon/>: 碳水類</p>
            <p><oil-icon/>: 油脂類</p>
          </div>
        </div>
        <div class="nameList">
          <div class="foodInfo" v-for="items in planFoods" :key='items._id'>
            <a href="#" @click.prevent='toggleCalculate'><component :is="`${(items.carbo > items.fat && items.carbo > items.protein) ? 'grain-icon' : (items.protein > items.fat && items.protein > items.carbo) ? 'meat-icon': 'oil-icon'}`"/>{{items.name}}</a>
            <span class="addList" @click.prevent="removeFood(items._id)" style="color:#a51e1e;">踢出菜單<font-awesome-icon style="margin-left:5px;" :icon="['fas', 'times']"/></span>
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
    </div>
  </section>
  <section class="row">
    <div class="col-md-12">
      <div class="today-result">
        <h4 class="block-title">
          <food-icon/>今日飲食
        </h4>
        <div class="result-row">
          <div class="col-md-6">
              <ul class="todayFoods">
                <li v-for="item in eatFoods" :key="item.id">{{item.food}}: {{item.weight}}g</li>
              </ul>
              <ul class="resultNumbers">
                <li :class="caloriesNumber"><life-icon/>總熱量:
                <Counter
                  :delay="delay"
                  :endVal="Math.round(calculateList.calories, 2)"
                  :options="options"
                  @ready="onCalories"
                /> kcal
                </li>
                <li v-if="calculateList.calories < target.calories">距離目標還有約{{(target.calories - calculateList.calories).toFixed(2)}} kcal</li>
                <li v-else class="text-danger">熱量超標啦</li>
                <li :class="proteinNumber"><meat-icon/>總蛋白質:
                <Counter
                  :delay="delay"
                  :endVal="Math.round(calculateList.protein,2)"
                  :options="options"
                  @ready="onProtein"
                /> g</li>
                <li v-if="calculateList.protein < target.protein * 1.2">距離上限還有約{{(target.protein * 1.2 - calculateList.protein).toFixed(2)}} g</li>
                <li v-else class="text-danger">蛋白質超標啦</li>
                <li :class="carboNumber"><grain-icon/>總碳水:
                <Counter
                  :delay="delay"
                  :endVal="Math.round(calculateList.carbo, 2)"
                  :options="options"
                  @ready="onCarbo"
                /> g</li>
                <li v-if="calculateList.carbo < target.carbo * 1.2">距離上限還有約{{(target.carbo * 1.2 - calculateList.carbo).toFixed(2)}} g</li>
                <li v-else class="text-danger">碳水超標啦</li>
                <li :class="fatNumber"><oil-icon/>總脂肪:
                <Counter
                  :delay="delay"
                  :endVal="Math.round(calculateList.fat, 2)"
                  :options="options"
                  @ready="onFat"
                /> g</li>
                <li v-if="calculateList.fat < target.fat">距離上限還有約{{(target.fat - calculateList.fat).toFixed(2)}} g</li>
                <li v-else class="text-danger">脂肪超標啦</li>
              </ul>
          </div>
          <div class="col-md-6">
            <Chart :chart-data="chartData" :options="options"></Chart>
            <div class="chart-btn-block">
              <button class="chart-btn form-btn" href="#" @click.prevent="clear" v-if="calculateList.calories">重新計算</button>
              <button class="chart-btn form-btn" href="#" @click.prevent="record" :disabled="!recordBtn.status" v-if="calculateList.calories">{{ recordBtn.text }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</div>
</template>

<script>
import Counter from 'vue-countup-v2'
import Chart from '@/components/chart.js'
import foodIcon from 'vue-material-design-icons/SilverwareForkKnife.vue'
import planIcon from 'vue-material-design-icons/NotebookMultiple.vue'
import searchIcon from 'vue-material-design-icons/TextSearch.vue'
import grainIcon from 'vue-material-design-icons/Barley.vue'
import meatIcon from 'vue-material-design-icons/FoodDrumstick.vue'
import oilIcon from 'vue-material-design-icons/Water.vue'
import lifeIcon from 'vue-material-design-icons/LightningBolt.vue'
import login from '@/components/login.vue'
export default {
  components: {
    Chart,
    Counter,
    foodIcon,
    planIcon,
    searchIcon,
    grainIcon,
    meatIcon,
    oilIcon,
    lifeIcon
  },
  data () {
    return {
      recordBtn: {
        text: '登錄結果',
        status: true
      },
      delay: 10,
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          position: 'top',
          align: 'center',
          labels: {
            boxWidth: 20
          }
        },
        tooltips: {
          callbacks: {
            title (tooltipItem, data) {
              return data.labels[tooltipItem[0].index]
            },
            label (tooltipItem, data) {
              return `${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}%`
            }
          }
        },
        cutoutPercentage: 35,
        title: {
          display: false,
          text: '各類型資產統計'
        }
      },
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
      chartOptions: {
        cutoutPercentage: 50
      },
      chartData: {
        labels: ['carbo', 'protein', 'fat', 'other'],
        datasets: [
          {
            label: ['carbo', 'protein', 'fat', 'other'],
            backgroundColor: ['#28a745', '#ffeeba', '#dc3545', '#000000'],
            data: [0, 0, 0, 0],
            borderWidth: 5,
            borderColor: '#ccc'
          }
        ]
      },
      target: {}
    }
  },
  methods: {
    async getFood () {
      this.$store.dispatch('getFood')
      // const vm = this
      // // const api = 'https://fierce-coast-04542.herokuapp.com/posts'
      // const api = 'http://localhost:5000/api/foodlist'
      // const request = new XMLHttpRequest()
      // request.open('GET', api)
      // request.send()
      // request.onload = function () {
      //   vm.foods = JSON.parse(this.response)
      // }
    },
    searchFood () {
      const vm = this
      vm.resultFood = []
      const words = document.querySelector('input').value
      if (words) {
        vm.foods.forEach(food => {
          if (food.name.includes(words)) {
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
      const canAdd = !this.planFoods.some(planfood => planfood._id === id)
      if (canAdd) {
        vm.planFoods.push(vm.foods.find(item => item._id === id))
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
        food: food.name,
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
            data: [(carboPercent * 100).toFixed(2), (proteinPercent * 100).toFixed(2), (fatPercent * 100).toFixed(2), (leftOver * 100).toFixed(2)],
            borderWidth: 5,
            borderColor: '#ccc'
          }
        ]
      }
      localStorage.setItem('currentChart', [(carboPercent * 100).toFixed(2), (proteinPercent * 100).toFixed(2), (fatPercent * 100).toFixed(2), (leftOver * 100).toFixed(2)])
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
    async record () {
      try {
        const response = await this.axios({
          url: `${process.env.VUE_APP_APIPATH}/api/posts`,
          method: 'post',
          headers: {
            'auth-token': this.$store.state.token
          },
          data: {
            todayInfo: this.calculateList,
            date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
          },
          onUploadProgress: async (progressEvent) => {
            // const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            const statusReset = async () => {
              await setTimeout(() => { this.recordBtn.status = true }, 1000)
              await setTimeout(() => { this.recordBtn.text = '登錄結果' }, 1000)
            }
            this.recordBtn.text = '上傳中'
            this.recordBtn.status = false
            console.log(progressEvent.loaded)
            if (progressEvent.loaded === 100) {
              console.log('end')
              this.recordBtn.text = '上傳完成'
              statusReset()
              this.$modal.show('dialog', {
                title: '成功登錄今日計算結果',
                text: '要查看紀錄嗎?',
                buttons: [
                  {
                    title: 'YES',
                    handler: () => {
                      this.$modal.hide('dialog')
                      this.$router.push({ path: '/analyze' })
                    }
                  },
                  {
                    title: 'NO',
                    handler: () => {
                      this.$modal.hide('dialog')
                    }
                  }
                ]
              })
            }
            // do whatever you like with the percentage complete
            // maybe dispatch an action that will update a progress bar or something
          }
        })
        console.log(response)
      } catch (error) {
        if (error.response.data === 'Invalid token, please relog') this.$store.state.token = null
        this.recordBtn.text = error.response.data
        setTimeout(() => this.$modal.show(login, {}, { height: 'auto', width: '300px' }), 1000)
      }
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
    },
    foods () {
      return this.$store.state.foods
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/theme.scss';
  .chart-btn-block{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .chart-btn{
      width: 40%;
      text-align: center;
      display: block;
      border: none;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  }
  .form-btn{
    background: darken($background, 5%);
    border: none;
    transition: all 0.3s ease-in;
    &:hover{
      background: darken($background, 15%);
      color: darken($background, 65%);
    }
  }
  ul{
    list-style: none;
  }
  .block-title{
    background-image: linear-gradient(180deg, $block-title-background -16%, transparent 112%);
    border-radius: 5px 5px 0 0;
    padding: 5px 10px;
    font-weight: bolder;
    .material-design-icon{
      margin-right: 10px;
      vertical-align: text-top;
    }
  }
  .foodList, .foodPlan{
    @extend %block-style;
    .material-design-icon{
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  .today-result{
    @extend %block-style;
    .material-design-icon{
      margin-right: 10px;
      vertical-align: text-bottom;
    }
  }
  .instruction{
    display: flex;
    flex-direction: column;
    padding: 10px;
    .icon-info{
      display: flex;
      .material-design-icon{
        margin: 0;
      }
    }
  }
  .nutritions, .plan-nutritions{
    display: none;
    margin-left: 15px;
  }
  .nameList{
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px;
    height: 40vh;
    &::-webkit-scrollbar{
      width: 5px;
      background-color: #d8d8d8;
      border-radius: 100px;
    }
    &::-webkit-scrollbar-thumb{
      width: 5px;
      background-color: #c6e5ff;
      border-radius: 10px;
    }

  }
  .result-row{
    display: flex;
    flex-wrap: wrap;
  }
  .show{
    display: block;
  }
  .foodInfo{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    &:hover{
      background-color: darken($background, 10%);
    }
    a{
      color: $hyper-text;
      width: 60%;
      &:hover{
        color: lighten($hyper-text, 20%);
      }
    }
    &:nth-child(2n){
      background-color: $background;
      &:hover{
        background-color: darken($background, 10%);
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
    list-style: none;
  }
  .resultNumbers{
    li{
      &:nth-child(2n){
        list-style: none;
      }
    }
  }
  .searchBar{
    display: flex;
    padding: 10px;
    a{
        &:last-child{
          margin-left: auto;
        }
      }
  }
  @media (max-width: 768px) {
    .row{
      .col-md-6+.col-md-6{
        margin-top: 20px;
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
