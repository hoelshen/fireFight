<template>
  <div>
    <div class="adress-info pdd-lr-25 mrg-tb-20">
      <div
        class="flex a-center"
        @click="toPosition"
      >
        <image
          class="adress-icon"
          src="/static/png/locations.png"
        />
        <div class="mrg-lr-20 adress-cont tex-overflow">
          位置：{{ userAddress }}
        </div>
        <image
          class="arrow"
          src="/static/png/arrow-white.png"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "AdressInfo",
    // props: {
    //   userAddress: {
    //     type: String,
    //     default: ''
    //   }
    // },
    data() {
      return {
        userAddress: ''
      }
    },
    onLoad(opt) {
    },
    onShow() {
      // this.initData()
    },

  methods: {
    initData() {
      setTimeout(() => {
        this.$nextTick(() => {
          if( wx.getStorageSync('userAddress' )) {
            let userAddress = wx.getStorageSync('userAddress')
            this.userAddress = userAddress.province + userAddress.city + userAddress.prefecture + userAddress.areaName + userAddress.placeName
          } else {
            this.getUserAddress()
          }
        })
      }, 0)
      
    },
    getUserAddress() {
      let userId = wx.getStorageSync('userId')
      
      this.$request
        .post("/user/getUserAddress.do", { userId })
        .then(res => {
          this.userAddress = res.province + res.city + res.prefecture + res.areaName + res.placeName
          console.log(this.userAddress)
          wx.setStorage({
            key: 'userAddress',
            data: res
          })
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    },
    toPosition(){
      wx.navigateTo({
        url: `/pages/position/index`
      });
    },
  }
}
</script>
<style lang="less" scoped>
  .adress-info{
      color: #fff;
      .adress-cont{
        max-width: 400rpx;
      }
      .adress-icon{
         width: 26rpx;
         height: 36rpx; 
      }
    .arrow{
        width: 13rpx ;
        height: 22rpx;
    }
  }
</style>