<template>
  <div class="alarm-page flex column">
    <div class="alarm-info mrg-center ">
      <div class="alarm-adress flex j-between">
        <div class="flex flex_1 a-center" />
        <div class="alarm-number pdd-lr-25">
          <div>负责人 ：{{ websocketData.homeManager }}</div> 
          <div>负责人电话 ：{{ websocketData.homeManagerPhone }}</div> 
          <!-- <span class="number pdd-lr-25" /> -->
        </div>
      </div>
      <div class="alarm-detail flex j-between a-center mrg-tb-25">
        <div class="flex flex_1 a-center">
          <div class="detail-icon flex a-center j-center tex-center">
            <image
              class="icon"
              src="/static/png/smoke.png"
            />
          </div>
        </div>
        <div class="alarm-arrow flex a-center pdd-lr-25">
          <!-- 警报设备详情 
          <image
            class=" pdd-l-24"
            src="/static/png/arrow-white.png"
          /> -->
          该设备警报请尽快处理
        </div>
      </div>
      <div>警报时间：{{ websocketData.alarmTime }}</div>
      <div class=" ">
        {{ websocketData.placeName }}{{ websocketData.facilitySecondPosition }}
        发生
        <span
          class="warnColor"
          v-text="websocketData.fState == '1' ? '警告!' : '拆卸警报'"
        />
      </div>
      <div>当前场所警报统计：{{ number }}</div>
    </div>
    <div class="alarm-tip mrg-center flex a-center j-between pdd-lr-20 mrg-b-40">
      <div class="flex a-center j-between">
        <image
          class="info-img"
          src="/static/png/alarm.png"
        />
        <div
          class="pdd-l-40"
          @click="jumpUrl('comfirmAlarm')"
        >
          确认当前场所是否发生警报事件？
        </div>
      </div>  
      <image
        class="alarm-arrow"
        src="/static/png/arrow-red.png"
      />
    </div>
    <!-- <div class="icon-container flex a-center j-between">
      <image
        src="/static/png/video-icon.png"
        @click="jumpUrl('videoList')"
      />
      <image
        src="/static/png/direction-icon.png"
        @click="jumpUrl('position')"
      />
    </div> -->


    
    <div class="alarm-list mrg-center ">
      <div class="list-title flex j-between a-center pdd-lr-20">
        <div class="flex a-center">
          <image
            class="pdd-r-20"
            src="/static/png/history.png"
          />
          历史警报
        </div>
        <!-- <image
          class="arrow"
          src="/static/png/arrow.png"
        /> -->
      </div>
      <div class="equipment-item mrg-b-40 pdd-20">
        <scroll-view
          :style="{'height': '400rpx'}"
          :scroll-y="true"
        >
          <div
            v-for="(item, index) in warnList"
            :key="index"
            class="flex j-between pdd-tb-20 mrg-lr-25 border_b"
          >
            <div class="flex">
              <image
                class="mrg-r-20"
                src="/static/png/alarmicon.png"
              />
              <div class="time pdd-b-5">
                {{ item.alarmTime }}
              </div>
            </div>
            <div>
              {{ item.text }}
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getParams
} from "@/utils/index";
export default {
  components: {
  },
  data() {
      return {
          tab: 'home',
          params: {},
          warnList: [],
          websocketData: {},
          number: 1
      }
  },
  onLoad(opt) {
    // console.log(opt)
    // opt.websocketData = wx.getStorageSync('websocketData')
    this.websocketData = JSON.parse(wx.getStorageSync('websocketData'))
    this.number = opt.number
    console.log(this.websocketData)
    this.params = wx.getStorageSync('userAddress')
    this.getWarningTask()
  },
  onShow() {
    
  },

  methods: {
    async getWarningTask() {
      let params = getParams(this.params)
      params['page'] = 1
      params['userId'] = wx.getStorageSync('userId') || 2002131059424992
      try {
        let res = await this.$request.post('/facilityInfo/countFacilityWarningTaskTo30DaysGZ.do', params)
        this.changeData(res)
      } catch (error) {
      }
    },
    changeData(list){
      this.warnList = list.map(e => {
        switch (e.facilityType) {
            case '0':
            e['text'] = '烟感警报'
            break;
            case '1':
            e['text'] = '气感警报'
            break;
            case '2':
            case '5':
            case '6':
            e['text'] = '液位液压警报'
            break;
            case '3':
            e['text'] = '电感警报'
            break;
            case '4':
            e['text'] = '监控警报'
            break;
            case '7':
            e['text'] = '消防栓警报'
            break;
            default:
            e['text'] = '烟感警报'
        }
        if (e.reason == 1 || !e.reason) {
            switch (e.fConfirmState) {
                case '0':
                    e['Result'] = '未确认'
                    break;
                case '1':
                    e['Result'] = '已确认'
                    break;
                case '2':
                    e['Result'] = '已完成'
                    break;
            }
            if (e.fFireOverState == '1') {
                e['Result'] = '已完成'
            }
        }

        if (e.reason == 10) {
            switch (e.fFireOverState) {
                case '0':
                    e['Result'] = '未恢复'
                    break;
                case '1':
                    e['Result'] = '已恢复'
                    break;
            }
        }
         return e
      })
    },
    jumpUrl(str) {
      switch (str) {
        case 'comfirmAlarm':
         let websocketData = JSON.stringify(this.websocketData)
          wx.navigateTo({
            url: `/pages/information/index?websocketData=${websocketData}`
          });
          break;
        case 'videoList':
          wx.navigateTo({
            url: `/pages/monitorpage/index?fentityFacilityID=${this.websocketData.facilityId}`
          });
          break;
        case 'position':
          // console.log(`/pages/sendPosition/index?positionX=${this.websocketData.positionX}&positionY=${this.websocketData.positionY}&isalarm=true`)
          // wx.navigateTo({
          //   url: `/pages/sendPosition/index`
          // });
          this.$router.push({
            query: { positionX: this.websocketData.positionX, positionY: this.websocketData.positionY, isalarm: true},
            path: "/pages/position/sendPosition"
          });
          break;
          
      }
    }
  }
  }
