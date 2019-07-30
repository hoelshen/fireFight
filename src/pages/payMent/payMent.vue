<template>
  <view class="app flex column j-start">
    <div class="container flex grow">
      <session class="my_function flex">
        <div>
          <span>停车场</span>
          {{ car.address }}
        </div>
        <div>
          <span>入场时间</span>
          <span>{{ car.times }}</span>
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

      <div class="flex">
        <div class="contact">
          联系客服
        </div>
        <div class="">
          不在场内
        </div>
      </div>
    </div>
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
      orderid: "",
      timer: "7 月 8 日 09:29:32",
      getPhoto: false
    };
  },
  methods: {
    save() {
      const route = this.$router.currentRoute;
      this.getPhoto = false;
    },
    paySubmit(e) {
      this.formid = e.detail.formId;
    },
    setName(e) {
      this.userInfo.aliasName = e.detail.value;
    },
    async pay(e) {
      wx.showLoading({
        title: "",
        mask: true
      });
      let openid = "";
      console.log("getApp().globalData.user: ", getApp().globalData.user);
      if (getApp().globalData.user) {
        openid = getApp().globalData.user.openid;
        let prepayid = await this.$request.post(
          "https://api.mch.weixin.qq.com/pay/unifiedorder",
          {
            openid
          }
        );
      }
      const formid = this.formid;
      const orderid = this.orderid;
      let orederRes = await this.$request.post("pay.html", { orderid, formid });
      console.log("orederRes: ", orederRes);
      if (orederRes.pay) {
        let order = orederRes.data;
        wx.requestPayment({
          timeStamp: order.timeStamp, //时间戳
          nonceStr: order.nonceStr, //随即串
          package: order.package, //数据包
          signType: order.signType, //签名方式
          paySign: order.prepayid,
          success(res) {},
          fail(res) {}
        });
      }
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    const carno = query.carno || '';
    this.$request
      .put("/orderinfo.html", { carno })
      .then(res => {
        console.log('res: ', res.result);
        const length = (res.result.items.length)-1;
        console.log('length: ', length);
        this.orderid = (res.result.items[length]).id;
      })
      .catch(err => {
        console.log("err: ", err);
        return;
      });
  },
  onUnload() {}
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
</style>


