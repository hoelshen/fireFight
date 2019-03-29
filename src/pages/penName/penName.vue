<template>
  <view class="app flex column j-start">
    <div class="container flex grow">
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
        <div class="userinfo-name">
          <div class="set">
            设置笔名
          </div>
          <input
            type="text"
            :value="userInfo.aliasName"
            placeholder="设置笔名"
            maxlength="10"
            focus
            @input="setName"
          >
          <span class="userinfo-text">你可以随时点击头像和笔名来修改它们</span>
        </div>
      </div>
    </div>
    <div class="saveButton">
      <button @click="save">
        保存
      </button>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        aliasName: "",
        aliasPortrait: ""
      },
      getPhoto: false
    };
  },
  methods: {
    takePhoto() {
      let sourceType = [];
      const that = this;
      wx.showActionSheet({
      itemList: ['从相册选择新头像', '拍个新头像', '取消'],
        success(res) {
          if(res.tapIndex === 0){
            sourceType = ['album']
          }
          if(res.tapIndex === 1){
            sourceType = ['camera']
          }
          if(res.tapIndex === 2){
            return;
          }         
          that.getPhoto = true;
          wx.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: sourceType,
            success: function(res) {
              wx.showLoading({
                title: "上传中",
                mask: true
              });
              const tempFilePaths = res.tempFilePaths;
              that.$request.uploadFile(tempFilePaths[0]).then(
                function(res) {
                  let data = JSON.parse(res.data);
                  this.userInfo.aliasPortrait = data.data;     
                  wx.hideLoading();
                }.bind(that)
              );
            }.bind(this),
            fail(e) {
              wx.hideLoading();
            }
          });
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })      
    },
    save() {
      const route = this.$router.currentRoute;

      const { aliasName, aliasPortrait } = this.userInfo;
      if (aliasName) {
        if (aliasName.length < 2) {
          return wx.showToast({ title: "请设置大于2个字符的笔名" });
        }

        if(aliasName.length > 10){
          return wx.showToast({ title: "请设置小于10个字符的笔名" });
        }
        if(!aliasPortrait){
          return wx.showToast({ title: "请设置头像" });
        }
        this.$request
          .put("/user", {
            aliasName,
            aliasPortrait
          })
          .then(res => {
            wx.navigateBack({
              delta: 1
            });
          });
      }
      if (!aliasName) {
        wx.showToast({ title: "请设置笔名", icon: "none" });
      }
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
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    }
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
      border-radius: 4rpx;
      height: 84rpx;
      width: 570rpx;
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


