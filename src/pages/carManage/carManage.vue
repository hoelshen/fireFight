<template>
  <div class="faq flex column">
    <scroll-view
      class="items grow box"
      scroll-y
    >
      <div class="my_info flex column">
        <div
          class="flex cancel j-end"
          @click="cancel"
        >
          解除绑定
        </div>
        <div
          v-if="cars.length > 1"
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
            <switch
              class="flex center"
              :checked="item.autoplay"
              @change="switch1Change"
            >
              自动支付
            </switch>
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
      cars:[]
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
      console.log(e);
    },
    addCar(e) {
      this.$router.push({
        path: "/pages/addCar/index"
      });
    },
    cancel(e) {
      this.$request.post("/unbindcar.html",{carno}).then(res => {
      if (res) {
        this.cars = res.result.items;
      }
    });
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
  .cancel{
    margin:40rpx;
  }
  .carItem{
    margin: 40rpx;
  }
  .carPhone {
    margin-left: 40rpx;
  }
}
  .lightButton {
    height: 64rpx;
    margin: 40rpx ;
  }
</style>
