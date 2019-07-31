<template>
  <view class="page flex column">
    <view class="app flex column j-start">
      <div class="container flex column grow">
        <div class="my_info times center flex a-center">
          {{ formatTimer }}
        </div>
        <session class="my_contact flex grow column">
          <div class="my_contact_item_button flex wrap center grow">
            <span class="my_contact_item_text grow">{{ car.carno }}</span>
            <div class="flex column center">
              <span>{{ car.status ? '已入场' : '未入场' }}</span>
              <div @click="onRun">
                切换车牌
              </div>
            </div>
          </div>
          <div class="my_contact_item_button flex wrap center grow">
            <span class="my_contact_item_text grow">停车场</span>
            <span>{{ car.address }}</span>
          </div>
          <div class="my_contact_item_button flex wrap center grow">
            <span class="my_contact_item_text grow">入场时间</span>
            <span>{{ car.startts }}</span>
          </div>
          <div class="my_contact_item_button flex wrap center grow">
            <span class="my_contact_item_text grow">应付</span>
            <span>{{ car.money }}</span>
          </div>
        </session>
      </div>
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
     formatTimer(){
      let s =this.car.timess;
      var t,hour,min,sec,day;
      if (s > -1) {
        hour = Math.floor(s / 3600);
        min = Math.floor(s / 60) % 60;
        sec = s % 60;
        day = parseInt(hour / 24);
        if (day > 0) {
          console.log('day: ', day);
          hour = hour - 24 * day;
          t = day + "day " + hour + ":";
        } else t = hour + ":";
        if (min < 10) {
          t += "0";
        }
        t += min + ":";
        if (sec < 10) {
          t += "0";
        }
        t += sec;
      }
      return t;
    }
  },
  methods: {
    paySubmit(e) {
      this.formid = e.detail.formId;
    },
    onRun(){
      this.$router.push({path:"/pages/home/index"})
    },
    async pay(e) {
      wx.showLoading({
        title: "",
        mask: true
      });
      let openid = "";
      const formid = this.formid;
      const orderid = this.orderid;
      if (formid && orderid) {
        return wx.showToast({
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
            console.log("支付完成: ", res);
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
        if (!res) {
          return;
        }
        const length = res.result.items.length - 1;
        this.car = res.result.items[length];
      
        console.log("res: ", this.car.timess);
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
.app {
  margin: auto;
  width: 630rpx;
  height: 381rpx;
  .saveButton {
    width: 316rpx;
    height: 92rpx;
    margin: auto;
    margin-bottom: 60rpx;
    & button {
      background-color: #6eff92;
      color: #ffffff;
      border-radius: 23px;
    }
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
    margin:40rpx;
    &_button {
      height: 172rpx;
      color: #4d495b;
      margin: 40rpx;
    }
    &_text {
      font-size: 32rpx;
      color: #4d495b;
    }
  }
}
.grayend{
  font-size:24rpx;
  color: darkgray;
  margin: 40rpx auto ;
}
</style>


