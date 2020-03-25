<template>
  <div class="equipmentlist-page flex column">
    <scroll-view
      :style="{'height': '90%'}"
      :scroll-y="true"
    >
      <div class="equipment-list mrg-center ">
        <div
          v-for="(item,index) in videoList"
          :key="index"
          class="equipment-item pdd-20"
          @click="jumpUrl"
        >  
          <div class="flex j-between">
            <div class="id pdd-b-10">
              设备ID：{{ item.fdeviceserial }}
            </div>
            <div
              class="id pdd-b-10"
              v-text="item.patrollingState == 0 ? '待巡更' : '已完成'"
            />
          </div>
          <div class="time pdd-b-10">
            任务开始时间：{{ item.fstartTime }}
          </div>
          <div class="time pdd-b-10">
            任务结束时间：{{ item.fendTime }}
          </div>
          <div class="time pdd-b-10">
            任务说明：{{ item.ftaskExplain }}
          </div>
        </div>
      </div>
    </scroll-view>
    <div
      class="scanImg tex-center"
      @click="scanBtn"
    >
      扫一扫
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
          videoList: [{fdeviceserial: 1, fhousenumber: 2, fsecondposition: 3, fcreateTime: 4}],
          actionIndex: '',
          showVideo: false,
          patrolshiftsId: ''
      }
  },
  onLoad(opt) {
    this.patrolshiftsId = opt.patrolshiftsId
    this.getvideoList(this.patrolshiftsId)
  },
  onShow() {
  },

  methods: {
    async getvideoList(patrolshiftsId) {
      try {
        let res = await this.$request.post('/patrolshifts/getPatrolshiftsDeviceMessage.do', {patrolshiftsId: patrolshiftsId})
        this.videoList = res.data
      } catch (error) {
      }
    },
    jumpUrl() {
    },
    scanBtn() {
      wx.scanCode({
        success: (res) => {
          const result = res.result
          wx.navigateTo({
            url: `/pages/taskDetail/index?result=${result}`
          });
        }
      })
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
        .btn{
          width:80rpx;
          height:36rpx;
          background:rgba(34,172,56,1);
          border-radius:5rpx;
          color: #fff;
          line-height: 36rpx;
          font-size: 20rpx;
        }
      }
      image{
          width: 36rpx;
          height: 36rpx;
      }
  }
  .scanImg{
    width: 479rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 50rpx;
    color: #1D7FFD;
    background:#fff;
    margin: 40rpx auto 0;
  }
}
</style>