<template>
  <div class="page">
    <div class="errors">
      <div class="errors-type">
        <span>请选择反馈类型</span>
        <div class="choice">
          <span
            class="tag box"
            :class="activeIndex == 0 ?'active' :''"
            @click="select(0)"
          >
            <img
              class="iconfont"
              src="/static/png/yesBlue.png"
            >
            设备问题
          </span>  
          <span
            class="tag box"
            :class="activeIndex == 1 ?'active' :''"
            @click="select(1)"
          >            <img
            class="iconfont"
            src="/static/png/yesBlue.png"
          >客服问题</span>  
          <span
            class="tag box"
            :class="activeIndex == 2 ?'active' :''"
            @click="select(2)"
          >            <img
            class="iconfont"
            src="/static/png/yesBlue.png"
          >其他问题</span>
        </div>
      </div>
      <div class="errors-iphone">
        请输入手机号码
        <input
          class="input grow"
          maxlength="11"
          type="number"
          placeholder="请输入手机号码，仅用于我们向您核实问题"
          :value="form.foperatoruser"
          @input="bindPhoneNumber"
        >
        <textarea
          bindblur="bindTextAreaBlur"
          auto-height
          class="textArea"
          maxlength="5000"
          cursor-spacing="30"
          :value="form.fcontent"
          placeholder="在此输入您遇见的问题，很抱歉给您带来不好的体验，我们将尽快和您联系…"
          @input="bindTextAreaInput"
        />
      </div>
      <div class="photos flex  row j-start">
        <div v-if="form.fimage">
          <image
            class="photo"
            :src="form.fimage"
          />
          <img
            class="leftTop"
            src="/static/png/error.png"
            @click="clearImg"
          >
        </div>
        <div
          v-else
          class="photoDiv"
        >
          <image
            class="addPhoto"
            src="/static/png/photo.png"
            @click="upFile"
          />
        </div>
      </div>
      <div class="flex column errors-logout center">
        <div
          class="loginImg tex-center"
          @click="Request"
        >
          提交反馈
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getParams
} from "@/utils/index";
export default {
  data() {
    return {
      form:{
        foperatoruser: '', //手机号码
        fimage: '', //图片地址
        ofbWay: '', //反馈方式
        fcontent: '', //反馈内容
      },
      imgs:[],
      activeIndex: 0
    };
  },
  methods: {
    bindPhoneNumber(e){
      this.form.foperatoruser = e.detail.value;
    },
    bindTextAreaInput(e) {
      this.form.fcontent = e.detail.value;
    },
    upFile(){
      let sourceType = [];
      const that = this;
      wx.showActionSheet({
      itemList: ['从相册选择新头像', '拍个新头像'],
        success(res) {
          if(res.tapIndex === 0){
            sourceType = ['album']
          }
          if(res.tapIndex === 1){
            sourceType = ['camera']
          }
          if(res.tapIndex === 2){
            return;
          } 
          that.getPhoto = true;
          wx.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: sourceType,
            success: function(res) {
              wx.showLoading({
                title: "上传中",
                mask: true
              });
              const tempFilePaths = res.tempFilePaths;
              that.$request.uploadFile(tempFilePaths[0]).then(
                function(res) {
                  let data = res.data;
                  console.log('data111: ', data,that);
                  that.form.fimage = data;
                  wx.hideLoading();
                }.bind(that)
              );
            }.bind(this),
            fail(e) {
              wx.hideLoading();
            }
          });
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
    select(index){
      this.activeIndex = index;
    },
    Request(){
      let params = {};
      const value2 = wx.getStorageSync("userId");

      params['fuserid'] = value2;
      params['ofbWay'] =  this.activeIndex;
      params['fcontent'] = this.form.fcontent;
      params['fimage'] = this.form.fimage;
      params['foperatoruser'] = this.form.foperatoruser;
      params['isJson'] = true;
      this.$request
      .post("/user/addUserFeedbackInfo.do ",params)
      .then(res => {
        wx.showToast({
          title: "反馈成功",
          icon: "none"
        })
        wx.reLaunch({
          url: `/pages/info/index`
        })
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
      
    },
    clearImg(){
      this.form.fimage = "";
    }
  },
  onLoad() {},
  onShow() {}
};
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  background-color: #1D7FFD;
  color:#fff;
  .errors {
    padding: 30rpx;
  }
  .total {
    font-size: 40rpx;
    padding: 20rpx;
  }
  .line {
    margin-bottom: 20rpx;
  }
  .input{
    margin: 30rpx 0rpx;
    background: transparent;
    background-color: #fff;
    border-radius: 12rpx;
    color: black;
    padding-left: 20rpx ;
    display: flex;
    height: 80rpx;
    align-content: center;

  }
  .choice{
    margin-top: 30rpx;
    .tag {
      display: inline-block;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      border-radius: 12rpx;
      border-style:dashed;
      color: #fff;
      margin-right: 12rpx;
      margin-bottom: 24rpx;
      padding: 0 26rpx;
      font-size: 32rpx;
      border: 2rpx #ffffff solid;
      &.active {
        border: 2rpx #2E60FE solid;
        background-color: #fff;
        color: black
      }
      &.focus {
        border: 2rpx #ffffff solid;
        background-color: #fff;
      }
    }
  }

  .textArea {
    min-height: 400rpx;
    padding: 40rpx;
    background-color: #ffffff;
    width: 100%;
    color: black;
    font-size: 28rpx;
    box-sizing: border-box;
    line-height:52rpx;
    border-width: 1rpx;
    border-style:dashed;
    border-radius: 24rpx;
  }
  .photos{
    margin:60rpx 0;
    position: relative;
    height: 120rpx;
    .photo{
      width: 120rpx;
      height: 120rpx;
      margin-right: 30rpx; 
      background-color: #eeeeee;
      position: absolute;
    }
    .leftTop{
      position: relative;
      top: -5rpx;
      right: -95rpx;
      text-align:center;
      width: 32rpx !important;
      height: 32rpx !important;
    }
    .photoDiv{
      width:120rpx;
      height:120rpx;
      text-align: center;
      line-height: 130rpx;
      border-width: 1rpx;
      border-style:dashed;
      background-color: #ffffff;
      .addPhoto{
        width:52rpx;
        height: 43rpx;
      }
    }

  }

  .errors-logout {
    padding-bottom: 60rpx;
  }

  .loginImg{
    width: 479rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 50rpx;
    color: #1D7FFD;
    background:#fff;
    margin: 0rpx auto 0;
  }
}
.iconfont{
  width: 26rpx;
  height: 26rpx;
}
</style>
