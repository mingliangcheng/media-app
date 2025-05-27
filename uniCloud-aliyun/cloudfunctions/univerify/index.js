'use strict'
const crypto = require('crypto')
exports.main = async (event, context) => {
	//处理POST请求
	let body = event.body
	if (event.isBase64Encoded) {
		body = Buffer.from(body, 'base64')
	}
	let params = JSON.parse(body)
	const secret = 'cml&cxuniverify125a#' // 自己的密钥不要直接使用示例值，且注意不要泄露
	const hmac = crypto.createHmac('sha256', secret);
	const sign = params.sign
	delete params.sign
	const signStr = Object.keys(params).sort().map(key => {
		return `${key}=${params[key]}`
	}).join('&')

	hmac.update(signStr);

	if (sign !== hmac.digest('hex')) {
		throw new Error('非法访问')
	}

	const {
		accessToken,
		openid
	} = params
	const res = await uniCloud.getPhoneNumber({
		provider: 'univerify',
		appid: '__UNI__4AF3124', // DCloud appid
		access_token: accessToken,
		openid: openid
	})
	// 返回手机号给自己服务器
	return res
}