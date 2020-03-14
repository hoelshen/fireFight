<template>
  <div class="equipmentlist-page">
    <div class="equipmentlist-header mrg-center flex j-between a-center">
      <div
        v-for="(item, index) in timeArr"
        :key="index"
        class="header-item flex_1 flex a-center tex-center j-center"
        :class="index == action ? 'item-atcion' : ''"
        @click="changeItem(index)"
      >
        <div v-if="index !=1 ">
          {{ item.title }}
        </div>
        <picker
          v-else
          mode="date"
          @change="bindDateChange"
        >
          <div class="index_picker">
            <div class="">
              选择
            </div>
            <div class="">
              {{ changeTime }}
            </div>
          </div>
        </picker>
      </div>  
    </div>


    <div class="equipmentlist-header mrg-center flex j-between a-center">
      <div
        v-for="(item, index) in dayArr"
        :key="index"
        class="header-item flex_1 flex a-center tex-center j-center"
        :class="index == dayAction ? 'item-atcion' : ''"
        @click="changedayItem(item,index)"
      >
        {{ item.title }}
      </div>  
    </div>

    <!-- <div class="equipmentlist-header mrg-center flex j-between a-center">
      <div
        v-for="(item, index) in timeArr"
        :key="index"
        class="header-item flex_1 flex a-center tex-center j-center"
        :class="index == action ? 'item-atcion' : ''"
        @click="changeItem(index)"
      >
        {{ item.title }}
      </div>
    </div> -->
    <scroll-view
      :style="{'height': '85%'}"
      :scroll-y="true"
    >
      <div class="equipment-info mrg-center flex a-center pdd-lr-20 mrg-b-40">
        <image
          v-if="type == '0'"
          class="info-img"
          src="/static/png/smoke.png"
        />
        <image
          v-if="type == '3'"
          class="info-img"
          src="/static/png/electron.png"
        />
        <image
          v-if="type == '1'"
          class="info-img"
          src="/static/png/co.png"
        />
        <image
          v-if="type == '2'"
          class="info-img"
          src="/static/png/hydraulic.png"
        />
        <image
          v-if="type == '7'"
          class="info-img"
          src="/static/png/fireHydrant.png"
        />
        <image
          v-if="type == '4'"
          class="info-img"
          src="/static/png/video.png"
        />
        <image
          v-if="type == '8'"
          class="info-img"
          src="/static/png/iot.png"
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
              v-if="type == '0'"
              class="mrg-r-20"
              src="/static/png/smoke.png"
            />
            <image
              v-if="type == '3'"
              class="mrg-r-20"
              src="/static/png/electron.png"
            />
            <image
              v-if="type == '1'"
              class="mrg-r-20"
              src="/static/png/co.png"
            />
            <image
              v-if="type == '2'"
              class="mrg-r-20"
              src="/static/png/hydraulic.png"
            />
            <image
              v-if="type == '7'"
              class="mrg-r-20"
              src="/static/png/fireHydrant.png"
            />
            <image
              v-if="type == '4'"
              class="mrg-r-20"
              src="/static/png/video.png"
            />
            <image
              v-if="type == '8'"
              class="mrg-r-20"
              src="/static/png/iot.png"
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
  getParams,
  getNowFormatDate,
  getRecentlyDay
} from "@/utils/index";
export default {
  data() {
      return {
          tab: 'home',
          listByType: [],
          params: '',
          timeArr: [{title:'全部设备'}, {title:'选择时间'}, {title:'回到今天'}],
          dayArr: [{title:'近3日' ,value: -3}, {title:'近7日' ,value: -7}, {title:'近30日' ,value: -30}],
          action: 0,
          dayAction: 0,
          changeTime: ''
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
    async getList(creatTime,startTime,endTime) {
      console.log(creatTime,startTime,endTime)
      let params = getParams(this.params)
      if (this.type == 0) params['sum'] = 0
      params['type'] = this.type
      params['userId'] = wx.getStorageSync('userId') || 2002131059424992
      if(creatTime) params['createTime'] = creatTime
      if(startTime) params['startTime'] = startTime
      if(endTime) params['endTime'] = endTime
      this.$request
        .post("facilityInfo/queryFacilityListByType.do", params)
        .then(res => {
          this.listByType = res
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    },
    async jumpDetail({fType, facilityinfoId, isOnline}) {
      wx.navigateTo({
        url: `/pages/dataDetail/index?fType=${fType}&facilityinfoId=${facilityinfoId}&isOnline=${isOnline}`
      });
    },
    changeItem(i) {
      this.action = i
      if(i == 0) {
        this.getList()
      }else if(i == 2) {
        this.getList(getNowFormatDate())
      }
    },
    changedayItem(item, i) {
      this.dayAction = i
      console.log(getRecentlyDay(item.value))
      this.getList('', getRecentlyDay(item.value), getNowFormatDate())
    },
    bindDateChange(e) {
      this.getList(e.detail.value)
    }
  }
  }
</script>
<style lang="less" scoped>
.equipmentlist-page {
  height: 100vh;
  background: #1D7FFD;
  .equipmentlist-header{
      height: 80rpx;
      width: 662rpx;
      background: #619FFC;
      color: #fff;
      border-radius: 40rpx;
      margin-bottom: 20rpx;
      .item-atcion{
        height: 80rpx;
        color: #619FFC;
        background: #fff;
        border-radius: 40rpx;
      }
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
    margin: 24rpx 0 20rpx 24rpx;
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