export function errors(){
  // wx.cloud.init();
  wx.cloud.callFunction({
      name: 'errorHandler',
      complete: res => {
          console.log('callFunction test result: ', res)
      },
  })
} 

export default {
  errors
}