<template>
  <view class="app">
    <div class="appDiv flex wrap j-start">
      <div
        class="textAreafloat appDiv"
        v-if="isDisplay"
        @click="hidenMethod"
        :class="[isDisplay ? 'block' : 'none']"
      >
        <div>1.请尽量具体叙述你的故事，便于解答者理解和代入，从而给出具体的解答</div>
        <div>2.关键的人物、地点等信息建议使用化名</div>
        <div> 3.落款署名尽量不要使用笔名或微信昵称</div>
      </div>
      <textarea
        class="textArea"
        maxlength="50"
        :value="content"
        @input="bindTextAreaBlur"
      />

      </div>
        <div class="flex j-between">
            <div class="flex j-start">
                <span>{{day}}</span>
                <span>{{weather}}</span>
            </div>
            <div class="flex j-end">
                <span>署名:</span>
                <input class="aliasNameInput" type="this"  @input="bindKeyInput" :value="aliasName">
                <button @click="refresh">刷新</button>
            </div>
        </div>

        <div class="flex column">
            <button @click="onPush">提交咨询</button>
            <p class="text-center">需要使用1张解忧券</p>
        </div>

    </view>
</template>
<script>
export default {
  data() {
    const day = this.$day().format("YYYY/MM/DD"); ///.format('YYYY-MM-DD') // 展示
    return {
      content: "",
      weather: "",
      hidenText: true,
      isDisplay: true,
      day: day,
      aliasName: ""
    };
  },
  methods: {
    onPush() {
      console.log("this.content", this.content);
      this.$request
        .post("/mail/story", {
          content: this.content,
          weather: this.weather,
          aliasName: this.aliasName
        })
        .then(res => {
          console.log("res", res);
        })
        .catch(() => {});
      this.$router.push({
        query: { active: "consultative" },
        path: "/pages/detail/index"
      });
    },
    bindTextAreaBlur(e) {
      this.content = e.detail.value;
    },
    bindKeyInput(e) {
      this.aliasName = e.detail.value;
    },
    hidenMethod() {
      this.hidenText = false;
      this.isDisplay = false;
      console.log("isDisplay: ", this.isDisplay);
      console.log("hidenText: ", this.hidenText);
    },
    refresh(e) {
      console.log("e", e);
    }
  },
  onShow() {
    console.log("this.content", this.content);
    this.$request
      .get("/weather")
      .then(res => {
        this.weather = res.data;
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};
</script>
<style lang="less">
.appDiv {
  width: 750rpx;
  height: 375rpx;
}
.textArea {
  min-height: 200px;
  height: 375rpx;
  margin: 18rpx 60rpx;
}
.textAreafloat {
  min-height: 200px;
  width: 630rpx;
  height: 375rpx;
  z-index: 99;
  position: absolute;
  margin: 18rpx 60rpx;
}
.play {
  position: relative;
  top: 50%;
  // height: 50px;
  // margin-top: -25px;
  display: flex;
  width: 750rpx;
  height: 375rpx;
}
.aliasNameInput {
  border: 1px solid;
  ::after {
    content: "";
    display: block;
    width: 14px;
    height: 1px;
    background: #95835e;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }
}
.textContent {
  word-break: normal;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
