import { defineStore } from 'pinia'
import { UserState } from './types/user'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: {
      token: uni.getStorageSync('token') || '',
    },
  }),
})
