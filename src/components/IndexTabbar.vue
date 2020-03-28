<template>
  <div class="tab-bar flex j-between">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      class="home-tab tab-com flex_1 flex column a-center j-center"
      @click="isActive(index)"
    >
      <img
        class="tab-com-img"
        :src="indexAction == index? item.activeimgSrc : item.imgSrc"
      >
      <div :class="indexAction == index ? 'activeColor' : ''">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "IndexTabbar",
    data() {
      return {
        tabList: [],
        indexAction: '',
        userTitle: ''
      }
    },
    methods: {
      isActive(i) {
        this.indexAction = i
        console.log(i)
        this.$emit('parentsIsActive', i)
      }
    },
    onShow() {
      this.userTitle = wx.getStorageSync("userTitle");
      console.log(this.userTitle)
      if(this.userTitle === 0) {
        this.tabList = [{imgSrc: '/static/png/data.png', activeimgSrc: '/static/png/detection.png', text: '设备管理'},{imgSrc: '/static/png/fire.png', activeimgSrc: '/static/png/fire_active.png', text: '警报管理'},{imgSrc: '/static/png/mine.png',activeimgSrc: '/static/png/mine-active.png', text: '个人中心'}]
      } else {
        this.tabList = [{imgSrc: '/static/png/watch.png', activeimgSrc: '/static/png/watch_active.png', text: '巡更管理'}, {imgSrc: '/static/png/mine.png',activeimgSrc: '/static/png/mine-active.png', text: '个人中心'}]
      }
    }
}
</script>
<style lang="less" scoped>
.tab-bar{
    height: 9vh;
    width: 750rpx;
    background: #fff;
    .tab-com{
      color: #D2DEEF;
      font-size: 22rpx;
      .tab-com-img{
        height: 44rpx;
        width: 44rpx;
      }
    }
    .activeColor{
      color: #6078EA;
    }
}
</style>