<template>
  <view class="app flex column j-start ">
    <div class="photo-circle flex wrap j-start center">
      <div
        class="circle"
        @click="takePhoto"
      >
        <image
          class="userinfo-avatar"
          :src="userInfo.aliasPortrait"
          alt="选择头像"
          background-size="cover"
        />
      </div>
      <div class="userinfo-name ">
        <input
          type="text"
          :value="userInfo.aliasName"
          @input="setName"
          placeholder="设置笔名"
          maxlength='8'
          focus
        >
        <hr class="userinfo-hr" />
        <span class="userinfo-text">你可以随时点击头像和笔名来修改它们</span>
      </div>
    </div>
    <div class="saveButton">
      <button @click="save">保存</button>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      imageUrl:
        "https://user-images.githubusercontent.com/20720117/48262986-80e02780-e45f-11e8-8426-2872916adad9.png",
      userInfo: {
        aliasPortrait: "",
        aliasName: ""
      }
    };
  },
  methods: {
    takePhoto() {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          that.$request.uploadFile(tempFilePaths[0]).then(res => {
            const data = JSON.parse(res.data);
            that.userInfo.aliasPortrait = data.data;
            console.log(data.data);
          });
        },
        fail(e) {
          console.log(e);
        }
      });
    },
    save() {
      const route = this.$router.currentRoute;
      console.log("route: ", route);
      const { aliasName, aliasPortrait } = this.userInfo;
      this.$request
        .put("/user", {
          aliasName,
          aliasPortrait
        })
        .then(res => {
          console.log(res);
        });
      this.$router.push({ query: "", path: "/pages/myInfo/index" });
    },
    setName(e) {
      this.userInfo.aliasName = e.detail.value;
      console.log("aliasName: ", this.userInfo.aliasName);
    }
  },
  onShow() {
    const { user } = getApp().globalData;
    console.log("user: ", user);
    this.userInfo.aliasPortrait = user.aliasPortrait;
  }
};
</script>
<style lang="less" scoped>
.app {
  padding-top: 20px;
  margin: auto;
  width: 630rpx;
  height: 381rpx;
  .photo-circle {
    height: 548rpx;
    width: 630rpx;
  }
  .circle {
    width: 216rpx;
    height: 216rpx;
  }
  .userinfo-avatar {
    width: 216rpx;
    height: 216rpx;
    border-radius: 50%;
  }

  .userinfo-hr {
    height: 2rpx;
    border-top: 1px solid #a9a9a9;
    margin-top: 10rpx;
  }
  .userinfo-text {
    margin-top: 20rpx;
    padding-right: 10rpx;
    display: block;
    color: #a9a9a9;
    transform: scale(0.8);
  }
  .saveButton {
    width: 316rpx;
    height: 92rpx;
    margin: 30rpx auto;
    & button {
      background-color: #ff4d6b;
      color: #ffffff;
      border-radius: 23px;
    }
  }
}
</style>


