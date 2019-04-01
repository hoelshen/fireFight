<template>
  <div class="box page flex center column">
    <div class="img flex column">
      <div class="up">
        <div class="title flex center">
          送你一张解忧券
        </div>
        <div class="desc  flex center">
          让 {{ answerers }} 位解答者为你解忧
        </div>
      </div>
      <div class="down flex grow center">
        <div
          v-if="isReceived"
          class="txt"
        >
          <span>你已领取解忧券 </span>
          <span
            class="highlight"
            @click="toHome"
          >去使用 &gt;&gt;</span>
        </div>
        <button
          v-else
          class="darkButton"
          :disabled="!isLoadSuccess"
          @click="receiveGift"
        >
          领取
        </button>
      </div>
    </div>
    <div class=" tips grow ">
      <div class="title flex center ">
        解忧券有什么用？
      </div>
      <div class="desc ">
        这是一张帮你解除烦恼的神奇票券，我们生而为人，总在不经意间遇到种种烦恼。你可以凭解忧券来使用 Tell 的烦恼咨询服务，让有缘的解答者为你分忧。
      </div>
    </div>
  </div>
</template>
<script>
import { promisify } from "@/utils/index";

import shareMix from "@/mixins/mixin";
export default {
  mixins: [shareMix],
  data() {
    return {
      isLoadSuccess: false,
      isReceived: false,
      answerers: 0
    };
  },
  onShow() {
    this.getGift();
  },
  methods: {
    async getGift() {
      let type = this.$mp.query.type || "invite";
      let res = await this.$request.get(`/task/gift?type=${type}`);
      this.answerers = res.data.answerers;
      this.isReceived = res.data.isReceived;
      this.isLoadSuccess = true;
    },
    async receiveGift() {
      let type = this.$mp.query.type || "invite";
      let res = await this.$request.post(`/task/gift?type=${type}`);
      if (res.success) {
        wx.showToast({
          title: "领取成功",
          icon: "none"
        });
        this.isReceived = true;
      }
    },
    toHome() {
      this.$router.reLaunch({ path: "/pages/home/index" });
    }
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
}

.img {
  width: 630rpx;
  height: 720rpx;
  background-color: #4d495b;
  background-image: url("https://cdn.tellers.cn/tell_v2/static/share_mine_v3.jpg");
  background-size: cover;
  .up {
    height: 472rpx;
  }
  .title {
    margin: 52rpx 0 30rpx 0;
    color: #4d495b;
    font-size: 60rpx;
    font-weight: bold;
  }
  .desc {
    font-size: 28rpx;
    color: #4d495b;
  }
  .txt {
    font-size: 28rpx;
    color: #bdbdc0;
  }
  .highlight {
    margin-left: 10rpx;
    color: #ffc86d;
  }
}

.tips {
  text-align: center;
  line-height: 52rpx;
  .title {
    color: #ffc86d;
    font-size: 34rpx;
    font-weight: bold;
    margin-top: 108rpx;
    margin-bottom: 24rpx;
  }
  .desc {
    text-align: left;
  }
}

.darkButton {
  margin-bottom: 0;
  width: 316rpx;
}
</style>

