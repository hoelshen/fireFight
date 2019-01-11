<template>
  <div class="app">
    <div class="my_info ">
      <img class="img" :src="logo" @touchstart="login">
      <button @click="login">点击登录</button>
    </div>

    <div class="my_function flex colum">
      <div class="my_function-item flex j-start">
        <button @click="memory">记忆</button></div>
      <div class="my_function-item flex j-between">
        <button @click="ticket">票券</button></div>
      <div class="my_function-item flex j-end" >
        <button @click="badge">徽章</button></div>
    </div>

    <div class="my_contact flex wrap">
      <div class="my_contact-item flex j-start">
        <button @click="welfare">福利社</button></div>
      <div class="my_contact-item flex j-start">
        <button @click="joinGroup">加入群聊</button></div>
      <div class="my_contact-item flex j-start">
        <button @click="questionsFeedback">问题与反馈</button></div>
    </div>

    <div class="my_share flex j-end">
      <button open-type="share" @click="share">分享</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      logo: 'https://user-images.githubusercontent.com/20720117/48262986-80e02780-e45f-11e8-8426-2872916adad9.png',
      message: 'sjh',
      date: new Date(),
      user:{}
    }
  },
  beforeCreate() {
    console.log('Page [my] Vue beforeCreate')
  },
  created() {
    console.log('Page [my] Vue created')
    // console.log(appInstance.globalData) // I am global data
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
    // setTimeout(()=>{
    //     wx.showShareMenu({
    //      withShareTicket: true
    //   })
    // },5000)
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
    login(){
      this.$router.push({query:{id:1}, path:'/pages/login/index'})      
    },
    memory(){
      this.$router.push({query:{id:1}, path:'/pages/memory/index'})
    },
    ticket(){
      this.$router.push({query:{id:1}, path:'/pages/ticket/index'})
    },
    badge(){
      this.$router.push({query:{id:1}, path:'/pages/badge/index'})
    },
    welfare(){
      this.$router.push({query:{id:1}, path:'/pages/welfare/index'})

    },
    joinGroup(){
      this.$router.push({query:{id:1}, path:'/pages/joinGroup/index'})
    },
    questionsFeedback(){
      this.$router.push({query:{id:1}, path:'/pages/questionsFeedback/index'})
    }
  },
  // onShareAppMessage(res) {
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //     console.log(res.target)
  //   }
  //   return {
  //     title: '转发或者分享',
  //   }
  // }
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
      button{
          border-style: solid;
          border-radius: 50%;
          height:80px;
          width: 80px;
          margin:10px 20px;
      }
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
