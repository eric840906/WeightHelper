<template>
  <div>
     <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      food: []
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
        console.log(this)
        console.log(JSON.parse(this.response))
        vm.food = JSON.parse(this.response)
      }
    }
  },
  created () {
    this.getFood()
  }
}
</script>
