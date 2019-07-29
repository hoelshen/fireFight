<template>
  <cover-view
    v-if="isShowModal"
    class="modal"
    @click="clickMask"
  >
    <cover-view
      class="card flex column center"
      @tap.stop="stopkMask"
    >
      <button
        class="rightButton"
        open-type="getUserInfo"
        lang="zh_CN"
        @getuserinfo="onGotUserInfo"
      >
        确认
      </button>
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
      value: {}
    };
  },
  methods: {
    onGotUserInfo(e) {
      this.isShowModal = false
      console.log('e: ', e);
      this.$request.login(e.detail);
    },
    show() {
      console.log('value: ');
      this.isShowModal = true;
    },
    ConfirmButton() {
      this.isShowModal = false;
    },
    enSure() {
      this.isShowModal = false;
    },
    clickMask() {
      this.isShowModal = false;
      this.value = {
        title: "",
        content: "",
        type: "",
        sureButtonText: "",
        confirmButtonText: ""
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
.btn {
  margin-top: 64rpx;
}
.content {
  margin: 40rpx 40rpx 20rpx;
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
