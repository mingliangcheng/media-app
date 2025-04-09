<template>
  <view>
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          label="手机号码"
          label-width="100px"
          prop="value1"
          clearable
          v-model="model.value1"
          placeholder="请输入手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <wd-input
          label="用户名"
          label-width="100px"
          prop="value1"
          clearable
          v-model="model.value1"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-input
          label="电子邮箱"
          label-width="100px"
          prop="value1"
          clearable
          v-model="model.value1"
          placeholder="请输入电子邮箱"
          :rules="[{ required: true, message: '请填写电子邮箱' }]"
        />
        <wd-input
          label="密码"
          label-width="100px"
          prop="value2"
          show-password
          clearable
          v-model="model.value2"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <wd-input
          label="确认密码"
          label-width="100px"
          prop="value2"
          show-password
          clearable
          v-model="model.value2"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请再次填写密码' }]"
        />
        <wd-input
          label="验证码"
          label-width="100px"
          prop="value2"
          clearable
          v-model="model.value2"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #suffix>
            <wd-button style="height: 24px" type="text">获取验证码</wd-button>
          </template>
        </wd-input>
      </wd-cell-group>
      <view class="mt-5">
        <wd-button type="primary" size="large" @click="handleSubmit" block>注册</wd-button>
      </view>
    </wd-form>
  </view>
</template>
<script setup lang="ts">
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
        console.log('校验通过')
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<style scoped lang="scss"></style>
