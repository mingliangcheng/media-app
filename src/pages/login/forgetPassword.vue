<template>
  <view class="p-4">
    <!-- 步骤1：身份验证 -->
    <template v-if="step === 1">
      <wd-form ref="verifyFormRef" :model="verifyFormData" :rules="verifyRules">
        <wd-cell-group border class="rounded-lg">
          <!-- 手机号输入框 -->
          <wd-input v-model="verifyFormData.phone" placeholder="请输入手机号" label="手机号" />

          <!-- 验证码输入框 -->
          <wd-input v-model="verifyFormData.code" placeholder="请输入验证码" label="验证码">
            <template #suffix>
              <wd-button size="small" type="primary" :disabled="countdown > 0" @click="sendCode">
                {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
              </wd-button>
            </template>
          </wd-input>
        </wd-cell-group>

        <!-- 下一步按钮 -->
        <wd-button type="primary" block class="mt-8" @click="handleVerify">下一步</wd-button>
      </wd-form>
    </template>

    <!-- 步骤2：设置新密码 -->
    <template v-else>
      <wd-form ref="resetFormRef" :model="resetFormData" :rules="resetRules">
        <wd-cell-group border class="rounded-lg">
          <!-- 新密码输入框 -->
          <wd-input
            v-model="resetFormData.password"
            type="password"
            placeholder="请输入新密码"
            clearable
            label="新密码"
          />

          <!-- 确认密码输入框 -->

          <wd-input
            v-model="resetFormData.confirmPassword"
            type="password"
            placeholder="请确认新密码"
            clearable
            label="确认密码"
          />
        </wd-cell-group>
        <!-- 提交按钮 -->
        <wd-button type="primary" block class="mt-8" @click="handleReset">确认重置</wd-button>
      </wd-form>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const verifyFormRef = ref(null)
const resetFormRef = ref(null)
const countdown = ref(0)
const step = ref(1)

// 身份验证表单数据
const verifyFormData = reactive({
  phone: '',
  code: '',
})

// 重置密码表单数据
const resetFormData = reactive({
  password: '',
  confirmPassword: '',
})

// 身份验证规则
const verifyRules = {
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确' },
  ],
}

// 重置密码规则
const resetRules = {
  password: [
    { required: true, message: '请输入新密码' },
    { min: 6, message: '密码长度不能少于6位' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码' },
    {
      validator: (value) => {
        if (value !== resetFormData.password) {
          return '两次输入的密码不一致'
        }
        return true
      },
    },
  ],
}

// 发送验证码
const sendCode = async () => {
  if (!verifyFormData.phone) {
    return
  }

  // 这里添加发送验证码的API调用
  try {
    // await sendSmsCode(verifyFormData.phone)
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error) {}
}

// 验证身份
const handleVerify = async () => {
  try {
    await verifyFormRef.value.validate()
    // 这里添加验证身份的API调用
    // await verifyIdentity(verifyFormData)
    step.value = 2
  } catch (error) {
    console.error('验证失败:', error)
  }
}

// 重置密码
const handleReset = async () => {
  try {
    await resetFormRef.value.validate()
    // 这里添加重置密码的API调用
    // await resetPassword({
    //   phone: verifyFormData.phone,
    //   code: verifyFormData.code,
    //   password: resetFormData.password
    // })
    router.push('/pages/login/index')
  } catch (error) {
    console.error('重置失败:', error)
  }
}
</script>

<style lang="scss" scoped>
.wd-button {
  height: 24px;
}
.wd-button.is-small {
  height: 24px;
}
</style>
