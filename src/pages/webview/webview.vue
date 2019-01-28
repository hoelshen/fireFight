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
      url: ""
    };
  },
  onLoad(opts) {
    const page = opts.page || "Solver-Manual";
    this.url = URL_MAP[page].url;
    wx.setNavigationBarTitle({
      title: URL_MAP[page].title
    });
  }
};
</script>



