<template>
  <view class="home-container h-100% overflow-auto">
    <view class="bg-white p-x mb-3">
      <view class="flex flex-justify-between h-10 flex-items-center">
        <view class="text-xl font-500">音乐视频</view>
        <view>
          <wd-icon name="user" class="text-base text-gray mr-1"></wd-icon>
          <text class="text-gray">登录/注册</text>
        </view>
      </view>
      <wd-search hide-cancel v-model="value" :maxlength="10" placeholder="搜索音乐、视频..." />
    </view>
    <view class="mb-3 bg-white">
      <wd-swiper
        :list="swiperList"
        autoplay
        v-model:current="current"
        @click="handleClick"
        @change="onChange"
      ></wd-swiper>
    </view>
    <view class="bg-white p-x mb-3">
      <view class="flex flex-justify-between h-10 flex-items-center">
        <text class="text-base font-500">热门音乐</text>
        <view class="text-gray">
          <text class="text-sm">更多</text>
          <wd-icon name="chevron-right" class="text-base"></wd-icon>
        </view>
      </view>
      <view class="flex gap-col-3 overflow-auto">
        <view v-for="(_, index) in 10" :key="index" class="w-40 p-y-2 flex flex-col">
          <wd-img class="w-40 h-40" src="/static/images/cover.png"></wd-img>
          <text class="text-sm my-1">音乐现场精选</text>
          <text class="text-xs text-gray">500播放</text>
        </view>
      </view>
    </view>
    <view class="bg-white p-x mb-3">
      <view class="flex flex-justify-between h-10 flex-items-center">
        <text class="text-base font-500">精选视频</text>
        <view class="text-gray">
          <text class="text-sm">更多</text>
          <wd-icon name="chevron-right" class="text-base"></wd-icon>
        </view>
      </view>
      <view class="flex gap-col-3 overflow-auto">
        <view v-for="(_, index) in 10" :key="index" class="w-40 p-y-2 flex flex-col">
          <wd-img class="w-40 h-40" src="/static/images/cover.png"></wd-img>
          <text class="text-sm my-1">音乐现场精选</text>
          <text class="text-xs text-gray">15:30</text>
        </view>
      </view>
    </view>
    <view class="bg-white p-x">
      <view class="flex flex-justify-between h-10 flex-items-center">
        <text class="text-base font-500">热门活动</text>
        <view class="text-gray">
          <text class="text-sm">更多</text>
          <wd-icon name="chevron-right" class="text-base"></wd-icon>
        </view>
      </view>
      <view class="flex flex-col">
        <view v-for="(_, index) in 2" :key="index" class="w-100% p-y-2 flex flex-items-center">
          <wd-img class="w-25 h-15 mr-3" src="/static/images/cover.png"></wd-img>
          <view class="flex flex-col">
            <text class="text-sm my-1">2024音乐节</text>
            <text class="text-xs text-gray">xxxxxxxxx</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TestEnum } from '@/typings'
import PLATFORM from '@/utils/platform'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
defineOptions({
  name: 'Home',
})
const value = ref('')

const current = ref<number>(0)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}
// 测试 uni API 自动引入
onLoad(() => {
  console.log(TestEnum.A)
})
</script>

<style lang="scss" scoped>
.wd-search {
  padding-right: 0;
  padding-left: 0;
}
</style>
