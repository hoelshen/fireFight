<template>
  <view class="ticket flex column j-between">
    <session class="navigatabar flex j-around">
      <div @click="toggle('solution')" :class="active == 'solution' ? 'borderColor' :''" class="navigatabar_item   flex center">我要解忧券</div>
      <div @click="toggle('mail')" :class="active == 'mail' ? 'borderColor' :''" class="navigatabar_item  flex center">我要邮票</div>
    </session>
    <session class="list" v-if="active === 'solution'">
      <div class="list_item flex  j-between ">
        <div class="flex column">
          <div class="flex a-center">
            <span class="list_item_span">购买解忧券</span>
            <image class="iconfont" src="/static/svgs/ticket.svg" />
            <span class="count">×1</span>
          </div>
          <span class="welfare_content">用户可以使用 9.9 元人民币购买 1 张解忧券。</span>
        </div>
        <div class="exchange  flex center">
          <button @click="pay" class="flex center">购买</button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex column">
          <div class="flex a-center">
            <span class="list_item_span">邮票兑换解忧券</span>
            <image class="iconfont" src="/static/svgs/ticket.svg" />
            <span class="count">×1</span>
          </div>
          <span class="welfare_content">解忧券用于向 Tell 烦恼咨询中心提交烦恼咨询，你可以使用10张邮票兑换 1 张解忧券。</span>
        </div>
        <div class="exchange  flex center">
          <button @click="exchange" class="flex center">兑换</button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex column">
          <div class="flex a-center">
            <span class="list_item_span">服务号领解忧券</span>
            <image class="iconfont" src="/static/svgs/ticket.svg" />
            <span class="count">×1</span>
          </div>
          <span class="welfare_content">进入客服会话后发送「服务号」，按提示进行操作。关注服务号后即可领取解忧券。</span>
        </div>
        <div class="exchange flex center">
          <button @click="FocusServer" class="flex center ">去关注
          </button>
        </div>
      </div>
    </session>
    <session class="list" v-if="active === 'mail'">
      <div class="list_item flex  j-between ">
        <div class="flex column">
          <div class="flex a-center">
            <span class="list_item_span">解答咨询获得邮票</span>
            <image class="iconfont" src="/static/svgs/stamp-icon.svg" />
            <span class="count">×1</span>
          </div>
          <span class="welfare_content">用户可在此跳转到解答室。</span>
        </div>
        <div class="exchange  flex center">
          <button @click="reply" class="flex center">去解答</button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex column">
          <div class="flex a-center">
            <span class="list_item_span">分享好友得邮票</span>
            <image class="iconfont" src="/static/svgs/stamp-icon.svg" />
            <span class="count">×1</span>
          </div>
          <span class="welfare_content">用户可在此跳转到「安利 Tell 给好友」页面。</span>
        </div>
        <div class="exchange flex center">
          <button open-type="share" class="flex center ">去安利
          </button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex column">
          <div class="flex a-center">
            <span class="list_item_span">订阅号领邮票</span>
            <image class="iconfont" src="/static/svgs/stamp-icon.svg" />
            <span class="count">×1</span>
          </div>
          <span class="welfare_content">进入客服会话后发送「订阅号」，按提示进行操作。关注订阅号后即可领取邮票。</span>
        </div>
        <div class="exchange flex center">
          <button @click="FocusSubscript" class="flex center ">去关注</button>
        </div>
      </div>
    </session>
    <Modal v-if="isShowModal" :title="modalTitle" :content="modalContent" :confirm="confirm" :sure="sure" @change="showModal"></Modal>
  </view>
</template>
<script>
import Modal from "@/components/Modal";

export default {
  components: {
    Modal
  }, 
  data() {
    return {
      active: "solution",
      isShowModal: false,
    };
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  },
  methods: {
    toggle(tab) {
      this.active = tab;
    },
    reply() {},
    async exchange() {
      let res = await this.$request.post("/task/exchange");
      wx.showModal({
        title: '提示',
        content: '确定要兑换？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
              if (res.success) {
                wx.hideLoading();
                wx.showToast({ title: "兑换成功" });
              } else {
                wx.showToast({ title: res.message ,icon: "none" });
              }
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    async pay() {
      wx.showLoading({
        title: "",
        mask: true
      });
      let orederRes = await this.$request.post("pay/order");
      if (orederRes.success) {
        let order = orederRes.data;
        wx.requestPayment({
          timeStamp: order.timeStamp,
          nonceStr: order.nonceStr,
          package: order.package,
          signType: order.signType,
          paySign: order.paySign,
          success(res) {
            wx.hideLoading();
            wx.showToast({ title: "兑换成功" });
          },
          fail(res) {
            wx.hideLoading();
            wx.showToast({ title: "支付失败", icon: "none" });
          }
        });
      }
    },
    FocusServer(){
      this.$router.push({
          query: { page: "FocusServer" },
          path: "/pages/webview/index"
      });
    },
    FocusSubscript(){
      this.$router.push({
          query: { page: "FocusSubscript" },
          path: "/pages/webview/index"
      });
    }
  },
  onShow(){
    const {
      currentRoute: { query }
    } = this.$router;
    this.active = query.active || 'solution';
  }  
};
</script>
<style lang="less" scope>
.list {
  padding: 0 60rpx;
  &_item {
    background-color: #ffffff;
    margin-top: 40rpx;
  }
  .count {
    color: #ffc86d;
    margin-left: 8rpx;
    font-weight: 600
  }
}
.list_item_span {
  font-size: 34rpx;
  color: #4d495b;
}
.exchange {
  margin-left: 40rpx;
  & button {
    box-sizing:border-box;
    border:#ffc86d 2rpx solid;
    border-radius:32rpx;
    height:64rpx;
    width:168rpx;
    font-size:28rpx;
    color:#2b2b2b;
    font-weight:600;
  }
}
.welfare_content {
  margin-top: 12rpx;
  color: #bdbdc0;
  font-size: 24rpx;
}

.iconfont {
  margin-left: 20rpx;
}
</style>

