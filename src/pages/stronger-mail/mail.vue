<template>
  <div class="page">
    <div class="s-mask flex center column" v-if="showMask" @tap="hideMask">
      <div class="m-layer box">
        <img class="up" :src="shareBanner" alt="">
        <div class="down flex">
          <div class="text">
            {{mail.content}}
          </div>
          <img class="qr" :src="qrcodeImgUrl" alt="">
        </div>
      </div>

      <div class="m-btns">
        <button class="flex center" hover-class="active" @tap.stop="savePhoto">保存到相册</button>
        <div class="desc">保存到相册可以手动发朋友圈</div>
      </div>
    </div>

    <div class="p-container" :class="showMask?'lock':''">
      <div class="tips box  flex a-center j-between" v-if="showMsg && newAddedHug">
        <div class="text">
          新收到 {{newAddedHug}} 个拥抱
        </div>
        <img class="close" src="https://cdn.tellers.cn/stronger/btn_close.svg" alt="" @tap="closeTips">
      </div>

      <div class="share flex a-center j-between" v-if="!showMask">
        <div class="text">分享故事，让更多人看到</div>
        <div class="s-btns flex">
          <button class="btn flex column center box" hover-class="active" @tap="showShareMask">
            <img class="moment" src="https://cdn.tellers.cn/stronger/btn_share_moment.svg" style="width:20rpx;height:20rpx;"> 发到朋友圈
          </button>
          <button class="btn flex column center box" hover-class="active" open-type="share">
            <img class="chat" src="https://cdn.tellers.cn/stronger/btn_chat.svg" style="width:27.5rpx;height:20rpx;"> 发到聊天
          </button>
        </div>
      </div>

      <div class="user flex a-center">
        <img :src="mail.aliasPortrait" alt="" class="left">
        <div class="right flex j-center column">
          <div class="name">
            {{mail.aliasName}}
          </div>
          <div class="number">
            {{mail.readCount}} 次查看
          </div>
        </div>
      </div>

      <div class="content">{{mail.content}} </div>

      <div class="btns flex center" v-if="!creatorFlag">
        <button class="flex center" hover-class="active" :disabled="true" v-if="hugFlag" @tap="hung">您已拥抱</button>
        <button class="flex center" open-type="getUserInfo" hover-class="active" @getuserinfo="onGetUserInfo" v-else-if="!isAuth">给个拥抱</button>
        <button class="flex center" hover-class="active" @tap="hung" v-else>给个拥抱</button>
      </div>

      <div class="hungs">
        <div class="title bold">
          <img src="https://cdn.tellers.cn/stronger/icon_hungs.svg" alt="" class="icon"> 得到
          <span class="em">{{mail.hugCount}}</span> 个拥抱
        </div>

        <div class="users" v-if="mail.hugs">
          <img class="avator" :src="hug.aliasPortrait" alt="" v-for="hug in mail.hugs" :key="hug._id">
        </div>
      </div>

      <button class="back-btn flex center" hover-class="active" v-if="showBackBtn" @tap="toIndex">
        前往感恩节主题馆
      </button>

    </div>

  </div>
</template>

