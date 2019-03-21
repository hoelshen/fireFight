<template>
  <div class="box page flex center column">
    <img
      class="img"
      :src="imgUrl"
      alt=""
    >
    <div class="btns grow flex a-center column">
      <button
        class="btn darkButton"
        @click="save"
      >
        生成海报
      </button>
      <button
        class="btn lightButton"
        open-type="share"
      >
        发送给好友/群友
      </button>
      <div class="tips">
        <div class="line">
          你安利加入 Tell 的好友，将获得 1 张解忧券
        </div>
        <div class="line">
          同时你也将获得 1 张邮票奖励
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { promisify } from "@/utils/index";

export default {
  data() {
    return {
      //imgUrl:"https://cdn.tellers.cn/tell_v2/share/share_mine_1550547962111.jpeg"
      imgUrl: ""
    };
  },
  onShow() {
    wx.showLoading({
      title: "正在加载",
      mask: true
    });
    this.$request.get("/image/mine").then(res => {
      this.imgUrl = res.data;
      wx.hideLoading();
    });
  },
  methods: {
    async save() {
      wx.showLoading({
        title: "正在保存",
        mask: true
      });
      let tempFilePath = await this.downloadFile(this.imgUrl);
      await this.saveToAlbum(tempFilePath);
      return wx.showToast({
        icon: "none",
        title: "已保存到相册"
      });
      wx.hideLoading();
    },
    async downloadFile(url) {
      let downloadSync = promisify(wx.downloadFile, wx);
      let res = await downloadSync({
        url: url
      });
      return res.tempFilePath;
    },
    async saveToAlbum(path) {
      let saveSync = promisify(wx.saveImageToPhotosAlbum, wx);
      try {
        let res = await saveSync({
          filePath: path
        });
        return res.tempFilePath;
      } catch (e) {
        wx.hideLoading();
      }
      return null;
    }
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
<style lang="less" scope>
page {
  background-color: #4d495b;
  color: #bdbdc0;
  font-size: 28rpx;
}

.page {
  height: 100vh;
  padding: 40rpx 60rpx;
  background: #ffffff;
}

.img {
  width: 630rpx;
  height: 720rpx;
}

.tips {
  margin-top: 24rpx;
  text-align: center;
  line-height: 52rpx;
}

.btn {
  width: 316rpx;
  margin-bottom: 0;
  line-height: 92rpx;
}
</style>

