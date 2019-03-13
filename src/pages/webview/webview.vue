<template>
  <web-view :src="url"></web-view>

</template>
<script>
const URL_MAP = {
  "Solver-Manual": {
    url: "https://api.tellers.cn/static-pages/v2/Solver-Manual.html",
    title: "解答者手册"
  },
  "Trouble-Consultaion-Service-Description": {
    url:
      "https://api.tellers.cn/static-pages/v2/Trouble-Consultaion-Service-Description.html",
    title: "烦恼咨询服务说明"
  }
};
export default {
  data() {
    return {
      url: "",
      type: "",
      time: null
    };
  },
  onLoad(opts) {
    let url, title, type;
    if (opts.url) {
      url = opts.url;
      title = opts.title;
      type = opts.type;
    } else {
      let page = opts.page || "Solver-Manual";
      url = URL_MAP[page].url;
      title = URL_MAP[page].title;
    }
    this.url = url;
    this.type = type;
    wx.setNavigationBarTitle({
      title: title
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
  },
  onShow(){
    const now = new Date().getMinutes();
    let  opts = wx.getLaunchOptionsSync();
    if(!this.time) return;
 
    if((now - this.time) > 1 ){
      this.$router.reLaunch({path: "/pages/welfare/index", query:{status: "success"}})
    } else {
      this.$router.reLaunch({path: "/pages/welfare/index", query:{status: "failedTime"}})
    }
  },
  onHide(){
    if(this.type === "welfare"){
      this.time = new Date().getMinutes();
    }
  }
};
</script>



