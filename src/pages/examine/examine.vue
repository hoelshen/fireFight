<template>
  <view class="page">
    <view class="pannel">
      <div class="fireDiv">
        <div class="header">
          image
          <image
            class="iconfont"
            src="/static/png/smoke.png"
          />
          <span class="my_function_item_text">
            告警任务
          </span>
          <image
            class="iconfont_sixteen flex center"
            src="/static/png/arrow.png"
          />
        </div>
        <div class="center">
          <div class="radius" />
        </div>
        <div>
          5分钟前
        </div>
      </div>
    </view>
    <HomeTabbar
      @change="onTabChange"
    />
  </view>
</template>

<script>
import HomeTabbar from "@/components/HomeTabbar";
import shareMix from "@/mixins/mixin";
export default {
  components: {
    HomeTabbar,
  },
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
.page {
  height: 100vh;
  background-color: #1B90FC;
  .pannel{
     height: 90vh;
     .fireDiv{
       margin:50rpx 20rpx;
       background-color: #ffffff;
      .header{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAr4AAABQBAMAAAANeGudAAAAG1BMVEUAAAAgf/8ccf8Sbf8eeP8XdP8Wb/8fcP8ddv8ZwFzQAAAACXRSTlMACAkOERYXGRpY6vdRAAAAs0lEQVR42u3QsY0BABiA0U8katVNoFAq1SobXHvXWUCiRjC2FRT+7r0RXtXm98X3nQ9V9aNiyH/V0sOYXbXXMOZWCwuD1q0kDPprK2HQtaOEQfdOEgY9ukgY9MzBKL9+/eLXr1/8+vWLX7/49esXv3794tevX/z6xa9fv/j16xe/fv3i1y9+/frFr1+/+PXrF79+8evXL379+sWvX7/49Ytfv37x69cvfv36xa9f/Pr1yyfedrw8OD53r34AAAAASUVORK5CYII=)
      }
     }
  }
}
.iconfont_sixteen{
  width: 32rpx;
  height: 32rpx;
}
</style>
