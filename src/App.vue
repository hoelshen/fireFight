<script>
export default {
  mpType: "app",
  data() {
    return {
      websocket: null,
      number: 0
    }
  },
  onLaunch(opts) {
    this.globalData.options = opts;
    

  },
  onShow() {
    if (!wx.createSelectorQuery) {
      // 首页Tabbar组件依赖此API
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，可能影响使用体验，请升级到最新微信版本后重试。"
      });
    }
    wx.removeStorage({
      key: 'userAddress',
      success(res) {}
    })
    this.initWebsocket()
  },
  methods: {
    initWebsocket() {
      this.websocket = wx.connectSocket({
        url: 'ws://121.36.15.94:8282/IntelligentFire/websocket'
      })


      this.websocket.onOpen(res => {
         console.log('连接成功，当前时间' + new Date());
      });
      this.websocket.onError(res => {
        setTimeout(() => {
          this.initWebsocket();
          console.log('正在重连，当前时间' + new Date());
        }, 5000);
      });

      this.websocket.onMessage(event => {
        // websocket接收信息
        if (JSON.parse(event.data).operation == '1') {
          let websocketData = JSON.stringify(JSON.parse(event.data).list[0])
          console.log(websocketData)
          if(wx.getStorageSync('websocketData')) {
            this.number++
            wx.reLaunch({
              url: `/pages/alarmpage/index?websocketData=${websocketData}&number=${this.number}`
            });
          } else {
            wx.setStorage({
              key: 'websocketData',
              data: websocketData
            })
            wx.reLaunch({
              url: `/pages/alarmpage/index?websocketData=${websocketData}&number=${this.number}`
            });
          }
        } else {
          wx.switchTab({
            url: `/pages/home/index`
          });
        }
        
      })
    },
  },
  onPageNotFound(res) {},
  onError(error) {},
  globalData() {
    return {
      options: {}, // 启动参数
      user: {}, // 用户信息
    };
  }
};
</script>

<style lang="less">
@import url(./styles/common.less);
</style>