<script>
import { promisify, rpx2px } from "@/utils/index";
import sRequest from "@/utils/stronger-request";
export default {
  mpType: "page",
  data() {
    return {
      showMsg: true,
      showMask: false,
      hugFlag: false,
      creatorFlag: false,
      showBackBtn: true,
      isAuth: false,
      bannerImg: "",
      qrcodeImgUrl: "",
      ramdomIndex: 1,
      shareBanner: "https://cdn.tellers.cn/stronger/share_banner_1.png",
      qrcodeImg: "",
      mail: {},
      newAddedHug: 0
    };
  },
  onShareAppMessage: function(res) {
    let userInfo = getApp().globalData.mys;
    let userId = userInfo._id;
    let id = getApp().globalData.options.query._id || this.mail._id;
    let shareImgs = [
      "https://cdn.tellers.cn/stronger/share-app.png",
      "https://cdn.tellers.cn/stronger/share-app-2.png"
    ];
    let index = Math.floor(Math.random() * shareImgs.length);
    return {
      title: "分享了一段经历",
      path: `pages/stronger-mail/index?refer=${userId}&_id=${id}&back=1`,
      imageUrl: shareImgs[index]
    };
  },

  async onShow() {
    this.showBackBtn = this.$mp.query.back ? true : false;
    let userInfo = getApp().globalData.mys;
    if (!userInfo._id) {
      await sRequest.login(getApp().globalData.options.query.refer);
    }
    this.isAuth = userInfo.unionid ? true : false;
    this.getMail();
  },

  onUnload() {
    this.showMsg = true;
    this.showMask = false;
    this.hugFlag = false;
    this.creatorFlag = false;
    this.showBackBtn = false;
  },
  methods: {
    hung() {
      wx.showLoading({
        title: "",
        mask: true
      });
      let id = this.$mp.query._id;
      sRequest.put(`/story/hug/${id}`).then(
        function() {
          this.getMail();
        }.bind(this)
      );
    },
    closeTips() {
      this.showMsg = false;
    },
    onGetUserInfo(e) {
      wx.showLoading({
        title: "",
        mask: true
      });
      let detail = e.mp.detail;
      if (!detail.userInfo) {
        return wx.hideLoading();
      }

      sRequest.post("/auth", detail).then(
        function(authRes) {
          this.hung();
        }.bind(this)
      );
    },
    async showShareMask() {
      wx.showLoading({
        title: "正在生成",
        mask: true
      });
      let id = this.$mp.query._id || this.mail._id;
      let ramdomIndex = Math.ceil(Math.random() * 10);
      this.ramdomIndex = ramdomIndex;
      this.shareBanner = `https://cdn.tellers.cn/stronger/share_banner_${ramdomIndex}.png`;
      let res = await sRequest.get(`/story/qrcode/${id}`);
      this.qrcodeImg = res.data.img;
      this.qrcodeImgUrl = res.data.imgUrl;
      this.closeTips();
      this.showMask = true;
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
    },

    async savePhoto() {
      wx.showLoading({
        title: "正在下载",
        mask: true
      });
      let id = this.$mp.query._id || this.mail._id;
      let img = this.qrcodeImg;
      let shareRes = await sRequest.get(
        `/story/share/${id}?img=${img}&index=${this.ramdomIndex}`
      );
      let url = shareRes.data.imgUrl;
      let tempFilePath = await this.downloadFile(url);
      await this.saveToAlbum(tempFilePath);
      this.showMask = false;
      wx.hideLoading();
    },
    hideMask() {
      this.showMsg = true;
      this.showMask = false;
    },
    toIndex() {
      wx.navigateTo({
        url: "/pages/stronger-home/index"
      });
    },
    getMail() {
      let id = this.$mp.query._id;
      if (id) {
        sRequest.get(`/story/detail/${id}`).then(
          function(res) {
            let data = res.data;
            this.mail = data.story;
            this.hugFlag = data.hugFlag;
            this.creatorFlag = data.creatorFlag;
            this.newAddedHug = data.newAddedHug;
            wx.hideLoading();
          }.bind(this)
        );
      } else {
        sRequest.get(`/story/myself`).then(
          function(res) {
            let data = res.data;
            this.mail = data.story;
            this.hugFlag = data.hugFlag;
            this.creatorFlag = data.creatorFlag;
            this.newAddedHug = data.newAddedHug;
            wx.hideLoading();
          }.bind(this)
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background: #fff;
  padding-top: 40rpx;
  padding-bottom: 40rpx;
  .p-container {
    filter: none;
    &.lock {
      -webkit-filter: blur(8rpx);
      filter: blur(8rpx);
    }
  }
}

.tips {
  height: 120rpx;
  background: linear-gradient(20deg, #6d6d6d, #2a2828);
  padding: 0 40rpx;
  margin-bottom: 40rpx;
  font-size: 32rpx;
  color: #ffc75d;
  .close {
    width: 40rpx;
    height: 40rpx;
  }
}

.share {
  margin: 0 40rpx 40rpx 40rpx;
  padding-left: 40rpx;
  height: 80rpx;
  color: #fff;
  font-size: 24rpx;
  border-top-left-radius: 40rpx;
  border-bottom-left-radius: 40rpx;
  background: linear-gradient(to right, #737373, #fff);
  .btn {
    width: 100rpx;
    height: 80rpx;
    background: #353535;
    color: #fff;
    font-size: 16rpx;
    padding: 10rpx 0;
    img {
      margin-bottom: 10rpx;
    }
    &:first-child {
      margin-right: 12rpx;
    }
    &.active {
      background: lighten(#353535, 5%);
    }
  }
}

.user {
  font-size: 28rpx;
  padding: 30rpx 40rpx;
  .left {
    width: 80rpx;
    height: 80rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
  }
  .right {
    line-height: 1.8;
  }
  .name {
    font-weight: bold;
  }
  .number {
    color: #999999;
  }
}

.content {
  padding: 10rpx 30rpx;
  line-height: 1.8;
  word-break: normal;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.btns {
  padding: 60rpx 40rpx;
  font-size: 32rpx;
  button {
    width: 516rpx;
    height: 100rpx;
    background: #353535;
          color: #fff;
    font-size: 32rpx;
    &.active {
      background: lighten(#353535, 5%);
      color: #fff;
    }
    &[disabled] {
      background: #fff;
      border: 1px solid #bbb;
    }
  }
}
.hungs {
  font-size: 28rpx;
  color: #c0c6cc;
  background: #fff;
  padding-bottom: 40rpx;
  margin-bottom: 100rpx;
  .title {
    margin: 0 40rpx;
    padding: 30rpx 0;
    border-bottom: #f0eded 2rpx solid;
  }
  .em {
    color: #ffc75d;
  }
  .icon {
    margin-right: 12rpx;
    width: 16rpx;
    height: 20rpx;
    padding: 0;
  }
  .users {
    padding: 10rpx 30rpx;
    .avator {
      width: 86rpx;
      height: 86rpx;
      border-radius: 50%;
      margin-right: 30rpx;
      margin-top: 20rpx;
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
}

.s-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 10;
  .m-layer {
    position: relative;
    width: 670rpx;
    height: 680rpx;
    padding: 30rpx;
    background: #fff;
    border-radius: 4rpx;
    .up {
      width: 610rpx;
      height: 450rpx;
    }
    .down {
      margin-top: 20rpx;
      .text {
        font-size: 20rpx;
        color: #7a7e82;
        margin-right: 30rpx;
        line-height: 36rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      .qr {
        flex-shrink: 0;
        width: 144rpx;
        height: 144rpx;
      }
    }
  }
  .m-btns {
    margin-top: 110rpx;
    button {
      font-size: 32rpx;
      width: 516rpx;
      height: 100rpx;
      background: #353535;
      color: #fff;
      &.active {
        background: lighten(#353535, 5%);
      }
    }
    .desc {
      font-size: 28rpx;
      margin-top: 30rpx;
      color: #414345;
      text-align: center;
    }
  }
}

.back-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  font-size: 32rpx;
  background: #fcf9f9;
  color: #353535;
  &.active {
    background: lighten(#fcf9f9, 5%);
  }
}
</style>
