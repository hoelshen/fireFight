<template>
  <view class="page">
    <view class="header">
      <image
        class="iconfont"
        src="/static/png/smoke.png"
      />
      <span class="my_function_item_text">
        告警任务
      </span>
    </view>
  </view>
</template>

<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      plateNum: "",
      tool_height: "",
      statusbarHeight: "",
      title_height: ""
    };
  },
  methods: {
 
  },
  onShow() {
    let res = wx.getSystemInfoSync();

    let isiOS = res.system.indexOf("iOS") > -1;
    let totalBar;
    if (!isiOS) {
      const model = res.model;
      if (model.match("samsung")) {
        totalBar = 34;
      } else {
        totalBar = 36;
      }
    } else {
      const model = res.model;
      if (model.match("iPhone X")) {
        totalBar = 44;
      } else {
        totalBar = 32;
      }
    }

    // 时间、信号等工具栏的高度
    let toolBar = res.statusBarHeight;
    this.tool_height = res.statusBarHeight;
    
    // 页面title栏的高度
    this.title_height = totalBar * 2 - toolBar;
  }
};
</script>

<style scoped lang="less">
.addCar_header {
  width: 100%;
  background: #ffffff;
  z-index: 3;
}

.header-bg {
  position: fixed;
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  z-index: 3;
  &_img {
    width: 100%;
  }
}
.title {
  color: #2a2a2a;
  font-size: 32rpx;
}
.car_btn {
  position: relative;
  top: -30rpx;
  .lightButton {
    margin-bottom: 20rpx;
    margin-top: 0rpx;
    height: 64rpx;
    position: absolute;
    top: 120rpx;
    width: 726rpx;
    font-size: 32rpx;
  }
}
.car_block {
  position: absolute;
  background-color: #ffffff;
  width: 726rpx;
  border-radius: 20rpx;
  box-shadow: 3rpx 4rpx 6rpx rgba(1, 191, 135, 0.7);
}
.kb {
  .kb-keyboard {
    .kb-keyboard__panle {
      bottom: 150rpx;
    }
  }
}
</style>
