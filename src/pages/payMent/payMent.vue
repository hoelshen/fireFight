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
      const formid = this.formid;
      const orderid = this.orderid;
      let orederRes = await this.$request.post("pay.html", { orderid, formid });

      let order = orederRes.result.pay;
      if (order) {
        const prepayid = `prepay_id=${order.prepayid}`
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
            console.log('res: ', res);
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
        const length = res.result.items.length - 1;
        this.orderid = res.result.items[length].id;
      })
      .catch(err => {
        console.log("err: ", err);
        return;
      });
  },
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


