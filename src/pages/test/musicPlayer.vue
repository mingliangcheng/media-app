<template>
  <view class="music-player">
    <!-- 歌曲信息 -->
    <view class="song-info">
      <text class="song-title">{{ songInfo.title }}</text>
      <text class="song-artist">{{ songInfo.singer }}</text>
    </view>

    <!-- 专辑封面 -->
    <view class="album-cover">
      <image :src="songInfo.image" mode="aspectFit"></image>
    </view>

    <!-- 歌词区域 -->
    <Lyric
      :lrcText="songInfo.lyric"
      :currentTime="currentTime"
      :lineHeight="40"
      @seek="seekAudio"
      @scrollToTime="onScrollToTime"
    />

    <!-- 进度控制 -->
    <view class="progress-container">
      <text class="time">{{ formatTime(currentTime) }}</text>
      <slider
        class="progress-slider"
        :value="progress"
        @change="onProgressChange"
        @changing="onProgressChanging"
        activeColor="#FF4500"
        backgroundColor="#CCCCCC"
      />
      <text class="time">{{ formatTime(duration) }}</text>
    </view>

    <!-- 控制按钮 -->
    <view class="control-buttons">
      <view class="btn" @click="playPrev"><text class="iconfont">&#xe603;</text></view>
      <view class="btn play-btn" @click="togglePlay">
        <text class="iconfont">{{ isPlaying ? '&#xe602;' : '&#xe601;' }}</text>
      </view>
      <view class="btn" @click="playNext"><text class="iconfont">&#xe604;</text></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Lyric from './lyric.vue'
// 歌曲类型定义
interface Song {
  id: number
  title: string
  artist: string
  coverUrl: string
  audioUrl: string
  lrc: string
}

// 当前歌曲信息
const songInfo = ref<any>({
  id: 1, // ID
  title: '美人谷', // 歌名
  singer: '阿兰', // 歌手
  epname: '美人谷', // 专辑
  musicAlbumID: 1, // 专辑ID
  image:
    'https://p1.music.126.net/byZ9hvAI2r20WBnuB-S_ng==/109951163069341151.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0',
  fileUrl: '../../static/1.aac', // 路径
  musicYear: '2017-10-27', // 发布年份
  musicDuration: 281000, // 时长
  size: 3436481, // 文件大小
  favour: false,
  lyric: `[ti:美人谷]
[ar:阿兰]
[al:十念]

[by:天龙888]
[00:00.00]美人谷 - 阿兰
[00:05.00]
[00:07.95]词：毛慧
[00:09.09]曲：阿兰/毛慧
[00:11.31]编曲：叶月/王晨
[00:13.57]制作人：毛慧
[00:15.76]录音：张生磊（记忆时刻录音棚）
[00:17.45]
[00:38.13]越过山河的神秘
[00:41.03]一幕自然的洗礼
[00:44.18]看见山川出云泽被着大地
[00:49.76]
[00:50.59]雨顺菁华自天际
[00:53.69]花随鱼翔潜水底
[00:57.44]可有语言能形容的美丽
[01:02.62]
[01:03.44]如此熟悉的声音
[01:06.38]莫名安全的气息
[01:09.45]这是谁安排了我们的相聚
[01:14.87]
[01:15.84]没有前世的际遇
[01:18.93]怎会有心灵相犀
[01:22.48]任日夕月落耳鬓无语
[01:28.34]
[01:31.72]如果道路很遥远
[01:35.19]你是否会愿意
[01:38.44]等春播秋忙
[01:40.34]夏耕冬藏
[01:41.83]平凡的神谕
[01:44.69]如果你看到我的心
[01:47.84]就能看到自己
[01:51.06]我会陪你一同醉去
[01:57.00]
[02:47.58]采撷飘来的飞絮
[02:50.56]点缀纯净的天宇
[02:53.73]谁让万物轮转都不会死去
[02:58.84]
[03:00.04]穿越最远的距离
[03:03.14]唤醒沉睡的记忆
[03:06.91]我的爱在这里等你
[03:11.88]
[03:12.74]如果道路很遥远
[03:16.20]你是否会愿意
[03:19.49]等春播秋忙
[03:21.35]夏耕冬藏
[03:22.89]平凡的神谕
[03:25.78]如果你看到我的心
[03:28.98]就能看到自己
[03:32.01]我会陪你一同醉去
[03:37.11]
[03:38.01]如果时间很遥远
[03:41.46]你是否会愿意
[03:44.66]等朝花夕拾
[03:46.57]缤纷舞尽
[03:48.16]神灵的游戏
[03:50.96]如果你能找到我心
[03:54.19]就能找到自己
[03:57.32]因为我的爱已随你而去
[04:04.55]
[04:06.88]lrc歌词编辑：天龙 QQ：26092798`,
})

