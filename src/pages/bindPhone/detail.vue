<template>
  <div>
    <div class="appDiv flex column">
      <div class="flex  towast">
        验证码已发送到 {{ phoneNumber }}
      </div>
      <div class="flex wrap center">
        <input
          class="input"
          maxlength="1"
          type="number"
          :focus="focusOne"
          style="margin-left:0"
          @input="bindCodeOne"
          @blur="blurCodeOne"
        >
        <input
          class="input"
          maxlength="1"
          type="number"
          :focus="focusTwo"
          @input="bindCodeTwo"
          @blur="blurCodeTwo"
        >
        <input
          class="input"
          maxlength="1"
          type="number"
          :focus="focusThree"
          @input="bindCodeThree"
          @blur="blurCodeThree"
        >
        <input
          class="input"
          maxlength="1"
          type="number"
          :focus="focusFour"
          @input="bindCodeFour"
          @blur="blurCodeFour"
        >
      </div>
      <div class="flex column textAdd center">
        <button
          class="lightButton flex center"
          @click="submit"
        >
          完成
        </button>
      </div>
    </div>
    <Modal ref="mymodal" />
  </div>
</template>
<script>
import shareMix from "@/mixins/mixin";
import Modal from "@/components/Modal";

import { promisify } from "@/utils/index";

export default {
  components: {
    Modal
  },
  mixins: [shareMix],
  data() {
    return {
      phoneNumber: "",
      codeOne: "",
      codeTwo: "",
      codeThree: "",
      codeFour: "",
      focusOne: false,
      focusTwo: false,
      focusThree: false,
      focusFour: false,
      success: true,
      countdownTime: 0
    };
  },
  methods: {
    bindCodeOne(e) {
      this.codeOne = e.detail.value;
      this.focusTwo = true;
    },
    bindCodeTwo(e) {
      this.codeTwo = e.detail.value;
      this.focusThree = true;
    },
    bindCodeThree(e) {
      this.codeThree = e.detail.value;
      this.focusFour = true;
    },
    bindCodeFour(e) {
      this.codeFour = e.detail.value;
    },
    blurCodeOne(e) {
      this.focusTwo = true;
    },
    blurCodeTwo(e) {
      this.focusThree = true;
    },
    blurCodeThree(e) {
      this.focusFour = true;
    },
    blurCodeFour(e) {
      this.focusTwo = true;
    },
    submit() {
      const { phoneNumber, codeOne, codeTwo, codeThree, codeFour } = this;
      if (codeOne && codeTwo && codeThree && codeFour) {
        const code = codeOne + codeTwo + codeThree + codeFour;
        this.$request
          .put("/user/bindPhone.html", { mobile: phoneNumber, smscode: code })
          .then(res => {
            wx.showToast({
              title: "绑定成功"
            });
            return wx.reLaunch({
              url: "/pages/home/index"
            });
          })
          .catch(err => {
            console.log("err: ", err);
            return;
          });
      } else {
        wx.showToast({
          icon: "none",
          title: "请输入4位数的验证码"
        });
      }
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.phoneNumber = query.phoneNumber;
    this.focusOne = true;
  }
};
</script>
<style lang="less" scoped>
.appDiv {
  margin: 40rpx 40rpx;
  min-height: 90vh;
  background-color: #ffffff;
  padding: 20rpx 0;
}
.text {
  background-color: #ffffff;
  min-height: 600rpx;
  padding: 40rpx;
  color: rgba(189, 189, 192, 1);
}
.securityAccount {
  width: 160px;
  height: 160px;
}
.towast {
  font-size: 32rpx;
  color: #4d495b;
  margin: 40rpx 0;
  line-height: 46rpx;
}
.input {
  height: 84rpx;
  color: #ffc86d;
  font-weight: bold;
  margin-left: 60rpx;
  border-bottom: 1px solid black;
  width: 48rpx;
  font-size: 30px;
  text-align: center;
}
.textAdd {
  margin-top: 60rpx;
}
.lightButton {
  padding: 0rpx 130rpx;
  font-size: 32rpx;
}
</style>
