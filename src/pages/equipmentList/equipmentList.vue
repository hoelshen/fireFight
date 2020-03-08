<template>
  <div class="equipmentlist-page flex column">
    <scroll-view
      :style="{'height': '100vh'}"
      :scroll-y="true"
    >
      <div class="information-header">
        <!-- <image
          class="icon mrg-b-40"
          src="/static/png/left-arrow.png"
        /> -->
      </div>
      <div class="equipment-info mrg-center flex a-center pdd-lr-20 mrg-b-40">
        <image
          class="info-img"
          src="/static/png/smoke.png"
        />
        <div class="pdd-l-40">
          <div>安装数量:</div>
          <div><span class="info-number">{{ listByType.length }}</span>个</div>
        </div>
      </div>
      <div class="equipment-list mrg-center ">
        <div
          v-for="(item,index) in listByType"
          :key="index"
          class="equipment-item pdd-20"
          @click="jumpDetail(item)"
        >
          <div class="flex">
            <image
              class="mrg-r-20"
              src="/static/png/smoke.png"
            />
            <div>
              <div class="name pdd-b-10">
                设备：{{ item.fAname }}
              </div>
              <div class="id pdd-b-10">
                ID：{{ item.facilityinfoId }}
              </div>
              <div class="time pdd-b-10">
                安装位置：{{ item.placeAddress }}{{ item.facilitySecondPosition }}
              </div>
              <div
                class="btn tex-center "
                :style="{background:item.isOnline?'rgba(34,172,56,1)':'gray'}"
                v-text="item.isOnline?'在线':'离线'"
              />
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
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
          params: ''
      }
  },
  onLoad(opt) {
    this.type = opt.type
    this.params = wx.getStorageSync('userAddress')
    this.getList()
  },
  onShow() {
  },

  methods: {
    async getList() {
      let params = getParams(this.params)
      if (this.type == 0) params['sum'] = 0
      params['type'] = this.type
      params['userId'] = getApp().globalData.user.userID || 2002131059424992
      this.$request
        .post("/facilityInfo/queryFacilityListByType.do", params)
        .then(res => {
          this.listByType = res
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    },
    async jumpDetail({fType, facilityinfoId, isOnline}) {
      console.log(fType, facilityinfoId, isOnline)
      wx.navigateTo({
        url: `/pages/dataDetail/index?fType=${fType}&facilityinfoId=${facilityinfoId}&isOnline=${isOnline}`
      });
    }
  }
  }
</script>
<style lang="less" scoped>
.equipmentlist-page {
  height: 100vh;
  .information-header{
      height: 120rpx;
      background: #1D7FFD;
      padding: 20rpx 25rpx 0;
      color: #fff;
    .icon{
        width: 26rpx;
        height: 36rpx;
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
  }
}
</style>