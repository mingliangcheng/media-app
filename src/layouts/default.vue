<template>
  <wd-config-provider :themeVars="themeVars">
    <!--    <view class="bg-gray overflow-hidden" :style="{ height: safeAreaInsets?.top + 'px' }"></view>-->
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
</script>
<style lang="scss" scoped>
.wot-theme-light {
  height: 100%;
}
</style>
