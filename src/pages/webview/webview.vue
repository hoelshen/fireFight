<template>
  <web-view :src="url" />
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
      time: null,
      id: "" //福利社任务id
    };
  },
  onLoad(opts) {
    let url, title, type;
    if (opts.url) {
      if(opts.id){
        url = `${opts.url}?id=${opts.id}`;
      } else{
        url = opts.url;
      }
      title = opts.title;
      type = opts.type;
    } else {
      let page = opts.page || "Solver-Manual";
      url = URL_MAP[page].url;
      title = URL_MAP[page].title;
    }
    this.url = url;
    this.type = type;
    this.id = opts.id;
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
    const now = parseInt(new Date().getTime() / 1000); //当前时间戳
    let  opts = wx.getLaunchOptionsSync();
    if(!this.time) return;
 
    if((now - this.time) < 60) {
      getApp().globalData.taskState = "failedTime";
       wx.navigateBack({
        data:1
      });
      return ;
    }
    
    return  this.$request.post(`/task/ad/${this.id}`).then(res=>{
                if(res.success){
                  getApp().globalData.taskState = "success";
                    wx.navigateBack({
                      data:1
                    });
                    return ;                  
                }
            })
  },
  onHide(){
    if(this.type === "welfare"){
      this.time = parseInt(new Date().getTime() / 1000); //当前时间戳
    }
  }
};
</script>



