<template>
  <view class="app">
    <session class="navigatabar flex" id="navigatabar">
      <div @click="toggleQuestion" :class="active =='question' ? 'borderColor': ''" class="navigatabar_item  flex center">我的咨询</div>
      <div @click="toggleAnswer" :class="active =='answer' ? 'borderColor': ''" class="navigatabar_item flex center">我的解答</div>
    </session>
    <scroll-view class="list  box" scroll-y lower-threshold="200" :style='`height: ${scrolHeight}px`' @scrolltolower="scrolltolower" v-if="active =='question' ">
      <Envelope station="memory" :mail="story" v-for="story in storyList" :key="story._id">
      </Envelope>
      <div v-if="storyList.length === 0" class="noMail flex center">
        暂无咨询
      </div>
    </scroll-view>
    <scroll-view class="list  box" scroll-y lower-threshold="200" :style='`height: ${scrolHeight}px`' @scrolltolower="scrolltolower" v-else>
      <Envelope station="memory" :mail="reply" v-for="reply in replyList" :key="reply._id">
      </Envelope>
      <div v-if="replyList.length === 0" class="noMail flex center">
        暂无解答
      </div>
    </scroll-view>
  </view>
</template>
<script>
import Envelope from "@/components/Envelope";
export default {
  components: {
    Envelope
  },
  data() {
    return {
      active: "question",
      storyList: [],
      replyList: [],
      storyPage: 1,
      replyPage: 1,
      scrolHeight: "562"
    };
  },
  onLoad() {
    this.setScrollHeight();
  },
  onShow() {
    this.getStoryList();
    //this.getReplyList();
  },
  methods: {
    setScrollHeight() {
      wx
        .createSelectorQuery()
        .select(".navigatabar")
        .boundingClientRect()
        .exec(
          function(res) {
            let barHeight = res[0].height;
            let systemInfo = wx.getSystemInfoSync();
            this.scrolHeight = systemInfo.windowHeight - barHeight;
          }.bind(this)
        );
    },
    toggleQuestion() {
      this.active = "question";
      this.getStoryList(1);
    },
    toggleAnswer() {
      this.active = "answer";
      this.getReplyList(1);
    },
    scrolltolower() {
      if (this.active == "question") {
        this.getStoryList(this.storyPage + 1);
      } else {
        this.getReplyList(this.replyPage + 1);
      }
    },
    async getStoryList(page = 1) {
      let res = await this.$request.get(`/mail/mine/outbox?page=${page}`); //我的咨询
      if (page == 1) {
        this.storyPage = 1;
        this.storyList = res.data;
      } else if (res.data.length > 0) {
        this.storyPage = page;
        this.storyList = this.storyList.concat(res.data);
      }
    },
    async getReplyList(page = 1) {
      let res = await this.$request.get(`/mail/mine/inbox?page=${page}`); //我的咨询
      if (page == 1) {
        this.replyPage = 1;
        this.replyList = res.data;
      } else if (res.data.length > 0) {
        this.replyPage = page;
        this.replyList = this.replyList.concat(res.data);
      }
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
.list {
  padding-bottom: 80rpx;
}
.noMail {
  height: 400rpx;
  margin: 80rpx;
}
</style>

