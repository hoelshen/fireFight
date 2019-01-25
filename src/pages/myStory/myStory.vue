<template>
  <view class="app flex column j-between">
    <div class="appDiv flex column ">
      <div
        class="textAreafloat appDiv"
        v-if="isDisplay"
        @click="hidenMethod"
      >
        <div>1.请尽量具体叙述你的故事，便于解答者理解和代入，从而给出具体的解答</div>
        <div>2.关键的人物、地点等信息建议使用化名</div>
        <div>3.落款署名尽量不要使用笔名或微信昵称</div>
      </div>
      <textarea
        class="textArea"
        v-else
        focus
        maxlength="50"
        :value="content"
        @input="bindTextAreaBlur"
      />
      <div class="flex j-between textName">
        <span>署名:</span>
        <input class="aliasNameInput" type="this" @input="bindKeyInput" :value="aliasName">
        <div class="refreshBtn" @click="refresh"></div>
      </div>
      <div class="flex j-end textDay" >
        <span>{{day}}</span>
        <span>{{weather}}</span>
      </div>
      </div>

    <div class="flex column textAdd">
      <button class="addMystoryButton" @click="onPush">提交咨询</button>
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
      aliasName: ""
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
          confirmColor: "#ff4d6b",
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
      this.hidenText = false;
      this.isDisplay = false;
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
  min-height: 750rpx;
}
.textArea {
  background-color: #979797;
  opacity: 0.2;
  min-height: 400rpx;
  margin: 18rpx 60rpx;
  color: black;
}
.textName {
  margin: 18rpx 60rpx;
}
.textDay {
  margin: 18rpx 60rpx;
}
.textAdd {
  margin: 18rpx 60rpx;
  &button {
    margin-bottom: 12rpx;
  }
}
.textAreafloat {
  min-height: 200px;
  width: 630rpx;
  height: 375rpx;
  margin: 18rpx 60rpx;
}
.play {
  position: relative;
  top: 50%;
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
.addMystoryButton {
  border-radius: 23px;
  margin-bottom: 24rpx;
  width: 316rpx;
  height: 92rpx;
  border: 1 solid #a9a9a9;
  color: #ffffff;
  background-color: #ff4d6b;
}
.text-ontent {
  margin: auto;
  margin-top: 24rpx;
  color: #a9a9a9;
}
.refreshBtn {
  width: 44rpx;
  height: 44rpx;
}
</style>
