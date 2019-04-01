<template>
  <div class="app flex column j-between">
    <session
      v-for="item in list"
      :key="item._id"
      class="list"
    >
      <div class="list_item flex j-between">
        <div class="flex">
          <img
            class="iconfont"
            :src="item.imgUrl"
          >
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">{{ item.name }}</span>
            </div>
            <span
              v-if="item.status === 'CAN_NOT_RECEIVE' "
              class="badge_content"
            >收到 {{ item.requireLikeCount }} 个感谢后可以领取</span>
            <span
              v-else-if="item.status === 'CAN_RECEIVE' "
              class="badge_content"
            >已满足领取条件</span>
            <span
              v-else
              class="badge_content"
            >已于 {{ item.receivedAt | dateFormat }} 获得</span>
          </div>
        </div>
        <div class="exchange flex center">
          <button
            v-if="item.status === 'WEARED' "
            :disabled="true"
            class="flex center badge_weared"
          >
            佩戴中
          </button>
          <button
            v-if="item.status === 'CAN_WEAR' "
            class="flex center"
            @click="wearBadge(item)"
          >
            佩戴
          </button>
          <button
            v-if="item.status === 'CAN_RECEIVE' "
            class="flex center"
            @click="receiveBadge(item)"
          >
            领取
          </button>
          <button
            v-if="item.status === 'CAN_NOT_RECEIVE' "
            disabled
            class="flex center badge_noReceive"
          >
            {{ item.currentLikeCount }}/{{ item.requireLikeCount }}
          </button>
        </div>
      </div>
    </session>
    <session class="list">
      <div class="list_item flex j-between">
        <div class="flex">
          <img
            class="iconfont"
            :src="sunflower.imgUrl"
          >
          <div class="flex column j-start">
            <div>
              <span class="list_item_span">{{ sunflower.name }}</span>
            </div>
            <span
              v-if="sunflower.status === 'CAN_APPLY' "
              class="badge_content"
            >由 Tell 官方运营团队特邀</span>
            <span
              v-if="sunflower.status === 'CAN_WEAR' "
              class="badge_content"
            >由 Tell 官方运营团队特邀</span>
            <span
              v-if="sunflower.status === 'WEARED' "
              class="badge_content"
            >已于 {{ sunflower.createdAt | dateFormat }} 获得</span>
          </div>
        </div>
        <div class="exchange flex center">
          <button
            v-if="sunflower.status === 'CAN_APPLY' "
            class="flex center"
            @click="openSunFlower(sunflower._id)"
          >
            申请
          </button>
          <button
            v-if="sunflower.status === 'APPLYING' "
            class="flex center"
            @click="applySunFlower()"
          >
            申请中
          </button>
          <button
            v-if="sunflower.status === 'CAN_WEAR' "
            class="flex center"
            @click="wearBadge(sunflower)"
          >
            佩戴
          </button>
          <button
            v-if="sunflower.status === 'WEARED' "
            :disabled="true"
            class="flex center badge_weared"
          >
            佩戴中
          </button>
        </div>
      </div>
    </session>
    <session class="list_notice" />
    <Modal ref="mymodal" />
  </div>
</template>
<script>
import Modal from "@/components/Modal";

import shareMix from "@/mixins/mixin";
export default {
  components: {
    Modal
  },
  mixins: [shareMix],
  data() {
    return {
      list: [],
      sunflower: {}
    };
  },
  methods: {
    toShare() {
      this.$router.push({ path: "/pages/share/share" });
    },
    receiveBadge(badge) {
      wx.showLoading({
        title: "请稍等",
        mask: true
      });
      this.$request.post(`/badge/${badge._id}`).then(res => {
        if (res.success) {
          wx.hideLoading();
          this.getList();
          this.$refs.mymodal.show({
            title: "获得徽章",
            content: `恭喜，你已获得 ${badge.name}，是否立即佩戴`,
            type: "CONFIRM",
            confirmButtonText: "佩戴",
            confirmCallbak: function() {
              this.wearBadge(badge);
            }.bind(this),
            sure: "暂不"
          });
        }
      });
    },
    wearBadge(badge) {
      wx.showLoading({
        title: "请稍等",
        mask: true
      });
      this.$request.put(`/badge/${badge._id}`).then(res => {
        if (res.success) {
          wx.hideLoading();
          this.getList();
          this.$refs.mymodal.show({
            title: "已佩戴徽章",
            content: `你已佩戴 ${badge.name}，将跟随笔名显示`
          });
        }
      });
    },
    async getList() {
      let res = await this.$request.get("/badge");
      this.list = res.data.list;
      this.sunflower = res.data.sunflower;
    },
    openSunFlower(id) {
      this.$router.push({ query: { id }, path: "/pages/badge/sunflower" });
    },
    applySunFlower() {
      this.$router.push({
        query: { applying: 0 },
        path: "/pages/badge/applySunflower"
      });
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.getList();
  }
};
</script>
<style lang="less" scope>
page {
  background-color: #ffffff;
}
.list {
  margin: 40rpx 40rpx 0;
  &_item {
    background-color: #ffffff;
    margin-top: 20rpx;
  }
  .count {
    color: #ffc86d;
    margin-left: 8rpx;
    font-weight: 600;
  }
}
.list_item_span {
  font-size: 32rpx;
  color: #4d495b;
}
.exchange {
  & button {
    box-sizing: border-box;
    border: #ffc86d 2rpx solid;
    border-radius: 32rpx;
    height: 64rpx;
    width: 168rpx;
    font-size: 28rpx;
    color: #2b2b2b;
    background-color: #ffffff;
    font-weight: 600;
  }
}
.badge_weared {
  border-color: rgba(255, 200, 109, 0.5);
  background-color: #ffffff !important;
}
.badge_noReceive {
  border-color: #bdbdc0 !important;
  background-color: #ffffff !important;
}
.badge_content {
  margin-top: 12rpx;
  color: #bdbdc0;
  font-size: 24rpx;
}
.notice {
  font-size: 24rpx;
  color: #bdbdc0;
  margin: 0rpx 20rpx 10rpx;
}
.list_notice {
  margin: 40rpx 40rpx;
}
.iconfont {
  width: 60rpx;
  margin-top: 16rpx;
  height: 60rpx;
  margin-right: 20rpx;
}
</style>

