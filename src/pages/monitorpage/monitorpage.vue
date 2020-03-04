<template>
  <div class="monitor-page flex column">
    <go-back />
    <adress-info />
    <div class="swiper-container">
      <swiper
        class="swiper"
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000"
      >
        <block
          v-for="(item, index) in movies"
          :key="index"
          :index="index"
        >
          <swiper-item>
            <image
              :src="item.url"
              class="slide-image"
              mode="aspectFill"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="monitor-info">
      <div class="monitor-status flex j-between">
        <div>
          <div>
            设备锁定
          </div>
          <switch bindchange="switch1Change" />
        </div>
        <div>
          <div>
            设备锁定
          </div>
          <switch bindchange="switch1Change" />
        </div>
        <div>
          <div>
            设备锁定
          </div>
          <switch bindchange="switch1Change" />
        </div>
      </div>
      <div class="pdd-tb-5">
        位置：具体位置是啥呢巴拉巴拉巴拉
      </div>
      <div class="pdd-tb-5">
        位置：具体位置是啥呢巴拉巴拉巴拉
      </div>
      <div class="pdd-tb-5">
        位置：具体位置是啥呢巴拉巴拉巴拉
      </div>
    </div>
  </div>
</template>
<script>
import GoBack from "@/components/goBack";
import AdressInfo from "@/components/adressInfo";
export default {
  components: {
    GoBack,
    AdressInfo
  },
  data() {
      return {
          movies: [{url:'../../static/png/110iphone.png'},{url:'../../static/png/119iphone.png'}]
      }
  },
  onLoad(opt) {
  },
  onShow() {
  },

  methods: {
  }
  }
</script>
<style lang="less" scoped>
.monitor-page {
  height: 100vh;
  background: #1D7FFD;
 .swiper-container {
     width: 100%;
     height: 464rpx;
     .swiper{
         width: 100%;
         height: 100%;
        .slide-image{
         width: 100%;
         height: 100%;
        }
     }
 }
 .monitor-info{
     width: 460rpx;
     height: 350rpx;
     margin: 40rpx 25rpx;
     background: #fff;
     border-radius: 20rpx;
     padding: 0rpx 120rpx 50rpx;
     .monitor-status{
         margin: 50rpx 0;
     }
 }
}
</style>