<template>
  <div class="equipmentlist-page flex column">
    <scroll-view
      :style="{'height': '100%'}"
      :scroll-y="true"
    >
      <div class="equipment-list mrg-center ">
        <div
          v-for="(item,index) in videoList"
          :key="index"
          class="equipment-item pdd-20"
          @click="jumpUrl(item)"
        >  
          <div class="flex j-between">
            <div class="id pdd-b-10">
              巡更员：{{ item.userName }}
            </div>
            <div
              class="id pdd-b-10"
              v-text="item.fstate == 0 ? '启动' : '停用'"
            />
          </div>
          <div class="time pdd-b-10">
            区域名称：{{ item.areaName }}
          </div>
          <div class="time pdd-b-10">
            场所名称：{{ item.placeAreaName }}
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import {
  formatTime
} from "@/utils/index";
export default {
  name: 'WatchCont',
  data() {
      return {
          userId: '',
          videoList: [],
          actionIndex: '',
          showVideo: false
      }
  },
  onLoad(opt) {
    this.userId = wx.getStorageSync('userId')
    this.getvideoList()
  },
  onShow() {
    
  },

  methods: {
    async getvideoList() {
      this.userId = wx.getStorageSync('userId')
      try {
        let res = await this.$request.post('/patrolshifts/getPatrolshiftsTask.do', {userId: this.userId})
        this.videoList = res.data
      } catch (error) {
      }
    },
    jumpUrl({patrolshiftsId}) {
      wx.removeStorage({
        key: 'patrolshiftsId',
        success(res) {
          wx.navigateTo({
            url: `/pages/watchTask/index?patrolshiftsId=${patrolshiftsId}`
          });
        }
      })
    },
    getformatTime(time) {
      return formatTime(time, 'Y-M-D h:m:s')
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
}
</style>