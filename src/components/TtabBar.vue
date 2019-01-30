<template>
  <div class="bar box flex a-center j-between shadow">
    <form @submit="mail" report-submit="true">
      <button class="flex center" form-type="submit" hover-class="active">
        <image class="icon" v-if="tab == 'mail'" src="/static/svgs/mail-active.svg" />
        <image class="icon" v-else src="/static/svgs/mail.svg" />
      </button>
    </form>
    <form @submit="home" report-submit="true">
      <button class="flex  center" form-type="submit" hover-class="active">
        <image class="icon" v-if="tab == 'home'" src="/static/svgs/tell-active.svg" />
        <image class="icon" v-else src="/static/svgs/tell.svg" />
      </button>
    </form>
    <form @submit="myInfo" report-submit="true">
      <button class="flex  center" form-type="submit" hover-class="active">
        <image class="icon" v-if="tab == 'mine'" src="/static/svgs/myinfo-active.svg" />
        <image class="icon" v-else src="/static/svgs/myinfo.svg" />
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
      tab: "home"
    };
  },
  methods: {
    myInfo(e) {
      this.tab = "mine";
      this.$emit("change", this.tab);
      this.$request.saveFormid(e.detail.formId);
    },
    home(e) {
      this.tab = "home";
      this.$emit("change", this.tab);
      this.$request.saveFormid(e.detail.formId);
    },
    mail(e) {
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
</style>
