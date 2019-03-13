<template>
  <div class="app flex column center">
    <scroll-view scroll-y :style='`height: ${scrolHeight}px`' @scrolltolower="scrolltolower" >
      <div v-if="!showContent" :style='`height: ${scrolHeight}px`' class="prompt flex column center grow">
        <div class="flex column j-between">
          <span class="text">如果需要更及时专业的帮助</span>
          <span class="text">请尽快联系心理救援机构</span>
          <span class="flex center psychological" hover-class="active" @tap="show">查看心理救援机构</span>
          <button class="flex center darkButton" hover-class="active" @tap="send">继续发送</button>
        </div>
      </div>      
      <div class="app list" v-if="showContent">
        <div class="list_item flex column j-between">
          <div  class="flex j-start card">
            <image class="iconfont" src="/static/svgs/psychological.svg" />
            <div class="title">北京心理危机研究与干预中心</div>

          </div>
          <div class="phone" @tap="makePhone" data-tel="8008101117">8008101117</div>
          <div class="time">24小时热线</div>
        </div>

        <div class="list_item flex column j-between">
          <div  class="flex j-start card">
          <image class="iconfont" src="/static/svgs/psychological.svg" />
          <div class="title">深圳市心理危机干预中心</div>

          </div>
          <div class="phone" @tap="makePhone" data-tel="075525629459 ">0755-25629459</div>
          <div class="time">8:00 - 23:00</div>
        </div>

        <div class="list_item flex column j-between">
          <div class="flex j-start card">
            <image class="iconfont" src="/static/svgs/psychological.svg" />
            <div class="title">长春市心理援助热线</div>
          </div>
          <div class="phone" @tap="makePhone" data-tel="043189685000">0431-89685000 </div>
          <div class="time">24小时热线</div>
          <div class="phone" @tap="makePhone" data-tel="043189685333">0431-89685333 </div>
          <div class="time">8:00 - 16:00</div>
        </div>

        <div class="list_item flex column j-between">
          <div  class="flex j-start card">
          <image class="iconfont" src="/static/svgs/psychological.svg" />
          <div class="title">青岛市心理危机干预中心</div>

          </div>
          <div class="phone" @tap="makePhone" data-tel="053285669120">0532-85669120 </div>
          <div class="time">24小时热线</div>
        </div>

        <div class="list_item flex column j-between">
          <div  class="flex j-start card">
          <image class="iconfont" src="/static/svgs/psychological.svg" />
          <div class="title">广州市心理危机干预中心热线</div>

          </div>
          <div class="phone" @tap="makePhone" data-tel="02081899120">020-81899120 </div>
          <div class="time">24小时热线</div>
        </div>

        <!-- <div class="flex center box">
          <button class="flex center " hover-class="active" @tap="back">返回</button>
        </div> -->
      </div>
     </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false,
      scrolHeight: 562
    };
  },
  methods: {
    show() {
      this.showContent = true;
      
    },
    back() {
      this.showContent = false;
    },
    async send() {
      let { content, weather, aliasName } = getApp().globalData.mail;
      let sendRes = this.$request.post("/mail/story", {
        content,
        weather,
        aliasName
      });
      this.$router.push({
        query: { active: "consultative" },
        path: "/pages/manual/index"
      });
    },
    makePhone(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    },
    getScroll() {
        let systemInfo = wx.getSystemInfoSync();
        this.scrolHeight = systemInfo.windowHeight;
    },
  },
  onShow() {
    this.showContent = false;
    this.getScroll();
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  }
};
</script>

<style scoped lang="less">
.text{
  font-size: 32rpx;

}
.psychological{
  font-size: 28rpx;
  color: #FFC86D;
  font-size: 600;
  margin-top: 60rpx;
}
.card{
  margin: 40rpx 40rpx 20rpx 40rpx;
}
.darkButton{
  padding: 26rpx 102rpx;
}
.title{
  margin-left: 20rpx;
  font-size: 32rpx;
  font-weight: 600;
}
.phone{
  font-size: 28rpx;
  margin: 20rpx 40rpx;
  color: #FFC86D;
}
.time{
  font-size: 24rpx;
  margin: 20rpx 40rpx 40rpx;
  color: #BDBDC0;
}
.list_item{
  width:670rpx;
  margin:40rpx 40rpx;
  background-color:#ffffff;
  box-shadow:0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  color:#4d495b;
  border-radius: 4rpx;
}

</style>
