<template>
  <div class="equipmentlist-page flex column">
    <div class="equipment-list mrg-center ">
      <div
        class="equipment-item pdd-20"
      >  
        <div class="time pdd-b-10">
          任务名称：{{ taskResult.fTaskName }}
        </div>
        <div class="id pdd-b-10">
          设备ID：{{ taskResult.fID }}
        </div>
      </div>
      <div style="margin-top: 500rpx;">
        <div
          class="btn-confire btn tex-center"
          @click="confireBtn(0)"
        >
          正常
        </div>
        <div
          class="btn tex-center"
          @click="confireBtn(1)"
        >
          异常上报
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  formatTime
} from "@/utils/index";
export default {
  data() {
      return {
          actionIndex: '',
          showVideo: false
      }
  },
  onLoad(opt) {
    this.taskResult = JSON.parse(opt.result)
    this.userId = wx.getStorageSync('userId')
  },
  onShow() {
  },

  methods: {
    async getvideoList(fentityFacilityID) {
      try {
        let res = await this.$request.post('facilityInfo/getNearbyMonitoring.do', {fentityFacilityID: fentityFacilityID})
        this.videoList = res
        console.log(this.videoList)
        if(this.videoList.length == 0) {
          wx.showToast({
            title: "暂无监控",
            icon: "none"
          });
        }
      } catch (error) {
      }
    },
    async confireBtn(flag) {
        console.log(flag)
        if(flag) {
            this.taskResult['isNromo'] = flag
            wx.navigateTo({
                url: `/pages/taskUpload/index?taskResult=${JSON.stringify(this.taskResult)}`
            });
        }else {
            try {
                let res = await this.$request.post('/patrolshifts/patrollingPeopleDeviceIsNromo.do', 
                {
                    userId: this.userId,
                    fTaskCode: this.taskResult.fTaskCode,
                    fTaskName: this.taskResult.fTaskName,
                    fID: this.taskResult.fID,
                    isNromo: flag,
                    isJson: true
                }
                )
                wx.showToast({
                    title: '提交成功',
                    icon: "none"
                });
                wx.reLaunch({
                    url: `/pages/watchList/index`
                })
            } catch (error) {
            }
        }
    }
  }
  }
</script>
<style lang="less" scoped>
.equipmentlist-page {
  height: 100vh;
  background: #1D7FFD;
  .equipment-list {
      color: #3E4A59;
      width: 750rpx;
      height: 760rpx;
      padding-top: 24rpx;
      .equipment-item{
        width: 662rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:20rpx;
        margin: 0rpx 24rpx 20rpx;
        .name{
          font-size: 26rpx;
        }
        .id{
          font-size: 24rpx;
        }
        .time{
          font-size: 22rpx;
          color: #C2C2C4;
        }
      }
      image{
          width: 36rpx;
          height: 36rpx;
      }
      .btn {
        width: 479rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 50rpx;
        color: #1D7FFD;
        background:#fff;
        margin: 40rpx auto 0;
      }
      .btn-confire{
        background:rgba(34,172,56,1);
        color: #fff;
      }
  }
}
</style>