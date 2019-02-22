<template>
  <view class="app list">
    <Mail :mail="item" v-for="item in list" :key="item._id"></Mail>
    <Mail :mail="replyMail" v-if="replyMail"></Mail>
    <Reply v-if="isReply" :target="target" tag="mail" :id="id"></Reply>
    <div class="flex column center showReply_button" v-if="!isReply && !isFromSystem">
      <button :disabled="isDisabled" class="reply_button" @click="showReply"> 回信</button>
      <span class="replay_text">需要使用 1 张邮票</span>
    </div>
    <div class="btns flex column center" v-if="isFromSystem">
      <button class="darkButton btn" @click="toConsulting"> 去咨询</button>
      <button class="lightButton btn" @click="toSolution"> 去解答</button>
    </div>
    <Modal v-if="isShowModal" :type="type" :title="modalTitle" :content="modalContent" :confirm="confirm" :sure="sure" @change="showModal"></Modal>
  </view>
</template>


<script>
import Mail from "@/components/Mail";
import Reply from "@/components/Reply";
import Modal from "@/components/Modal";

export default {
  components: {
    Mail,
    Reply,
    Modal
  },
  data() {
    return {
      id: "",
      userId: "",
      list: [],
      replyMail: null,
      target: {},
      stampCount: 0,
      isReply: false,
      isDisabled: true,
      isFromSystem: false,
      isShowModal: false,
      modalTitle: "",
      modalContent: "",
      confirm: "",
      sure: ""
    };
  },
  methods: {
    async getContent(id) {
      let res = await this.$request.get(`/dialog/detail/${id}`);
      let dialog = res.data;
      let mailList = dialog.mailList;
      let lastMail = mailList[mailList.length - 1];
      this.list = mailList;
      this.target = lastMail.aliasName;
      this.isFromSystem = dialog.fromSystem;
      setTimeout(() => {
        wx.pageScrollTo({ scrollTop: 10000 });
      }, 1000);
      this.getReplyMail(dialog, lastMail._id);
    },
    getReplyMail(dialog, lastMailId) {
      this.$request.get(`/mail/detail/${lastMailId}/reply`).then(res => {
        if (res.data) {
          this.replyMail = res.data;
          this.isDisabled = true;
        } else {
          this.isDisabled = dialog.fromUser === this.userId ? true : false;
        }
      });
    },
    showReply() {
      if (this.stampCount === 0) {
        this.modalTitle = "邮票不足";
        this.modalContent = "需要消耗 1 邮票，当前余额不足";
        this.confirm = "获取邮票";
        this.type = "CONFIRM";
        this.isShowModal = true;
        this.sure = "好的";
        return false;
      }
      this.isReply = true;
    },
    showModal() {
      this.isShowModal = false;
      this.modalTitle="";
      this.modalContent="";
      this.confirm="";
      this.type="";
      this.sure="";
    },
    toSolution() {
      const { user } = getApp().globalData;
      const status = this.$checkAuth(user);
      if (status) {
        if (!user.becomeAnswererAt) {
          return this.$router.push({
            query: { active: "solverDetail" },
            path: "/pages/detail/index"
          });
        }
        return this.$router.push({ path: "/pages/solution/solutionRoom" });
      }
    },
    toConsulting() {
      this.$router.push({ path: "/pages/consultingBox/consultingBox" });
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.id = query.id;
    this.getContent(this.id);
    const { user } = getApp().globalData;
    this.userId = user._id;
    this.stampCount = user.stampCount;
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
<style lang="less" scoped>
.mail {
  width: 630rpx;
  min-height: 620rpx;
  margin: 40rpx 60rpx 40rpx 60rpx;
  border-radius: 4rpx;
}

.reply_button {
  margin-top: 16rpx;
  border-radius: 23px;
  width: 316rpx;
  height: 92rpx;
  color: #ffffff;
  border: 1 solid #a9a9a9;
  background-color: #ffc86d;
}
.replay_text {
  color: #a9a9a9;
  font-size: 24rpx;
  margin-top: 24rpx;
}

.showReply_button {
  margin-bottom: 60rpx;
}
.btns {
  padding-bottom: 50rpx;
  .btn {
    width: 316rpx;
    height: 92rpx;
    margin-bottom: 40rpx;
  }
}
</style>

