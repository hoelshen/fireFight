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
      <cover-view class="title">
        {{ value.title }}
      </cover-view>
      <cover-view class="content">
        {{ value.content }}
      </cover-view>
      <cover-view class="btn">
        <button
          v-if="value.type === 'CONFIRM' "
          class="confirm darkButton"
          @click="ConfirmButton"
        >
          {{ value.confirmButtonText }}
        </button>
        <button
          class="sure lightButton"
          @click="enSure"
        >
          {{ value.sureButtonText }}
        </button>
      </cover-view>
    </cover-view>
  </cover-view>
</template>


<script>
export default {
  name: "Modal",
  data() {
    return {
      img: false,
      isShowModal: false,
      filterTitle: "",
      imgUrl: "",
      value: {}
    };
  },
  methods: {
    show(value) {
      const targetObj = {
        title: "",
        content: "",
        sureButtonText: "好的",
        type: "ALERT",
        confirmButtonText: ""
      };
      this.value = Object.assign(targetObj, value);

      this.isShowModal = true;
    },
    ConfirmButton() {
      this.isShowModal = false;

      if (this.value.confirmButtonText === "获取邮票") {
        this.$router.push({
          query: { active: "STAMP" },
          path: "/pages/welfare/index"
        });
      } else if (this.value.confirmButtonText === "获取解忧券") {
        this.$router.push({
          query: { active: "TICKET" },
          path: "/pages/welfare/index"
        });
      } else if (this.value.confirmButtonText === "前往解答室") {
        this.$router.push({
          path: "/pages/solution/tags"
        });
      } else if (this.value.title.includes("徽章")) {
        if (typeof this.value.confirmCallbak == "function") {
          this.value.confirmCallbak.call();
        } else {
          this.$router.push({
            path: "/pages/badge/badge"
          });
        }
      }
    },
    enSure() {
      this.isShowModal = false;
      this.img = false;
    },
    clickMask() {
      this.isShowModal = false;
      this.img = false;
      this.imgUrl = "";
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
