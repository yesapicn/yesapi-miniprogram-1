let util = require('./md5.js')

function enryptData (params) {
  const app = getApp()

  const yesapi_APP_KEY = app.globalData.yesApiAppKey
  const yesapi_APP_SECRET = app.globalData.yesApiAppSecret // TODO：请勿对外暴露！！

  params['app_key'] = yesapi_APP_KEY
  params['sign'] = '' // 屏蔽sign参数

  var sdic = Object.keys(params).sort();
  var paramsStrExceptSign = "";
  for (let ki in sdic) {
    paramsStrExceptSign += params[sdic[ki]];
  }

  var sign = util.hexMD5(paramsStrExceptSign + yesapi_APP_SECRET).toUpperCase();
  params['sign'] = sign;

  return params;
}

module.exports = {
  enryptData: enryptData
}  