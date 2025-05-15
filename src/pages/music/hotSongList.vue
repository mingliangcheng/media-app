<template>
  <view class="hot-container">
    <view class="p-3">
      <wd-search v-model="search" placeholder="搜索歌曲" shape="round" />
    </view>

    <view class="px-4 flex-1 box-border">
      <view class="bg-white rounded-2 p-xy box-border">
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
            <view class="custom-value">
              <wd-icon name="heart" size="22px"></wd-icon>
              <wd-icon name="ellipsis" size="22px"></wd-icon>
            </view>
          </wd-cell>
        </wd-cell-group>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')

const recommendSongs = [
  { name: '告白气球', singer: '周杰伦', time: '3:35', cover: '/static/images/song-cover-1.png' },
  { name: '修炼爱情', singer: '林俊杰', time: '4:12', cover: '/static/images/song-cover-2.png' },
  { name: '光年之外', singer: '邓紫棋', time: '3:55', cover: '/static/images/song-cover-3.png' },
  { name: '倔强', singer: '五月天', time: '4:30', cover: '/static/images/song-cover-4.png' },
]
</script>

<style scoped lang="scss">
.hot-container {
  height: 100%;
  overflow-y: auto;
  .wd-cell {
    padding-left: 0;
  }
  :deep(.wd-cell__wrapper) {
    align-items: center;
  }
}
</style>
