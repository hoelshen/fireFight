<template>
  <view class="app box">
    <Mail :mail="mail"></Mail>
    <Mail v-if="reMail" :mail="reMail"></Mail>
    <Reply v-if="canReply" :target="mail.aliasName" tag="solution" :id="id" @submit="submit"></Reply>
    <div v-if="isDisable" class="flex column center showReply_button">
      <button :disabled="!isDisable" class="reply_button flex center" @click="showReply">回信</button>
      <span class="replay_text">今天还可以回复 {{replyCount}} 次</span>
    </div>
  </view>
</template>


<script>
import Mail from "@/components/Mail";
import Reply from "@/components/Reply";
export default {
  components: {
    Mail,
    Reply
  },
  data() {
    return {
      id: "",
      mail: {},
      reMail: {},
      replyCount: 1,
      canReply: false,
      isDisable:false,
    };
  },
  methods: {
    async getContent(id) {
      let res = await this.$request.get(`/mail/detail/${id}`);
      let Res = await this.$request.get(`/mail/detail/${id}/reply`);
      this.mail = res.data;
      this.reMail = Res.data;
      //如果有回过信件 不显示回信框和回信按钮
      if(this.reMail){
        this.canReply = false;
        this.isDisable = false;
      } else {
        this.canReply = false;
        //判断有没有回信次数
        this.isDisable = this.replyCount > 0 ? true : false;
      }
    },
    showReply() {
      this.canReply = true;
      this.isDisable = false;
    },
    submit(){
      // this.canReply = false;
    }
  },
  async onShow() {
    const { currentRoute: { query } } = this.$router;
    this.id = query.id;
    const { replyCount } = getApp().globalData;
    this.replyCount = replyCount;
    this.getContent(this.id);
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
<style lang="less">
.showReply_button {
  color: #ffffff;
  margin-bottom: 60rpx;
}
.replay_text {
  color: #a9a9a9;
  font-size: 24rpx;
  margin-top: 24rpx;
}
.reply_button {
  margin-top: 60rpx;
  border-radius: 23px;
  width: 316rpx;
  line-height: 92rpx;
  color: #ffffff;
  border: 1 solid #a9a9a9;
  background-color: #ffc86d;
  font-size: 28rpx;
}
</style>