// 音频管理器
const audioManager = ref(uni.getBackgroundAudioManager())

// 播放状态
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = computed(() =>
  duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0,
)

// 初始化播放器
onMounted(() => {
  const manager = audioManager.value

  // 设置音频源
  manager.title = songInfo.value.title
  manager.singer = songInfo.value.singer
  manager.coverImgUrl = songInfo.value.image
  manager.src = songInfo.value.fileUrl

  // 监听播放状态变化
  manager.onPlay(() => {
    isPlaying.value = true
  })

  manager.onPause(() => {
    isPlaying.value = false
  })

  manager.onStop(() => {
    isPlaying.value = false
  })

  manager.onEnded(() => {
    isPlaying.value = false
    playNext()
  })

  // 监听时间更新
  manager.onTimeUpdate(() => {
    currentTime.value = manager.currentTime
    duration.value = manager.duration || 0
  })

  // 监听错误
  manager.onError((err) => {
    console.error('音频播放错误:', err)
    uni.showToast({
      title: '播放失败',
      icon: 'none',
    })
  })
})

// 播放控制方法
const togglePlay = () => {
  const manager = audioManager.value

  if (isPlaying.value) {
    manager.pause()
  } else {
    manager.play()
  }
}

const playPrev = () => {
  // 实现上一曲逻辑
  uni.showToast({
    title: '上一曲',
    icon: 'none',
  })
}

const playNext = () => {
  // 实现下一曲逻辑
  uni.showToast({
    title: '下一曲',
    icon: 'none',
  })
}

// 进度控制
const onProgressChange = (e: any) => {
  const seekTime = (e.detail.value / 100) * duration.value
  audioManager.value.seek(seekTime)
}

// 进度控制（拖动过程中）
const onProgressChanging = (e: any) => {
  const seekTime = (e.detail.value / 100) * duration.value
  // 更新当前时间，触发歌词组件更新
  currentTime.value = seekTime
}

// 歌词跳转
const seekAudio = (time: number) => {
  audioManager.value.seek(time)
}

// 时间格式化
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// 处理歌词滚动事件
const onScrollToTime = (time: number) => {
  audioManager.value.seek(time)
  currentTime.value = time
}
</script>

<style lang="scss" scoped>
.music-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;

  .song-info {
    margin-bottom: 20px;
    text-align: center;

    .song-title {
      font-size: 24px;
      font-weight: bold;
    }

    .song-artist {
      font-size: 18px;
      color: #666;
    }
  }

  .album-cover {
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .progress-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 20px 0;

    .time {
      width: 60px;
      color: #666;
      text-align: center;
    }

    .progress-slider {
      flex: 1;
      margin: 0 10px;
    }
  }

  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 30px;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      font-size: 24px;
      color: #333;
    }

    .play-btn {
      width: 80px;
      height: 80px;
      font-size: 32px;
      color: white;
      background-color: #ff4500;
      border-radius: 50%;
      box-shadow: 0 4px 15px rgba(255, 69, 0, 0.3);
    }
  }
}
</style>
