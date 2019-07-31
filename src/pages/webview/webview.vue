<template>
  <web-view :src="url" />
</template>
<script>
import shareMix from "@/mixins/mixin";
const URL_MAP = {
  "1": {
    url: "",
    title: ""
  },
};
export default {
  mixins: [shareMix],
  data() {
    return {
      url: "",
      type: "",
      time: null,
      duration: "", //福利社任务时间
      id: "" //福利社任务id
    };
  },
  onLoad(opts) {
    let url, title, type;
    if (opts.url) {
      if(opts.id && /mp\.html$/g.test(opts.url)){
        url = `${opts.url}?id=${opts.id}`;
      } else{
        url = opts.url;
      }
      title = opts.title;
      type = opts.type;
    } else {
      let page = opts.page || "1";
      url = URL_MAP[page].url;
      title = URL_MAP[page].title;
    }
    this.url = url;
    this.type = type;
    this.id = opts.id;
    this.duration = opts.duration || 60;
    wx.setNavigationBarTitle({
      title: title
    });
  },
  onShow(){
    const now = parseInt(new Date().getTime() / 1000); //当前时间戳
    let  opts = wx.getLaunchOptionsSync();
    if(!this.time) return;
    if((now - this.time) < this.duration) {
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



