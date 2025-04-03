<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view>音乐</view>
  </view>
</template>
<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style scoped lang="scss"></style>
