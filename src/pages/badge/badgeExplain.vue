<template>
  <div class="app flex column">
    <session class="list_notice">
      <div class="head">
          每日收取到的咨询以及可解答次数与你持有的徽章有关，具体关系如下：
      </div>
    </session>

    <session class="list_notice">
      <div class="notice flex">
          <div>持有徽章</div>
          <div>每日收取</div>
          <div>每日可解答</div>

      </div>
    </session>


    <session class="list_notice">
      <div class="foot">
          温馨提示：带有「可额外解答的咨询」标记的，收取和解答次数不受该规则限制。  
      </div>
    </session>
  </div>
</template>
<script>

export default {
  data() {
    return {
      list:[],
      sunflower:{},
    };
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  },
  methods: {
    async getList(){
      let res = await this.$request.get("/badge");
      this.list = res.data.list;
      this.sunflower = res.data.sunflower;
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.getList();
  }
};
</script>
<style lang="less" scope>
page {
  background-color: #ffffff;
}
.list {
  margin: 40rpx 40rpx 0;
  &_item {
    background-color: #ffffff;
    margin-top:20rpx;
  }
  .count {
    color: #ffc86d;
    margin-left: 8rpx;
    font-weight: 600;
  }
}
.list_item_span {
  font-size: 32rpx;
  color: #4d495b;
}
.badge_weared{
  border-color:rgba(255, 200, 109, .5);
  background-color: #ffffff !important; 
}
.badge_noReceive{
  border-color: #bdbdc0 !important;
  background-color: #ffffff !important; 
}
.badge_content {
  margin-top: 12rpx;
  color: #bdbdc0;
  font-size: 24rpx;
}
.head{
  font-size: 24rpx;
  color: #bdbdc0;
  margin: 40rpx 60rpx 40rpx;
}

.foot{
  font-size: 24rpx;
  color: #bdbdc0;
  margin: 0rpx 40rpx 60rpx;
}
</style>

