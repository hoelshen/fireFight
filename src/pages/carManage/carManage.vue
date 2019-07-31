<template>
  <div class="faq flex column">
    <scroll-view
      class="items grow box"
      scroll-y
    >
      <div class="my_info flex column">
        <div
          v-if="cars.length >= 1"
          class="flex column"
        >
          <div
            v-for="item in cars"
            :key="item"
            class="flex carItem j-between"
            @click="toPayMent(item)"
          >
            <div class="flex center">
              <img
                class="my_info_user_avatarUrl"
                src="https://cdn.tellers.cn/tell_v2/static/default-avatar_v2.svg"
                mode="scaleToFill"
                @click="login"
              >
              <span class="carPhone">{{ item.carno }}</span>
            </div>
            <navigator
              target="miniProgram"
              :app-id="id"
              :extra-data="extradata"
              version="release"
              :url="url"
              open-type="navigate"
            >
              <switch
                class="flex center"
                :checked="item.autoplay"
                @change="switch1Change"
              >
                自动支付
              </switch>
            </navigator>
            <div
              class="flex cancel center"
              @click="cancel(item.carno)"
            >
              解除绑定
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex center lightButton"
        @click="addCar"
      >
        添加车辆
      </div>
    </scroll-view>
  </div>
</template>

<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      userInfo: "",
      cars: []
    };
  },
  onShow() {
    const { user } = getApp().globalData;
    this.$request.post("/cars.html").then(res => {
      if (res) {
        this.cars = res.result.items;
      }
    });
  },
  methods: {
    switch1Change(e) {
         //发起签约请求 data里面传值是必须传的几项，没强制要求的我没传
    // var me = this;
    // //装作参数
    // this.globalData.contract_code = this.genID(5);
    // var data = {
    // mch_id: this.globalData.mch_id,//你的商户号
    // appid: this.globalData.appid,//小程序appid
    // plan_id: this.globalData.plan_id,//你的商户签约模板id（在商户号里面设置）
    // contract_code: this.globalData.contract_code, //签约码，商家生成，商户侧须唯一
    // contract_display_account: this.turnNickName(this.globalData.userInfo["nickName"]||""), //签约用户名称，我这里用的是用户微信名字（怎么获取下面有）本来我想用手机号的，但是获取手机号需要注册或者是微信api获取需要用户点击同意，甲方说用户多操作一步用户体验不好。。。
    // notify_url: "https://www.***.com/contractNotify",// 签约成功与否微信返回数据的接收地址
    // request_serial: ((new Date()).getTime() - 1526353000000),//商户请求签约时的序列号纯数字,长度不超过12位
    // timestamp: parseInt((new Date()).getTime() / 1000) + "" //时间戳 
    // };
    // //签名 MD5加密
    // data.sign = util.genSign(data, this.globalData.key);
    // //开始发起签约
    // wx.navigateToMiniProgram({
    //     appId: 'wxbd687630cd02ce1d', //固定值，这个是填写微信官方签约小程序的id
    //     extraData: data,
    //     path: 'pages/index/index',
    //     success(res) {
    //         wx.setStorageSync('contract_id', "");
    //         me.globalData.contract_id = "";
    //         // 成功跳转到签约小程序 
    //     },
    //     fail(res) {
    //         console.log(res);
    //         // 未成功跳转到签约小程序 
    //     }
    // });
    //   console.log(e);
    },
    addCar(e) {
      this.$router.push({
        path: "/pages/addCar/index"
      });
    },
    cancel(carno) {
      this.$request.post("/unbindcar.html", { carno }).then(res => {
        this.$request.post("/cars.html").then(res => {
          if (res) {
            this.cars = res.result.items;
          }
        }).bind(this);
      }).bind(this);
    }
  }
};
</script>

<style scoped lang="less">
.my_info {
  min-height: 326rpx;
  margin: 40rpx 40rpx;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  &_user {
    &_badgeBtn {
      padding: 0;
      margin-left: 12rpx;
    }
    &_badge {
      width: 60rpx;
      height: 60rpx;
    }
    &_avatarUrl {
      display: block;
      border-radius: 50%;
      height: 88rpx;
      width: 88rpx;
    }
    &_nickName {
      font-weight: 600;
      height: 84rpx;
      font-size: 60rpx;
      text-align: center;
      color: #4d495b;
    }
    &_address {
      height: 40rpx;
      font-size: 32rpx;
      text-align: center;
      color: #bdbdc0;
      margin-top: 20rpx;
      margin-bottom: 60rpx;
    }
  }
  .carItem {
    margin: 40rpx;
  }
  .carPhone {
    margin-left: 40rpx;
  }
}
.lightButton {
  height: 64rpx;
  margin: 40rpx;
}
</style>
