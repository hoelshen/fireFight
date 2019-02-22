<template>
  <view class="app flex column j-between">
    <div class="appDiv flex column">
      <div class="text shadow">
        <div class="textAreafloat flex column j-start" v-if="isDisplay" @click="hidenMethod">
          <div>· 请尽量具体叙述你的故事，便于解答者理解和代入，从而给出具体的解答.</div>
          <div>· 关键的人物、地点等信息建议使用化名</div>
          <div>· 落款署名尽量不要使用笔名或微信昵称</div>
        </div>
        <textarea class="textArea" :auto-height="true"  v-else @blur="onBlur" :focus="isFocus" maxlength="5000" cursor-spacing="30" :value="content" @input="bindTextAreaBlur" />
      </div>
      <div class="flex column j-between textName">
        <div class="flex j-end a-center">
          <span class="textNameSpan">署名</span>
          <input class="aliasNameInput" @input="bindKeyInput" :value="aliasName">
          <div class="refreshBtn" @click="refresh">
            <image class="iconfont" src="/static/svgs/refresh.svg"></image>
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

    <Modal v-if="isShowModal" :type="modal.type" :title="modal.title" :content="modal.content" :confirm="modal.confirm" :sure="modal.sure" @change="showModal"></Modal>
  </view>
</template>
<script>
import Modal from "@/components/Modal";
var WORDS =
  "自杀|迫害|家暴|不想活|不活了|生无可恋|抑郁症|十分压抑|非常压抑|没有希望|死了算了|跳楼|自尽";
const SENSITIVE_REG = new RegExp(WORDS, "i");

export default {
  components: {
    Modal
  },
  data() {
    const day = this.$day().format("YYYY/MM/DD"); ///.format('YYYY-MM-DD') // 展示
    return {
      content: "",
      weather: "",
      isDisplay: true,
      day: day,
      aliasName: "",
      isFocus: false,
      ticketCount: 0,
      isShowModal: false,
      modal: {
        title: "",
        content: "",
        confirm: "",
        type: "",
        sure: ""
      }
    };
  },
  methods: {
    async onPush() {
      if (this.ticketCount === 0) {
        this.modal.title = "解忧券不足";
        this.modal.content = "需要消耗 1 解忧券，当前余额不足";
        this.modal.confirm = "获取解忧券";
        this.modal.type = "CONFIRM";
        this.modal.sure = "好的";
        this.isShowModal = true;
        try {
          wx.setStorage({
            key: "story",
            data: this.content
          });
        } catch (error) {}
        return false;
      }
      if (this.content.length < 50) {
        return wx.showToast({
          title: "认真的讲述更容易获得解答，多写几句吧",
          icon: "none",
          duration: 2000
        });
      }
      if (this.content.length > 5000) {
        return wx.showToast({
          icon: "none",
          title: "请控制在5000字以内"
        });
      }
      if (this.aliasName.length > 10) {
        return wx.showToast({
          icon: "none",
          title: "署名过长，请改短一些"
        });
      }
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
        wx.removeStorage({
          key: "story"
        }); // 清空缓存
        this.$router.push({
          query: {
            active: "story",
            targetUser: this.target
          },
          path: "/pages/solution/promptPage"
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
      setTimeout(
        function() {
          this.isFocus = true;
        }.bind(this),
        1000
      );
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
      if (this.content.length === 0) {
        this.isDisplay = true;
      }
    },
    showModal() {
      this.isShowModal = false;
      this.modal.title="";
      this.modal.sure="";
      this.modal.type="";
      this.modal.confirm="";
      this.modal.content="";
    }
  },
  onShow() {
    const { user } = getApp().globalData;
    this.ticketCount = user.ticketCount;
    try {
      const value = wx.getStorageSync("story");
      if (value) {
        this.content = value;
        this.isDisplay = false;
        // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }
    this.getWeather();
    this.refresh();
  },
  onShareAppMessage(res) {
    let { title, imageUrl, path, user } = getApp().globalData;
    path = user._id ? `${path}&refer=${user._id}` : path;
    return {
      title,
      imageUrl,
      path
    };
  },
  onHide(){ //跳转页面
    wx.setStorage({
      key: "story",
      data: this.content
    });
  },
  onUnload(){ //回退
    wx.setStorage({
          key: "story",
          data: this.content
    })
  }
};
</script>
<style lang="less" scoped>
.appDiv {
  margin: 40rpx 60rpx;
  min-height: 1042rpx;
}
.text {
  background-color: #ffffff;
  min-height: 830rpx;
  color: rgba(189, 189, 192, 1);
}
.textArea {
  min-height: 750rpx;
  background-color: #ffffff;
  color: #4d495b;
  padding: 40rpx;
  width: 100%;
  font-size: 34rpx;
  box-sizing: border-box;
  line-height: 52rpx;
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
  min-height: 750rpx;
  margin: 40rpx;
  line-height:52rpx;
  color: rgba(169, 169, 169, 1);
  background-color: #ffffff;
}
.play {
  position: relative;
  top: 50%;
  display: flex;
  width: 750rpx;
  height: 375rpx;
}
.aliasNameInput {
  width: 252rpx;
  height: 84rpx;
  padding-left: 20rpx;
  background-color: rgba(189, 189, 192, 0.15);
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
  font-size:28rpx;

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
