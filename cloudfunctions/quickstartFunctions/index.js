const getPlayerProfile = require('./getPlayerProfile');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getPlayerProfile':
      return await getPlayerProfile.main(event, context);
    default:
      return 'ok'
  }
};
