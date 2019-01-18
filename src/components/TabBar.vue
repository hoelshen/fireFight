<template>
  <div class="bar box flex a-center j-between">
    <!-- TODO:封装一层Button -->
    <form
      class="flex"
      @submit="mail"
      report-submit="true"
    >
      <button
        class=" flex column center"
        form-type="submit"
      >
        <image
          class="mail"
          src="/static/svgs/mail_tab.svg"
        />
      </button>
    </form>
    <form
      class=" flex"
      @submit="home"
      report-submit="true"
    >
      <button
        class=" flex column center"
        form-type="submit"
      >
        <image
          class="home"
          src="/static/svgs/home_tab.svg"
        />
      </button>
    </form>
    <form
      class="flex"
      @submit="mine"
      report-submit="true"
    >
      <button
        class="flex column center"
        form-type="submit"
      >
        <image
          class="mine"
          src="/static/svgs/mine_tab.svg"
        />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    showBack: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    myInfo(e) {
      console.log("mine: ", e);
      this.$router.push("pages/myInfo/index");
    },
    home(e) {
      console.log("mine: ", e);
      this.$router.push("pages/home/index");
    },
    mail(e) {
      console.log("mine: ", e);
      this.$router.push("page/mail/index");
    },
    sjh() {
      console.log("sjh: ", sjh);
    }
  }
};
</script>

<style lang="less">
.bar {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 124rpx;
  width: 100%;
  color: #2a2a2a;
  background: #fff;
  padding: 32rpx 86rpx;
  z-index: 10;
  .mail {
    width: 45rpx;
    height: 30rpx;
  }
  .home {
    width: 48rpx;
    height: 44rpx;
  }
  .mine {
    width: 32rpx;
    height: 40rpx;
  }
}
</style>
