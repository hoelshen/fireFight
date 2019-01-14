
<script>
  export default {
    mpType: 'app',
    async onLaunch(opts) {
      let user = this.globalData.user  //loginFlag
      if(Object.keys(user).length === 0){
        await this.$request.login();
        console.log('还没有用户登录');    
      } else {
        console.log('已经有用户登录了');
        wx.checkSession({
          success: (result)=>{
            console.log('result')
          },
          fail: ()=>{
            console.log('缓存信息缺失')
          },
          complete: ()=>{}
        });
      }
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
