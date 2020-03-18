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
        >
          <div class="flex">
            <image
              class="mrg-r-20"
              src="/static/png/fireHydrant.png"
            />
            <div>
              <div style="text-align: right; width：600rpx">
                <image
                  :src="showVideo && actionIndex == index?'/static/png/pause.png' : '/static/png/play.png'"
                  @click="playVideo(index)"
                />
              </div>
              <video
                v-if="showVideo && actionIndex == index"
                id="video"
                controls
                poster
                playsInline
                webkit-playsinline
                autoplay
                :src="item.fhdaddress"
              />
              <div class="id pdd-b-10">
                设备ID：{{ item.fdeviceserial }}
              </div>
              <div class="time pdd-b-10">
                安装位置：{{ item.fhousenumber }}{{ item.fsecondposition }}
              </div>
              <div class="time pdd-b-10">
                安装时间：{{ getformatTime(item.fcreateTime) }}
              </div>
            </div>
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
  data() {
      return {
          videoList: [],
          actionIndex: '',
          showVideo: false
      }
  },
  onLoad(opt) {
    this.getvideoList(opt.fentityFacilityID)
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
    playVideo(i) {
      this.actionIndex = i
      this.showVideo = !this.showVideo
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
      #video {
        width: 560rpx;
      }
  }
}
</style>