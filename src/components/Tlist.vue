<template>
  <session class="list">
    <div class="list_item flex column j-between" v-for="(item,index) in list" @click="show(index)" :key="index">
      <span class="list_item-day flex center">{{ item.createdAt | dayFormat }}</span>
      <div v-if="item.toUser._id === id">
        <div class="list_item-sendName flex wrap j-between">
          <div class="flex column j-between">
            <div class="list_item-receiverName">
              <span class="list_item-receiverNameSpan">{{item.toUser.aliasName || ""}}</span>
              <span>收</span>
            </div>
            <div class="list_item-content ">
              <text class="mailText">{{item.toMail.content}}</text>
            </div>
          </div>
          <div class="flex">
            <img class="mail-svg" src="/static/svgs/stamp.svg" alt="">
          </div>
        </div>
        <div class="list_item-sendName flex  j-between">
          <span>{{item.isRead ? "已" : "未"}}读</span>
          <span>{{item.fromUser.aliasName}}</span>
        </div>
      </div>
      <div v-else>
        <div class="list_item-sendName flex wrap j-between">
          <div class="flex column j-between">
            <div class="list_item-receiverName">
              <span class="list_item-receiverNameSpan">{{item.fromUser.aliasName || ""}}</span>
              <span>收</span>
            </div>
            <div class="list_item-content ">
              <text class="mailText">{{item.fromMail.content}}</text>
            </div>
          </div>
          <div class="flex">
            <img class="mail-svg" src="/static/svgs/mail.svg" alt="">
          </div>
        </div>
        <div class="list_item-sendName flex  j-between">
          <span>{{item.isRead ? "已" : "未"}}读</span>
          <span>{{item.toUser.aliasName}}</span>
        </div>
      </div>
    </div>
  </session>

</template>
<script>
export default {
  props: {
    list: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      id: ""
    };
  },
  onShow() {
    const { user } = getApp().globalData;
    this.id = user._id;
    console.log("user: ", user);
  },
  methods: {
    show(index) {
      const id = this.list[index]._id;
      this.$router.push({
        query: { id: id },
        path: "/pages/mail/mailDetail"
      });
      console.log("index: ", index);
    }
  },
  mounted() {},
  watch: {
    list() {
      console.log("this.list: ", this.list);
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../styles/mail.less);
.list_item-day {
  color: #a9a9a9;
  margin-bottom: 20rpx;
  background-color: #fffefb;
  padding-bottom: 20rpx;
}
</style>

