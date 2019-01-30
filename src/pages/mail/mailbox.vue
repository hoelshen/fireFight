<template>
  <view class="app">
    <div class="mailbox_title" v-if="num">
      <button @click="openMail">
        {{num}} 封信正在邮寄的路上
      </button>
    </div>
    <div class="list" v-for="item in list" :key="item._id">
      <Envelope :mail="item.toMail" :isRead="item.isRead" :dialogId="item._id" v-if="userId == item.toUser._id">
      </Envelope>
      <Envelope :mail="item.fromMail" :isRead="item.isRead" :dialogId="item._id" v-else>
      </Envelope>
    </div>
  </view>

</template>
<script>
import Envelope from "@/components/Envelope";
export default {
  components: {
    Envelope
  },
  data() {
    return {
      num: 0,
      list: [],
      userId:"5c4e69293c870d5c223edd52"
    };
  },
  onShow() {
    this.getList();
    this.getCount();
  },
  methods: {
    openMail() {
      this.$router.push({ path: "/pages/mail/mailDay" });
    },
    async getCount() {
      const res = await this.$request.get("/dialog/way/count");
      this.num = res.data;
    },
    async getList() {
      const res = await this.$request.get("/dialog");
      this.list = res.data;
    }
  }
};
</script>
<style lang="less">
.mailbox_title {
  height: 92rpx;
  border-radius: 46px;
  margin: auto;
  padding: 0 40rpx;
  & button {
    border: 1px solid #ffc86d;
    border-radius: 23px;
    font-size: 28rpx;
  }
}
.mailText {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
