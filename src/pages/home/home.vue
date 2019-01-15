<template>
    <view>
        <div>
          <swiper indicator-dots="true" autoplay="true" interval="5000" duration="1000">
              <block v-for="item in imgUrls" :key="item">
                  <swiper-item>
                      <image :src="item.imgUrl" class="slide-image" width="355" height="150" />
                  </swiper-item>
              </block>
          </swiper>
        </div> 
        <div>
          <button @click="onConsultingBox">咨询箱</button>
        </div>
        <div>
          <button @click="onSolutionRoom">解答室</button>
        </div>
        <div>
          <button @click="onMoments">动态</button>
        </div>
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
    // 测试接口
    this.$request.get("/banner");
  },
  methods: {
    async getBanners() {
      try{
        let res = await this.$request.get("/banner");
        this.imgUrls = res.data;
      } catch(e){
        console.log('err', e);
      }
    },
    onConsultingBox(){
      this.$router.push({path:'/pages/consultingBox/index'})
    },
    onSolutionRoom(){
      this.$router.push({path:'/pages/solutionRoom/index'})
    },
    onMoments(){
      this.$router.push({path:'/pages/moments/index'})
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

