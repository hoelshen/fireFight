<template>
  <div class="noFound flex column">
    <span class="flex center">请添加真实有效的车牌号码</span>
    <div class="flex car_block">
      <keyboard
        :plate-num.sync="plateNum"
        :show.sync="showKeyboard"
        extra-key="立即开通"
        base-border="6eff92"
        @keyboard="keyboardChange"
      />
    </div>
  </div>
</template>

<script>
import shareMix from "@/mixins/mixin";
import keyboard from "mpvue-keyboard";
export default {
  components: { keyboard },
  mixins: [shareMix],
  data() {
    return {
      showKeyboard: false,
      plateNum: "",
    };
  },
  methods: {
    keyboardChange(e) {
      this.plateNum = e;
      this.navCar();
    },
    openKeyBoard() {
      if (this.plateNum && this.plateNum.length > 6) {
        this.navCar();
      } else {
        uni.showToast({
          icon: "none",
          title: "请输入完整的车牌号",
          mask: true,
          duration: 2000
        });
      }
    },
    async navCar() {
        this.$request
        .post("/bindcar.html", { carno: this.plateNum })
        .then(res => {
          wx.showToast({
            title: "绑定成功"
          });
         this.$router.push({ path: "/pages/home/index" });
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    }
  }
};
</script>

<style scoped lang="less">
.noFound {
  height: 100vh;
  background: #fff;
  color: #4d495b;
  line-height: 52rpx;
  .desc {
    margin-top: 100rpx;
    font-size: 60rpx;
    font-weight: bold;
  }
  img {
    margin-top: 40rpx;
    width: 400rpx;
    height: 400rpx;
  }
}
.newButton {
  box-sizing: border-box;
  border: 2rpx solid rgba(189, 189, 192, 0.1);
}
.input {
  width: 50rpx;
  border-style: solid;
  border-width: 2rpx;
  height: 84rpx;
  padding-left: 20rpx;
  background-color: rgba(189, 189, 192, 0.1);
}
.wait {
  font-size: 32rpx;
}
.car_block {
  padding-left: 40rpx;
}
</style>
