<template>
  <div class="back">
    <div class="formContainer col-md-6">
      <div>
        <h3>請輸入基礎代謝率</h3>
        <form action="" @submit.prevent='getBmr'>
          <label for="bmr"></label>
          <input type="number" name="bmr" placeholder="基礎代謝率" required>
          <input type="submit" value="送出">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    getBmr (e) {
      const vm = this
      console.log(e.target[0].valueAsNumber)
      localStorage.setItem('BMR', JSON.stringify(e.target[0].valueAsNumber))
      vm.$router.push('/tdeeForm')
    }
  }
}
</script>
