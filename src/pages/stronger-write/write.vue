<template>
  <div class="page flex column">
    <div class="intro">
      <div class="title bold">
        说说你最想要感恩的一段艰难经历吧
      </div>
      <div class="desc">
        对你造成了多大的困扰？获得谁的帮助？最终是否走了出来？觉得自己取得了什么收获？
      </div>
    </div>

    <div class="content grow">
      <textarea :value="content" class="txt" name="" placeholder="50字以上" maxlength="5000" auto-height @input="onContentChange"></textarea>
    </div>

    <div class="btns  flex center column">
      <button class="flex center" hover-class="active" @tap="send">发布</button>
      <div class="desc flex center">
        将发布到
        <span class="em">大家的故事</span>（可能有一定时延）
      </div>
    </div>
  </div>
</template>

<script>
import MailCard from "@/components/story.vue";
import sRequest from "@/utils/stronger-request";
export default {
  mpType: "page",
  components: {
    MailCard
  },
  data() {
    return {
      content: ""
    };
  },
  onShareAppMessage: function(res) {
    let id = getApp().globalData.options.query._id;
    let shareImgs = [
      "https://cdn.tellers.cn/stronger/share-app.png",
      "https://cdn.tellers.cn/stronger/share-app-2.png"
    ];
    let index = Math.floor(Math.random() * shareImgs.length);
    return {
      title: "分享了一段经历",
      path: `pages/stronger-home/index?refer=${userId}`,
      imageUrl: shareImgs[index]
    };
  },
  onLoad: function(options) {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},

  methods: {
    onContentChange(e) {
      this.content = e.mp.detail.value;
    },
    async send(e) {
      // 字数检测
      wx.showLoading({
        title: "",
        mask: true
      });
      let content = this.content.trim();
      if (content.length < 50) {
        return wx.showToast({ icon: "none", title: "认真的讲诉更容易获得解答，多谢几句吧" });
      }
      if (content.length > 5000) {
        return wx.showToast({
          icon: "none",
          title: "请控制在5000字以内"
        });
      }
      await sRequest.post("/story/write", {
        content: this.content
      });
      wx.hideLoading();
      wx.reLaunch({
        url: "/pages/stronger-mail/index?back=1"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

.intro {
  font-size: 28rpx;
  padding: 50rpx;
  flex-shrink: 0;
  color: #929292;
  background: linear-gradient(-45deg, #2a2828, #6d6d6d);
  line-height: 2;
  .title {
    font-size: 40rpx;
    margin-top: 20rpx;
    color: #ffc75d;
  }
}

.content {
  position: relative;
  background: #fff;
  font-size: 30rpx;
  padding: 50rpx;
  overflow-y: scroll;
  .txt {
    width: 650rpx;
    height: 100%;
    min-height: 600rpx;
    background: #fff;
    line-height: 1.8;
    word-break: normal;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
}

.btns {
  margin: 10rpx 30rpx 60rpx 30rpx;
  font-size: 32rpx;
  button {
    width: 516rpx;
    height: 100rpx;
    background: #353535;
    color: #fff;
    &.active {
      background: lighten(#353535, 5%);
    }
    &[disabled] {
      background: #fff;
      border: 1px solid #bbb;
    }
  }
  .desc {
    font-size: 24rpx;
    margin: 20rpx 0;
    .em {
      color: #ffc75d;
    }
  }
}
</style>
