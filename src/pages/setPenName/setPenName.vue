<template>
  <view class="app flex column j-start">
    <div class="container flex grow">
      <div class="photo-circle flex wrap j-start center">
        <div class="circle" @click="takePhoto">
          <image class="userinfo-avatar" :src="aliasPortrait" alt="选择头像" background-size="cover">
          </image>
        </div>
        <div class="userinfo-name">
          <div class="set">设置笔名</div>
          <input type="text" :value="userInfo.aliasName" @input="setName" placeholder="设置笔名" maxlength="10" focus>
          <span class="userinfo-text">你可以随时点击头像和笔名来修改它们</span>
        </div>
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
      aliasPortrait: "",
      userInfo: {
        aliasName: "",
        aliasPortrait: ""
      }
    };
  },
  methods: {
    takePhoto() {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          this.$request.uploadFile(tempFilePaths[0]).then(
            function(res) {
              let data = JSON.parse(res.data);
              this.aliasPortrait = data.data;
              this.userInfo.aliasPortrait = data.data;
            }.bind(this)
          );
        }.bind(this),
        fail(e) {
          console.error(e);
        }
      });
    },
    save() {
      const route = this.$router.currentRoute;

      const { aliasName, aliasPortrait } = this.userInfo;
      if (aliasName) {
        if (aliasName.length < 2) {
          return wx.showToast({ title: "请设置大于2个字符的笔名" });
        }
        this.$request
          .put("/user", {
            aliasName,
            aliasPortrait
          })
          .then(res => {
            wx.navigateBack({
              delta: 2
            });
          });
      }
      if (!aliasName) {
        wx.showToast({ title: "请设置笔名", icon: "none" });
      }
    },
    setName(e) {
      this.userInfo.aliasName = e.detail.value;
    }
  },
  onShow() {
    this.$request.getUser().then(() => {
      const { user } = getApp().globalData;
      this.aliasPortrait = user.aliasPortrait;
      this.userInfo.aliasPortrait = user.aliasPortrait;
      this.userInfo.aliasName = user.nickName;
    });
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
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
  .container {
    .photo-circle {
      height: 548rpx;
      width: 630rpx;
      margin-top: 60rpx;
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
    .userinfo-name {
      .set {
        color: #4d495b;
      }
      input {
        margin-top: 12rpx;
        border-radius: 2rpx;
        height: 84rpx;
        width: 550rpx;
        padding-left: 20rpx;
        background-color: rgba(189, 189, 192, 0.15);
      }
    }
    .userinfo-text {
      margin-top: 40rpx;
      display: block;
      color: #bdbdc0;
      font-size: 28rpx;
    }
  }
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


