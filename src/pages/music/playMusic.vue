<template>
  <view>
    <le-audio
      ref="leAudioRef"
      :activeIndex="playIndex"
      :audioData="playlistCopy"
      :autoplay="true"
      :loopPlay="true"
      :showAudioListIcon="false"
      :showAudioSpeedIcon="true"
      :innerAudioContext="audioManager"
      @onOpenAudioList="onOpenAudioList"
      @onAudioChange="onAudioChange"
      @onAudioEnd="onAudioEnd"
      @onPlayProgress="onPlayProgress"
      @onPlayOrPause="onPlayOrPause"
    ></le-audio>
    <view class="bottom">
      <view @click="showFloatWindow">打开浮窗</view>
      <view @click="hideFloatWindow">关闭浮窗</view>
      <view @click="setFavour">{{ favour ? '收藏' : '未收藏' }}</view>
      <view @click="switchNotification">{{ systemNotification ? '系统' : '自定义' }}</view>
      <view @click="lockActivity">{{ isLockActivity ? '关闭' : '打开' }}锁屏页</view>
      <view @click="setWidgetStyle">修改小部件</view>
      <view @click="logout">退出</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Lrc, Runner } from 'lrc-kit'
import playlist from './music.ts'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import LeAudio from '@/uni_modules/le-audio/components/le-audio/le-audio.vue'
const leAudioRef = ref<InstanceType<typeof LeAudio>>()
const playIndex = ref(0) // 播放下标
const playing = ref(false) // 播放状态
const playlistCopy = ref(playlist) // 本地音乐列表
const isLockActivity = ref(false) // 是否开启锁屏页
const isCreateNotification = ref(false) // 是否创建了Notification
const systemNotification = ref(false) // 是否使用系统的 Notification, 只有 android 8.0 以上才有效
const themeColor = ref('#55ff00ff')
const audioManager = ref()
const musicNotification = ref()
const favour = computed(() => {
  return playlistCopy.value[playIndex.value]?.favour || false
})
onLoad(() => {
  audioManager.value = uni.getBackgroundAudioManager()
  musicNotification.value = uni.requireNativePlugin('XZH-musicNotification')
  console.warn(musicNotification.value)
  // 初始化通知栏
  musicNotification.value.init({
    // 点击通知栏跳转页面
    path: '/pages/test/test?id=1', // 非必传
    // (废弃)设置状态栏小图标，只有 android 8.0 以上才有效，新的方式：覆盖插件目录的 android/res/drawable/music_icon.png
    icon: '',
  })
  /**
   * 获取本地音乐
   * @param {Function} callback [ songData ]
   * songData 的格式
   * {
   *    id: cursor.getInt(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID)),			 //ID
   *    musicName: cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE)),		 //歌名
   *    musicArtist: cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST)),	 //歌手
   *    musicAlbum: cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM)),//专辑
   *    musicAlbumID: cursor.getInt(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID)),	 //专辑ID
   *    musicAlbumURl: '',																		 //专辑图片路径
   *    musicPath: cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA)),		 //路径
   *    musicYear: cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.YEAR)),	 //发布年份
   *    musicDuration: cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION)), //时长
   *    size: cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.SIZE))			 //文件大小
   *  }
   */
  musicNotification.value.getLocalSong((songData) => {
    console.log('songData', songData)
    // this.playlist = songData.map((item, index) => ({
    // 	...item,
    // 	musicAlbumURl: [
    // 		`file://${plus.io.convertLocalFileSystemURL( '_www/static/logo.png' )}`,
    // 		`file://${plus.io.convertLocalFileSystemURL( '_www/static/101297089.jpg' )}`
    // 	][index % 2], // 只是为了方便演示专辑图片，具体逻辑自己实现
    // 	favour: false // 收藏状态，只是为了方便演示，收藏的具体逻辑自己实现
    // }))
  })

  // 监听生命周期事件回调
  plus.globalEvent.addEventListener('musicLifecycle', (e) => {
    console.log('生命周期', e)
  })
  // 监听暂停或播放按钮事件回调
  plus.globalEvent.addEventListener('musicNotificationPause', (e) => {
    console.log('暂停或播放按钮事件回调', e)
    leAudioRef.value.onPlayPause()
  })
  // 监听播放上一首按钮事件回调
  plus.globalEvent.addEventListener('musicNotificationPrevious', (e) => {
    console.log('播放上一首按钮事件回调', e)
    leAudioRef.value.onSwitchAudio(playIndex.value - 1)
  })
  // 监听播放下一首按钮事件回调
  plus.globalEvent.addEventListener('musicNotificationNext', (e) => {
    console.log('播放下一首按钮事件回调', e)
    leAudioRef.value.onSwitchAudio(playIndex.value + 1)
  })
  // 监听收藏按钮事件回调
  plus.globalEvent.addEventListener('musicNotificationFavourite', (e) => {
    console.log('收藏按钮事件回调', e)
    setFavour()
  })
  // 监听关闭按钮事件回调
  plus.globalEvent.addEventListener('musicNotificationClose', (e) => {
    console.log('关闭按钮事件回调', e)
    logout()
  })
  // 监听耳机事件回调，注意只能在应用播放音乐的时候才能接收到事件
  plus.globalEvent.addEventListener('musicMediaButton', (e) => {
    console.log('耳机按钮事件回调', e)
    uni.showToast({
      title: JSON.stringify(e),
      icon: 'none',
      position: 'center',
    })
    switch (e.type) {
      case 'headset':
        // 有线耳机事件 拔出： 0, 插入：1
        if (e.keyCode === 0) {
          leAudioRef.value.onPlayPause()
        }
        break
      case 'bluetooth':
        // 蓝牙耳机事件 断开： 0, 打开：1，连接：2
        if (e.keyCode === 0) {
          leAudioRef.value.onPlayPause()
        }
        break
      case 'mediaButton':
        // 耳机按键事件，如果有的耳机按键按了没反应，不要怀疑是插件问题，插件已经把事件直接返回了，没有事件，那就是耳机根本没发起事件
        switch (e.keyCode) {
          case 79:
            /** 谷歌原文 Key code constant: Headset Hook key. Used to hang up calls and stop media. */
            leAudioRef.value.onPlayPause()
            break
          case 87:
            /** 谷歌原文 Key code constant: Play Next media key. */
            leAudioRef.value.onSwitchAudio(playIndex.value - 1)
            break
          case 88:
            /** 谷歌原文 Key code constant: Play Previous media key. */
            leAudioRef.value.onSwitchAudio(playIndex.value + 1)
            break
          case 126:
            /** 谷歌原文 Key code constant: Play media key. */
            leAudioRef.value.onPlayPause()
            break
          case 127:
            /** 谷歌原文 Key code constant: Pause media key. */
            leAudioRef.value.onPlayPause()
            break
        }
        break
    }
  })

  // 监听通知栏进度条拖动事件回调
  plus.globalEvent.addEventListener('musicSeekTo', (e) => {
    console.log('通知栏进度条拖动事件回调', e.position)
    audioManager.value.seek(e.position)
  })

  let runner
  audioManager.value.onPlay(() => {
    runner = new Runner(Lrc.parse(playlistCopy.value[playIndex.value].lyric))
    audioManager.value.onTimeUpdate((res) => {
      const position = Math.max(0, audioManager.value.currentTime)
      console.log('onTimeUpdate', position)
      // 设置播放进度单位毫秒
      musicNotification.value.setPosition(position * 1000)
      runner.timeUpdate(position)
      const lyric = runner.curLyric().content
      if (lyric) {
        musicNotification.value.setLyric(lyric)
      }
    })
  })
  audioManager.value.onCanplay(() => {
    console.log('onCanplay')
    const res = musicNotification.value.update({
      // 歌曲名字
      songName: playlistCopy.value[playIndex.value].title,
      // 专辑名字
      artistsName: playlistCopy.value[playIndex.value].singer,
      // 收藏
      favour: playlistCopy.value[playIndex.value].favour,
      // 专辑图片
      picUrl: playlistCopy.value[playIndex.value].image,
      // 时长
      duration: audioManager.value.duration * 1000,
    })

    switch (res.code) {
      case -1: // 未知错误
        console.log('未知错误')
        return
      case -2: // 没有权限
        musicNotification.value.openPermissionSetting() // 没有权限，跳转设置页面
    }
  })
  audioManager.value.onEnded(() => leAudioRef.value.onSwitchAudio(playIndex.value + 1))
  audioManager.value.onError(() => leAudioRef.value.onSwitchAudio(playIndex.value + 1))
})
onUnload(() => {
  // 移除监听生命周期事件回调
  plus.globalEvent.removeEventListener('musicLifecycle')
  // 移除暂停或播放按钮事件回调监听
  plus.globalEvent.removeEventListener('musicNotificationPause')
  // 移除播放上一首按钮事件回调监听
  plus.globalEvent.removeEventListener('musicNotificationPrevious')
  // 移除播放下一首按钮事件回调监听
  plus.globalEvent.removeEventListener('musicNotificationNext')
  // 移除收藏按钮事件回调监听
  plus.globalEvent.removeEventListener('musicNotificationFavourite')
  // 移除关闭按钮事件回调
  plus.globalEvent.removeEventListener('musicNotificationClose')
  // 移除耳机事件回调监听
  plus.globalEvent.removeEventListener('musicMediaButton')
  // 移除通知栏进度条拖动事件回调
  plus.globalEvent.removeEventListener('musicSeekTo')
})
const onBackPress = () => {
  // 退回桌面后台播放
  const main = plus.android.runtimeMainActivity()
  plus.android.invoke(main, 'moveTaskToBack', false)
  return true
}
const showFloatWindow = () => {
  if (checkOverlayDisplayPermission()) {
    musicNotification.value.showFloatWindow('#AD1EF7')
  } else {
    // 没有权限，弹出一个对话框
    showLockActivityModal(() => musicNotification.value.showFloatWindow('#AD1EF7'))
  }
}

