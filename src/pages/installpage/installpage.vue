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
      <div>上门时间</div>
      <div>
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
      <div>设备类型</div>
      <div>
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
        placeholder="输入200字以内的备注信息"
        @input="bindRemark"
      >
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
          installFacilityList: [{title:'安装', type:0}, {title:'维修', type:1}],
          action: 0,
          changeTime: '',
          installTime: '请选择',
          deviceArray:['智能烟感','智能气感','液压液位','智能用电','视频监控','消防栓'],
          remark: '',
          type: '请选择',
          adviceItem: '请选择',
          installId: 0
      }
  },
  onLoad(opt) {
    this.params = wx.getStorageSync('userAddress')
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
    confirmBtn() {
        let postData = {
            'installId': this.installId,
            'installTime': this.installTime,
            'type': this.type,
            'remark': this.remark,
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
            wx.reLaunch({
                url: `/pages/info/index`
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
      width: 582rpx;
      background: #fff;
      height: 60rpx;
      color: #619FFC;
      padding: 0 40rpx;
      margin: 20rpx auto 0;
  }
  .remark {
      width: 582rpx;
      background: #fff;
      height: 260rpx;
      color: #619FFC;
      padding: 20rpx 40rpx;
      margin: 20rpx auto 0;
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
  
}
</style>