<template>
  <view class="app flex column j-between">
    <div class="appDiv flex column">
      <div class="text">
        <div class="textAreafloat flex column j-start" v-if="isDisplay" @click="hidenMethod">
          <div style="line-height:52rpx">1.请尽量具体叙述你的故事，便于解答者理解和代入，从而给出具体的解答.</div>
          <div style="line-height:52rpx">2.关键的人物、地点等信息建议使用化名</div>
          <div style="line-height:52rpx">3.落款署名尽量不要使用笔名或微信昵称</div>
        </div>
        <textarea
          class="textArea"
          v-else
          @blur="onBlur"
          :focus="isFocus"
          maxlength="50"
          :value="content"
          @input="bindTextAreaBlur"
        />
      </div>
      <div class="flex column j-between textName">
        <div class="flex j-end a-center">
          <span class="textNameSpan">署名:</span>
          <input class="aliasNameInput" type="this" @input="bindKeyInput" :value="aliasName">
          <div class="refreshBtn" @click="refresh">
            <image class="iconfont" src="/static/svgs/refresh.svg">
          </div>
        </div>
      </div>
      <div class="flex j-end textDay">
        <span>{{day}}</span>
        <span>{{weather}}</span>
      </div>
    </div>

    <div class="flex column textAdd center">
      <button class="addMystoryButton flex center" @click="onPush">提交咨询</button>
      <p class="text-center">需要使用1张解忧券</p>
    </div>
  </view>
</template>
<script>
var WORDS =
  "自杀|迫害|家暴|不想活|不活了|生无可恋|抑郁症|十分压抑|非常压抑|没有希望|死了算了|跳楼|自尽";
const SENSITIVE_REG = new RegExp(WORDS, "i");

export default {
  data() {
    const day = this.$day().format("YYYY/MM/DD"); ///.format('YYYY-MM-DD') // 展示
    return {
      content: "",
      weather: "",
      hidenText: true,
      isDisplay: true,
      day: day,
      aliasName: "",
      isFocus: false
    };
  },
  methods: {
    async onPush() {
      const mail = {
        content: this.content,
        weather: this.weather,
        aliasName: this.aliasName
      };
      if (this.content.match(SENSITIVE_REG)) {
        getApp().globalData.mail = mail; // 敏感词检测
        return wx.navigateTo({
          url: "/pages/help/index"
        });
      }
      let res = await this.$request.post("/mail/story", mail);
      if (res.success) {
        wx.showModal({
          content:
            "我们会在每日22:30收集咨询箱中的信关注服务号，被解答时立即收到通知",
          showCancel: false,
          confirmText: "好的",
          confirmColor: "#FFC86D",
          success: result => {
            if (result.confirm) {
              this.$router.push({
                path: "/pages/home/index"
              });
            }
          },
          fail: () => {},
          complete: () => {}
        });
      }
    },
    bindTextAreaBlur(e) {
      this.content = e.detail.value;
    },
    bindKeyInput(e) {
      this.aliasName = e.detail.value;
    },
    hidenMethod() {
      this.isFocus = true;
      this.hidenText = false;
      this.isDisplay = false;
    },
    async refresh() {
      let name = await this.$request.get("/name");
      this.aliasName = name.data;
    },
    async getWeather() {
      let res = await this.$request.get("/weather");
      this.weather = res.data;
    },
    onBlur() {
      this.isDisplay = true;
    }
  },
  onShow() {
    this.getWeather();
    this.refresh();
  }
};
</script>
<style lang="less" scoped>
.appDiv {
  min-height: 750rpx;
  margin: 40rpx 60rpx;
}
.text {
  background-color: rgba(189, 189, 192, 0.05);
  color: rgba(189, 189, 192, 1);
}
.textArea {
  min-height: 750rpx;
  background-color: #ffffff;
  color: black;
}
.textNameSpan {
  margin-right: 20rpx;
}
.textName {
  margin-top: 60rpx;
  margin-bottom: 24rpx;
}

.textDay {
  margin-top: 24rpx 0rpx;
}
.textAdd {
  margin-bottom: 60rpx;
  &button {
    margin-bottom: 12rpx;
  }
}
.textAreafloat {
  min-height: 640rpx;
  margin: 40rpx;
  color: rgba(169, 169, 169, 1);
}
.play {
  position: relative;
  top: 50%;
  display: flex;
  width: 750rpx;
  height: 375rpx;
}
.aliasNameInput {
  width: 196rpx;
  height: 84rpx;
  border: 1px solid;
}
.addMystoryButton {
  border-radius: 23px;
  margin-bottom: 24rpx;
  height: 92rpx;
  border: 1 solid #a9a9a9;
  color: #ffffff;
  padding: 26rpx 102rpx;
  text-align: center;
  background-color: #ffc86d;
}
.text-ontent {
  margin: auto;
  margin-top: 24rpx;
  color: #a9a9a9;
}
.text-center {
  color: #bdbdc0;
  font-size: 28rpx;
}
.refreshBtn {
  width: 44rpx;
  height: 44rpx;
  margin-left: 20rpx;
}
</style>
