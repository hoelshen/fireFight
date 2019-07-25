<template>
  <view class="app flex column j-start">
    <div class="container flex grow">
      <session class="my_function flex">
        <div>
          <span>停车场</span>  
        </div>
        <div>
          <span>入场时间</span>
          <span>{{ timer }}</span>
        </div>
      </session>
    </div>
    <div class="saveButton">
      <button @click="save">
        保存
      </button>
    </div>
  </view>
</template>
<script>
import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      userInfo: {
        aliasName: "",
        aliasPortrait: ""
      },
      timer: "7 月 8 日 09:29:32",
      getPhoto: false
    };
  },
  methods: {
    save() {
      const route = this.$router.currentRoute;
      this.getPhoto = false;
    },
    setName(e) {
      this.userInfo.aliasName = e.detail.value;
    }
  },
  onShow() {
    if(this.getPhoto) return;
    this.$request.getUser().then(() => {
      const { user } = getApp().globalData;
      this.userInfo.aliasPortrait = user.aliasPortrait;
      this.userInfo.aliasName = user.nickName;
    });
  },
  onUnload() {
    this.getPhoto = false;
  }
};
</script>
<style lang="less" scoped>
page {
  background-color: #ffffff;
}
.app {
  margin: auto;
  width: 630rpx;
  height: 381rpx;
  .saveButton {
    width: 316rpx;
    height: 92rpx;
    margin: auto;
    margin-bottom: 60rpx;
    & button {
      background-color: #ffc86d;
      color: #ffffff;
      border-radius: 23px;
    }
  }
}
</style>


