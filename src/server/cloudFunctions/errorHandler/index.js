const cloud = require("wx-server-sdk");
exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database({
    env: "tell-dev-2019"
  });
  const _ = db.command;
  const MAX_LIMIT = 20;
  const data = {
    "systemInfo.platform": _.neq("devtools"),
    message: _.neq("服务器抽风啦，请重试")
  };
  const data1 = {
    _openid: "oo17M4oU9HHiPC-7n6kTBZb4pS7A"
  };
  //   const countResult = await db.collection('back-errors').where(data)
  //       .count()
  //   const total = countResult.total
  //   console.log('total: ', total);
  //   const batchTimes = Math.ceil(total / 20)
  const result = await db
    .collection("back-errors")
    .where(data)
    .orderBy("createdAt", "desc")
    .get();
  console.log(result);
  return result;
};
