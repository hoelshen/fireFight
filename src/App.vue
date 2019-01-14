
<script>
  export default {
    mpType: 'app',
     onLaunch(opts) {
      this.$request.login()
    },
    onShow: function(options) {
      // Do something when show.
      console.log('App onShow')
      wx.setTabBarBadge({
          index: 0,
          text: '2',
      });
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
