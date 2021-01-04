<template>
  <div class="back" @click="closeForm">
    <div class="formContainer col-md-6" @click.stop>
      開始之前會先詢問一些跟控制體重相關的資料，請確實回答以獲得最佳體驗
      <div class="ynBtns">
        <router-link class="nextForm" to="/askForm2">下一步</router-link>
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
