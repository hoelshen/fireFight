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
      <button @click="pay">
        确认支付
      </button>
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
      car:{
        address: "",
        startts: "",
        times:"",
        autopay:"",
        money:"",
        status:"",
        d: "",
        carno:""
      },
      timer: "7 月 8 日 09:29:32",
      getPhoto: false
    };
  },
  methods: {
    save() {
      const route = this.$router.currentRoute;
      this.getPhoto = false;
    },
    setName(e) {
      this.userInfo.aliasName = e.detail.value;
    },
    pay(e){
      this.$request
        .put("/pay", { orderid,formid })
        .then(res => {
          wx.showToast({
            title: "绑定成功"
          });
          this.$router.push({ path: "/pages/payMent/index" });
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
    }
  },
  onShow() {
      this.$request
        .put("/orderinfo", { carno:"浙B12345" })
        .then(res => {
          console.log('res: ', res);
        })
        .catch(err => {
          console.log("err: ", err);
          return;
        });
  },
  onUnload() {
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
.contact{
  margin-right: 10rpx;
}
</style>


