export async function errors(){
  // wx.cloud.init();
  return await wx.cloud.callFunction({
      name: 'errorHandler'
  })
} 

export default {
  errors
}