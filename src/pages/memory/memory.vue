<template>
  <view class="app">
    <session
      id="navigatabar"
      class="navigatabar flex"
    >
      <div
        :class="active =='question' ? 'borderColor': ''"
        class="navigatabar_item  flex center"
        @click="toggleQuestion"
      >
        我的咨询
      </div>
      <div
        :class="active =='answer' ? 'borderColor': ''"
        class="navigatabar_item flex center"
        @click="toggleAnswer"
      >
        我的解答
      </div>
    </session>
    <scroll-view
      v-if="active =='question' "
      class="list  box"
      scroll-y
      lower-threshold="200"
      :style="`height: ${scrolHeight}px`"
      @scrolltolower="scrolltolower"
    >
      <Envelope
        v-for="story in List"
        :key="story._id"
        station="memory"
        :mail="story"
      />
      <div
        v-if="List.length === 0"
        class="noMail flex center"
      >
        暂无咨询
      </div>
    </scroll-view>
    <scroll-view
      v-else
      class="list  box"
      scroll-y
      lower-threshold="200"
      :style="`height: ${scrolHeight}px`"
      @scrolltolower="scrolltolower"
    >
      <Envelope
        v-for="reply in List"
        :key="reply._id"
        station="memory"
        :mail="reply"
      />
      <div
        v-if="List.length === 0"
        class="noMail flex center"
      >
        暂无解答
      </div>
    </scroll-view>
  </view>
</template>
<script>
import Envelope from "@/components/Envelope";
import shareMix from "@/mixins/mixin";
export default {
  components: {
    Envelope
  },
  mixins: [shareMix],
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
.navigatabar{
  background-color: #fffefb
}
</style>

