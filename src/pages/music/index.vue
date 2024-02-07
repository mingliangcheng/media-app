<!-- 我的音乐 -->
<template>
  <view class="container">
    <nut-sticky>
      <nut-searchbar v-model="searchValue" placeholder="搜索歌曲" background="#f7f7f7" input-background="#ffffff">
        <template #leftin>
          <nut-icon name="search2" />
        </template>
      </nut-searchbar>
    </nut-sticky>
    <view class="list-wrap">
      <view v-for="item in 10" :key="item" class="list-item select-item">
        <view class="left-img">1</view>
        <view class="right-wrap">
          <view class="title select-color">里的期望的hi去外地户按地区的hi强无大青蛙的权威敌群和</view>
          <view class="author select-color"
            >里的期望的hi去外地户按地区的hi强无敌群和里的期望的hi去外地户按地区的hi强无敌群和里的期望的hi去外地户按地区的hi强无敌群和</view
          >
        </view>
      </view>
    </view>
    <view class="player">
      <view class="left-info">
        <text>牧马城市</text>
        <text>-</text>
        <text>毛不易</text>
      </view>
      <view class="btn-wrap">
        <img v-if="isPause" class="pause" src="@/static/icon/pause-icon.png" alt="" @click="isPause = false" />
        <img v-else class="play" src="@/static/icon/play-icon.png" alt="" @click="isPause = true" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const searchValue = ref("");
// import router from "@/router";
// const goMusic = () => {
//   router.push({
//     name: "playMusic"
//   });
// };
const isPause = ref(true);
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
innerAudioContext.src = "https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3";
innerAudioContext.onPlay(() => {
  console.log("开始播放");
});
innerAudioContext.onError(res => {
  console.log(res.errMsg);
  console.log(res.errCode);
});
</script>
<style scoped lang="scss">
.container {
  padding: 0 40rpx;
  position: relative;
  .list-wrap {
    padding-bottom: 100rpx;
    .list-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      border-radius: 8rpx;
      margin-bottom: 40rpx;
      .left-img {
        width: 100rpx;
        height: 100rpx;
        display: flex;
        // justify-content: center;
        align-items: center;
        color: 333;
        font-size: 30rpx;
        font-weight: 600;
      }
      .right-wrap {
        width: calc(100% - 100rpx);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 30rpx;
          color: #333;
          font-weight: 600;
          margin-bottom: 10rpx;
        }
        .author {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 26rpx;
          color: #333;
        }
        .select-color {
          color: $primary-color;
        }
      }
    }
    .select-item {
      color: $primary-color;
    }
  }
  .player {
    width: calc(100% - 80rpx);
    height: 100rpx;
    border-radius: 50rpx;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #cedef5;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-info {
      font-size: 30rpx;
      color: #333;
      margin-left: 50rpx;
    }
    .btn-wrap {
      width: 50rpx;
      height: 50rpx;
      color: #2c2c2c;
      border: 2rpx solid #2c2c2c;
      border-radius: 50rpx;
      margin-right: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .pause,
      .play {
        width: 40rpx;
        height: 40rpx;
      }
      .pause {
        margin-left: 10rpx;
      }
    }
  }
}
</style>
