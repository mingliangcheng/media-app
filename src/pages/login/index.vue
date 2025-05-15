<template>
  <view class="login-container">
    <view class="pxy">
      <wd-img class="w-100% h-50" :src="src"></wd-img>
    </view>
    <view class="m-xy">
      <wd-tabs v-model="tab">
        <wd-tab title="密码登录">
          <view class="content">
            <wd-form ref="form" :model="model">
              <wd-cell-group border>
                <wd-input
                  label="用户名"
                  label-width="100px"
                  prop="value1"
                  v-model="model.value1"
                  placeholder="请输入用户名"
                  :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <wd-input
                  label="密码"
                  label-width="100px"
                  prop="value2"
                  show-password
                  v-model="model.value2"
                  placeholder="请输入密码"
                  :rules="[{ required: true, message: '请填写密码' }]"
                />
              </wd-cell-group>
            </wd-form>
          </view>
        </wd-tab>
        <wd-tab title="验证码登录">
          <view class="content">
            <wd-form ref="form" :model="model">
              <wd-cell-group border>
                <wd-input
                  label="手机号"
                  label-width="100px"
                  prop="value1"
                  v-model="model.value1"
                  placeholder="请输入手机号"
                  :rules="[{ required: true, message: '请输入手机号' }]"
                />
                <wd-input
                  label="验证码"
                  label-width="100px"
                  prop="value2"
                  v-model="model.value2"
                  placeholder="请输入验证码"
                  :rules="[{ required: true, message: '请输入验证码' }]"
                >
                  <template #suffix>
                    <wd-button style="height: 24px" type="text">获取验证码</wd-button>
                  </template>
                </wd-input>
              </wd-cell-group>
            </wd-form>
          </view>
        </wd-tab>
      </wd-tabs>
    </view>
    <view class="p-x">
      <wd-checkbox v-model="value" @change="handleChange" shape="square">记住密码</wd-checkbox>
    </view>
    <view class="p-xy">
      <wd-button type="primary" size="large" @click="handleSubmit" block>登录</wd-button>
    </view>
    <view class="mt-1 flex flex-justify-between p-xy">
      <wd-button type="text">忘记密码</wd-button>
      <wd-button type="text">立即注册</wd-button>
    </view>
    <view class="text-base text-gray text-center mt-3 mb-3">其他登录方式</view>
    <view class="flex pxy flex-justify-around">
      <view class="flex flex-col justify-center flex-items-center">
        <wd-img class="w-10 h-10" :src="src" />
        <text class="text-sm">微信</text>
      </view>
      <view class="flex flex-col justify-center flex-items-center">
        <wd-img class="w-10 h-10" :src="src" />
        <text class="text-sm">QQ</text>
      </view>
    </view>
    <view class="flex flex-col text-center text-xs">
      <text class="text-gray mb-1">用户协议</text>
      <text class="text-gray">©2025 版权所有</text>
    </view>
  </view>
  <wd-toast />
</template>
<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { ref, reactive } from 'vue'
const tab = ref<number>(0)
const { success: showSuccess } = useToast()
const src = ''
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: '',
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过',
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

const value = ref<boolean>(true)

function handleChange({ value }) {
  console.log(value)
}
</script>

<style scoped lang="scss">
:deep(.wd-input__suffix) {
  height: 24px;
}
.login-container {
  background: #ecf5ff;
}
</style>
