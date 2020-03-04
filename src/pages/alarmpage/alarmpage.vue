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
      <div>告警时间：14:43:00</div>
      <div>告警时间：14:43:00</div>
    </div>
    <div class="alarm-tip mrg-center flex a-center j-between pdd-lr-20 mrg-b-40">
      <div class="flex a-center j-between">
        <image
          class="info-img"
          src="/static/png/alarm.png"
        />
        <div class="pdd-l-40">
          确认当前场所是否发生告警事件？
        </div>
      </div>  
      <image
        class="alarm-arrow"
        src="/static/png/arrow-red.png"
      />
    </div>
    <div class="icon-container flex a-center j-between">
      <image src="/static/png/localtion-icon.png" />
      <image src="/static/png/video-icon.png" />
      <image src="/static/png/video-icon.png" />
    </div>


    
    <div class="alarm-list mrg-center ">
      <div class="list-title flex j-between a-center pdd-lr-20">
        <div class="flex a-center">
          <image
            class="pdd-r-20"
            src="/static/png/history.png"
          />
          历史告警
        </div>
        <image
          class="arrow"
          src="/static/png/arrow.png"
        />
      </div>
      <div class="equipment-item mrg-b-40 pdd-20">
        <div class="flex j-between pdd-tb-20 mrg-lr-25 border_b">
          <div class="flex">
            <image
              class="mrg-r-20"
              src="/static/png/alarmicon.png"
            />
            <div class="time pdd-b-5">
              5分钟前
            </div>
          </div>
          <div>
            智能烟感告警
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
      width: 630rpx;
      padding: 0 60rpx;
      height: 200rpx;
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