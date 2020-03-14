<template>
  <div class="information-page flex column">
    <div class="information-container">
      <div class="warn mrg-b-40">
        确认当前场所是否发生告警事件？
      </div>
      <div class="content mrg-center pdd-40">
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div> {{ websocketData.text }}告警</div>
        </div>
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/equipmenticon.png"
          />
          <div>设备：{{ websocketData.areaName }}</div>
        </div>
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/positionBlue.png"
          />
          <div>位置：{{ websocketData.placeName }}</div>
        </div>
        <div class="flex mrg-b-40">
          <image
            class="mrg-r-20"
            src="/static/png/alarmicon.png"
          />
          <div>告警时间：{{ websocketData.alarmTime }}</div>
        </div>
        <div
          v-if="websocketData.fState == '1'"
          class="flex btn-container j-between"
        >
          <div
            class="warn-btn tex-center"
            @click="showconfirmBtn('2')"
          >
            确认为预警
          </div>
          <div
            class="warn-btn tex-center right"
            @click="showconfirmBtn('1')"
          >
            确认为火情
          </div>
        </div>
        <div
          v-else
          class="confirm tex-center mrg-center"
          @click="showconfirmBtn('4')"
        >
          确认收到拆卸告警
        </div>
        <image />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          tab: 'home',
          userId: '',
          infoTop: {title: '告警信息', haveInfo: true, showNext: true, fState: '11', warnAdress: '', homeManager: '', homeManagerPhone: '', infoArr: [{title: '告警时间', key: 'alarmTime', val: '无', showColor: false, showHead: true, showtitle: true}, {title: '告警设备类型：', key: 'facilityType', val: '无', showColor: true, showHead: false, showtitle: true}, {title: '所在场所：', key: 'placeName', val: '无', showColor: true, showHead: false, showtitle: true}]},
      }
  },
  onLoad(opt) {
    this.websocketData = JSON.parse(opt.websocketData)
    this.userId = wx.getStorageSync('userId')
    this.getwarnInfo()
  },
  onShow() {
  },

  methods: {
    getwarnInfo() {
      Object.keys(this.websocketData).forEach(e => {
        if (e == 'facilityType') {
          switch (this.websocketData[e]) {
            case '0':
              this.websocketData['text'] = '智能烟感'
              break;
            case '1':
              this.websocketData['text'] = '智能气感'
              break;
            case '2':
            case '5':
              this.websocketData['text'] = '液压液位检测'
              break;
            case '3':
              this.websocketData['text'] = '智慧用电'
              break;
            case '4':
              this.websocketData['text'] = '监控'
              break;
            case '6':
              this.websocketData['text'] = '液压液位检测'
              break;
            case '7':
              this.websocketData['text'] = '智能消防栓'
              break;
            default:
              this.websocketData['text'] = '智能消防栓'
          }

        }
      })
    },
    showconfirmBtn(str) {
      let self = this
      if (str == '4') {
        self.confirmBtn(str)
      } else {
         let desc = str == '1' ? '真实火情是指已经产生明火燃烧发生了真实火灾，请务必谨慎确认。' : '设备预警是指由于环境或人为等因素干扰而产生的正常设备告警，确认设备预警后，相应的“告警异常”状态会自动解除，从而恢复正常的安全状态。'
          wx.showModal({
            title: '提示',
            content: desc,
            success (res) {
              if (res.confirm) {
                console.log(str, self)
                self.confirmBtn(str)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
      }
    },

    async confirmBtn(str) {
      console.log(str)
      let message
      let postUrl
      if (str == '4') {
        message = '拆卸已恢复'
        postUrl = '/realTimeAlarm/confirmAlarmOverChaiXie.do'
      } else {
        message = str == '1' ? '火情已确认' : '预警已确认'
        postUrl = '/realTimeAlarm/confirmAlarm.do'
      }

      let params = {
        facilityID: this.websocketData.facilityId,
        type: this.websocketData.facilityType,
        logID: this.websocketData.logId,
        userId: this.userId,
        state: str,
        tableType: this.websocketData.tableType,
        timestamp: new Date().getTime(),
        fTime: this.websocketData.alarmTime
      }
      try {
        let res = await this.$request.post(postUrl, params)
        if (res.state == '0') {
          wx.showToast({
            title: message,
            icon: "none"
          });
          wx.removeStorage({
          key: 'websocketData',
          success(res) {
            wx.switchTab({
              url: `/pages/home/index`
            }); 
          }
        })
        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          });
        }
      } catch (error) {
      }
    }
  }
  }
</script>
<style lang="less" scoped>
.information-page {
  height: 100vh;
  .information-container{
      height: 100%;
      background: #1D7FFD;
      padding: 20rpx 25rpx 0;
      color: #fff;
    .icon{
        width: 26rpx;
        height: 36rpx;
    }
    .warn{
        font-weight:bold;
        font-size: 40rpx;
    }
    .content {
        // width:702rpx;
        height:1000rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:10px;
        color: #3E4A59;
        image{
            width: 36rpx;
            height: 36rpx;
        }
        .confirm{
            width: 479rpx;
            height: 80rpx;
            line-height: 80rpx;
            border-radius: 50rpx;
            color: #fff;
            margin-top: 300rpx;
            background:linear-gradient(270deg,#1E99EB 0%,#3055FD 100%);
        }
        .btn-container{
          margin-top: 300rpx;
          .warn-btn{
            width: 279rpx;
            height: 80rpx;
            line-height: 80rpx;
            border-radius: 50rpx;
            color: #fff;
            background: #E78E1D;
            &.right{
                background:linear-gradient(90deg,#E78E1D 0%,#BE4D9E 100%);
            }
          }
          
        }
        
    }
  }
}
</style>