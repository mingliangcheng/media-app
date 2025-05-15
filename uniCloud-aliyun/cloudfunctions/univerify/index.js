'use strict'
exports.main = async (event, context) => {
  // event为客户端上传的参数
  console.log('event : ', event)
  const res = await uniCloud.getPhoneNumber({
    provider: 'univerify',
    appid: context.APPID, // 客户端callFunction时携带的AppId信息
    access_token: event.access_token,
    openid: event.openid,
  })
  // 返回数据给客户端
  return res
}
