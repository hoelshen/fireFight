<template>
    <cover-view class="modal" @click="clickMask">
        <cover-view class="card flex column center"  @tap.stop="stopkMask">
            <cover-view class="title">
                {{title}}
            </cover-view>
            <cover-view v-if="!img" class="content">
                {{content}}
            </cover-view>
            <cover-view v-else class="content">
                <cover-image v-if="type === 'server'"src="/static/jpg/server_guide.jpg" alt=""/>
                <cover-image v-if="type === 'subscript'"src="/static/jpg/subscript_guide.jpg" alt=""/>
                <cover-image v-if="type === 'group'"src="/static/jpg/join_group_guide.jpg" alt=""/>
            </cover-view>
            <cover-view class="btn">
                <button v-if="type === 'CONFIRM' " class="confirm darkButton" @click="enConfirm">{{confirm}}</button>
                <button v-if="type === 'group' || type === 'server'  || type === 'subscript'" open-type="contact" :show-message-card="true" :send-message-img="imgUrl" :send-message-title="filterTitle" :session-from="`nickName'${user.aliasName}, 'avatarUrl':${user.aliasPortrait}`" class="sure darkButton" @click="enSure">{{sure}}</button>
                <button v-else class="sure lightButton" @click="enSure">{{sure}}</button>
            </cover-view>
        </cover-view>
    </cover-view>
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
    confirm: {
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
      img: false,
      user: {},
      type: "no",
      filterTitle: ""
    };
  },
  methods:{
      enConfirm(){
          if(this.confirm === "获取邮票") {
              this.$router.push({
                  query: { active: "mail" },
                  path: "/pages/welfare/index"
              });
          }
          if(this.confirm === "获取解忧券") {
              this.$router.push({
                  query: { active: "solution" },
                  path: "/pages/welfare/index"
              });
          }
          if(this.confirm === "前往解答室") {
              this.$router.push({
                  path: "/pages/solution/tags"
              });
          }
          if(this.title === "Tell 住址") {}
          this.$emit("change", this.isShowModal);
      },
      enSure(){
          this.$emit("change", this.isShowModal);
      },
      clickMask(){
          this.$emit("change", this.isShowModal);
      },
      stopkMask(){}
  },
  created() {
      const { user } = getApp().globalData;
      this.user.aliasName = user.aliasName;
      this.user.aliasPortrait = user.aliasPortrait;
      if(this.confirm === "server"){
          this.img = true;
          this.filterTitle = "关注服务号";
          this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/service_accout.jpg"        
      }
      if(this.confirm === "subscript"){
          this.img = true;
          this.filterTitle = "关注订阅号";
          this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/subscribe_accout.jpg"        
      }
      if(this.confirm === "group"){
          this.img = true;
          this.filterTitle = "加群";
          this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/join_group.jpg"
      }
  }
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
  background-color: rgba(77, 73, 91, .3);
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
  white-space:normal;
  line-height:52rpx;
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
