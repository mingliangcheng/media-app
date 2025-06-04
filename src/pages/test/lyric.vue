<template>
  <view class="lyric-container">
    <scroll-view
      class="lyric-scroll"
      scroll-y
      :scroll-top="lyricScrollTop"
      :style="{ transition: scrollTransition }"
      @scroll="onScroll"
    >
      <view class="lyric-content">
        <view
          v-for="(line, index) in parsedLyrics"
          :key="index"
          :class="{ 'lyric-line': true, active: index === currentLineIndex }"
          @click="seekToLine(line.time)"
        >
          {{ line.text }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { Lrc } from 'lrc-kit'

interface LyricLine {
  time: number
  text: string
}

const props = defineProps<{
  lrcText: string
  currentTime: number
  lineHeight: number
}>()

const emit = defineEmits<{
  (event: 'seek', time: number): void
  (event: 'scrollToTime', time: number): void
}>()

const parsedLyrics = ref<LyricLine[]>([])
const currentLineIndex = ref(0)
const lyricScrollTop = ref(0)
const targetScrollTop = ref(0)
const scrollTransition = ref('')
const isScrolling = ref(false)

// 解析歌词
const parseLyrics = (text: string) => {
  if (!text) {
    parsedLyrics.value = [{ time: 0, text: '暂无歌词' }]
    return
  }

  try {
    const lines = Lrc.parse(text).lyrics
    parsedLyrics.value = lines.map((line) => ({
      time: line.timestamp,
      text: line.content,
    }))
  } catch (error) {
    console.error('歌词解析失败:', error)
    parsedLyrics.value = [{ time: 0, text: '歌词解析失败' }]
  }
}

// 更新当前行
const updateCurrentLine = (time: number) => {
  if (!parsedLyrics.value.length) return

  for (let i = parsedLyrics.value.length - 1; i >= 0; i--) {
    if (time >= parsedLyrics.value[i].time) {
      if (currentLineIndex.value !== i) {
        currentLineIndex.value = i
        updateScrollPosition()
      }
      break
    }
  }
}

// 更新滚动位置（平滑动画）
const updateScrollPosition = () => {
  const containerHeight = 300 // 容器高度，可根据实际情况调整
  const linesToShow = Math.floor(containerHeight / props.lineHeight)
  const centerLine = Math.floor(linesToShow / 2)

  // 计算目标滚动位置
  if (currentLineIndex.value > centerLine) {
    targetScrollTop.value = (currentLineIndex.value - centerLine) * props.lineHeight
  } else {
    targetScrollTop.value = 0
  }

  // 启用平滑滚动动画
  startSmoothScroll()
}

// 平滑滚动动画
const startSmoothScroll = () => {
  // 计算距离差
  const distance = targetScrollTop.value - lyricScrollTop.value

  // 如果距离很小，直接跳转
  if (Math.abs(distance) < 10) {
    lyricScrollTop.value = targetScrollTop.value
    return
  }

  // 设置过渡效果
  scrollTransition.value = 'scroll-top 0.5s ease-out'
  lyricScrollTop.value = targetScrollTop.value

  // 动画结束后重置过渡
  setTimeout(() => {
    scrollTransition.value = ''
  }, 500)
}

// 跳转到指定时间
const seekToLine = (time: number) => {
  emit('seek', time)
}

// 监听手动滚动事件
const onScroll = (e: any) => {
  const scrollTop = e.detail.scrollTop
  const currentLine = Math.floor(scrollTop / props.lineHeight)
  if (currentLine < parsedLyrics.value.length) {
    const time = parsedLyrics.value[currentLine].time
    emit('scrollToTime', time) // 触发自定义事件
  }
}

// 监听props变化
watch(
  () => props.lrcText,
  (newVal) => {
    parseLyrics(newVal)
  },
)

watch(
  () => props.currentTime,
  (newVal) => {
    updateCurrentLine(newVal)
  },
)

onMounted(() => {
  if (props.lrcText) {
    parseLyrics(props.lrcText)
  }
})
</script>

<style scoped>
.lyric-container {
  height: 300px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.lyric-scroll {
  height: 100%;
}

.lyric-content {
  padding: 10px 0;
  text-align: center;
}

.lyric-line {
  padding: 10px 0;
  font-size: 16px;
  color: #666;
  transition: all 0.3s;
}

.active {
  color: #ff4500;
  font-size: 18px;
  font-weight: bold;
}
</style>
