<template>
  <div class="app">
      <img class="img" :src="logo" @touchstart="changeStat">
      <hello-world :msg="acc" :color="color"></hello-world>
      <div>
        <div>{{ message | toUpperCasefunction }}</div>
        <div>{{ date | dateFormatter }}</div>
      </div>
      <div>{{user.count.a}}</div>
      <input type="text" v-model="user.name">
      <div @click="add">增加</div> 
      <!-- <div>
        <CompA>
          <span slot-scope="scopeProps">{{ scopeProps.item }}</span>
        </CompA>
      </div> -->
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import compA from '@/components/compA.vue'
export default {
  components: {
      HelloWorld,
      compA
  },
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
      this.t++
      this.color = '#'+Math.floor(Math.random()*0xffffff).toString(16)
    },
    add(){
      // this.user.count +=1;
      this.$set(this, this.user.count.a+=1)
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
  padding-top: 100px;
  .img {
    display: block;
    height: 120px;
    width: 138px;
    margin: 20px auto;
  }
  .txt {
      color: #567567;
      font-size: 13px;
      text-align: center;
  }
}
</style>
