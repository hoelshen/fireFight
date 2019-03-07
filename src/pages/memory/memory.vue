<template>
  <view class="app">
    <session class="navigatabar flex" id="navigatabar">
      <div @click="toggleQuestion" :class="active =='question' ? 'borderColor': ''" class="navigatabar_item  flex center">我的咨询</div>
      <div @click="toggleAnswer" :class="active =='answer' ? 'borderColor': ''" class="navigatabar_item flex center">我的解答</div>
    </session>
    <scroll-view class="list  box" scroll-y lower-threshold="200" :style='`height: ${scrolHeight}px`' @scrolltolower="scrolltolower" v-if="active =='question' ">
      <Envelope station="memory" :mail="story" v-for="story in List" :key="story._id">
      </Envelope>
      <div v-if="List.length === 0" class="noMail flex center">
        暂无咨询
      </div>
    </scroll-view>
    <scroll-view class="list  box" scroll-y lower-threshold="200" :style='`height: ${scrolHeight}px`' @scrolltolower="scrolltolower" v-else>
      <Envelope station="memory" :mail="reply" v-for="reply in List" :key="reply._id">
      </Envelope>
      <div v-if="List.length === 0" class="noMail flex center">
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
      List: [],
      Page: 1,
      isFlage: false,
      scrolHeight: "562"
    };
  },
  onLoad() {
    this.setScrollHeight();
  },
  onShow() {
    this.getList();
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
      this.isFlage = false;
      this.Page = 1;
      this.List =[];
      this.getList(1);
    },
    toggleAnswer() {
      this.active = "answer";
      this.isFlage = false;
      this.Page = 1;
      this.List =[];
      this.getList(1);
    },
    scrolltolower() {
      this.getList(this.Page + 1);
    },
    async getList(page = 1) {
      // console.log("Page", Page);
      if(this.isFlage) return false;
        let res;
      if(this.active == "question"){
         res = await this.$request.get(`/mail/mine/outbox?page=${page}`); //我的咨询
      } else{
         res = await this.$request.get(`/mail/mine/inbox?page=${page}`); //我的咨询
      }

      if(res.data.length === 0){
        this.isFlage = true;
        return false;
      }

      if (page == 1) {
        this.Page = 1;
        this.List = res.data;
      } else if (res.data.length > 0) {
        this.Page = page;
        this.List = this.List.concat(res.data);
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
.list{
  padding-bottom: 80rpx;
  margin-top: -40rpx;
}
.noMail {
  height: 400rpx;
  margin: 80rpx;
}
</style>

