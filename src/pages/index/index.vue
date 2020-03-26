<template>
  <div class="page">
    <div>
      <Home-cont />
    </div>
    <div class="tab-position">
      <Index-tabbar />
    </div>
  </div>
</template>

<script>
import IndexTabbar from "@/components/IndexTabbar";
import HomeCont from "@/components/HomeCont";
// import Home from "@/pages/Home";
export default {
  components: {
    IndexTabbar,
    HomeCont
  },
  data() {
    return {
      active:"",
    }
  },
  onShow() {
  },
  methods: {
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
