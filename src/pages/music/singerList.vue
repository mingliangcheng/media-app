<template>
  <view class="singer-container">
    <!-- 搜索框 -->
    <view class="px-4 mb-4 box-border">
      <wd-search v-model="search" placeholder="搜索歌手" shape="round" background="#f5f5f5" />
    </view>

    <!-- 歌手分组列表 -->
    <view class="wrapper">
      <wd-index-bar sticky>
        <view v-for="item in data" :key="item.index">
          <wd-index-anchor :index="item.index" />
          <wd-cell border clickable v-for="city in item.data" :key="city" :title="city"></wd-cell>
        </view>
      </wd-index-bar>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 歌手分组数据
const data = [
  {
    index: 'A',
    data: ['五月天'],
  },
  {
    index: 'B',
    data: ['刘德华'],
  },
  {
    index: 'C',
    data: ['周杰伦'],
  },
  {
    index: 'D',
    data: ['孙燕姿'],
  },
  {
    index: 'E',
    data: ['张惠妹', '张学友'],
  },
  {
    index: 'F',
    data: ['方大同'],
  },
  {
    index: 'G',
    data: ['朴树'],
  },
]

const search = ref('')
const hotSingers = [
  { avatar: '/static/images/singer-avatar-1.png', name: '周杰伦' },
  { avatar: '/static/images/singer-avatar-2.png', name: '林俊杰' },
  { avatar: '/static/images/singer-avatar-3.png', name: '邓紫棋' },
  { avatar: '/static/images/singer-avatar-4.png', name: '五月天' },
]
</script>

<style lang="scss" scoped>
.singer-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.wrapper {
  height: calc(100% - 66px);
}
</style>
