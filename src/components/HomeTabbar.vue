<template>
  <div
    class="bar box flex a-center j-between shadow"
    :class=" isIpx ? 'fix-iphonex-icon' : '' "
  >
    <form
      report-submit="true"
      @submit="data"
    >
      <button
        class="flex center"
        form-type="submit"
        hover-class="active"
      >
        <image
          v-show="tab == 'data'"
          class="icon"
          src="/static/png/data_active.png"
        />
        <image
          v-show="tab != 'data'"
          class="icon"
          src="/static/png/data.png"
        />
      </button>
      <span class="flex center">设备检测</span>
    </form>
    <form
      report-submit="true"
      @submit="toFire"
    >
      <button
        class="flex center"
        form-type="submit"
        hover-class="active"
      >
        <image
          v-show="tab == 'mine'"
          class="icon"
          src="/static/png/fire_active.png"
        />
        <image
          v-show="tab != 'mine'"
          class="icon"
          src="/static/png/fire.png"
        />
      </button>
      <span class="flex center">消防检测</span>
    </form>
    <form
      report-submit="true"
      @submit="myInfo"
    >
      <button
        class="flex center"
        form-type="submit"
        hover-class="active"
      >
        <image
          v-show="tab == 'mine'"
          class="icon"
          src="/static/png/mine.png"
        />
        <image
          v-show="tab != 'mine'"
          class="icon"
          src="/static/png/mine.png"
        />
      </button>
      <span class="flex center">个人中心</span>
    </form>
  </div>
</template>

<script>
export default {
  name: "TtabBar",
  props: {
    active: {
      type: String,
      default: "data"
    },
  },
  data() {
    return {
      tab: "data" ,
      isIpx: false
    };
  },
  created() {
    this.tab = this.active;
    const model = wx.getSystemInfoSync().model;
    if(model.match("iPhone X")){
      console.log(2)
      this.isIpx = true;
    }
  },
  methods: {
    myInfo(e) {
      wx.reLaunch({
        url: "/pages/info/index"
      });
    },
    data(e) {
      wx.reLaunch({
        url: "/pages/home/index"
      });
    },
    toFire(){
      wx.reLaunch({
        url: '/pages/examine/index'
      })
    }
  }
};
</script>

<style lang="less" scoped>
.bar {
  flex-shrink: 0;
  height: 98rpx;
  width: 100%;
  color: #2a2a2a;
  background: #ffffff;
  padding: 0rpx 86rpx;
  position: fixed;
  bottom: 0;
  .icon {
    width: 44rpx;
    height: 44rpx;
    position: relative;
  }
  .active {
    background: #ffffff;
  }
}
.fix-iphonex-icon {
  position: fixed;
  height: 132rpx;
  padding: 80rpx 86rpx 80rpx;
  bottom: 0;
}
.mailBtn {
  overflow: visible;
}
.mailCountOne{
  width:32rpx;
  height: 32rpx;
  border-radius: 16px;
  background-color: #1AAD19;
  color: #ffffff;
  position:absolute;
  left:85rpx;
  top:-10rpx;
  font-size: 22rpx;
}
.mailCountTwo{
  width:44rpx;
  height: 32rpx;
  border-radius: 16px;
  background-color: #1AAD19;
  color: #ffffff;
  position: absolute;
  left:85rpx;
  top:-10rpx;
  font-size: 22rpx;
}
</style>
