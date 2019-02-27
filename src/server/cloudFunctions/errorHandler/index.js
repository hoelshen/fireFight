// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const errorCllection = db.collection('errors');

function addError(data) {
  try{
    return errorCllection.add({
      data: {
        ...data,
        createTime: Date.now()
      }
    });
  } catch(e){
    console.log(e)
  }

}

// 云函数入口函数
exports.main = async (event, context) => {
  const { 
    OPENID,
    APPID,
    UNIONID,
  } = cloud.getWXContext()
  event.openid = event.userInfo.openId;
  await addError(event);
};