</script>
<style lang="less" scoped>
.alarm-page {
  height: 100vh;
  background: #fff;
  .icon{
      width: 26rpx;
      height: 36rpx;
    }
  .alarm-info{
      width: 686rpx;
      background:linear-gradient(270deg, #FC3D3B 0%,#FC7B72 100%);
      padding: 20rpx 0 0 24rpx;
      color: #fff;
      height: 331rpx;
      border-radius: 20rpx;
      font-size: 26rpx;
      .adress-width{
        max-width: 300rpx;
      }
      .alarm-adress{
          height: 60rpx;
          font-size: 26rpx;
          .arrow-right{
              width:13rpx;
              height:22rpx;
          }
          .alarm-number{
              width: 307rpx;
              height: 80rpx;
              line-height: 40rpx;
              background: #FF9E9D;
              border-radius: 40rpx 0 0 40rpx;
              font-size:22rpx;
              .number{
                  font-size: 36rpx;
                  font-weight: bold;
              }
          }
      }
      .alarm-detail{
          height: 100rpx;
          .detail-icon{
              height: 100rpx;
              width: 100rpx;
              border-radius: 50rpx;
              background: #fff;
              .icon{
                  height: 44rpx;
                  width: 36rpx;
              }
          }
          .alarm-arrow{
              width: 237rpx;
              height: 60rpx;
              line-height: 60rpx;
              background: #FF9E9D;
              border-radius: 40rpx 0 0 40rpx;
              font-size:22rpx;
              image{
                  width:13rpx;
                  height:22rpx;
              }
          }
      }
      
    .time-change{
        width: 662rpx;
        height: 80rpx;
        font-size: 26rpx;
        border-radius: 50rpx;
        background: #629DFB;
        margin-bottom: 40rpx;
        .change-item{
          height: 80rpx;
          line-height: 80rpx;
        } 
        .change-active{
          border-radius: 50rpx;
          background: #fff;
          color: #3451FD;
        }
    }
  }
  .alarm-tip{
    width: 622rpx;
    height: 88rpx;
    font-size: 26rpx;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    background: #FFEDEF;
    color: #3E4A59;
    box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
    .info-img{
      width: 31rpx;
      height: 36rpx;
    }
    .alarm-arrow{
        width: 13rpx;
        height: 22rpx;
    }
    .info-number{
      font-size:44rpx;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(52,81,253,1);
    }
  }
  .icon-container{
      width: 500rpx;
      padding: 0 60rpx;
      height: 200rpx;
      margin: 0 auto;
      image{
          width: 132rpx;
          height: 132rpx;
      }
  }
  .alarm-list {
      .list-title{
        height: 80rpx;
        background:#E9F0FF;
        border-radius:10px 10px 0px 0px;
        // opacity:0.1;
        image {
            width: 36rpx;
            height: 36rpx;
        }
      }
      color: #3E4A59;
      .equipment-item{
        width: 662rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:20rpx;
        color: #3E4A59;
        .time{
          font-size: 26rpx;
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
  .arrow{
        width: 13rpx !important;
        height: 22rpx !important;
    }
}
</style>