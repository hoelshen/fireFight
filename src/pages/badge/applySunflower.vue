<template>
  <view class="app flex column j-between">
    <div class="appDiv flex column shadow">
      <div class="flex column j-between textName">
        <div class="flex j-start a-center">
          <span class="textNameSpan">姓名</span>
        </div>
        <input class="aliasNameInput" @input="bindKeyInput" :value="aliasName">
      </div>

      <div class="flex column j-between textName">
        <div class="flex j-start a-center">
          <span class="textNameSpan">笔名</span>
        </div>
        <input class="aliasNameInput" @input="bindKeyInput" :value="aliasName">
      </div>

      <div class="flex column j-between textName">
        <div class="flex j-start a-center">
          <span class="textNameSpan">微信名</span>
        </div>
        <input class="aliasNameInput" @input="bindKeyInput" :value="aliasName">
      </div>

      <div class="flex column j-between textName">
        <div class="flex j-start a-center">
          <span class="textNameSpan">出生年月</span>
        </div>
        <picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
         {{date}} 
        </picker>
      </div>

      <div class="flex column j-between textName">
        <div class="flex j-start a-center">
          <span class="textNameSpan">如何知道 Tell 的</span>
        </div>
        <input class="aliasNameInput" @input="bindKeyInput" :value="aliasName">
      </div>

      <div class="flex column j-between textName">
        <div class="flex j-start a-center">
          <span class="textNameSpan">为什么想要持有向日葵徽章</span>
        </div>
        <textarea class="textArea" :auto-height="true"  :focus="isFocus" maxlength="5000" cursor-spacing="30px" :value="content" @input="bindTextAreaInput" />
      </div>

    </div>

    <div class="flex column textAdd center">
      <button class="addMystoryButton flex center" @click="onPush">提交咨询</button>
    </div>


  </view>
</template>
<script>
export default {
  data() {
    return {
      form:{
        date:""
      }
    };
  },
  methods: {
    bindTextAreaInput(){

    },
    bindDateChange(){
      
    }
  },
  onShow() {

  }
};
</script>
<style lang="less" scoped>
.appDiv {
  margin: 40rpx 40rpx;
  min-height: 884rpx;
  background-color:#ffffff
}
.text {
  background-color: #ffffff;
  min-height: 600rpx;
  padding:40rpx;
  color: rgba(189, 189, 192, 1);
}
.textArea {
  min-height: 400rpx;
  background-color: rgba(189, 189, 192, 0.15);
  width: 590rpx;
  font-size: 34rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-top: 12rpx;
  box-sizing: border-box;
  line-height: 52rpx;
}
.textNameSpan {
  margin-left: 40rpx;
  margin-top: 20rpx;
}

.textAdd {
  margin-bottom: 60rpx;
  margin-top: 32rpx;
  &button {
    margin-bottom: 12rpx;
  }
}
.aliasNameInput {
  height: 84rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-top: 12rpx;
  background-color: rgba(189, 189, 192, 0.15);
}
.addMystoryButton {
  border-radius: 23px;
  margin-bottom: 24rpx;
  height: 92rpx;
  border: 1 solid #a9a9a9;
  color: #ffffff;
  padding: 26rpx 102rpx;
  text-align: center;
  background-color: #ffc86d;
  font-size:28rpx;

}
</style>
