<!-- 播放音乐界面 -->
<template>
  <view id="mse"></view>
</template>

<script lang="ts" setup>
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

new Player({
  id: "mse",
  url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  height: "100%",
  width: "100%"
});
</script>
<style scoped lang="scss"></style>
