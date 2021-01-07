<template>
  <div style="padding-bottom: 3vh; height: 93vh;">
    <div class="container">
      <section class="row">
        <div class="col-md-12">
          <div class="analyze-block">
            <h4 class="block-title">
              <chart-icon/>Recent record
            </h4>
            <chart/>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import chart from '../components/chartContainers/analyzeChart.vue'
import chartIcon from 'vue-material-design-icons/ChartTimelineVariantShimmer.vue'
export default {
  components: {
    chart,
    chartIcon
  },
  data: () => ({
  }),
  methods: {
    async checkLogin () {
      try {
        const api = `${process.env.VUE_APP_APIPATH}/api/check` // 用API抓使用者資料確認登入權限
        const response = await this.axios({
          url: api,
          method: 'post',
          headers: {
            'auth-token': this.$store.state.token
          }
        })
        if (response.data === 'success') {
          return
        }
      } catch (error) {
        console.log(error.response)
        this.$store.commit('LOGOUT')
        this.$router.push({ path: '/error' })
      }
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/theme.scss';
  .analyze-block{
    @extend %block-style;
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
</style>
