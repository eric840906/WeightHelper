<template>
  <div>
    <chart :chartData="datacollection" :options="options"></chart>
  </div>
</template>

<script>
import chart from '../charts/lineChart.js'
export default {
  name: 'ChartContainer',
  components: { chart },
  data: () => ({
    datacollection: null,
    analyzeData: {
      labels: [],
      label: [],
      calories: [],
      protein: [],
      carbo: [],
      fat: []
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      legend: {
        position: 'bottom',
        align: 'end',
        labels: {
          usePointStyle: true
        }
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'date'
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title (tooltipItem, data) {
            return data.labels[tooltipItem[0].index]
          },
          label (tooltipItem, data) {
            const mainData = data.datasets[tooltipItem.datasetIndex]
            return ` ${mainData.label}${(mainData.data[tooltipItem.index]).toFixed(2)}`
          }
        }
      }
    }
  }),
  methods: {
    async getData () {
      const response = await this.axios({
        url: `${process.env.VUE_APP_APIPATH}/api/posts`,
        methods: 'get',
        headers: {
          'auth-token': this.$store.state.token
        }
      })
      console.log(response)
      this.analyzeData.labels = response.data.map(item => item.date)
      this.analyzeData.label = Object.keys(response.data[0].todayInfo)
      this.analyzeData.calories = response.data.map(item => item.todayInfo.calories)
      this.analyzeData.protein = response.data.map(item => item.todayInfo.protein)
      this.analyzeData.carbo = response.data.map(item => item.todayInfo.carbo)
      this.analyzeData.fat = response.data.map(item => item.todayInfo.fat)
    },
    fillData () {
      this.datacollection = {
        labels: this.analyzeData.labels,
        datasets: [
          {
            label: 'calories',
            backgroundColor: '#6087ff1f',
            borderColor: '#6087ff6e',
            fill: false,
            borderDash: [9, 10],
            borderWidth: 1,
            borderCapStyle: 'square',
            data: this.analyzeData.calories
          },
          {
            label: 'protein',
            backgroundColor: '#ff606057',
            borderColor: '#ff60601f',
            borderWidth: 1,
            data: this.analyzeData.protein
          },
          {
            label: 'carbo',
            backgroundColor: '#6d60ff57',
            borderColor: '#6d60ff1f',
            borderWidth: 1,
            data: this.analyzeData.carbo
          },
          {
            label: 'fat',
            backgroundColor: '#3c3c3cd9',
            borderColor: '#3c3c3cd9',
            borderWidth: 1,
            data: this.analyzeData.fat
          }
        ]
      }
    }
  },
  async created () {
    await this.getData()
    this.fillData()
  }
}
</script>
