<template>
  <cover-view class="modal" @click="clickMask" v-if="isShowModal">
    <cover-view class="card flex column center" @tap.stop="stopkMask">
      <cover-view class="title">
        {{value.title}}
      </cover-view>
      <cover-view class="content">
        <cover-image  :src="value.imgSrc" alt="" />
      </cover-view>
      <cover-view class="btn">
        <button open-type="contact" :show-message-card="true" :send-message-img="imgUrl" :send-message-title="filterTitle" :session-from="`nickName'${user.aliasName}, 'avatarUrl':${user.aliasPortrait}`" class="sure darkButton" @click="enSure">{{value.sureButtonText}}</button>
      </cover-view>
    </cover-view>
  </cover-view>
</template>


<script>
export default {
  name: "Modal",
  data() {
    return {
      isShowModal: false,
      filterTitle: "",
      imgUrl: "",
      user: {},
      value: {}
    };
  },
  methods: {
    show(value) {
      const targetObj = {
        title: "",
        sureButtonText: "马上开始",
        type: "ALERT",
        imgSrc: ""
      }
      this.value = Object.assign(targetObj, value);

      const { user } = getApp().globalData;
      this.user.aliasName = user.aliasName;
      this.user.aliasPortrait = user.aliasPortrait;
      if (this.value.title === "关注服务号") {
        this.filterTitle = "关注服务号";
        this.value.imgSrc= "/static/jpg/server_guide.jpg"
        this.imgUrl =
          "https://cdn.tellers.cn/tell_v2/static/service_accout.jpg";
      }
      if (this.value.title === "关注订阅号") {
        this.filterTitle = "关注订阅号";
        this.value.imgSrc= "/static/jpg/subscript_guide.jpg"
        this.imgUrl =
          "https://cdn.tellers.cn/tell_v2/static/subscribe_accout.jpg";
      }
      if (this.value.title === "如何加群") {
        this.filterTitle = "加群";
        this.value.imgSrc= "/static/jpg/join_group_guide.jpg"
        this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/join_group.jpg";
      }
      this.isShowModal = true;
    },
    enSure() {
      this.isShowModal = false;
    },
    clickMask() {
      this.isShowModal = false;
      this.imgUrl = "";
      this.value = {
        title: "",
        sureButtonText: "",
        type: "",
        imgSrc: ""
      };
    },
    stopkMask() {}
  }
};
</script>
<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(77, 73, 91, 0.3);
  z-index: 99;
}
.card {
  width: 630rpx;
  max-height: 598rpx;
  min-height: 402rpx;
  background-color: #ffffff;
  border-radius: 4rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
}
.title {
  margin-top: 60rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #4d495b;
}
.content {
  margin: 40rpx 40rpx 20rpx 40rpx;
  white-space: normal;
  line-height: 52rpx;
  font-size: 28rpx;
  text-align: center;
  color: #4d495b;
  & image {
    width: 550rpx;
    height: 244rpx;
  }
}
.confirm {
  margin-top: 0;
  margin-bottom: 0;
}

.sure {
  padding: 0 130rpx;
  line-height: 92rpx;
}
</style>
