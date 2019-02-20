<template>
  <div class="nav" :style="{height:titleBarHeight}">
    <div class="status-bar" :style="{height:statusHeight}">

    </div>
    <div class="title-bar flex center">
      <div v-if="showBack" class="btn flex center" hover-class="active" @click="back">
        <img class="back" src="/static/svgs/back-btn.svg" alt="">
      </div>
      <div class="title">
        {{title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    showBack: {
      type: Boolean,
      default: true
    },
    isAuto: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Teller"
    },
    to: String
  },
  data() {
    return {
      statusHeight: "23px",
      titleBarHeight: "68px"
    };
  },

  created() {
    this.statusHeight = getApp().globalData.statusBarHeight + "px";
    this.titleBarHeight = getApp().globalData.titleBarHeight + "px";
  },
  data() {
    return {};
  },
  methods: {
    back(e) {
      if (this.isAuto) {
        return this.$router.reLaunch({ path: "/pages/home/index" });
      }
      if (this.to) {
        return wx.navigateTo({
          url: this.to
        });
      }
      wx.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="less">
.nav {
  color: #000;
  background: #fffefb;
  .title-bar {
    position: relative;
    height: 45px;
  }
  .btn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
    background: transparent;
  }
  .back {
    width: 18rpx;
    height: 48rpx;
  }
}
</style>
