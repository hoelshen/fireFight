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
  },
  FocusServer: {
    url: "https://mp.weixin.qq.com/s/o4T39HyVAgtv2XplB6MLqA",
    title: "关注服务号"
  },
  FocusSubscript: {
    url: "https://mp.weixin.qq.com/s/y-jhXyvsh9ZLzNR8TMh8Aw",
    title: "关注订阅号"
  }
};
export default {
  data() {
    return {
      url: ""
    };
  },
  onLoad(opts) {
    let url, title;
    if (opts.url) {
      url = opts.url;
      title = opts.title;
    } else {
      let page = opts.page || "Solver-Manual";
      url = URL_MAP[page].url;
      title = URL_MAP[page].title;
    }
    this.url = url;
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
  }
};
</script>



