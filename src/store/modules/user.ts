import { defineStore } from 'pinia'
import { UserInfo, UserState } from '@/store/types/user'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: uni.getStorageSync('token'),
    userInfo: {
      phoneNum: '',
      tmPhoneNum: uni.getStorageSync('tmPhoneNum'),
    },
    isLogin: uni.getStorageSync('isLogin') || false,
  }),
  getters: {},
  actions: {
    // Set Token
    async setToken(token: string) {
      this.token = token
      uni.setStorageSync('token', token)
    },

    async setLogin(isLogin: boolean) {
      this.isLogin = isLogin
      uni.setStorageSync('isLogin', isLogin)
    },

    async setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      uni.setStorageSync('tmPhoneNum', userInfo.tmPhoneNum)
    },

    async logOut() {
      this.userInfo = Object.assign(this.userInfo, {})
      this.token = ''
      this.isLogin = false
      uni.clearStorageSync()
      await uni.reLaunch({
        url: '/pages/login/index',
      })
    },
  },
})
