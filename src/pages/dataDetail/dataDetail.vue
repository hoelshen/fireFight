<template>
  <div class="detail-page flex column">
    <div class="information-header">
      <!-- <div>
        <Adress-info />
      </div> -->
    </div>
    <div class="equipment-list mrg-center ">
      <div class="equipment-item mrg-b-40 pdd-20">
        <div class="flex">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div>
            <div class="flex j-between mrg-b-10 a-center">
              <div
                class="btn tex-center"
                :style="{background:facilityInfo.state != 'null' ?'rgba(34,172,56,1)':'gray'}"
                v-text="facilityInfo.state != 'null' ? '在线':'离线'"
              />
              <div
                v-if="type != 4"
                v-text="facilityInfo.BatteryLevel ? '电量：'+facilityInfo.BatteryLevel+'%' : '电量：100%'"
              />
              <!-- <div v-else>
                <image
                  src="/static/png/playvideo.png"
                  @click="playVideo"
                />
              </div> -->
            </div>
            <div
              v-show="showVideo"
            >
              <video
                id="video"
                controls
                poster
                playsInline
                webkit-playsinline
                autoplay
              >
                <source
                  :src="adress"
                  class="AVURL"
                  type="application/x-mpegURL"
                >
                <source
                  :src="adress_f"
                  class="AVURL"
                  type=""
                >
              </video>
            </div>
            <div
              v-for="(item, index) in facilityInfo.info"
              :key="index"
              class="name pdd-b-10"
            >
              {{ item.title }}：{{ item.value }}
            </div>
            <div v-if="type == 0 || type == 1">
              <div class="pdd-b-10">
                心跳信息: <span v-text="dataInfo.xtTime ? dataInfo.xtTime: '无'" />
              </div>
              <div class="pdd-b-10">
                利用率: <span v-text="dataInfo.LinkUtilization ? dataInfo.LinkUtilization: '无'" />
              </div>
              <div class="pdd-b-10">
                物理小区标示: <span v-text="dataInfo.pci ? dataInfo.pci: '无'" />
              </div>
              <div class="pdd-b-10">
                传感器级别: <span v-text="dataInfo.sinr ? dataInfo.sinr: '无'" />
              </div>
              <div class="pdd-b-10">
                网络承载: <span v-text="dataInfo.rspr ? dataInfo.rspr: '无'" />
              </div>
              <div class="pdd-b-10">
                链接质量: <span v-text="dataInfo.ecl ? dataInfo.ecl: '无'" />
              </div>
            </div>
            <div v-if="type == 3">
              <div class="pdd-b-10">
                漏电流: <span v-text="dataInfo.L ? dataInfo.L: '0' + '(<500mA为正常)'" />
              </div>
              <div class="pdd-b-10">
                电流A: <span v-text="dataInfo.CA ? dataInfo.CA: '0'" />
              </div>
              <div class="pdd-b-10">
                电流B: <span v-text="dataInfo.CB ? dataInfo.CB: '0'" />
              </div>
              <div class="pdd-b-10">
                电流C: <span v-text="dataInfo.CC ? dataInfo.CC: '0'" />
              </div>
              <div class="pdd-b-10">
                温度A: <span v-text="dataInfo.T1 ? dataInfo.T1: '0'" />
              </div>
              <div class="pdd-b-10">
                温度B: <span v-text="dataInfo.T2 ? dataInfo.T2: '0'" />
              </div>
              <div class="pdd-b-10">
                温度C: <span v-text="dataInfo.T3 ? dataInfo.T3: '0'" />
              </div>
              <div class="pdd-b-10">
                温度D: <span v-text="dataInfo.T4 ? dataInfo.T4: '0'" />
              </div>
            </div>
            <div v-if="type == 7">
              <div class="pdd-b-10">
                液压: <span v-text="dataInfo.fWaterPressure ? dataInfo.fWaterPressure: '0' + '(>0.07Mpa为正常)'" />
              </div>
            </div>
            <div v-if="type == 6 || type == 2">
              <div class="pdd-b-10">
                液压: <span v-text="dataInfo.unitvalues ? dataInfo.unitvalues: '0' + '(>0.06Mpa为正常)'" />
              </div>
            </div>
            <!-- <div class="id pdd-b-5">
              ID：123456
            </div>
            <div class="time pdd-b-5">
              安装时间：2020-02-11 12:59:00
            </div>
            <div class="time pdd-b-5">
              安装位置：2020-02-11 12:59:00
            </div>
            <div class="btn tex-center ">
              安装
            </div> 
            <script src="../../static/ezuikit.js" ></script>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatTime
} from "@/utils/index";
import AdressInfo from "@/components/adressInfo";
import {demo} from "@/static/ezuikit.js";
export default {
  components: {
    // AdressInfo
  },
  data() {
      return {
          type: "0",
          dataInfo: [],
          facilityInfo:{
            state: '',
            BatteryLevel: '',
            info: []
          },
          adress: '',
          adress_f: '',
          showVideo: false

      }
  },
  onLoad(opt) {
    // opt = {
    //   facilityinfoId: "2002151524222011",
    //   fType: "0"
    // }
    this.type = opt.fType
    this.getdetailData(opt)
  },
  onShow() {
    
  },

  methods: {
    getdetailData({fType, facilityinfoId, isOnline}) {
      this.$request
        .post("/facilityInfo/queryFacilityInfo.do", { type: fType,facilityinfoId: facilityinfoId})
        .then(res => {
          this.dataInfo = res[0]
          this.facilityInfo = {
            state: isOnline,
            BatteryLevel: res[0].BatteryLevel,
            info: [
              {'title': '告警时间', 'value': res[0].fTime ? formatTime(res[0].fTime, 'Y/M/D h:m:s') : '无'},
              {'title': '备注', 'value': res[0].fAlias || '无'},
              {'title': 'IMEI', 'value': res[0].ModelNumber || '无'},
              {'title': '设备ID', 'value': res[0].facilityinfoId || '无'},
              {'title': '安装时间', 'value': formatTime(res[0].CreateTime, 'Y/M/D h:m:s') || '无'},
              {'title': '安装位置', 'value': res[0].facilitySecondPosition || '无'}
              ]
          }
          console.log(this.facilityInfo)
          this.adress = res[0].fLiveAddress
          this.adress_f = res[0].fRtmp
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    },
    playVideo() {
      console.log(demo)
      let yplayz = new EZUIPlayer('video');
      console.log(yplayz)
      this.showVideo = true
    }
  }
  }
</script>
<style lang="less" scoped>
.detail-page {
  height: 100vh;
  .information-header{
      height: 90rpx;
      background: #1D7FFD;
      padding: 20rpx 25rpx 0;
      color: #fff;
    .icon{
        width: 26rpx;
        height: 36rpx;
    }
  }
  .equipment-info{
    width: 662rpx;
    height: 148rpx;
    font-size: 26rpx;
    border-radius: 10rpx;
    background: #fff;
    box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
    margin: -60rpx 0 20rpx 24rpx;
    .info-img{
      width: 72rpx;
      height: 88rpx;
    }
    .info-number{
      font-size:44rpx;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(52,81,253,1);
    }
  }
  .equipment-list {
      color: #3E4A59;
      .equipment-item{
        width: 662rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:20rpx;
        font-size: 24rpx;
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
  .arrow{
        width: 13rpx !important;
        height: 22rpx !important;
    }
}
</style>