<template>
  <div class="faq flex column">
    <scroll-view
      class="items grow box"
      scroll-y
    >
      <div class="my_info flex column">
        <div
          class="flex j-end"
          @click="cancel"
        >
          解除绑定
        </div>
        <div class="flex j-between">
          <div class="flex a-center ">
            <img
              class="my_info_user_avatarUrl"
              src="https://cdn.tellers.cn/tell_v2/static/default-avatar_v2.svg"
              mode="scaleToFill"
              @click="login"
            >
            <span class="carPhone">8G079</span>
          </div>
          <switch
            class="flex center"
            checked
            @change="switch1Change"
          >
            自动支付
          </switch>
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
      userInfo: ""
    };
  },
  onShow() {
    const { user } = getApp().globalData;
    this.userInfo = JSON.stringify({
      nickName: user.nickName,
      avatarUrl: user.avatarUrl
    });
  },
  methods:{
    switch1Change(e){
      console.log(e)
    },
    addCar(e){
      this.$router.push({
        path: "/pages/addCar/index"
      });
    },
    cancel(e){

    }
  }
};
</script>

<style scoped lang="less">
.my_info {
  height: 326rpx;
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
      margin: 60rpx auto 44rpx 40rpx;
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

  .lightButton {
    height: 64rpx;
    margin: 40rpx !important
  }
  .carPhone{
    margin-left: 40rpx;
  }
}

</style>
