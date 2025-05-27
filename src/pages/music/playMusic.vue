<template>
  <view>
    <le-audio
      :activeIndex="0"
      :audioData="audioList"
      :autoplay="false"
      :loopPlay="true"
      :showAudioListIcon="false"
      :showAudioSpeedIcon="true"
      @onOpenAudioList="onOpenAudioList"
      @onAudioChange="onAudioChange"
      @onAudioEnd="onAudioEnd"
      @onPlayProgress="onPlayProgress"
    ></le-audio>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const audioList = ref([
  {
    title: '天空',
    fileUrl: 'http://122.51.230.162:9000/test/天空.mp3',
    image: 'http://122.51.230.162:9000/test/3173a556-eede-4bec-9fbb-016ea105deaf_test.jpg',
    epname: '遗忘',
    singer: '陈明亮',
    webUrl: '',
  },
])
// 点击播放列表按钮事件
const onOpenAudioList = () => {}
// 改变事件，data为当前播放的数据，index为当前播放的索引
const onAudioChange = () => {}
// 播放进度事件，currentTime为当前播放的时间，duration为播放总时长
const onAudioEnd = () => {}
// 整个列表播放结束事件
const onPlayProgress = () => {}
</script>

<style scoped lang="scss"></style>
