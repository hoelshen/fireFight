<template>
  <div class="detection-page flex column">
    <div class="detection-header">
      <div class="header-info flex j-between mrg-b-40">
        <div class="flex a-center">
          <image
            class="icon"
            src="/static/png/locations.png"
          />
          <span class="mrg-lr-20">位置：</span><span class="mrg-r-20">宁太家园</span>
          <image
            class="arrow"
            src="/static/png/arrow-white.png"
          />
        </div>
        <div class="flex a-center">
          <span>小雨：</span><span>23°</span>
        </div>
      </div>
      <div class="name">
        您好： 管理员
      </div>
    </div>
    <div class="detection-info mrg-t-100 mrg-center">
      <div class="info-title flex j-between a-center pdd-lr-20">
        <div class="flex a-center">
          <image
            class="pdd-r-5"
            src="/static/png/detection.png"
          />
          数据信息
        </div>
        <image
          class="arrow"
          src="/static/png/arrow.png"
        />
      </div>
      <div class="info-container pdd-lr-80">
        <div class="info-item flex j-between a-center">
          <div>设备ID：01</div>
          <div>位置xxxxxx</div>
          <div class="online-btn tex-center">
            在线
          </div>
        </div>
      </div>
    </div>


    <div class="detection-info mrg-center">
      <div class="info-title flex j-between a-center pdd-lr-20">
        <div class="flex a-center">
          <image
            class="pdd-r-5"
            src="/static/png/person.png"
          />
          相关负责人
        </div>
        <image
          class="arrow"
          src="/static/png/arrow.png"
        />
      </div>
      <div class="info-container pdd-lr-30">
        <div class="info-item flex a-center">
          <div class="header-img mrg-r-20" />
          <div class="flex_1 pdd-tb-20">
            <div class="flex j-between a-center">
              <div>紧急联系人:赵一二</div>
              <div>手机号码:13035883838</div>
            </div>
            <div class="flex j-between a-center">
              <div>紧急联系人:赵一二</div>
              <div>手机号码:13035883838</div>
            </div>
            <div class="flex j-between a-center">
              <div>紧急联系人:赵一二</div>
              <div>手机号码:13035883838</div>
            </div>
            <div class="flex j-between a-center">
              <div>紧急联系人:赵一二</div>
              <div>手机号码:13035883838</div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <HomeTabbar
      :mail-count="unreadMessages"
      :active="tab"
      @change="onTabChange"
    />
  </div>
</template>
<script>
import HomeTabbar from "@/components/HomeTabbar";
export default {
  components: {
    HomeTabbar,
  },
  data() {
      return {
          tab: 'home'
      }
  },
  onLoad(opt) {
    this.toPage = opt.toPage;
    // this.tab = opt.tab;
  },
  onShow() {
    if (this.toPage) {
      let toPage = this.toPage;
      this.toPage = null;
      return this.$router.push({
        path: toPage,
        query: this.$mp.query
      });
    }
    console.log('2', this.tab)
    this.onTabChange(this.tab);
  },

  methods: {
    onTabChange(tab = "mine") {
      this.tab = tab;
      if (this.tab === "home") {
      }
      if (this.tab === "mail") {
      }
      if (this.tab === "mine") {
        this.$request.getUser().then(res => {
          if (res) {
            this.user.aliasPortrait = res.portrait;
            this.user.phoneNumber = res.mobile;
          }
        });
      }
      let res = wx.getSystemInfoSync();
      // 导航栏总高度 & 占位块高度
      // {
      //       'iPhone': 64,
      //       'iPhoneX': 88,
      //       'Android': 68,
      //       'samsung': 72
      // }
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
    },
  }
  }
</script>
<style lang="less" scoped>
.detection-page {
  height: 100vh;
  .detection-header{
      height: 331rpx;
      background: #1D7FFD;
      padding: 20rpx 25rpx 0;
      color: #fff;
      .header-info {
        .icon{
                width: 26rpx;
                height: 36rpx;
            }
      }
      .name{
          font-weight:bold;
          font-size: 40rpx;
      }
  }
  .detection-info{
    width:702rpx;
    height:440rpx;
    background:rgba(255,255,255,1);
    box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
    border-radius:10px;
    margin-bottom: 40rpx;
    .info-title{
        height: 80rpx;
        background:#E9F0FF;
        border-radius:10px 10px 0px 0px;
        // opacity:0.1;
        image {
            width: 36rpx;
            height: 36rpx;
        }
    }
    .info-container{
      font-size: 24rpx;
      color:rgba(62,74,89,1);
      .info-item{
          min-height: 80rpx;
          border-bottom: 1px solid #D3DFEF;
        .online-btn{
            color:rgba(255,255,255,1);
            font-size: 20rpx;
            width:80rpx;
            height:36rpx;
            background:rgba(34,172,56,1);
            border-radius:5rpx;
        }
        .header-img{
            height: 88rpx;
            width: 88rpx;
            border-radius: 50rpx;
            background: #ccc;
        }
      }
    }
  }
  .mrg-t-100 {
       margin-top: -100rpx;
  }
  .arrow{
        width: 13rpx !important;
        height: 22rpx !important;
    }
}
</style>