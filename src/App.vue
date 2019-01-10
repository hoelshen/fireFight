
<script>
import store from "./utils/store";
  export default {
    mpType: 'app',
    onLaunch(opts) {
      console.log('onlaunch')
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
        a: 'I am global data'
      }
    }
  }
</script>

<style lang="less">
@import url(./styles/common.less);
</style>
