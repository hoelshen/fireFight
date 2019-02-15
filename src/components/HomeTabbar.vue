<template>
  <div class="bar box flex a-center j-between shadow" :class=" isIpx ? 'fix-iphonex-icon' : '' ">
    <form @submit="mail" report-submit="true">
      <button class="flex center" form-type="submit" hover-class="active">
        <image class="icon" v-show="tab == 'mail'" src="/static/svgs/mail-active.svg">
        </image>
        <image class="icon" v-show="tab != 'mail'" src="/static/svgs/mail.svg">
        </image>
      </button>
    </form>
    <form @submit="home" report-submit="true">
      <button class="flex center" form-type="submit" hover-class="active">
        <image class="icon" v-show="tab == 'home'" src="/static/svgs/tell-active.svg">
        </image>
        <image class="icon" v-show="tab != 'home'" src="/static/svgs/tell.svg">
        </image>
      </button>
    </form>
    <form @submit="myInfo" report-submit="true">
      <button class="flex center" form-type="submit" hover-class="active">
        <image class="icon" v-show="tab == 'mine'" src="/static/svgs/myinfo-active.svg"></image>
        <image class="icon" v-show="tab != 'mine'"  src="/static/svgs/myinfo.svg"></image>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TtabBar",
  props: {
    active: {
      type: String,
      default: "home"
    }
  },
  created() {
    this.tab = this.active;
  },
  data() {
    return {
      tab: "home" ,
      isIpx: false
    };
  },

  methods: {
    myInfo(e) {
      wx.setNavigationBarTitle({ title: "我的" });
      this.tab = "mine";
      this.$emit("change", this.tab);
      this.$request.saveFormid(e.detail.formId);
    },
    home(e) {
      wx.setNavigationBarTitle({ title: "Tell" });
      this.tab = "home";
      this.$emit("change", this.tab);

      this.$request.saveFormid(e.detail.formId);
    },
    mail(e) {
      wx.setNavigationBarTitle({ title: "信箱" });
      this.tab = "mail";
      this.$emit("change", this.tab);
      this.$request.saveFormid(e.detail.formId);
    }
  }
};
</script>

<style lang="less">
.bar {
  flex-shrink: 0;
  height: 124rpx;
  width: 100%;
  color: #2a2a2a;
  background: #ffffff;
  padding: 32rpx 86rpx;
  .icon {
    width: 60rpx;
    height: 60rpx;
  }
  .active {
    background: #ffffff;
  }
}
.fix-iphonex-icon {
  height: 142rpx;
  padding:32rpx 86rpx 80rpx;
}
</style>
