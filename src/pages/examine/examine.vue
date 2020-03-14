<template>
  <view class="page">
    <view class="pannel">
      <div class="fireDiv">
        <div class="headerDiv flex j-between">
          <div>
            <image
              class="iconfont"
              src="/static/png/fire_todo.png"
            />
            <span class="text">
              告警任务
            </span>
          </div>
          <!-- <image
            class="iconfont"
            src="/static/png/arrow.png"
          />  -->
        </div>
        <div class="centerDiv">
          <div class="radius">
            <p class="one">
              一级
            </p>
            <p>
              低风险/安全
            </p>
          </div>
        </div>
        <div class="bottomDiv">
          <scroll-view
            :style="{'height': '600rpx'}"
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
    </view>
  </view>
</template>

<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      tab: 'fire',
      plateNum: "",
      tool_height: "",
      statusbarHeight: "",
      warnList: "",
      title_height: "",
    };
  },
  methods: {
    getData(){
      let  userId ='';
      const value = wx.getStorageSync("userAddress");
      const value2 = wx.getStorageSync("userId");

      let province = '';
      if (value) {
        province = value.province || '河北省'
        // Do something with return value
      }
      userId = value2 || '2002122108384531'
      //todo 字段获取方式
      this.$request
      .post("/facilityInfo/countFacilityWarningTaskTo30DaysGZ.do",{
        userId,
        page: 1,
        province
      })
      .then(res => {
       this.changeData(res)
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
    },
    changeData(list){
      this.warnList = list.map(e => {
        switch (e.facilityType) {
            case '0':
            e['text'] = '烟感告警'
            break;
            case '1':
            e['text'] = '气感告警'
            break;
            case '2':
            case '5':
            case '6':
            e['text'] = '液位液压告警'
            break;
            case '3':
            e['text'] = '电感告警'
            break;
            case '4':
            e['text'] = '监控告警'
            break;
            case '7':
            e['text'] = '消防栓告警'
            break;
            default:
            e['text'] = '烟感告警'
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
  },
  onShow() {
    let res = wx.getSystemInfoSync();

    let isiOS = res.system.indexOf("iOS") > -1;
    let totalBar;
    if (!isiOS) {
      const model = res.model;
      if (model.match("samsung")) {
        totalBar = 34;
      } else {
        totalBar = 36;
      }
    } else {
      const model = res.model;
      if (model.match("iPhone X")) {
        totalBar = 44;
      } else {
        totalBar = 32;
      }
    }

    // 时间、信号等工具栏的高度
    let toolBar = res.statusBarHeight;
    this.tool_height = res.statusBarHeight;
    
    // 页面title栏的高度
    this.title_height = totalBar * 2 - toolBar;
    this.getData();
  }
};
</script>

<style scoped lang="less">
.page {
  height: 100vh;
  background-color: #2E60FE;
  .pannel{
     height: 90vh;
     .fireDiv{
       margin:0 20rpx;
       background-color: #ffffff;
      .headerDiv{
        width: 710rpx;
        height:80rpx;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAr4AAABQBAMAAAANeGudAAAAG1BMVEUAAAAgf/8ccf8Sbf8eeP8XdP8Wb/8fcP8ddv8ZwFzQAAAACXRSTlMACAkOERYXGRpY6vdRAAAAs0lEQVR42u3QsY0BABiA0U8katVNoFAq1SobXHvXWUCiRjC2FRT+7r0RXtXm98X3nQ9V9aNiyH/V0sOYXbXXMOZWCwuD1q0kDPprK2HQtaOEQfdOEgY9ukgY9MzBKL9+/eLXr1/8+vWLX7/49esXv3794tevX/z6xa9fv/j16xe/fv3i1y9+/frFr1+/+PXrF79+8evXL379+sWvX7/49Ytfv37x69cvfv36xa9f/Pr1yyfedrw8OD53r34AAAAASUVORK5CYII=);
        .iconfont{
          margin:21rpx 22rpx;
          width:31rpx;
          height:36rpx;
        }
        .text{
          position: absolute;
          top: 21rpx;
        }
      }
      .centerDiv{
          box-sizing: border-box;
          width: 278rpx;
          height: 278rpx;
          border-radius: 140rpx;
          background-color: #04D1A5;
          margin: 50rpx auto;
          border: 21rpx solid #A8FBE9;
          box-shadow: 0 0 0 21rpx #CFFEF4;
          text-align: center;
          p{
            color:rgba(255,255,255,1);
            font-family:PingFang SC;
            font-size: 20rpx;
          }
          .one{
            margin-top: 40rpx;
            font-weight:500;
            font-size:86rpx;
          }
      }
      .bottomDiv{
        border-top-style: solid;
        border-top-color: hsla(89, 43%, 51%, 0.3);

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
        .mrg-r-20{
          width:36rpx;
          height:36rpx;
        }
        .arrow{
              width: 13rpx !important;
              height: 22rpx !important;
          }
      }
     }


  }
}

</style>
