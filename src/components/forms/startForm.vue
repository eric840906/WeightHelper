<template>
  <div class="back" @click="closeForm">
    <div class="formContainer col-md-6" @click.stop>
      <div>
        <h3>請選擇服務:</h3>
        <ul class="serviceList">
          <li><router-link to="/askForm1">首次使用</router-link></li>
          <li><router-link to="/knowForm">修改基礎代謝率</router-link></li>
          <li><router-link to="/foodList">開始規劃飲食</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeForm (e) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
