<template>
    <view>
        <swiper indicator-dots="true" autoplay="true" interval="5000" duration="1000">
            <block v-for="item in imgUrls" :key="item">
                <swiper-item>
                    <image :src="item.imgUrl" class="slide-image" width="355" height="150" />
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>
<script>
export default {
  data() {
    return {
      imgUrls: []
    };
  },
  onShow() {
    setTimeout(this.getBanners, 1000);
  },
  methods: {
    async getBanners() {
      let res = await this.$request.get("/banner");
      this.imgUrls = res.data;
    }
  }
};
</script>
<style lang="less" scoped>
swiper {
  height: 375rpx;
  image {
    width: 750rpx;
    height: 375rpx;
  }
}
</style>

