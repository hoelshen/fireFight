<template>
  <div>
    <div class="appDiv flex column">
      <div class="flex  towast">
        验证码已发送到 {{ phoneNumber }}
      </div>
      <div
        class="flex wrap center"
        @click="showkey"
      >
        <div class="input">
          {{ code[0] }}
        </div>
        <div class="input">
          {{ code[1] }}
        </div>
        <div class="input">
          {{ code[2] }}
        </div>
        <div class="input">
          {{ code[3] }}
        </div>
      </div>
      <div class="flex column textAdd center">
        <button
          class="lightButton flex center"
          @click="submit"
        >
          完成
        </button>
      </div>
      <input
        v-show="focus"
        style="color: white"
        type="number"
        :focus="focus"
        :value="inpuVal"
        @input="bindCode"
      >
    </div>
  </div>
</template>
<script>
import shareMix from "@/mixins/mixin";

import { promisify } from "@/utils/index";

export default {
  components: {
  },
  mixins: [shareMix],
  data() {
    return {
      phoneNumber: "",
      focus:false,
      code: [],
      inpuVal: "",
    };
  },
  methods: {
    showkey(){
      console.log('触发了')
      this.focus = true;

    },
    bindCode(e){
      const num = e.detail.value;
      this.code = [];
      for(const i of num){
        this.code.push(i)           
        console.log('code: ', this.code);
      }
      if(this.code.length>=4){
        this.focus = false;
      }
    },
    submit() {
      const { phoneNumber, code } = this;
      let fcode = code; 
      console.log('code: ', code);
      const tcode = fcode.toSting().replace("","");
      if (code.length===4) {
        this.$request
          .put("/user/bindPhone.html", { mobile: phoneNumber, smscode: fcode })
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
