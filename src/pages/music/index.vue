<template>
  <view class="music-container">
    <view class="flex flex-col">
      <!-- 搜索栏和分类Tab -->
      <view class="px-4 py-2 box-border">
        <wd-search
          disabled
          @click="search"
          hide-cancel
          placeholder="搜索歌曲、歌手"
          shape="round"
        />
      </view>

      <!-- 发现音乐 -->
      <view class="mt-4 px-4 box-border">
        <view class="h-35 bg-white rounded-2 p-xy box-border">
          <view class="font-bold text-lg mb-2">发现音乐</view>
          <view class="flex flex-items-center gap-4">
            <view
              v-for="item in discoverList"
              :key="item.text"
              class="flex flex-col items-center h-18 w-18"
            >
              <wd-img :src="item.icon" width="50" height="50" class="mb-1" />
              <text class="mt-1 text-sm">{{ item.text }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 热门歌手 -->
      <view class="mt-4 px-4 box-border">
        <view class="h-35 bg-white rounded-2 p-xy box-border">
          <view class="flex justify-between items-center mb-2">
            <text class="font-bold text-lg">热门歌手</text>
            <text class="text-gray-400 text-sm">更多</text>
          </view>
          <view class="flex gap-4">
            <view
              v-for="singer in hotSingers"
              :key="singer.name"
              class="flex flex-col items-center h-18 w-18"
            >
              <wd-img :src="singer.avatar" width="50" height="50" class="mb-1" />
              <text class="mt-1 text-xs">{{ singer.name }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 推荐歌单 -->
      <view class="mt-4 px-4 flex-1 box-border">
        <view class="bg-white rounded-2 p-xy box-border">
          <view class="flex justify-between items-center mb-2">
            <text class="font-bold text-lg">推荐歌单</text>
            <text class="text-gray-400 text-sm">更多</text>
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
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref(0)
const categories = ['流行', '摇滚', '电子', '民谣', 'R&B', '嘻哈']

const discoverList = [
  { icon: '/static/images/recommend-icon.png', text: '每日推荐' },
  { icon: '/static/images/hot-icon.png', text: '热门歌手' },
  { icon: '/static/images/rank-icon.png', text: '排行榜' },
  { icon: '/static/images/song-icon.png', text: '歌单' },
]

const hotSingers = [
  { avatar: '/static/images/singer-avatar-1.png', name: '周杰伦' },
  { avatar: '/static/images/singer-avatar-2.png', name: '林俊杰' },
  { avatar: '/static/images/singer-avatar-3.png', name: '邓紫棋' },
  { avatar: '/static/images/singer-avatar-4.png', name: '五月天' },
]

const recommendSongs = [
  { name: '告白气球', singer: '周杰伦', time: '3:35', cover: '/static/images/song-cover-1.png' },
  { name: '修炼爱情', singer: '林俊杰', time: '4:12', cover: '/static/images/song-cover-2.png' },
  { name: '光年之外', singer: '邓紫棋', time: '3:55', cover: '/static/images/song-cover-3.png' },
  { name: '倔强', singer: '五月天', time: '4:30', cover: '/static/images/song-cover-4.png' },
]

const search = () => {
  uni.navigateTo({
    url: '/pages/music/searchPage',
  })
}
</script>

<style scoped lang="scss">
.music-container {
  height: 100%;
  overflow-y: auto;
  .wd-cell {
    padding-left: 0;
    :deep(.wd-cell__wrapper) {
      align-items: center;
    }
  }
}
</style>
