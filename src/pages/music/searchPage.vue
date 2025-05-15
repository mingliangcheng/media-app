<template>
  <view class="search-container">
    <!-- 顶部搜索栏 -->
    <view class="box-border">
      <view class="flex items-center px-3 py-2 bg-white">
        <wd-icon name="menu" size="20" class="mr-2" />
        <wd-search
          v-model="searchValue"
          placeholder="请输入搜索内容"
          shape="round"
          class="flex-1"
          cancel-txt="搜索"
          @search="onSearch"
        />
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="px-4 box-border">
      <view class="px-4 py-3 bg-white mt-2 rounded">
        <view class="flex justify-between items-center mb-2">
          <text class="font-bold text-base">搜索历史</text>
          <text class="text-xs text-[#999]" @click="clearHistory">清除</text>
        </view>
        <view class="flex flex-wrap gap-2">
          <wd-tag v-for="(item, idx) in history" :key="idx" class="mb-2" round>
            {{ item }}
          </wd-tag>
        </view>
      </view>
    </view>

    <!-- 推荐歌单 -->
    <view class="mt-4 px-4 flex-1 box-border">
      <view class="bg-white rounded-2 p-xy box-border">
        <view class="flex justify-between items-center mb-2">
          <text class="font-bold text-lg">推荐歌单</text>
        </view>
        <wd-cell-group border>
          <wd-cell
            v-for="song in recommendSongs"
            :key="song.name"
            :title="song.name"
            :label="song.singer"
            :value="song.time"
          >
            <template #icon>
              <wd-img :src="song.cover" width="40" height="40"></wd-img>
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref('')
const history = ref(['手机', '笔记本电脑', '耳机', '智能手表', '充电器'])
const recommendSongs = [
  { name: '告白气球', singer: '周杰伦', time: '3:35', cover: '/static/images/song-cover-1.png' },
  { name: '修炼爱情', singer: '林俊杰', time: '4:12', cover: '/static/images/song-cover-2.png' },
  { name: '光年之外', singer: '邓紫棋', time: '3:55', cover: '/static/images/song-cover-3.png' },
  { name: '倔强', singer: '五月天', time: '4:30', cover: '/static/images/song-cover-4.png' },
]

function onSearch() {
  // 搜索逻辑
}
function clearHistory() {
  history.value = []
}
</script>

<style scoped lang="scss">
.search-container {
  height: 100%;
  overflow-y: auto;
}
</style>
