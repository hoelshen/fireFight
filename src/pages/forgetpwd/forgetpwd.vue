<template>
  <div>
    <div class="appDiv flex column">
      <div class="input-container">
        <div class="loginDiv flex j-between column">
          <div class="flex row center inputDiv">
            <image
              class="icon"
              src="/static/png/iphone.png"
            />
            <input
              class="input grow"
              maxlength="11"
              placeholder="请输入你的手机号"
              :focus="focusInput"
              :value="form.userName"
              @input="bindPhoneNumber"
            >
          </div>
          <div class="flex row center inputDiv">
            <image
              class="icon"
              src="/static/png/password.png"
            />
            <input
              class="input grow"
              maxlength="11"
              placeholder="输入您的密码"
              :focus="focusInput"
              :value="form.pwd"
              @input="bindPassword"
            >
          </div>
          <div class="flex row center inputDiv">
            <image
              class="icon"
              src="/static/png/password.png"
            />
            <input
              class="input grow"
              maxlength="11"
              placeholder="请确认您的密码"
              :focus="focusInput"
              :value="form.confirmPwd"
              @input="bindConfirmPassword"
            >
          </div>
        </div>
      </div>
      <div
        class="loginImg tex-center"
        @click="confirmBtn"
      >
        确认
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
      focusInput: true,
      form: {
        userName: "", // 用户名
        pwd: "", //密码
        confirmPwd: '' //确认密码
      },
      user: {},
    };
  },
  methods: {
    bindPhoneNumber(e) {
      this.form.userName = e.detail.value;
    },
    bindPassword(e){
      this.form.pwd = e.detail.value;
    },
    bindConfirmPassword(e){
      this.form.confirmPwd = e.detail.value;
    },
    confirmBtn(){
      let { userName, pwd, confirmPwd } = this.form;
      if(pwd !== confirmPwd) 
      return wx.showToast({
        title: '两次输入的密码不一致',
        icon: "none"
        });
      this.$request
        .post("/user/modifyPassword.do", {
          userName,
          password1: pwd,
          password2: confirmPwd
        })
        .then(res => {
          console.log(res)
          if(res.state == 0) {
            wx.showToast({
                title: res.message,
                icon: "none"
            });
            wx.reLaunch({
                url: "/pages/login/index"
            });
          } else {
              wx.showToast({
                title: res.message,
                icon: "none"
              });
          }
          
        })
        .catch(err => {
          return wx.showToast({
            title: "获取失败",
            icon: "none"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.appDiv {
  min-height: 100vh;
  background-color: #1D7FFD;
}
.bannerImg{
  width:100%;
}
.text {
  background-color: #ffffff;
  min-height: 600rpx;
  padding: 40rpx;
  color: rgba(189, 189, 192, 1);
}
.textNameSpan {
  color: #4d495b;
  font-size: 32rpx;
  margin-bottom: 16rpx;
  margin-top: 40rpx;
}
.textAdd {
  padding-bottom: 60rpx;
  position: relative;
  top: 610rpx;
}
.icon {
  width: 28rpx;
  height: 40rpx;
  position: relative;
}
.input {
  height: 84rpx;
  padding-left: 20rpx;
}

.loginText{
  height:44rpx;
  font-size:48px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(62,74,89,1);
  line-height:72px;
  margin:70rpx;
  margin-bottom:45rpx;
}
.input-container{
    width: 662rpx;
    margin: 60rpx auto;
}
.inputDiv{
    border-radius: 50rpx;
    background: #fff;
    margin-top: 20rpx;
    padding-left: 40rpx;
  .codeImg{
    width:120rpx;
    height:80rpx
  }
}
.remindDiv{
  position: absolute;
  right: 70rpx;
  bottom: 124rpx;

}
.loginImg {
    width: 479rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 50rpx;
    color: #1D7FFD;
    background:#fff;
    margin: 300rpx auto 0;
}
</style>
