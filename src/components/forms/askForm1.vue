<template>
  <div class="back">
    <div class="formContainer col-md-6">
      開始之前會先詢問一些跟控制體重相關的資料，請確實回答以獲得最佳體驗
      <router-link class="nextForm" to="/askForm2">下一步</router-link>
    </div>
  </div>
</template>

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
</style>