const hideFloatWindow = () => {
  musicNotification.value.hideFloatWindow()
}

const checkOverlayDisplayPermission = () => {
  // 检查是否有浮窗权限
  return musicNotification.value.checkOverlayDisplayPermission()
}

const createNotification = () => {
  // 创建通知栏，要创建通知栏成功才能做别的操作
  return new Promise((resolve, reject) => {
    musicNotification.value.createNotification(() => {
      isCreateNotification.value = true
      resolve({})
    })
  })
}

const lockActivity = () => {
  // 设置锁屏页，同时返回授权状态
  if (checkOverlayDisplayPermission()) {
    // 有权限
    musicNotification.value.openLockActivity(!isLockActivity.value)
    isLockActivity.value = !isLockActivity.value
  } else {
    // 没有权限，弹出一个对话框
    showLockActivityModal(() => lockActivity())
  }
}

const showLockActivityModal = (callback) => {
  uni.showModal({
    content: '该功能需要开启悬浮窗权限',
    success: ({ confirm }) => {
      if (confirm) {
        // 用户点击确定，注册授权监听
        plus.globalEvent.addEventListener('openLockActivity', ({ type }) => {
          // 获得悬浮窗权限
          if (type) callback()
          // 注销授权监听
          plus.globalEvent.removeEventListener('openLockActivity')
        })
        /**
         * 没有悬浮窗权限，跳转设置页面
         */
        musicNotification.value.openOverlaySetting()
      }
    },
  })
}

