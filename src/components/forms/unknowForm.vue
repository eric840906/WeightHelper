<template>
  <div class="back" @click="closeForm">
    <div class="formContainer col-md-6" @click.stop>
      <div>
        <form action="" @submit.prevent="calcBmr">
          <p>性別</p>
          <div class="genderSec">
            <div>
              <input type="radio" name="gender" id="male" value="男" required>
              <label for="male">男</label>
            </div>
            <div>
              <input type="radio" name="gender" id="female" value="女">
              <label for="female">女</label>
            </div>
          </div>
          <label for="age">年齡</label>
          <input type="number" name="age" placeholder="輸入年齡" required style="display: block;">
          <label for="height">身高</label>
          <input type="number" name="height" placeholder="輸入身高" required style="display: block;">
          <label for="weight">體重</label>
          <input type="number" name="weight" placeholder="輸入體重" required style="display: block;">
          <input type="submit" value="送出" style="margin-top: 10px">
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
    closeForm (e) {
      this.$router.push({ path: '/' })
    },
    calcBmr (e) {
      const vm = this
      console.log(e)
      const gender = e.target[0].checked ? 'male' : 'female'
      const age = e.target[2].valueAsNumber
      const height = e.target[3].valueAsNumber
      const weight = e.target[4].valueAsNumber
      console.log(gender, age, height, weight)
      const BMR = gender === 'male' ? Math.round(66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)) : Math.round(665.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age))
      console.log(BMR)
      localStorage.setItem('BMR', BMR)
      vm.$router.push('/tdeeForm')
    }
  }
}
</script>

<style lang="scss">
  .genderSec{
    display: flex;
    div{
      &:first-child{
        margin-right: 18px;
      }
    }
  }
</style>
