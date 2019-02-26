<template>
  <div class="app flex column center">
    <div class="prompt flex column center grow">
      <div class="promptDiv flex column center" >
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
            <div class="line">我们会在每日 22:30</div>
            <div class="line">收集咨询箱中的信</div>
          </div>
          <image class="home flex center" src="/static/jpg/focusServer.jpg">
          </image>
          <button class="promptBtn flex column center" @click="attention">
            <span>关注服务号</span>
            <span>被感谢时立即收到通知</span>
            <image class="iconfont darkButton" src="/static/svgs/leftArrow.svg" />
          </button>        
      </div>
    </div>
    <button class="lightButton" @click="onsure">好的</button>

    <Modal ref="mymodal"></Modal>
  </div>
</template>


<script>
import Modal from "@/components/Modal";
export default {
  components: {
    Modal
  }, 
  data() {
    return {
      targetUser: "",
      active: "",
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
    attention(){
      this.$refs.mymodal.show({
          title: "关注服务号",
          content: "",
          confirm: "server",
          type: "server",
          sure: "马上开始",
      })
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
      mail: "已回信",
    };
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
.darkButton {
  margin-top: 60rpx;
  text-align: center;
  line-height: 64rpx;
  padding: 10rpx 40rpx;
}
.targer {
  margin-top: 40rpx;
  font-size: 34rpx;
  color: #4D495B;
  .line{
    line-height: 52rpx;
  }
}
.home{
  margin-top:94rpx;
  width:630rpx;
  height:308rpx;
}
.promptBtn {
  margin-top:176rpx;
  font-weight:600;
  position:absolute;
  background-color:transparent;
  label{
    line-height: 52rpx;
    text-align: center;
  }
}
.textAlign{
  text-align: center
}
.promptSpn {
  font-weight: 600;
  line-height: 52rpx;
  margin: 0 10rpx;
}
.lightButton{
  margin-bottom:60rpx;
  padding:0rpx 130rpx;
}
</style>

