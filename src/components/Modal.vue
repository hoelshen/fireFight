<template>
    <div class="modal">
        <div class="card flex column center">
            <div class="title">
                {{title}}
            </div>
            <div v-if="!img" class="content">
                {{content}}
            </div>
            <div v-else class="content">
                <img v-if="type === 'group'"src="/static/jpg/join_group_guide.jpg" alt="">
            </div>
            <div class="btn">
                <button v-if="type === 'CONFIRM' " class="confirm darkButton" @click="enConfirm">{{confirm}}</button>
                <button v-if="type === 'group'" open-type="contact" :show-message-card="true" :send-message-img="imgUrl" :send-message-title="title" session-from="{'nickName':user.aliasName, 'avatarUrl':user.aliasPortrait}" class="sure darkButton" @click="enSure">{{sure}}</button>
                <button v-if="type !== 'group' " class="sure lightButton" @click="enSure">{{sure}}</button>
            </div>
        </div>
    </div>
</template>



<script>
export default {
  name: "Modal",
  props: {
    isShowModal: {
      type: Boolean
    },
    title: {
      type: String
    },
    sure: {
      type: String,
      default: "好的"
    },
    type: {
      type: String,
      default: ""
    },
    confir: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      defalut: ""
    }
  },
  data() {
    return {
      img: true,
      user: {},
      type: "no"
    };
  },
  methods:{
      enConfirm(){
          if(this.confirm === "获取邮票") {
              this.$router.reLaunch({
                  query: { active: "mail" },
                  path: "/pages/welfare/index"
              });
          }
          if(this.confirm === "获取解忧券") {
              this.$router.reLaunch({
                  query: { active: "solution" },
                  path: "/pages/welfare/index"
              });
          }
          if(this.confirm === "前往解答室") {
              this.$router.reLaunch({
                  path: "/pages/solution/solutionDetail"
              });
          }
          if(this.title === "Tell 住址") {}

      },
      enSure(){
          this.isShowModal = false;
          this.$emit("change", this.isShowModal);
      }
  },
  created() {
      const { user } = getApp().globalData;
      this.user.aliasName = user.aliasName;
      this.user.aliasPortrait = user.aliasPortrait;
      if(this.confirm === "group"){
          this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/join_group.jpg"
      }
  },
};
</script>
<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(189, 189, 192, 0.1);
  z-index: 99;
}
.card {
  width: 630rpx;
  height: 596rpx;
  background-color: #ffffff;
  border-radius: 4rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
}
.title {
  margin-top: 60rpx;
  font-size: 34rpx;
  font-weight: 600;
}
.content {
  margin: 40rpx 60rpx 60rpx 60rpx;
  & image {
    width: 550rpx;
    height: 244rpx;
  }
}

.sure {
  font-size: 28rpx;
  font-weight: 600;
  padding: 0 130rpx;
  margin-bottom: 60rpx;
  margin-top: 40rpx;
  line-height: 88rpx;
}
</style>
