<template>
  <div class="faq flex column">
    <scroll-view
      class="items grow box"
      scroll-y
    >
      <div class="my_info flex column">
        <view>
          <img
            class="header-bg_img"
            src="/static/png/bgone.png"
            alt=""
          >
        </view>
        <div
          v-if="cars.length >= 1"
          class="flex card column"
        >
          <div
            v-for="item in cars"
            :key="item"
            class="flex carItem column j-between"
            @click="toPayMent(item)"
          >
            <div
              class="flex cancel flex j-end"
              @click="cancel(item.carno)"
            >
              解除绑定
            </div>
            <div class="flex j-between block_div">
              <div class="flex carPhone center">
                <div class="carPhone_carno">
                  {{ item.carno }}
                </div>
              </div>
              <div
                v-if="item.autoplay == 0"
                class="flex column div_autppay"
                @click="switch1Change(item.autoplay)"
              >
                <image
                  class="autopay"
                  src="/static/png/autopay1.png"
                />
                自动支付
              </div>
              <div
                v-else
                class="flex column div_autopay"
                @click="switch1Change(item.autoplay)"
              >
                <image
                  class="autopay"
                  src="/static/png/autopay2.png"
                />
                自动支付
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex center"
        >
          暂无数据
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
      if (res && res.result) {
        this.cars = res.result.items;
      }
    });
  },
  methods: {
    switch1Change(e) {
    },
    addCar(e) {
      this.$router.push({
        path: "/pages/addCar/index"
      });
    },
    cancel(carno) {
      console.log('this',this)
      this.$request.post("/unbindcar.html", { carno }).then(function(res) {
        this.$request.post("/cars.html").then(res => {
          if (res) {
            this.cars = res.result.items;
          }
        });
      }.bind(this));
    },
    toPayMent(){

    }
  }
};
</script>

<style scoped lang="less">
.my_info {
  min-height: 326rpx;
  margin: 0rpx 0rpx;
  border-radius: 25px;
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
    padding: 40rpx 20rpx;
    border-bottom-width: 2rpx;
    border-bottom-style: solid;
    border-bottom-color: #bdbdc0;
    .cancel{
    font-size: 64rpx;
    color: #999999;


    }
  }
  .carPhone {
    margin-left: 20rpx;
  }
  .card{
    position: relative;
    top: -120rpx;
    margin: 40rpx 20rpx;
    background-color: #ffffff;
    box-shadow: 3rpx 4rpx 6rpx 3rpx rgba(1, 191, 135, 0.7);
    border-radius: 20rpx;
  }
}
  .carPhone {
    width: 410rpx;
    height: 100rpx;
    background-size: contain;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAABkCAMAAAD+DbQHAAAAbFBMVEUAAAAocsMocsMocsMocsMocsMocsMocsMocsMocsMocsMocsMocsMocsP///8sdMT6/P7j7Pfc6PaCrdy50eucvuOGsN11pNluoNcvd8b1+Pzn8PlwoddhmNNLic1JiMy0zuqlxOaHsN5Mis0AT+8bAAAADXRSTlMA4VT4qgaJW9sDlNcHfzE0FQAAAhpJREFUeNrt3UduJDEMRmFV6uAZUhU6B8f733HaasGA5wT8gfdtxP1DqbRjKoa2bzpDKN2fvh3Sj3ZjCGnTpqftyhDWapu+0Si0VbnrDKG1KQ2NVfn2Po2OAC7z+y1b1QxpbdVpcgQynaxap96KvHefP1/PhgDOr5+z+z5b0afGir1flmwIIy+j761oUlfOk493Qyj30U9l6NIz29UXQzCLX3MZnpGOPnPXhZNnP9pDjbTzgyGcg+/soUaa/NUQzptP9lAjjc7bO6Dsoz3USO6GgEoXIsVGJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEkAkAUQSQCQBRBJAJAFEEvAr0sVZ2BzQ+dcK09nfDOF8lWXArNUO7blWmwX1kf23oD5ffTEEs/j1XIbUlePm490Qyn30Wxm6tLFi7xe+pVCW0fdWNKm3In+4z4c3/kwhnL8Os/tHrdGntVWnyRHIdLJqnYbGqnzcTaMjgHHaHbNVzd+UWkNobXpYGQJbpW/bF0NYL9v01G4MIW3a9GNY901nCKVr+vWQvv0Dr9RbwMLtTv8AAAAASUVORK5CYII=");
    background-repeat: no-repeat;
    // margin-left: 40rpx;
    &_carno {
      color: white;
      font-size: 54rpx;
    }
  }
  .autopay {
    width: 100rpx;
    height: 50rpx;
    
  }
  .div_autopay{
    margin-right: 30rpx;
  }
  &_item {
    &_button {
      width: 100%;
      height: 88rpx;
      padding: 0rpx 40rpx;
      align-items: center;
      color: #4d495b;
      background-color: #ffffff;
    }
    &_img {
      height: 36rpx;
      width: 36rpx;
      margin: 18rpx 20rpx;
    }
    &_text {
      margin-left: 20rpx;
      font-size: 32rpx;
      text-align: left;
    }
  }
  .group {
    width: 72rpx;
    height: 72rpx;
    margin-right: 20rpx;
  }
.lightButton {
  height: 64rpx;
  margin: 40rpx;
}
.header-bg_img{
  width: 100%
}
.block_div{
  margin-top: 30rpx;
}
</style>
