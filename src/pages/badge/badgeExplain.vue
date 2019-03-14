<template>
  <div class="app flex column j-between">
    <session >
      <div class="head">
          每日<span class="bold">收取到的咨询</span>以及<span class="bold">可解答次数</span>与你持有的徽章有关，具体关系如下：
      </div>
    </session>

    <session class="list_notice">
      <div class="container flex center">
          <div class="containerBadge">持有徽章</div>
          <div class="containerBadge">每日收取</div>
          <div class="containerBadge">每日可解答</div>
      </div>
      <div :class="key % 2 === 0? 'bg' : '' "  class="container flex center " v-for="(item,key) in list" :key="item._id">
          <div  class="containerBadge flex center">
            <image class="iconfont" :src="item.imgUrl" />
            <span>{{item.name}}</span>
          </div>
          <div  class="containerBadge flex center">{{item.mailboxLimit}}</div>
          <div  class="containerBadge flex center">{{item.replyLimit}}</div>
      </div>
    </session>


    <session>
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

.app{
  background-color: #ffffff;
}

.head{
  font-size: 28rpx;
  color: #4d495b;
  margin: 40rpx 60rpx 0rpx;
}

.list_notice{
  margin: 0 40rpx;
  font-weight: 400;
  font-size: 28rpx;
}
.container{
    width:666rpx;
    height:92rpx;
    border-radius:4rpx;
    border:2rpx solid rgba(189,189,192,0.15);
}
.bg{
  background:rgba(189,189,192,0.15);
}
.containerBadge{
  width: 222rpx;
  text-align:center;
}
.bold{
  font-weight: bold
}
.foot{
  font-size: 28rpx;
  color: #bdbdc0;
  margin: 150rpx 60rpx 60rpx;
}
.iconfont{
  margin-right: 20rpx;
}
</style>

