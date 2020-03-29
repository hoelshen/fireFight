<template>
  <div class="equipmentlist-page flex column">
    <scroll-view
      :style="{'height': '90%'}"
      :scroll-y="true"
    >
      <div class="equipment-list mrg-center ">
        <div class="equipment-item pdd-20">
          <div class="time pdd-b-10 flex j-between">
            <div>
              总任务数：{{ watchData.countTaskNum }}
            </div>
            <div>
              已完成数：{{ watchData.completeNum }}
            </div>
            <div>
              未完成数：{{ watchData.notCompleteNum }}
            </div>
          </div>
          <div class="time pdd-b-10 flex j-between">
            <div>
              近三天漏巡数：{{ watchData.threeDaysNotCompleteNum }}
            </div>
            <div>
              正常设备数：{{ watchData.normalDeviceNum }}
            </div>
            <div>
              问题设备数：{{ watchData.problemDeviceNum }}
            </div>
          </div>
        </div>
        <div
          v-for="(item,index) in videoList"
          :key="index"
          class="equipment-item pdd-20"
          @click="jumpUrl"
        >  
          <div class="flex j-between">
            <div class="id pdd-b-10">
              设备ID：{{ item.ftaskCode }}
            </div>
            <div
              class="id pdd-b-10"
              :style="item.patrollingState == 0? 'color: red;' : 'color: green;'"
              v-text="item.patrollingState == 0 ? '待巡更' : '已完成'"
            />
          </div>
          <div class="time pdd-b-10">
            任务计划开始时间：{{ item.fstartTime }}
          </div>
          <div class="time pdd-b-10">
            任务计划结束时间：{{ item.fendTime }}
          </div>
          <div class="time pdd-b-10">
            任务说明：{{ item.ftaskExplain }}
          </div>
          <div class="time pdd-b-10">
            设备安装位置：{{ item.fareaAddress }} {{ item.fsecondPosition }}
          </div>
          <div class="time pdd-b-10">
            设备巡检完成时间：{{ getformatTime(item.foperationTime) }}
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
          patrolshiftsId: '',
          watchData: []
      }
  },
  onLoad(opt) {
    if(wx.getStorageSync('patrolshiftsId')) {
        this.patrolshiftsId = wx.getStorageSync('patrolshiftsId')
    }else {
        wx.setStorage({
            key: 'patrolshiftsId',
            data: opt.patrolshiftsId
        })
        this.patrolshiftsId = opt.patrolshiftsId
    }
    this.getvideoList(this.patrolshiftsId)
  },
  onShow() {
  },

  methods: {
    async getvideoList(patrolshiftsId) {
      try {
        let res = await this.$request.post('/patrolshifts/getPatrolshiftsDeviceMessage.do', {patrolshiftsId: patrolshiftsId})
        this.videoList = res.data.facilitypatrolDeviceMessageDto
        this.watchData = res.data
      } catch (error) {
      }
    },
    getformatTime(time) {
      if(time) {
        return formatTime(time, 'Y-M-D h:m:s')
      }
      return '无'
      
    },
    scanBtn() {
      wx.scanCode({
        success: (res) => {
          const result = res.result
          wx.navigateTo({
            url: `/pages/taskDetail/index?result=${result}&patrolshiftsId=${this.patrolshiftsId}`
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
    width: 662rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 50rpx;
    color: #1D7FFD;
    background:#fff;
    margin: 40rpx auto 0;
  }
}
</style>