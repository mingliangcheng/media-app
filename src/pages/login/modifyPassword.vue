<template>
  <view class="p-4">
    <wd-cell-group border>
      <!-- 手机号输入框 -->
      <wd-input
        label="手机号"
        v-model="formData.phone"
        placeholder="请输入手机号"
        :rules="rules.phone"
      ></wd-input>

      <!-- 新密码输入框 -->
      <wd-input
        label="新密码"
        v-model="formData.password"
        type="password"
        placeholder="请输入新密码"
        :rules="rules.password"
      ></wd-input>

      <!-- 确认密码输入框 -->
      <wd-input
        label="确认密码"
        v-model="formData.confirmPassword"
        type="password"
        placeholder="请确认新密码"
        :rules="rules.confirmPassword"
      ></wd-input>

      <!-- 验证码输入框 -->

      <wd-input
        label="验证码"
        v-model="formData.code"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #suffix>
          <wd-button size="small" type="primary" :disabled="countdown > 0" @click="sendCode">
            {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
          </wd-button>
        </template>
      </wd-input>
    </wd-cell-group>

    <!-- 提交按钮 -->
    <wd-button type="primary" block class="mt-8" @click="handleSubmit">确认修改</wd-button>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(0)

// 表单数据
const formData = reactive({
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
})

// 表单验证规则
const rules = {
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确' },
  ],
  password: [
    { required: true, message: '请输入新密码' },
    { min: 6, message: '密码长度不能少于6位' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码' },
    {
      validator: (value) => {
        if (value !== formData.password) {
          return '两次输入的密码不一致'
        }
        return true
      },
    },
  ],
}

// 发送验证码
const sendCode = async () => {
  if (!formData.phone) {
    return
  }

  // 这里添加发送验证码的API调用
  try {
    // await sendSmsCode(formData.phone)
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error) {}
}

// 提交表单
const handleSubmit = async () => {
  try {
    // 这里添加修改密码的API调用
    // await resetPassword(formData)
    router.push('/pages/login/index')
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<style lang="scss" scoped>
// 使用 unocss 的类名，无需额外样式
</style>
