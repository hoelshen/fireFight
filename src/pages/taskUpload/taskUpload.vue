<template>
  <div class="page">
    <div class="errors">
      <div class="errors-iphone">
        <textarea
          bindblur="bindTextAreaBlur"
          auto-height
          class="textArea"
          maxlength="5000"
          cursor-spacing="30"
          :value="form.unusualContent"
          placeholder="在此输入您遇见的问题，很抱歉给您带来不好的体验，我们将尽快和您联系…"
          @input="bindTextAreaInput"
        />
      </div>
      <div class="photos flex  row j-center">
        <div v-if="form.unusualPhoto">
          <image
            class="photo"
            :src="form.unusualPhoto"
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
          @click="upFile"
        >
          <image
            class="addPhoto"
            src="/static/png/photo.png"
          />
        </div>
      </div>
      <div class="flex column errors-logout center">
        <div
          class="loginImg tex-center"
          @click="Request"
        >
          提交
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
          fID:'',
          fTaskCode: '',
          fTaskName: '',
          isNromo: '',
          unusualPhoto: '',
          unusualContent: ''
      }
    };
  },
  methods: {
    bindTextAreaInput(e) {
      this.form.unusualContent = e.detail.value;
    },
    upFile(){
      let sourceType = [];
      const that = this;
      wx.showActionSheet({
      itemList: ['从相册中选择照片', '拍一张新照片'],
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
                  that.form.unusualPhoto = data;
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
    Request(){
      this.form['isJson'] = true;
      this.$request
      .post("/patrolshifts/patrollingPeopleDeviceIsNromo.do ",this.form)
      .then(res => {
        wx.showToast({
          title: "反馈成功",
          icon: "none"
        })
        wx.reLaunch({
          url: `/pages/watchTask/index`
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
      this.form.unusualPhoto = "";
    }
  },
  onLoad(opt) {
      const {fID, fTaskCode, fTaskName, isNromo}= JSON.parse(opt.taskResult)
      this.form.fID = fID
      this.form.fTaskCode = fTaskCode
      this.form.fTaskName = fTaskName
      this.form.isNromo = isNromo
  },
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
