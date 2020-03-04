<template>
  <div>
    <div class="adress-info pdd-lr-25 mrg-tb-20">
      <div class="flex a-center">
        <image
          class="adress-icon"
          src="/static/png/locations.png"
        />
        <span class="mrg-lr-20">位置:</span><span class="mrg-r-20">宁太家园</span>
        <image
          class="arrow"
          src="/static/png/arrow-white.png"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "AdressInfo",
    props: {
  },
}
</script>
<style lang="less" scoped>
  .adress-info{
      color: #fff;
      .adress-icon{
         width: 26rpx;
         height: 36rpx; 
      }
    .arrow{
        width: 13rpx ;
        height: 22rpx;
    }
  }
</style>