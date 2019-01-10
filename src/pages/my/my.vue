<template>
  <div class="app">
    <div class="my_info ">
      <img class="img" :src="logo" @touchstart="changeStat">
      <button @click="changeStat">点击登录</button>
    </div>

    <div class="my_function flex colum">
      <div class="my_function-item flex j-start" @click="memory">记忆</div>
      <div class="my_function-item flex j-between" @click="ticket">票券</div>
      <div class="my_function-item flex j-end" @click="badge">徽章</div>
    </div>

    <div class="my_contact flex wrap">
      <div class="my_contact-item flex j-start" @click="welfare">福利社</div>
      <div class="my_contact-item flex j-start" @click="joinGroup">加入群聊</div>
      <div class="my_contact-item flex j-start" @click="questionsFeedback">问题与反馈</div>
    </div>

    <div class="my_share flex j-end">
      <button @click="share">分享</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      logo: 'https://user-images.githubusercontent.com/20720117/48262986-80e02780-e45f-11e8-8426-2872916adad9.png',
      color: '#007d37',
      acc: 'hello sjh',
      message: 'sjh',
      date: new Date(),
      user:{
        name: 'sjh',
        count:{
          a:1
        }
      }
    }
  },
  beforeCreate() {
    console.log('Page [my] Vue beforeCreate')
  },
  created() {
    console.log('Page [my] Vue created')
    var appInstance = getApp()
    console.log(appInstance.globalData) // I am global data
  },
  beforeMount() {
    console.log('Page [my] Vue beforeMount')
  },
  mounted() {
    console.log('Page [my] Vue mounted')
  },
  onLoad: function(options) {
    // Do some initialize when page load.
    wx.hideTabBar({})
    console.log('Page [my] onLoad')
  },
  onReady: function() {
    // Do something when page ready.
    console.log('Page [my] onReady')
  },
  onShow: function() {
    // Do something when page show.
    console.log('Page [my] onShow')
  },
  onHide: function() {
    // Do something when page hide.
    console.log('Page [my] onHide')
  },
  onUnload: function() {
    // Do something when page close.
    console.log('Page [my] onUnload')
  },
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
  methods:{
    changeStat(){
      console.log('登录完成')
    },
    memory(){

    },
    ticket(){

    },
    badge(){

    },
    welfare(){

    },
    joinGroup(){

    },
    questionsFeedback(){

    },
    share(){

    }
  },
  watch: {
    // user(){
    //   return this.$set(this, user.count=2);
    // }
  },
}
</script>

<style lang="less" scoped>
.app{
  padding-top: 20px;
  .img {
    display: block;
    border-radius: 50%;
    border-style: solid;
    height: 60px;
    width: 60px;
    margin: 20px auto;
  }
  .txt {
      color: #567567;
      font-size: 13px;
      text-align: center;
  }
  .my_function {

    .my_function-item{
     border-style: solid;
     border-radius: 50%;
     height:80px;
     width: 80px;
     margin:10px 20px;
    }
  }
  .my_contact {
    .my_contact-item {
      border-style: solid;
      margin:10px 10px;
      height:56px;
      width: 325px;
    }
  }
  .my_share{
    & button{
     border-style: solid;
     border-radius: 50%;
     height:80px;
     width: 80px;
    }
  }
}
</style>
