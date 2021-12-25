const cloud = require('wx-server-sdk');
const request = require('request-promise')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取 player 详情
exports.main = async (event, context) => {
  const { url } = event
  // 获取基础信息
  const wxContext = cloud.getWXContext();

  const ret = await request(url)

  return ret;
};