const setFavour = () => {
  // 设置收藏状态
  playlistCopy.value[playIndex.value].favour = !playlistCopy.value[playIndex.value].favour
  musicNotification.value.favour(playlistCopy.value[playIndex.value].favour)
}

const switchNotification = () => {
  // 切换系统的 Notification
  systemNotification.value = !systemNotification.value
  musicNotification.value.switchNotification(systemNotification.value)
}

const setWidgetStyle = () => {
  // 设置桌面小部件风格
  // { bg, title, tip } 只支持 ARGB 和 RGB 的颜色值
  themeColor.value = themeColor.value === '#55ff00ff' ? '#55ffff00' : '#55ff00ff'
  musicNotification.value.setWidgetStyle({
    themeColor: themeColor.value,
    titleColor: '#FFFFFF',
    artistColor: '#ff00ff',
  })
}

const logout = () => {
  // 关闭通知栏
  isCreateNotification.value = false
  console.log('logout')
  musicNotification.value.cancel()
  audioManager.value.stop()
  // setTimeout(function() {
  // 	plus.runtime.quit();
  // }, 100)
}

// 整个列表播放结束事件
const onAudioEnd = () => {}

// 播放进度事件，currentTime为当前播放的时间，duration为播放总时长
const onPlayProgress = (currentTime: number, duration: number) => {}

// 改变事件，data为当前播放的数据，index为当前播放的索引
const onAudioChange = (data: any, index: number) => {}

// 点击播放列表按钮事件
const onOpenAudioList = () => {}

// 播放暂停
const onPlayOrPause = async (pause: boolean) => {
  if (!isCreateNotification.value) await createNotification()
  playing.value = pause
  musicNotification.value.playOrPause(playing.value)
  // 设置播放进度单位毫秒
  musicNotification.value.setPosition(audioManager.value.currentTime * 1000)

  if (playing.value) {
    audioManager.value.play()
  } else {
    audioManager.value.pause()
  }
}
</script>

<style scoped lang="scss">
.music-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.music-item__hover {
  background: #007aff;
}

.music-info {
  flex: 1;
  height: 100rpx;
  margin-left: 20rpx;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.music-name {
  font-size: 26rpx;
}

.music-creators {
  margin-top: 10rpx;
  display: flex;
  text-overflow: ellipsis;
}

.music-creator {
  font-size: 18rpx;
  color: rgba(0, 0, 0, 0.3);
}

.music-al {
  font-size: 18rpx;
  color: rgba(0, 0, 0, 0.3);
}

.bottom {
  position: fixed;
  bottom: 25rpx;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.bottom > view {
  width: calc(25vw - 20rpx);
  height: 100rpx;
  line-height: 100rpx;
  margin: 5rpx 10rpx;
  text-align: center;
  background-color: #007aff;
}
</style>
