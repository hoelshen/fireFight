<template>
  <view class="page">
    <view class="header">
      <view class="title">
        停车缴费
      </view>
      <view class="title">
        <div class="container flex column grow">
          <div class="my_info times center flex a-center">
            {{ formatTimer }}
          </div>
        </div>
      </view>
    </view>
    <view class="header-bg">
      <session class="my_contact flex grow column">
        <div class="my_contact_item_button flex wrap center grow">
          <span class="my_contact_item_text grow">{{ car.carno || '暂无' }}</span>
          <div class="flex column center">
            <span class="carStatus">{{
              car.status ? "已入场" : "未入场"
            }}</span>
            <div
              class="checkCarno"
              @click="onRun"
            >
              切换车牌
            </div>
          </div>
        </div>
        <div class="my_contact_item_button flex wrap center grow">
          <span class="my_contact_item_text grow">停车场</span>
          <span>{{ car.address || '暂无' }}</span>
        </div>
        <div class="my_contact_item_button flex wrap center grow">
          <span class="my_contact_item_text grow">入场时间</span>
          <span>{{ car.startts || '暂无' }}</span>
        </div>
        <div class="my_contact_item_button flex wrap center grow">
          <span class="my_contact_item_text grow">应付</span>
          <span>{{ car.money || '暂无' }} 元</span>
        </div>
      </session>
      <view class=" flex column">
        <view class="flex column j-start">
          <div class="saveButton">
            <form
              report-submit="true"
              @submit="paySubmit"
            >
              <button
                form-type="submit"
                @click="pay"
              >
                确认支付
              </button>
            </form>

            <div class="flex grayend center">
              <div class="contact">
                联系客服
              </div>
              <div class="noAddress">
                不在场内
              </div>
            </div>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      userInfo: {
        aliasName: "",
        aliasPortrait: ""
      },
      car: {
        address: "",
        startts: "",
        times: "",
        autopay: "",
        money: "",
        status: "",
        d: "",
        carno: ""
      },
      formid: "",
      orderid: ""
    };
  },
  computed: {
    formatTimer() {
      /**
       * 将秒转换为年月日时分秒
       **/
      if (!this.car.timess) {
        return this.car.timess;
      }
      const value = this.car.timess;
      var year_1 = 3600 * 24 * 30 * 12;
      var month_1 = 3600 * 24 * 30;
      var day_1 = 3600 * 24;
      var hour_1 = 3600;
      var minute_1 = 60;
      var year = 0,
        month = 0,
        day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      if (value <= 0) {
        return "No Time";
      } else if (value < minute_1) {
        // 小于一分钟
        second = value;
      } else if (value < hour_1) {
        // 小于一小时
        minute = parseInt(value / minute_1);
        second = parseInt(value % minute_1);
      } else if (value < day_1) {
        // 小于一天
        hour = parseInt(value / hour_1);
        minute = parseInt((value % hour_1) % minute_1);
        second = parseInt((value % hour_1) / minute_1);
      } else if (value < month_1) {
        // 小于一月
        day = parseInt(value / day_1);
        hour = parseInt((value % day_1) / hour_1);
        minute = parseInt(((value % day_1) % hour_1) / minute_1);
        second = parseInt(((value % day_1) % hour_1) % minute_1);
      } else if (value < year_1) {
        // 小于一年
        month = parseInt(value / month_1);
        day = parseInt((value % month_1) / day_1);
        hour = parseInt(((value % month_1) % day_1) / hour_1);
        minute = parseInt((((value % month_1) % day_1) % hour_1) / minute_1);
        second = parseInt((((value % month_1) % day_1) % hour_1) % minute_1);
      } else {
        // 大于一年
        year = parseInt(value / year_1);
        month = parseInt((value % year_1) / month_1);
        day = parseInt(((value % year_1) % month_1) / day_1);
        hour = parseInt((((value % year_1) % month_1) % day_1) / hour_1);
        minute = parseInt(
          ((((value % year_1) % month_1) % day_1) % hour_1) / minute_1
        );
        second = parseInt(
          ((((value % year_1) % month_1) % day_1) % hour_1) % minute_1
        );
      }
      year = year == 0 ? "" : year + " 年 ";
      month = month == 0 ? "" : month + " 月 ";
      day = day == 0 ? "" : day + " 天 ";
      hour = hour == 0 ? "" : hour + " 时 ";
      minute = minute == 0 ? "" : minute + " 分 ";
      second = second + " 秒 ";
      return year + month + day + hour + minute + second;
    }
  },
  methods: {
    paySubmit(e) {
      this.formid = e.detail.formId;
    },
    onRun() {
      this.$router.push({ path: "/pages/home/index" });
    },
    async pay(e) {
      wx.showLoading({
        title: "",
        mask: true
      });
      let openid = "";
      const formid = this.formid;
      const orderid = this.orderid;
      if (!formid || !orderid) {
        return wx.showToast({
          icon: "none",
          title: "订单异常"
        });
      }
      let orederRes = await this.$request.post("pay.html", { orderid, formid });

      let order = orederRes.result.pay;
      if (order) {
        const prepayid = `prepay_id=${order.prepayid}`;
        wx.requestPayment({
          timeStamp: order.timestamp, //时间戳
          nonceStr: order.noncestr, //随即串
          package: prepayid, //数据包
          signType: order.signType, //签名方式
          paySign: order.sign,
          success(res) {
            this.$router.push({
              path: "/pages/home/index"
            });
          },
          fail(res) {
            console.log("res: ", res);
          }
        });
      }
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    const carno = query.carno || "";
    this.$request
      .put("/orderinfo.html", { carno })
      .then(res => {
        if (res && res.result && res.result.items.length == 0) {
          return;
        }
        const length = res.result.items.length - 1;
        this.car = res.result.items[length];
        this.orderid = res.result.items[length].id;
      })
      .catch(err => {
        console.log("err: ", err);
        return;
      });
  }
};
</script>
<style lang="less" scoped>
page {
  background-color: #ffffff;
}

.header {
  height: 450rpx;
  width: 100%;
  position: fixed;
  top: 0;
  background: #1aad19;
  z-index: 3;
  .title {
    line-height: 160rpx;
    text-align: center;
  }
  .times {
    font-size: 108rpx;
    color: white;
  }
}
.header-bg {
  height: 450rpx;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  background: #1aad19;
  margin-top: 450rpx;
}
.saveButton {
  width: 316rpx;
  height: 92rpx;
  margin: auto;
  margin-bottom: 60rpx;
  & button {
    background-color: #1aad19;
    color: #ffffff;
    border-radius: 23px;
  }
}
.contact {
  margin-right: 10rpx;
}
.my_contact {
  height: 630rpx;
  margin: 40rpx 40rpx;
  background-color: #ffffff;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
  &_item {
    background-color: #ffffff;
    border-radius: 2rpx;
    margin: 40rpx;
    &_button {
      height: 172rpx;
      color: #4d495b;
      margin: 40rpx;
      .carStatus {
        color: #1aad19;
      }
      .checkCarno {
        background-color: #1aad19;
      }
    }
    &_text {
      font-size: 32rpx;
      color: #4d495b;
    }
  }
}
.grayend {
  font-size: 24rpx;
  color: darkgray;
  margin: 40rpx auto;
}
</style>


