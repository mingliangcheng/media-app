<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import uniIdPageInit from '@/uni_modules/uni-id-pages/init'
onLaunch(async () => {
  console.log('App Launch')
  await uniIdPageInit()
})
onShow(() => {
  console.log('App Show')
  // #ifdef APP
  if (uni.getSystemInfoSync().platform === 'android') {
    // 点击通知栏跳转
    const main = plus.android.runtimeMainActivity()
    const intent = plus.android.invoke(main, 'getIntent')
    const path = plus.android.invoke(intent, 'getStringExtra', 'path') // list 里面的 path
    // 根据 path路径 进行跳转
    if (path === null) return
    uni.navigateTo({
      url: path,
      complete: () => {
        // 移除跳转路径，避免重复跳转
        plus.android.invoke(intent, 'removeExtra', 'path') // list 里面的 path
        plus.android.autoCollection(intent)
      },
    })
  }
  // #endif
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
uni-page-body {
  height: 100%;
  background: #f5f5f5;
}
</style>
