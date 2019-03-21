<template>
  <div class="errors">
    <div class="total flex center">
      共查询到 {{ data.length }} 条结果
    </div>
    <div
      v-for="item in data"
      :key="item._id"
      class="line"
    >
      {{ item.createdAt | time }} - {{ item.message }}
      <br>
    </div>
  </div>
</template>

<script>
import day from "../../utils/day";

export default {
  filters: {
    time: function(value) {
      return day(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    async callFunction(query) {
      let res = await wx.cloud.callFunction({
        name: "errorHandler",
        data: query
      });
      return res.result.data;
    },
    async getAllBackErrors(id) {
      let res = await this.callFunction({
        env: "tell-dev-2019"
      });
      this.data = res;
    },
    async getBackErrorsByMessage(msg) {
      let res = await this.callFunction({
        doc: "back-errors",
        rule: {
          message: msg
        }
      });
      //console.log(res);
      this.data = res;
    }
  },
  onLoad() {
    wx.cloud.init();
  },
  onShow() {
    //this.getAllBackErrors();
    this.getBackErrorsByMessage("信件未找到");
  }
};
</script>

<style lang="less" scoped>
.errors {
  padding: 30rpx;
}
.total {
  font-size: 40rpx;
  padding: 20rpx;
}
.line {
  margin-bottom: 20rpx;
}
</style>
