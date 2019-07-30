<template>
  <div>
    <div class="appDiv flex column">
      <div class="flex center">
        <img
          class="securityAccount"
          src="/static/svgs/securityAccount.svg"
        >
      </div>
      <div class="flex center towast">
        绑定手机后，可通过手机号登录
      </div>
      <div class="flex column j-between">
        <span class="textNameSpan">首次绑定可获得 1 张解忧券奖励</span>
        <div class="flex center">
          <button
            v-if="autoPhone"
            class="autoPhone"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
          />
          <input
            v-else
            class="input grow"
            maxlength="11"
            type="number"
            :focus="focusInput"
            :value="form.phoneNumber"
            @input="bindPhoneNumber"
          >
        </div>
      </div>
      <div class="flex column textAdd center">
        <button
          class="lightButton flex center"
          @click="hold"
        >
          继续
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import shareMix from "@/mixins/mixin";
import { promisify } from "@/utils/index";

export default {
  mixins: [shareMix],
  data() {
    return {
      autoPhone: true,
      focusInput:false,
      form: {
        code: "", // 临时授权码
        encryptedData: "",// 加密数据
        iv: "",// 初始向量
        phoneNumber: "", //手机号，
        purePhoneNumber: "", //没有区号的手机号
        countryCode: "", //区号,
      },
      code: "",
      user: {}
    };
  },
  methods: {
    async getPhoneNumber(e) {
      if(!e.detail.iv) {
         this.autoPhone = false;
         this.focusInput = true;
         return 
      }
      let { iv, userInfo, encryptedData } = e.detail;
      this.$request.post("/user/bind/query", {
        code: this.code,
        iv,
        encryptedData
      }).then((res)=>{
        // this.autoPhone = false
        // this.form.countryCode = res.data.countryCode;
        // this.form.purePhoneNumber = res.data.purePhoneNumber;
        // this.form.phoneNumber = res.data.phoneNumber;
        // this.$request.put('/user/phone', { phoneNumber:this.form.phoneNumber}).then((res) => {
        //   wx.showToast({
        //     title: "绑定成功"
        //   });
        //   return this.$router.push({
        //     path: "/pages/home/index"
        //   })          
        // }).catch(err=>{
        //   console.log('err: ', err);
        //   return
        // })
      }).catch(err=>{
        return wx.showToast({
          title: '获取手机号失败',
          icon: 'none'
        }) 
      })
    },
    bindPhoneNumber(e) {
      this.form.phoneNumber = e.detail.value;
    },
    hold() {
      const { phoneNumber, code } = this.form;
      if (/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber) == false) {
        return wx.showToast({
          icon: "none",
          title: "请输入正确的手机号"
        });
      }
      this.$request.post('/user/bind.html', { phoneNumber }).then(() => {
        wx.showToast({
          title: "发送成功"
        });
        // this.countdownTime = 60;
        // var hash = setInterval(() => {
        //   if (this.countdownTime == 0) {
        //     return clearInterval(hash)
        //   }
        //   this.countdownTime--;
        // }, 1000)
      });
      this.$router.push({
        path: "/pages/home/index"
      })
    }
  },
  onShow() {
    const { user } = getApp().globalData;
    this.user = user
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
.textNameSpan {
  color: #4D495B;
  font-size: 32rpx;
  margin-bottom: 16rpx;
  margin-top: 40rpx;
}
.textAdd {
  padding-bottom: 60rpx;
}

.input {
  height: 84rpx;
  padding-left: 20rpx;
  background-color: rgba(189, 189, 192, 0.1);
}
.autoPhone{
   height: 84rpx;
   width:100%;
   background: rgba(189, 189, 192, .1);
   padding-left: 20rpx; 
}

button.countdown {
  padding: 0;
  margin: 0;
  font-size: 28rpx;
  color: #bdbdc0;
  background-color: transparent;
}

button.lightButton {
  height: 92rpx;
  padding: 26rpx 102rpx;
}
.securityAccount{
  width: 160px;
  height: 160px
}
.towast{
  font-size: 32rpx;
  color: #4D495B;
  margin: 40rpx 0 ;
  line-height: 46rpx;
}
</style>
