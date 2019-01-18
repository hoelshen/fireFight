<template>
  <view class="app">
    <session class="swiper-session">
      <swiper
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000"
      >
        <block
          v-for="item in imgUrls"
          :key="item"
          class="swiper-session_item"
        >
          <swiper-item>
            <image
              :src="item.imgUrl"
              class="slide-image"
            />
          </swiper-item>
        </block>
      </swiper>
    </session>
    <div class="home_function flex center">
      <button @click="onConsultingBox">
        <image
          class="home_left"
          src="/static/svgs/home_left.svg"
        />
      </button>
      <button @click="onSolutionRoom">
        <image
          class="home_right"
          src="/static/svgs/home_right.svg"
        />
      </button>
    </div>
    <div>
      <button
        class="circle"
        @click="onMoments"
      >
      </button>
    </div>
    <TabBar></TabBar>
  </view>
</template>
<script>
import TabBar from "@/components/TabBar";
import Tbutton from "@/components/Tbutton";

export default {
  components: {
    TabBar,
    Tbutton
  },
  data() {
    return {
      imgUrls: []
    };
  },
  onShow() {
    this.getBanners();
  },
  methods: {
    async getBanners() {
      try {
        let res = await this.$request.get("/banner");
        this.imgUrls = res.data;
      } catch (e) {
        console.log("err", e);
      }
    },
    onConsultingBox() {
      this.$router.push({ path: "/pages/consultingBox/index" });
    },
    onSolutionRoom() {
      const { user } = getApp().globalData;
      if (!user.becomeAnswererAt) {
        return this.$router.push({
          query: { active: "solverDetail" },
          path: "/pages/detail/index"
        });
      }
      return this.$router.push({ path: "/pages/solutionRoom/index2" });
    },
    onMoments() {
      this.$router.push({ path: "/pages/moments/index" });
    }
  }
};
</script>
<style lang="less" scoped>
.swiper-session {
  margin: 0 30rpx;
  width: 630rpx;
  height: 160rpx;
  swiper {
    width: 630rpx;
    height: 160rpx;
    margin: 0 60rpx;
    swiper-item {
      image {
        width: 630rpx;
        height: 160rpx;
      }
    }
  }
  &-item {
    width: 630rpx;
    height: 160rpx;
  }
}
.home_function {
  button {
    padding: 0;
    margin: 0;
  }
}
.home_left {
  width: 316rpx;
  height: 610rpx;
  padding: 0;
}
.home_right {
  width: 316rpx;
  height: 610rpx;
  padding: 0;
}
.circle {
  width: 100px;
  height: 100px;
  z-index: 100;
  position: absolute;
  top: 15.5rem;
  left: 8.2rem;
  background: #ffffff;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
}
</style>

