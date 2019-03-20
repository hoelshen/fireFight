<template>
  <div class="app flex column center">
    <div class="prompt flex column center grow">
      <div class="flex column center">
        <div class="flex column targer" v-if="active === 'solution'">
          <div class="textAlign">
            您已解答
            <span class="promptSpn">{{targetUser}}</span>的咨询
          </div>
          <span class="textAlign">若被对方感谢，还将获得 1 张邮票</span>
        </div>
        <div class="flex column targer" v-if="active === 'mail'">
          <span>此回信将于 6 小时左右后</span>
          <div>
            送到
            <span class="promptSpn">{{targetUser}}</span>的信箱
          </div>
        </div>
        <div class="flex column targer" v-if="active === 'story'">
          <div class="line">我们会在每日 22:30 收集咨询箱中的信</div>
          <div class="line">这封信将于 {{time}} 送到解答室</div>
        </div>
        <img class="home flex center" src="/static/jpg/focusServer.jpg">
        <button class="promptBtn flex column center" @click="attention">
          <span>关注服务号</span>
          <span v-if="active === 'solution'">被感谢时立即收到通知</span>
          <span v-if="active === 'story'">被解答时立即收到通知</span>
          <div class="darkIconf">
            <image class="iconfont" src="/static/svgs/leftArrow.svg">
          </div>
        </button>

        <div class="aslks"></div>
      </div>
    </div>
    <button class="lightButton" @click="onsure">好的</button>

    <ImgModal ref="myImgmodal"></ImgModal>
  </div>
</template>


<script>
import ImgModal from "@/components/ImgModal";
export default {
  components: {
    ImgModal
  },
  data() {
    return {
      targetUser: "",
      active: "",
      modal: {
        title: "",
        content: "",
        confirmButtonText: "",
        type: "",
        sure: ""
      },
      time: null
    };
  },
  methods: {
    attention() {
      this.$refs.myImgmodal.show({
        title: "关注服务号",
        type: "ALERT",
        sureButtonText: "马上开始"
      });
    },
    onsure() {
      this.$router.reLaunch({
        query: { active: "home" },
        path: "/pages/home/index"
      });
    }
  },
  onShow() {
    const {
      currentRoute: { query }
    } = this.$router;
    this.targetUser = query.targetUser;
    this.active = query.active;
    const navigationBar = {
      solution: "已解答",
      story: "已提交咨询",
      mail: "已回信"
    };

    let date1 = this.$day()
      .set("hour", 22)
      .set("minute", 30);
    const date2 = this.$day();

    if (date2.isAfter(date1)) {
      date1 = date1.add(1, "day");
    }
    const timer = date1.diff(date2, "hour");

    if (timer <= 0) {
      this.time = `1 小时内`;
    } else {
      this.time = `${timer} 小时后`;
    }

    wx.setNavigationBarTitle({
      title: navigationBar[this.active]
    });
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
<style lang="less" scoped>
.darkIconf {
  height: 64rpx;
  margin-top: 60rpx;
  background-color: #ffc86d;
  border-radius: 32rpx;
}
.iconfont {
  padding: 20rpx 48rpx;
  width: 28rpx;
  height: 24rpx;
}
.targer {
  margin-top: 40rpx;
  font-size: 34rpx;
  color: #4d495b;
  .line {
    line-height: 52rpx;
    text-align: center;
  }
}
.home {
  margin-top: 94rpx;
  width: 630rpx;
  height: 308rpx;
}
.promptBtn {
  margin-top: 176rpx;
  font-weight: 600;
  position: absolute;
  background-color: transparent;
  label {
    font-size: 32rpx;
    line-height: 52rpx;
    text-align: center;
  }
}
.textAlign {
  text-align: center;
}
.promptSpn {
  font-weight: 600;
  line-height: 52rpx;
  margin: 0 10rpx;
}
.lightButton {
  margin-bottom: 60rpx;
  padding: 0rpx 130rpx;
}
</style>

