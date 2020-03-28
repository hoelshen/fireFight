<template>
  <div class="page">
    <div v-if="userTitle === 0">
      <Home-cont
        v-if="isSelected === 0"
        ref="home"
      />
      <Examine-cont
        v-if="isSelected === 1"
        ref="examine"
      />
      <Info-cont
        v-if="isSelected === 2"
        ref="info"
      />
    </div>
    <div v-else>
      <Watch-cont
        v-if="isSelected === 0"
        ref="watchs"
      />
      <Info-cont
        v-if="isSelected === 1"
        ref="info"
      />
    </div>
    <div class="tab-position">
      <Index-tabbar @parentsIsActive="parentsIsActive" />
    </div>
  </div>
</template>

<script>
import IndexTabbar from "@/components/IndexTabbar";
import HomeCont from "@/components/HomeCont";
import ExamineCont from "@/components/ExamineCont";
import InfoCont from "@/components/InfoCont";
import WatchCont from "@/components/WatchCont";
// import Home from "@/pages/Home";
export default {
  components: {
    IndexTabbar,
    HomeCont,
    ExamineCont,
    InfoCont,
    WatchCont
  },
  data() {
    return {
      isSelected: 0,
      userTitle: null
    }
  },
  onLoad(opt) {
  },
  onShow() {
    const userId = wx.getStorageSync("userId");
    this.userTitle = wx.getStorageSync("userTitle");
    if(!userId){
    wx.reLaunch({
        url: `/pages/login/index`
    });
    }
  },
  methods: {
      parentsIsActive(i) {
          console.log(i)
          this.isSelected = i
          this.$nextTick(() => {
              switch(i) {
              case 0:
                if(this.userTitle === 0) {
                    this.$refs.home.getHomeData()
                } else {
                    this.$refs.watchs.getvideoList()
                }
                break
              case 1:
                if(this.userTitle === 0) {
                    this.$refs.examine.getData();
                } else {
                    this.$refs.info.getUserData();
                }
                break;
              case 2:
                this.$refs.info.getUserData();
                break;  
            }
          })
      }
  },
};
</script>
<style lang="less" scoped>
.page {
  height: 91vh;
  .tab-position{
      position: fixed;
      bottom: 0;
      width: 750rpx;
      border-top: 1px solid #D3DFEF;
  }
}

</style>
