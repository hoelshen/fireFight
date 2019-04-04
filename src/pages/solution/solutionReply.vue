<template>
  <view class="app box">
    <div
      v-if="isSpecial"
      style="margin-top:40rpx;"
      class="flex j-center"
    >
      <div>
        <span class="tagName">这封信只投递给了你一个人</span>
      </div>
    </div>
    <Mail :mail="mail" />
    <Mail
      v-if="reMail"
      :mail="reMail"
    />
    <Reply
      v-if="canReply"
      :id="id"
      :target="mail.aliasName"
      tag="solution"
      @submit="submit"
    />
    <div
      v-if="isReplyButton"
      class="flex column center showReply_button"
    >
      <button
        :disabled="isDisable"
        class="reply_button flex center"
        @click="showReply"
      >
        回信
      </button>
      <span class="replay_text">今天还可以回复 {{ replyCount }} 次</span>
    </div>
  </view>
</template>


<script>
import Mail from "@/components/Mail";
import Reply from "@/components/Reply";
import shareMix from "@/mixins/mixin";
export default {
  components: {
    Mail,
    Reply
  },
  mixins: [shareMix],
  data() {
    return {
      id: "",
      mail: {},
      reMail: {},
      replyCount: 1,
      canReply: false,
      isReplyButton: false,
      isDisable:false,
      isSpecial: false
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
        this.isReplyButton = false;
      } else {
        this.canReply = false;
        this.isReplyButton = true;
        //判断有没有回信次数
        this.isDisable = this.replyCount > 0 ? false : true;
      }
    },
    showReply() {
      this.canReply = true;
      this.isReplyButton = false;
    },
    submit(){
    }
  },
  async onShow() {
    const { currentRoute: { query } } = this.$router;
    this.id = query.id;
    this.isSpecial = (query.isSpecial === 'true' );
    const { replyCount } = getApp().globalData;
    this.replyCount = replyCount;
    this.getContent(this.id);
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
.tagName{
  height: 63rpx;
  background-color: rgba(189, 189, 192, 0.05);
  border-radius: 29rpx;
  padding:8rpx 40rpx ;
  font-size: 24rpx;
  color: #BDBDC0;

}
</style>
