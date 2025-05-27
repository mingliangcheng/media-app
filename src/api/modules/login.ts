import http from '@/api/index'

// 退出登录
export const logout = () => {
  return http.post(
    '/api/unauth/logout',
    {},
    {
      custom: { encrypt: false },
    },
  )
}

// 隐私协议
export const getPrivacy = () => {
  return http.get(`/wx/urge/party/privateAgreement`)
}

// 注销用户
export const deleteAccount = () => {
  return http.post(`/wx/urge/party/deleteAccount`)
}

// 一键登录
export const univerifyLogin = (params: object) => {
  return http.post(`/user/univerify`, params)
}
