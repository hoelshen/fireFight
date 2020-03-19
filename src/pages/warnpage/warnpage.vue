<template>
  <div class="equipmentlist-page">
    <scroll-view
      :style="{'height': '100%'}"
      :scroll-y="true"
    >
      <div class="equipment-list mrg-center ">
        <div
          v-for="(item,index) in warnList"
          :key="index"
          class="equipment-item pdd-20"
        >
          <div class="name pdd-b-10 flex j-between">
            <div>
              警报设备：{{ item.text }}
            </div>
            <div
              class="btn-text tex-center"
            >
              {{ item.Result }}
            </div>
          </div>
          <div class="time pdd-b-10">
            警报时间：{{ item.alarmTime }}
          </div>
          <div class="time pdd-b-10">
            警报地址：{{ item.placeAddress }}{{ item.placeName }}{{ item.facilitySecondPosition }}
          </div>
          <div class="time pdd-b-10 flex">
            警报原因：
            <div
              v-if="item.reason"
              v-text="item.reason == '1' ? '烟雾警报': '拆卸警报'"
            />
            <div
              v-else
            >
              无
            </div>
          </div>
          <div class="time pdd-b-10">
            联系人：{{ item.placePrincipal }}
          </div>
          <div class="time pdd-b-10">
            联系人电话：{{ item.placePrincipalPhone }}
          </div>
          <div class="time pdd-b-10 flex">
            处理人：
            <div v-text="item.fConfirmState == '0'? '(未处理)': item.fOperatorUserName" />
          </div>
          <div class="time pdd-b-10 flex">
            处理电话：
            <div v-text="item.fConfirmState == '0'? '(未处理)': item.fOperatorUserPhone" />
          </div>
          <div class="time pdd-b-10 flex">
            处理完成时间：
            <div v-text="item.fConfirmState == '0' ? '(未完成)': item.fOperationTime" />
          </div>
          
          <!--  -->
          <div
            v-if="item.Result == '未确认'"
            class="pdd-b-10 flex btn-container"
          >
            <div
              class="btn tex-center"
              @click="confirmBtn('confirme', item)"
            >
              确认为预警
            </div>
            <div
              class="btn fire-btn tex-center"
              @click="confirmBtn('fire', item)"
            >
              确认为火警
            </div>
          </div>

          <div class="icon-container flex a-center j-between">
            <!-- <image src="/static/png/localtion-icon.png" /> -->
            <image
              src="/static/png/video-icon.png"
              @click="jumpUrl('videoList', item)"
            />
            <image
              src="/static/png/direction-icon.png"
              @click="jumpUrl('position', item)"
            />
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import {
  getParams,
  getNowFormatDate,
  getRecentlyDay
} from "@/utils/index";
export default {
  data() {
      return {
          tab: 'home',
          warnList: [],
          params: '',
          dayAction: 0,
          changeTime: '',
          userId: ''
      }
  },
  onLoad(opt) {
    this.params = wx.getStorageSync('userAddress')
    this.userId = wx.getStorageSync('userId')
    this.getList()
  },
  onShow() {
  },

  methods: {
    async getList(creatTime,startTime,endTime) {
      let params = getParams(this.params)
      params['page'] = 1
      params['userId'] = this.userId
      this.$request
        .post("/facilityInfo/countFacilityWarningTaskTo30DaysGZ.do", params)
        .then(res => {
          this.changeData(res)
          console.log(res)
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    },

    clickResult(str, i) {
      this.flag = str
      if (str == '未确认') {
        this.confirmIndex = i
        this.isConfirm = true
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


    confirmBtn(str, obj) {
      const that = this
      const message = str == 'confirme' ? '预警已确认' : '火情已确认'
      const postUrl = '/realTimeAlarm/confirmAlarm.do'
      const confirmStr = str == 'confirme' ? '设备预警是指由于环境或人为等因素干扰而产生的正常设备警报，确认设备预警后，相应的“警报异常”状态会自动解除，从而恢复正常的安全状态。' : '真实火情是指已经产生明火燃烧发生了真实火灾，请务必谨慎确认。'
      const state = str == 'confirme' ? '2' : '1'
      const params = {
        facilityID: obj.facilityId,
        type: obj.facilityType,
        logID: obj.logId,
        userId: that.userId,
        state: state,
        tableType: obj.tableType,
        timestamp: new Date().getTime(),
        fTime: obj.alarmTime
      }


      wx.showModal({
        title: '提示',
        content: confirmStr,
        success (res) {
          if (res.confirm) {
            that.postConfirm(postUrl, params, message)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    async postConfirm(postUrl, params, message, i, str) {
      try {
        let res = await this.$request.post(postUrl, params)
        if (res.state == '0') {
          this.getList()
          wx.showToast({
            title: message,
            icon: "none"
          });
        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          });
        }
      } catch (error) {
        }
    },


    jumpUrl(str, item) {
      switch (str) {
        case 'videoList':
          wx.navigateTo({
            url: `/pages/monitorpage/index?fentityFacilityID=${item.facilityId}`
          });
          break;
        case 'position':
          this.$router.push({
            query: { positionX: item.positionX, positionY: item.positionY, isalarm: true},
            path: "/pages/position/sendPosition"
          });
          break;  
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
      .equipment-item{
        width: 662rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:20rpx;
        margin: 20rpx 24rpx 10rpx;
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
        .btn-text{
          border-radius: 10rpx;
          color: #1D7FFD;
          font-size: 26rpx;
        }
        .btn{
          width: 150rpx;
          height: 60rpx;
          background: #1D7FFD;
          border-radius: 10rpx;
          color: #fff;
          line-height: 60rpx;
          font-size: 22rpx;
        }
        .fire-btn{
          background: #FF1761;
          margin-left: 40rpx;
        }
        .icon-container{
            width: 662rpx;
            // padding: 0 60rpx;
            height: 120rpx;
            margin: 0 auto;
            image{
                width: 72rpx;
                height: 72rpx;
            }
        }
      }
      image{
          width: 36rpx;
          height: 36rpx;
      }
  }
}
</style>