const shareMix = {
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
      // this.pageOne = 1;
    }
} 

export default shareMix;