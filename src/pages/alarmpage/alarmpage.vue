<template>
  <div class="alarm-page flex column">
    <image
      class="icon mrg-b-40 pdd-l-24"
      src="/static/png/arrow-gray.png"
    />
    <div class="alarm-info mrg-center ">
      <div class="alarm-adress flex j-between">
        <div class="flex flex_1 a-center">
          <image
            class="icon"
            src="/static/png/locations.png"
          />
          <div class="pdd-lr-20">
            位置：宁泰家园
          </div>
          <image
            class="arrow-right"
            src="/static/png/arrow-white.png"
          />
        </div>
        <div class="alarm-number flex a-center pdd-lr-25">
          该场所下告警统计 
          <span class="number pdd-lr-25">2</span>
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
          告警设备详情 
          <image
            class=" pdd-l-24"
            src="/static/png/arrow-white.png"
          />
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
  },

  methods: {
  }
  }
</script>
<style lang="less" scoped>
.alarm-page {
  height: 100vh;
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
      .alarm-adress{
          height: 60rpx;
          font-size: 26rpx;
          .arrow-right{
              width:13rpx;
              height:22rpx;
          }
          .alarm-number{
              width: 287rpx;
              height: 60rpx;
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