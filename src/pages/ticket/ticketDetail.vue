<template>
  <view class="ticket flex column j-between">
    <session class="navigatabar flex ">
      <div
        @click="toggleSolution"
        :class="{borderColor:isActive}"
        class="navigatabar_item  flex center"
      >解忧券</div>
      <div
        @click="toggleMail"
        :class="{borderColor:!isActive}"
        class="navigatabar_item flex center"
      >邮票</div>
    </session>
    <session class="list">
      <div
        class="list_item flex  j-between "
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="flex j-between center">
          <div
            class="iconfont icon-gift"
            style="margin-right:20rpx;"
          ></div>
          <div class="flex column">
            <span>{{item.title}}</span>
            <span class="ticket_day">{{item.day}}</span>
          </div>
        </div>
        <span class="flex center">{{item.num}}</span>
      </div>
    </session>
  </view>

</template>
<script>
export default {
  data() {
    return {
      active: "solution",
      outboxList: [],
      inboxList: [],
      isActive: true,
      list: [
        {
          title: "烦恼咨询",
          day: "2019/1/19",
          num: 2
        },
        {
          title: "连续签到5天奖励",
          day: "2019/1/19",
          num: 9
        }
      ]
    };
  },
  onShow() {
    const { query } = this.$router.currentRoute;
    this.active = query.active || "solution";
    if (this.active === "mail") {
      this.isActive = !this.isActive;
    }
    this.getList();
  },
  methods: {
    toggleSolution() {
      this.active = "solution";
      this.isActive = !this.isActive;
      this.getList();
    },
    toggleMail() {
      this.active = "mail";
      this.isActive = !this.isActive;
      this.getList();
    },
    async getList() {
      let res;
      if (this.active === "solution") {
        // res = await this.$request.get("/mail/mine/outbox"); //解忧券
      }
      if (this.active === "mail") {
        // res = await this.$request.get("/mail/mine/inbox"); //邮票
      }
      // this.list = res.data;
    }
  }
};
</script>
<style lang="less" scope>
.navigatabar {
  width: 630rpx;
  height: 92rpx;
  margin: 20rpx 60rpx 20rpx 60rpx;
  border-radius: 2px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  background-color: #ffffff;
  align-items: flex-end;
  justify-content: space-around;

  &_item {
    width: 162rpx;
    height: 66rpx;
    align-items: flex-end;
    border-style: solid;
    border-color: #ffffff;

    &.borderColor {
      border-color: #ffffff #ffffff #ffc86d #ffffff;
    }
  }
}
.list {
  margin-left: 20rpx;
  border: 1px solid #ffffff;
  width: 100%;
  height: auto;
  &_item {
    width: 630rpx;
    height: 136rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
    margin-left: 60rpx;
    & .ticket_day {
      color: #a9a9a9;
    }
  }
}
</style>

