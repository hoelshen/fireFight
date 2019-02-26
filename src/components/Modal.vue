<template>
    <cover-view class="modal" @click="clickMask" :value="value" v-if="visible">
        <cover-view class="card flex column center"  @tap.stop="stopkMask">
            <cover-view class="title">
                {{value.title}}
            </cover-view>
            <cover-view v-if="!img" class="content">
                {{value.content}}
            </cover-view>
            <cover-view v-else class="content">
                <cover-image v-if="value.type === 'server'"src="/static/jpg/server_guide.jpg" alt=""/>
                <cover-image v-if="value.type === 'subscript'"src="/static/jpg/subscript_guide.jpg" alt=""/>
                <cover-image v-if="value.type === 'group'"src="/static/jpg/join_group_guide.jpg" alt=""/>
            </cover-view>
            <cover-view class="btn">
                <button v-if="value.type === 'CONFIRM' " class="confirm darkButton" @click="enConfirm">{{value.confirm}}</button>
                <button v-if="value.type === 'group' || value.type === 'server'  || value.type === 'subscript'" open-type="contact" :show-message-card="true" :send-message-img="imgUrl" :send-message-title="filterTitle" :session-from="`nickName'${user.aliasName}, 'avatarUrl':${user.aliasPortrait}`" class="sure darkButton" @click="enSure">{{value.sure}}</button>
                <button v-else class="sure lightButton" @click="enSure">{{value.sure}}</button>
            </cover-view>
        </cover-view>
    </cover-view>
</template>



<script>
export default {
  name: "Modal",
  props: {
    value:{
      isShow:"",
      title: "",
      sure: "",
      type: "no",
      confirm: "",
      content: ""
    }
  },
  data() {
    return {
      img: false,
      user: {},
      type: "no",
      visible: false,
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
          this.visible = false;
          this.value = {};
          this.$emit("input", this.value);
      },
      enSure(){
          this.visible = false;
          this.value = {};
          this.$emit("input", this.value);
      },
      clickMask(){
          this.visible = false;
          this.value = {};
          this.$emit("input", this.value);
      },
      stopkMask(){},
  },
  watch:{
    value:{
      handler(val){
        this.visible = val.isShowModal;
      },
      deep: true,
    },
    visible(val){
      if(val){
        if(this.value.confirm === "server"){
            this.img = true;
            this.filterTitle = "关注服务号";
            this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/service_accout.jpg"        
        }
        if(this.value.confirm === "subscript"){
            this.img = true;
            this.filterTitle = "关注订阅号";
            this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/subscribe_accout.jpg"        
        }
        if(this.value.confirm === "group"){
            this.img = true;
            this.filterTitle = "加群";
            console.log('this.filterTitle: ', this.filterTitle);
            this.imgUrl = "https://cdn.tellers.cn/tell_v2/static/join_group.jpg"
        }
      } else{
        this.img = "";
      }
    }
  },
  created() {
      const { user } = getApp().globalData;
      this.user.aliasName = user.aliasName;
      this.user.aliasPortrait = user.aliasPortrait;
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
