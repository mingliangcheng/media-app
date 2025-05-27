<template>
  <view class="my-container">
    <template v-if="userStore.userInfo.token">
      <view class="bg-white p-x h-30 mb-3">
        <view class="flex flex-justify-between flex-items-center h-10">
          <text>个人中心</text>
          <wd-icon name="notification" class="text-xl"></wd-icon>
        </view>
        <view class="flex flex-items-center">
          <wd-img
            round
            class="w-14 h-14 mr-3"
            src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
          ></wd-img>
          <view class="flex flex-col flex-justify-center">
            <view class="flex flex-items-center">
              <text class="text-xl font-500 mr-5">陈明亮</text>
              <wd-tag type="primary" plain>Lv.20</wd-tag>
            </view>
            <view class="text-coolGray">
              <text>328关注</text>
              <text class="text-gray m-x-1">|</text>
              <text>2.3k粉丝</text>
              <text class="text-gray m-x-1">|</text>
              <text>12.8k获赞</text>
            </view>
            <view class="text-gray text-sm">分享美好生活</view>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="bg-white p-x h-25 mb-3 flex flex-items-center">
        <wd-img
          round
          class="w-15 h-15 mr-3"
          src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
        ></wd-img>
        <view class="flex flex-col">
          <text class="text-gray">登录后体验更多功能</text>
          <wd-button>去登录</wd-button>
        </view>
      </view>
    </template>

    <view class="bg-white mb-3 h-22 p-xy flex">
      <view class="flex flex-col flex-items-center w-25%">
        <wd-img
          class="w-10 h-10"
          src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
        ></wd-img>
        <text class="text-base">私人FM</text>
        <text class="text-gray text-sm">猜你喜欢</text>
      </view>
      <view class="flex flex-col flex-items-center w-25%">
        <wd-img
          class="w-10 h-10"
          src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
        ></wd-img>
        <text class="text-base">每日推荐</text>
        <text class="text-gray text-sm">歌单</text>
      </view>
      <view class="flex flex-col flex-items-center w-25%">
        <wd-img
          class="w-10 h-10"
          src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
        ></wd-img>
        <text class="text-base">k歌房</text>
        <text class="text-gray text-sm">在线唱歌</text>
      </view>
      <view class="flex flex-col flex-items-center w-25%">
        <wd-img
          class="w-10 h-10"
          src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
        ></wd-img>
        <text class="text-base">电台</text>
        <text class="text-gray text-sm">听博客</text>
      </view>
    </view>

    <view class="bg-white">
      <wd-cell-group>
        <wd-cell title="播放历史" is-link to="/pages/button/index" replace>
          <template #icon>
            <wd-icon name="history" size="18" class="mr-3"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="我的下载" is-link to="/pages/button/index" replace>
          <template #icon>
            <wd-icon name="cloud-download" size="18" class="mr-3"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="我的收藏" is-link to="/pages/button/index" replace>
          <template #icon>
            <wd-icon name="star" size="18" class="mr-3"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="我的设置" is-link to="/pages/button/index" replace>
          <template #icon>
            <wd-icon name="setting1" size="18" class="mr-3"></wd-icon>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>

    <view v-if="userStore.userInfo.token" class="w-100% mt-5 p-x box-border fixed bottom-20">
      <wd-button class="w-100%" type="error" @click="logout">退出登录</wd-button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const logout = () => {
  uni.navigateTo({
    url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
  })
}
</script>

<style scoped lang="scss"></style>
