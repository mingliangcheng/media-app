export interface UserState {
  token: string
  userInfo: UserInfo
  isLogin: boolean
}

export interface UserInfo {
  phoneNum: string
  tmPhoneNum: string
}
