<template>
  <view class="ticket flex column j-between">
    <session class="navigatabar flex">
      <div @click="toggleticket" :class="{borderColor:isActive}" class="navigatabar_item flex center">解忧券</div>
      <div @click="toggleMail" :class="{borderColor:!isActive}" class="navigatabar_item flex center">邮票</div>
    </session>
    <session class="list" v-if="list.length > 0">
      <div class="list_item flex j-between" v-for="(item,index) in list" :key="index">
        <div class="flex j-between center">
          <image style="margin-right:20rpx;" class="iconfont" :src="`/static/svgs/stamp-icon.svg`" />
          <div class="flex column">
            <span>{{item.message}}</span>
            <span class="ticket_day">{{item.createdAt | dayFormat}}</span>
          </div>
        </div>
        <span class="flex center">{{(item.count > 0) ? '+' : ' ' }} {{ item.count }}</span>
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
.noMail{
  height: 400rpx;
  margin: 80rpx
}
</style>

