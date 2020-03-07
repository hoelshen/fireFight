<template>
  <div class="equipmentlist-page flex column">
    <div class="information-header">
      <image
        class="icon mrg-b-40"
        src="/static/png/left-arrow.png"
      />
      <div class="flex time-change mrg-center j-center a-center">
        <div class="flex_1 tex-center change-item change-active">
          全部告警
        </div>
        <div class="flex_1 tex-center">
          选择
        </div>
        <div class="flex_1 tex-center">
          回到今天
        </div>
      </div>
      <div class="flex time-change mrg-center j-center a-center">
        <div class="flex_1 tex-center change-item change-active">
          全部告警
        </div>
        <div class="flex_1 tex-center">
          选择
        </div>
        <div class="flex_1 tex-center">
          回到今天
        </div>
      </div>
    </div>
    <div class="equipment-info mrg-center flex a-center pdd-lr-20 mrg-b-40">
      <image
        class="info-img"
        src="/static/png/smoke.png"
      />
      <div class="pdd-l-40">
        <div>安装数量:</div>
        <div><span class="info-number">8675</span>个</div>
      </div>
    </div>
    <div class="equipment-list mrg-center ">
      <div class="equipment-item mrg-b-40 pdd-20">
        <div class="flex">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div>
            <div class="name pdd-b-5">
              设备：宁泰家园设备1号
            </div>
            <div class="id pdd-b-5">
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
          </div>
        </div>
      </div>


      <div class="equipment-item mrg-b-40 pdd-20">
        <div class="flex">
          <image
            class="mrg-r-20"
            src="/static/png/smoke.png"
          />
          <div>
            <div class="name pdd-b-5">
              设备：宁泰家园设备1号
            </div>
            <div class="id pdd-b-5">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          tab: 'home'
      }
  },
  onLoad(opt) {
  },
  onShow() {
    console.log(1)
    this.getList()
  },

  methods: {
    async getList() {
      this.$request
      //   /facilityInfo/queryFacilityListByType.do
        .post("/user/getUserAddress.do", { userId: 2002131059424992})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    }
  }
  }
</script>
<style lang="less" scoped>
.equipmentlist-page {
  height: 100vh;
  .information-header{
      height: 400rpx;
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
      .equipment-item{
        width: 662rpx;
        background:rgba(255,255,255,1);
        box-shadow:0px 9px 32px 0px rgba(51,83,253,0.1);
        border-radius:20rpx;
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