<template>
  <view class="min-h-screen bg-gray-100">
    <wd-navbar title="个人中心" />

    <wd-cell-group class="mt-3">
      <!-- 头像 -->
      <wd-cell title="头像" is-link>
        <template #right>
          <view class="flex items-center">
            <image class="w-15 h-15 rounded-full mr-2" :src="userInfo.avatar" mode="aspectFill" />
            <text class="text-sm text-blue-500">更换</text>
          </view>
        </template>
      </wd-cell>

      <!-- 昵称 -->
      <wd-cell title="昵称">
        <template #right>
          <input
            class="text-base text-gray-700 text-right w-full"
            v-model="userInfo.nickname"
            placeholder="用户昵称"
            placeholder-class="text-gray-400"
          />
        </template>
      </wd-cell>

      <!-- 个性签名 -->
      <wd-cell title="个性签名">
        <template #right>
          <input
            class="text-base text-gray-700 text-right w-full"
            v-model="userInfo.signature"
            placeholder="请输入个性签名"
            placeholder-class="text-gray-400"
          />
        </template>
      </wd-cell>

      <!-- 性别 -->
      <wd-cell
        title="性别"
        :value="userInfo.gender || '请选择性别'"
        is-link
        @click="showGenderPicker = true"
      />

      <!-- 生日 -->
      <wd-cell title="出生日期" :value="userInfo.birthday || '请选择出生日期'" is-link />

      <!-- 手机号 -->
      <wd-cell title="手机号" is-link>
        <template #right>
          <view class="flex items-center">
            <text class="text-base text-gray-700">{{ formatPhone(userInfo.phone) }}</text>
            <text class="text-sm text-blue-500 ml-2">更改</text>
          </view>
        </template>
      </wd-cell>

      <!-- 邮箱 -->
      <wd-cell title="邮箱" :value="userInfo.email" />

      <!-- 修改密码 -->
      <wd-cell title="修改密码" is-link />
    </wd-cell-group>

    <!-- 性别选择器 -->
    <wd-picker
      v-if="false"
      v-model:value="showGenderPicker"
      :columns="genderOptions"
      title="选择性别"
      @confirm="onGenderConfirm"
    />

    <!-- 日期选择器 -->
    <wd-datetime-picker
      v-if="false"
      v-model="showDatePicker"
      title="选择出生日期"
      type="date"
      :min-date="minDate.getTime()"
      :max-date="maxDate.getTime()"
      @confirm="onDateConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface UserInfo {
  avatar: string
  nickname: string
  signature: string
  gender: string
  birthday: string
  phone: string
  email: string
}

const userInfo = reactive<UserInfo>({
  avatar: '',
  nickname: '',
  signature: '',
  gender: '',
  birthday: '',
  phone: '138****8000',
  email: 'user@example.com',
})

const showGenderPicker = ref(false)
const showDatePicker = ref('')

const genderOptions = [
  { value: 'male', label: '男' },
  { value: 'female', label: '女' },
]

const minDate = new Date(1900, 0, 1)
const maxDate = new Date()

// 格式化手机号
const formatPhone = (phone: string) => {
  return phone || ''
}

// 性别选择确认
const onGenderConfirm = (value: { value: string; label: string }) => {
  userInfo.gender = value.label
}

// 日期选择确认
const onDateConfirm = (value: Date) => {
  userInfo.birthday = formatDate(value)
}

// 格式化日期
const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>
