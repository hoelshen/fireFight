const shareMix = {
    onShareAppMessage(res) {
      let { path, user } = getApp().globalData;
      path = user._id ? `${path}&refer=${user._id}` : path;
      return {
        path
      };
    },
    onShow(){
      // this.pageOne = 1;
    }
} 

export default shareMix;