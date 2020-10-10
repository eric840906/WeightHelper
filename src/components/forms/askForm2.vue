<template>
  <div class="back">
    <div class="formContainer col-md-6">
      <div>
        <h3>是否了解自己的基礎代謝率?</h3>
        <div class="ynBtns">
          <router-link to="/knowForm">是</router-link> <router-link to="/unknowForm">否</router-link>
        </div>
      </div>
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
      .ynBtns{
        justify-content: space-around;
        display: flex;
        a{
          border: 1px solid transparent;
          border-radius: 3px;
          width: 80px;
          line-height: 2;
          text-align: center;
          background-color: #d5ebff94;
          transition: 0.3s linear;
          &:hover{
            background-color: #77beff94;
          }
        }
      }
    }
  }
</style>
