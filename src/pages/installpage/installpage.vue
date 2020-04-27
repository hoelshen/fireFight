<template>
  <div class="equipmentlist-page">
    <div class="equipmentlist-header mrg-center flex j-between a-center">
      <div
        v-for="(item, index) in installFacilityList"
        :key="index"
        class="header-item flex_1 flex a-center tex-center j-center "
        :class="index == action ? 'item-atcion' : ''"
        @click="changeItem(item)"
      >
        <div style="height: 80rpx; line-height: 80rpx;">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="flex j-between deviceChange timeChange a-center border-20">
      <div style="padding-left: 40rpx;">
        上门时间
      </div>
      <div style="padding-right: 40rpx;">
        <picker
          mode="date"
          @change="bindDateChange"
        >
          <div class="index_picker">
            <div class="">
              {{ installTime }}
            </div>
            <div class="" />
          </div>
        </picker>
      </div>
    </div>
    <div class="flex j-between deviceChange a-center">
      <div style="padding-left: 40rpx;">
        设备类型
      </div>
      <div style="padding-right: 40rpx;">
        <picker
          :range="deviceArray"
          @change="bindDeviceChange"
        >
          <div class="index_picker">
            <div class="">
              {{ adviceItem }}
            </div>
            <div class="" />
          </div>
        </picker>
      </div>
    </div>
    <div class="remark">
      <textarea
        class="input"
        type="textarea"
        maxlength="200"
        placeholder="请输入设备地址，以及IMEI号"
        @input="bindRemark"
      />
    </div>

    <div class="photos flex">
      <div
        v-for="(item, index) in fimage"
        :key="index"
        style="height: 120rpx; width: 120rpx; margin-right: 30rpx;"
      >
        <image
          class="photo"
          :src="item"
        />
        <img
          class="leftTop"
          src="/static/png/error.png"
          @click="clearImg(index)"
        >
      </div>
      <!-- v-if="form.fimage.length != 3" -->
      <div
        v-if="fimage.length != 3"
        class="photoDiv"
      >
        <image
          class="addPhoto"
          src="/static/png/error1.png"
          @click="upFile"
        />
      </div>
    </div>

    <div
      class="loginImg tex-center"
      @click="confirmBtn"
    >
      确认
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
          tab: 'home',
          listByType: [],
          params: '',
          installFacilityList: [{title:'安装设备', type:0}, {title:'维修设备', type:1}],
          action: 0,
          changeTime: '',
          installTime: '请选择',
          deviceArray:['智能烟感','智能气感','液压液位','智能用电','视频监控','消防栓'],
          remark: '',
          type: '请选择',
          adviceItem: '请选择',
          installId: 0,
          fimage: [],
          fOperatorUser: ''
      }
  },
  onLoad(opt) {
    this.params = wx.getStorageSync('userAddress')
    this.fOperatorUser = wx.getStorageSync('userName');
  },
  onShow() {
  },

  methods: {
    changeItem(item) {
      this.action = item.type
      this.installId = this.action
    },
    bindDateChange(e) {
      console.log(e.detail.value)
      this.installTime = e.detail.value
    },
    bindDeviceChange(e) {
      console.log(e.detail.value)
      this.type = e.detail.value
      this.adviceItem = this.deviceArray[e.detail.value]
    },
    bindRemark(e) {
        this.remark = e.detail.value;
    },
    upFile(){
      let sourceType = ['album', 'camera'];
      const that = this;
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
              that.fimage.push(data);
              wx.hideLoading();
            }.bind(that)
          );
        }.bind(this),
        fail(e) {
          wx.hideLoading();
        }
      });
    },
    clearImg(i){
      this.fimage.splice(i, 1)
    },
    confirmBtn() {
        let postData = {
            'installId': this.installId,
            'installTime': this.installTime,
            'type': this.type,
            'remark': this.remark,
            'photoUrl': this.fimage.join(','),
            'fOperatorUser': this.fOperatorUser,
            'isJson': true
        }
        this.$request
        .post("/patrol/addInstallFacilityItem.do", postData)
        .then(res => {
          console.log(res)
          if(res == 1) {
            wx.showToast({
                title: '提交成功',
                icon: "none"
            });
            // wx.reLaunch({
            //     url: `/pages/index/index`
            // })
            wx.navigateBack({
              delta: 1,  // 返回上一级页面。
              success: function() {}
            })
          } else {
              wx.showToast({
                title: '失败',
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
  }
</script>
<style lang="less" scoped>
.equipmentlist-page {
  height: 100vh;
  background: #1D7FFD;
  padding-top: 20rpx;
  .equipmentlist-header{
      height: 80rpx;
      width: 662rpx;
      background: #619FFC;
      color: #fff;
      border-radius: 40rpx;
      margin-bottom: 20rpx;
      .item-atcion{
        height: 80rpx;
        color: #619FFC;
        background: #fff;
        border-radius: 40rpx;
      }
  }
  .timeChange{
      margin: 80rpx auto 0 !important;
  }
  .deviceChange{
      width: 662rpx;
      background: #fff;
      height: 80rpx;
      color: #619FFC;
      // padding: 0 40rpx;
      margin: 20rpx auto 0;
      border-radius: 10rpx;
  }
  .remark {
      width: 662rpx;
      background: #fff;
      height: 260rpx;
      color: #619FFC;
      // padding: 20rpx 40rpx;
      margin: 60rpx auto 0;
      border-radius: 10rpx;
      .input{
        padding: 10rpx;
        height: 220rpx;
      }
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
  .photos{
    margin:60rpx 40rpx;
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
      // border-width: 1rpx;
      // border-style:dashed;
      // background-color: #ffffff;
      .addPhoto{
        width:120rpx;
        height: 120rpx;
      }
    }

  }
}
</style>