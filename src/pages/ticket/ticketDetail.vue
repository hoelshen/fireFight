<template>
  <view class="ticket flex column j-between">
    <session class="navigatabar flex">
      <div @click="toggleticket" :class="{borderColor:isActive}" class="navigatabar_item flex center">解忧券</div>
      <div @click="toggleMail" :class="{borderColor:!isActive}" class="navigatabar_item flex center">邮票</div>
    </session>
    <session class="list" v-if="list.length > 0">
      <div class="list_item flex j-between" v-for="(item,index) in list" :key="index">
        <div class="flex j-between center">
          <image class="iconfont ifImage" :src="`/static/svgs/stamp-icon.svg`" />
          <div class="flex column">
            <span class="message">{{item.message}}</span>
            <span class="ticket_day">{{item.createdAt | dayFormat}}</span>
          </div>
        </div>
        <span class="count flex center">{{(item.count > 0) ? '+' : ' ' }} {{ item.count }}</span>
      </div>
    </session>
    <div v-if="list.length === 0" class=" noMail flex center">
          暂无明细
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      active: "ticket",
      isActive: true,
      list: []
    };
  },
  onShow() {
    const { query } = this.$router.currentRoute;
    this.active = query.active || "ticket";
    if (this.active === "stamp") {
      this.isActive = !this.isActive;
    }
    this.getList();
  },
  methods: {
    toggleticket() {
      this.active = "ticket";
      this.isActive = !this.isActive;
      this.getList();
    },
    toggleMail() {
      this.active = "stamp";
      this.isActive = !this.isActive;
      this.getList();
    },
    async getList() {
      let res;
      if (this.active === "ticket") {
        res = await this.$request.get("/record/ticket"); //解忧券
      }
      if (this.active === "stamp") {
        res = await this.$request.get("/record/stamp"); //邮票
      }
      this.list = res.data;
    }
  },
  computed: {
    tickType() {}
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
<style lang="less" scope>
page{
  background-color: #ffffff;
}
.list {
  border: 1px solid #ffffff;
  width: 100%;
  height: auto;
  &_item {
    width: 630rpx;
    height: 136rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    margin-left: 60rpx;
    & .message{
      font-size: 34rpx;
    }
    & .ticket_day {
      color: #a9a9a9;
      font-size:22rpx;
      margin-top:12rpx;
    }
  }
}
.ifImage{
  margin-right:20rpx;
  top:-16rpx;
  position:relative;
}
.noMail{
  height: 400rpx;
  margin: 80rpx
}
.count{
  font-size: 34rpx;
  font-weight: 600
}
</style>

