<template>
  <view class="app flex column j-between">
    <div class="appDiv flex column shadow">
      <div class="flex column j-between ">
        <div class="flex j-start a-center">
          <span class="textNameSpan">姓名</span>
        </div>
        <input class="aliasNameInput" @input="bindName" :value="form.name">
      </div>

      <div class="flex column j-between ">
        <div class="flex j-start a-center">
          <span class="textNameSpan">笔名</span>
        </div>
        <input class="aliasNameInput" @input="bindAliasName" :value="form.aliasName">
      </div>

      <div class="flex column j-between ">
        <div class="flex j-start a-center">
          <span class="textNameSpan">微信名</span>
        </div>
        <input class="aliasNameInput" @input="bindAliasName" :value="form.nickName">
      </div>

      <div class="flex column j-between birthday ">
        <picker mode="date" :value="form.bornDate"  @change="bindBornDate">
          <span >出生年月： {{form.bornDate | dayFormat}} </span>
        </picker>
      </div>

      <div class="flex column j-between ">
        <div class="flex j-start a-center">
          <span class="textNameSpan">如何知道 Tell 的</span>
        </div>
        <input class="aliasNameInput" @input="bindWhere" :value="form.where">
      </div>

      <div class="flex column j-between ">
        <div class="flex j-start a-center">
          <span class="textNameSpan">为什么想要持有向日葵徽章</span>
        </div>
        <textarea class="textArea" :auto-height="true"  :focus="isFocus" maxlength="5000" cursor-spacing="30px" :value="form.why" @input="bindWhy" />
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
        name: "", //姓名
        aliasName: "", //笔名
        nickName:"", // 微信名称
        bornDate: 0,
        where: "",
        why: ""
      }
    };
  },
  methods: {
    bindWhy(e){
      this.form.why = e.detail.value;
    },
    bindBornDate(e){
      this.form.bornDate = (e.detail.value) ;
    },
    bindName(e){
      this.form.name  = e.detail.value;
    },
    bindAliasName(e){
      this.form.aliasName  = e.detail.value;
    },
    bindNickName(e){
      this.form.nickName  = e.detail.value;
    },
    bindWhere(e){
      this.form.where  = e.detail.value;
    },
    onPush(){
      const { name, aliasName, nickName, where, why} = this.form;
      if(name.length > 10){
          return wx.showToast({
            icon: "none",
            title: "请控制姓名在10字以内"
          });
      }
      if(nickName.length > 20){
          return wx.showToast({
            icon: "none",
            title: "请控制微信号在20字以内"
          });
      }      
      if(why.length > 200){
          return wx.showToast({
            icon: "none",
            title: "请控制理由在200字以内"
          });
      }
      if(where.length > 100){
          return wx.showToast({
            icon: "none",
            title: "请控制在100字以内"
          });
      }
      Object.keys(this.form).forEach(val=>{
        if(!this.form[val]) {
        return wx.showToast({
                title: '请填写完整',
                icon: 'none',
        });  
      }});
      
      this.$request.post("/badge/form/sunflower", this.form).then(res=>{
        this.res;
      })
    }
  },
  onShow() {
      const { user } = getApp().globalData;
      this.form.aliasName = user.signName;
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
.birthday{
  margin: 20rpx 40rpx;

}
</style>
