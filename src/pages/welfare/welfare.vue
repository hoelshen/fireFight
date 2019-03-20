<template>
  <view class="ticket flex column j-between">
    <session class="navigatabar flex j-around">
      <div @click="toggle('TICKET')" :class="active == 'TICKET' ? 'borderColor' :''" class="navigatabar_item   flex center">我要解忧券</div>
      <div @click="toggle('STAMP')" :class="active == 'STAMP' ? 'borderColor' :''" class="navigatabar_item  flex center">我要邮票</div>
    </session>
    <session class="list" v-if="active === 'TICKET'">
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image class="iconfont" src="/static/svgs/ticket.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">购买解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">使用 9.9 元人民币购买 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button @click="toPay" class="flex center">购买</button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex">
          <image class="iconfont" src="/static/svgs/ticket.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">邮票兑换解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">使用10张邮票兑换 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button @click="toExchange" class="flex center">兑换</button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image class="iconfont" src="/static/svgs/ticket.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">关注服务号得解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">关注后可免费领取 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange flex center">
          <button @click="FocusServer" class="flex center ">去关注
          </button>
        </div>
      </div>

      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image class="iconfont" src="/static/svgs/ticket.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">关注订阅号得解忧券</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">关注后可免费领取 1 张解忧券 </span>
          </div>
        </div>
        <div class="exchange flex center">
          <button @click="FocusSubscript" class="flex center ">去关注</button>
        </div>
      </div>

      <div class="list_item flex  j-between " v-for="item in tasks" :key="item._id">
        <div class="flex ">
          <image class="iconfont" src="/static/svgs/stamp-icon.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">{{item.name}}</span>
              <span class="count">×{{item.rewardCount}}</span>
            </div>
            <span class="welfare_content">{{item.tipsText}}</span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button @click="doTask(item)" :disabled="item.isReceived" class="flex center">{{item.isReceived ? '已完成' : '去领取'}} </button>
        </div>
      </div>

      <div class="desc box flex center">
        解忧券最大持有量为 3 张，超出部分自动销毁
      </div>
    </session>
    <session class="list" v-if="active === 'STAMP'">
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image class="iconfont" src="/static/svgs/stamp-icon.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">解答咨询得邮票</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">解答和被感谢均可获得邮票 </span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button @click="toReply" class="flex center">去解答</button>
        </div>
      </div>
      <div class="list_item flex  j-between ">
        <div class="flex ">
          <image class="iconfont" src="/static/svgs/stamp-icon.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">分享 Tell 得邮票</span>
              <span class="count">×1</span>
            </div>
            <span class="welfare_content">分享好友加入 Tell 可获得邮票 </span>
          </div>
        </div>
        <div class="exchange flex center">
          <button @click="toShare" class="flex center ">去分享
          </button>
        </div>
      </div>
      <div class="list_item flex  j-between " v-for="item in tasks" :key="item._id">
        <div class="flex ">
          <image class="iconfont" src="/static/svgs/stamp-icon.svg" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">{{item.name}}</span>
              <span class="count">×{{item.rewardCount}}</span>
            </div>
            <span class="welfare_content">{{item.tipsText}}</span>
          </div>
        </div>
        <div class="exchange  flex center">
          <button @click="doTask(item)" :disabled="item.isReceived" class="flex center">{{item.isReceived ? '已完成' : '去领取'}} </button>
        </div>
      </div>
    </session>

    <Modal ref="mymodal"></Modal>
    <ImgModal ref="myImgmodal"></ImgModal>

  </view>
</template>
<script>
import Modal from "@/components/Modal";
import ImgModal from "@/components/ImgModal";

export default {
  components: {
    Modal,
    ImgModal
  },
  data() {
    return {
      active: "TICKET",
      isShowModal: false,
      modal: {
        title: "",
        content: "",
        confirmButtonText: "",
        type: "",
        sureButtonText: ""
      },
      tasks: []
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
      if (this.active != tab) {
        this.active = tab;
        this.tasks = [];
        this.getTask();
      }
    },
    toReply() {
      this.$router.push({ path: "/pages/solution/solutionRoom" });
    },
    toShare() {
      this.$router.push({ path: "/pages/share/share" });
    },
    async toExchange() {
      let res = await this.$request.post("/task/exchange");
      wx.showModal({
        title: "提示",
        content: "确定要兑换？",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: result => {
          if (result.confirm) {
            if (res.success) {
              wx.hideLoading();
              wx.showToast({ title: "兑换成功" });
            } else {
              wx.showToast({ title: res.message, icon: "none" });
            }
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    async toPay() {
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
            wx.showToast({ title: "购买成功" });
          },
          fail(res) {
            wx.hideLoading();
            wx.showToast({ title: "支付失败", icon: "none" });
          }
        });
      }
    },
    FocusServer() {
      this.$refs.myImgmodal.show({
        title: "关注服务号",
        type: "ALERT",
        sureButtonText: "马上开始"
      });
    },
    FocusSubscript() {
      this.$refs.myImgmodal.show({
        title: "关注订阅号",
        type: "ALERT",
        sureButtonText: "马上开始"
      });
    },
    getTask() {
      this.$request.get(`/task/ad?type=${this.active}`).then(res => {
        this.tasks = res.data;
      });
    },
    doTask(task) {
      if (task.isReceived) return;
      wx.navigateTo({
        url: `/pages/webview/index?url=${task.url}&title=${
          task.name
        }&type=welfare&id=${task._id}`
      });
    },
    getTips() {
      this.$request.get("/tips").then(res => {
        const { lastTips } = res.data;
        this.unreadMessages = res.data.unreadMessages;
        if (lastTips) {
          this.$refs.mymodal.show({
            title: lastTips.title,
            content: lastTips.content,
            type: lastTips.type,
            confirmButtonText: lastTips.confirmButtonText
          });
        }
      });
    },
    taskHandle(status) {
      if (!status) return;

      if (status === "failedTime") {
        this.$refs.mymodal.show({
          title: "体验失败",
          content: "抱歉，体验时间过短，无法获得奖励。请重试。"
        });
      }
      // this.$refs.mymodal.show({
      //     title: "体验失败",
      //     content: "过程中断，请确保体验没有跳转到其它页面。",
      // });
      getApp().globalData.taskState = "";
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.active = query.active || this.active;
    const { taskState } = getApp().globalData;
    this.getTips();
    this.getTask();
    this.taskHandle(taskState || "");
  }
};
</script>
<style lang="less" scope>
page {
  background-color: #ffffff;
}
.list {
  padding: 0 40rpx;
  &_item {
    background-color: #ffffff;
    margin-bottom: 40rpx;
    margin-top: 20rpx;
  }
  .count {
    color: #ffc86d;
    margin-left: 8rpx;
    font-weight: 600;
  }
}
.list_item_span {
  font-size: 32rpx;
  color: #4d495b;
}
.exchange {
  margin-left: 40rpx;
  & button {
    box-sizing: border-box;
    border: #ffc86d 2rpx solid;
    border-radius: 32rpx;
    height: 64rpx;
    width: 168rpx;
    font-size: 28rpx;
    color: #2b2b2b;
    font-weight: 600;
  }
}
.welfare_content {
  margin-top: 12rpx;
  color: #bdbdc0;
  font-size: 24rpx;
}

.iconfont {
  margin-right: 20rpx;
}

.desc {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #bdbdc0;
  font-size: 28rpx;
  padding: 60rpx;
}

button[disabled] {
  color: rgba(77, 73, 91, 0.5) !important;
  border-color: rgba(255, 200, 109, 0.5) !important;
  background-color: #ffffff !important;
}
</style>

