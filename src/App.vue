
<script>
  export default {
    mpType: 'app',
    async onLaunch(opts) {
      let user = await this.$request.login();
      console.log('loginRes', user)
      this.globalData.user = user.data
    },
    onShow: function(options) {
      // Do something when show.
      console.log('App onShow')
    },
    onHide: function() {
      // Do something when hide.
      console.log('App onHide')
    },
    onError: function(msg) {
      console.log('App onError')
      console.log(msg)
    },
    globalData() {
      return {
        shareTicket: 1,
        options: {},
        user:{},
        sUser:{}
      }
    }
  }
</script>

<style lang="less">
@import url(./styles/common.less);
</style>
