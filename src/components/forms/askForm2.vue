<template>
  <div class="back" @click="closeForm">
    <div class="formContainer col-md-6" @click.stop>
      <div>
        <h3>是否了解自己的基礎代謝率?</h3>
        <div class="ynBtns">
          <router-link to="/knowForm">是</router-link> <router-link to="/unknowForm">否</router-link>
        </div>
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
