<template>
  <view>
    <div class="mailbox_title">
      <button @click="openMail">
        {{num}}封信正在路上
      </button>
    </div>
    <div>
      <session class="list">
        <div
          class="list_item flex column j-between"
          v-for="(item,index) in list"
          @click="show(index)"
          :key="index"
        >
          <div class="list_item-day flex center">{{ item.createdAt }}</div>
          <div class="list_item-sendName flex wrap j-between">
            <div class="flex column j-between">
              <div class="list_item-receiverName">
                <span class="list_item-receiverNameSpan">{{item.lastMail || ""}}</span>
                <span>收</span>
              </div>
              <div class="list_item-content ">
                <text class="mailText">测试字数非常多多度哦是的</text>
              </div>
            </div>
            <div class="flex">
              <img
                class="mail-svg"
                src="/static/svgs/mail.svg"
                alt=""
              >
            </div>
          </div>

          <div class="list_item-sendName flex  j-between">
            <span>{{item.isRead ? "已" : "未"}}读</span>
            <span>{{item.targetUser._id}}</span>
          </div>
        </div>
      </session>
    </div>
  </view>

</template>
<script>
export default {
  data() {
    return {
      num: 1,
      list: []
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    dayFormat(value) {
      return this.$day(value).format("YYYY/MM/DD");
    },
    async getList() {
      const res = await this.$request.get("/dialog");
      this.list = res.data;
      this.list.forEach(element => {
        if (element.createdAt) {
          element.createdAt = this.dayFormat(element.createdAt);
        }
      });
    },
    openMail() {
      this.$router.push({ path: "/pages/mailbox/mailDay" });
    },
    show(index) {
      console.log("index: ", index);
    }
  }
};
</script>
<style lang="less">
.mailbox_title {
  width: 266rpx;
  height: 92rpx;
  border-radius: 23px;
  margin: auto;
  padding-top: 40rpx;
  & button {
    border: 1px solid #ff4d6b;
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
.list_item-day {
  margin-top: 5rpx;
  color: #a9a9a9;
  margin-bottom: 20rpx;
}
</style>
