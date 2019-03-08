<template>
  <view class="ticket flex column j-between">
    <session class="list"  v-for="item in list" :key="item._id">
      <div class="list_item flex  j-between ">
        <div class="flex">
          <image class="iconfont" :src="item.defaultImgUrl" />
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">{{item.name}}</span>
            </div>
            <span class="welfare_content">{{item.createdAt}} </span>
          </div>
        </div>
        <div class="exchange  flex center">
          <div >
              <button v-if="item.status === 'WEARED' " :disabled="true" class="flex center">佩戴中</button>
              <button v-if="item.status === 'CAN_WEAR' "  @click="changeBadge" class="flex center">佩戴</button>
              <button v-if="item.status === 'CAN_RECEIVE' " @click="haveBadge" class="flex center">领取</button>
              <button v-if="item.status === 'CAN_NOT_RECEIVE' "  disabled class="flex center">{{item.currentLikeCount}}/{{item.requireLikeCount}}</button>
          </div>
        </div>
      </div>
    </session>
    <Modal ref="mymodal"></Modal>
  </view>
</template>
<script>
import Modal from "@/components/Modal";

export default {
  components: {
    Modal
  },
  data() {
    return {
      active: "solution",
      isShowModal: false,
      list:[],
      modal: {
        title: "",
        content: "",
        confirm: "",
        type: "",
        sure: ""
      }
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
    toShare() {
      this.$router.push({ path: "/pages/share/share" });
    },
    async haveBadge() {
      let res = await this.$request.post(`/badge/:${id}`);

    },
    async changeBadge(){
      let res = await this.$request.put(`/badge/:${id}`);
    },
    async getList(){
      let res = await this.$request.get("/badge");
      this.list = res.data.list;
      console.log('res', res.data)
    }
  },
  onShow() {
    const { currentRoute: { query } } = this.$router;
    this.active = query.active || "solution";
    this.getList();
  }
};
</script>
<style lang="less" scope>
page {
  background-color: #ffffff;
}
.list {
  padding: 0 40rpx;
  &_item {
    background-color: #ffffff;
    margin-bottom: 40rpx;
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
.exchange {
  margin-left: 40rpx;
  & button {
    box-sizing: border-box;
    border: #ffc86d 2rpx solid;
    border-radius: 32rpx;
    height: 64rpx;
    width: 168rpx;
    font-size: 28rpx;
    color: #2b2b2b;
    font-weight: 600;
  }
}
.welfare_content {
  margin-top: 12rpx;
  color: #bdbdc0;
  font-size: 24rpx;
}

.iconfont {
  margin-right: 20rpx;
}

.desc{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #BDBDC0;
  font-size: 28rpx;
  padding: 60rpx;
}
</style>

