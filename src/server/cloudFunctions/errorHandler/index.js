const cloud = require('wx-server-sdk');
exports.main = async (event, context) =>{
  cloud.init();
  const db = cloud.database({
      env: "tell-dev-2019"
  });
  const _ = db.command;
  const MAX_LIMIT = 20;
  const data = {
      "systemInfo.platform": _.neq("devtools"),
      message: _.neq("服务器抽风啦，请重试")
  }
  const data1 = {
      _openid: "oo17M4j0dOpRnenHXrhQxeunStbA"
  }
  const countResult = await db.collection('back-errors').where(data)
      .count()
  const total = countResult.total
  console.log('total: ', total);
  const batchTimes = Math.ceil(total / 20)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('back-errors').where(data)
          .skip(i * MAX_LIMIT).limit(MAX_LIMIT)
          .get()
      tasks.push(promise)
  }

  const res = await Promise.all(tasks);
  const req = res.reduce((acc, cur) => ({
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
  }))
  console.log('req', req);
}

