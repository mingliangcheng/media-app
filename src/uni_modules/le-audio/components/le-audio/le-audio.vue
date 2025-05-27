<template>
	<view class="audio-content">
		<!-- #ifdef H5 -->
		<video v-if="audioList[audioActiveIndex]" id="le-audio" style="display: none;" :autoplay="autoplay?autoplay:''"
			:src="audioList[audioActiveIndex].fileUrl" @error="onError" @timeupdate="setPlayData"
			@loadedmetadata="onCanplay" @play="onPlay" @pause="onPause" @ended="onEnded">
		</video>
		<!-- #endif -->
		<!-- 调速拉条区 -->
		<view class="audio-progress">
			<!-- 后退15秒 -->
			<image src="@/uni_modules/le-audio/static/get-back.svg" @click="onSeek(-15)"></image>
			<!-- 进度条 -->
			<view class="audio-bar">
				<slider class="audio-slider" :value="currentTime" :min="0" :max="duration" @change="sliderChange"
					@changing="sliderChanging" activeColor="#00CA86" backgroundColor="#DAE0E6" block-color="#00CA86"
					block-size="18" />
			</view>
			<!-- 快进15秒 -->
			<image src="@/uni_modules/le-audio/static/fast-forward.svg" @click="onSeek(15)"></image>
		</view>
		<!-- 显示时间进度区 -->
		<view class="bar-tips">
			<text>{{minTimeFmt(currentTime)}}</text>
			<text>{{minTimeFmt(duration)}}</text>
		</view>
		<!-- 按钮区 -->
		<view class="audio-btn">
			<!-- 列表按钮 -->
			<image v-if="!showAudioListIcon"></image>
			<image v-if="showAudioListIcon" src="@/uni_modules/le-audio/static/play-list.svg" @click="onOpenList">
			</image>
			<text v-if="showAudioListIcon" class="play-list-text" @click="onOpenList">播放列表</text>
			<view class="play-box">
				<!-- 上一首 -->
				<image src="@/uni_modules/le-audio/static/last-episode.svg" :style="{'opacity':showLeftBtnOpacity}"
					@click="onSwitchAudio(audioActiveIndex - 1)"></image>
				<!-- 播放/暂停 -->
				<view class="play-btn" :style="{backgroundColor:isPaused?'#00CA86':'#475266'}" @click="onPlayPause">
					<image v-show="isPaused" src="@/uni_modules/le-audio/static/suspend.svg"></image>
					<image v-show="!isPaused" src="@/uni_modules/le-audio/static/start.svg"></image>
				</view>
				<!-- 下一首 -->
				<image src="@/uni_modules/le-audio/static/next-set.svg" :style="{'opacity':showRightBtnOpacity}"
					@click="onSwitchAudio(audioActiveIndex + 1)"></image>
			</view>
			<!-- 倍速切换 -->
			<image v-if="!showAudioSpeedIcon"></image>
			<image v-if="showAudioSpeedIcon" src="@/uni_modules/le-audio/static/multiple.svg" @click="onSpeed"></image>
			<text v-if="showAudioSpeedIcon" class="speed-text" @click="onSpeed">x{{speed}}</text>
		</view>
	</view>
</template>

<script>
	let innerAudioContext = null;
	export default {
		name: "le-audio",
		props: {
			/**
			 * audioData 播放列表
			 * @property {String} title 播放名称
			 * @property {String} fileUrl 播放链接
			 * */
			audioData: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 当前播放的位置索引
			activeIndex: {
				type: Number,
				default: -1
			},
			// 是否显示播放列表
			showAudioListIcon: {
				type: Boolean,
				default: false
			},
			// 是否显示播放倍速
			showAudioSpeedIcon: {
				type: Boolean,
				default: false
			},
			// 是否自动播放
			autoplay: {
				type: Boolean,
				default: true
			},
			// 是否循环播放
			loopPlay: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isPaused: true, //是否暂停中
				duration: 0, //音频时长
				currentTime: 0, //当前时长
				audioActiveIndex: -1, //当前播放索引
				speed: 1, //倍速
				isSlidering: false, //是否移动中
				isEndAcudio: false, //最后一个音频结束
				audioList: [
					// {title:'',image:'',fileUrl:''}
				],
			}
		},
		watch: {
			activeIndex() {
				this.audioActiveIndex = this.activeIndex;
				this.setAudioInfo(true);
			},
			audioData: {
				handler: function() {
					this.audioList = this.audioData;
					this.setAudioInfo(false);
				},
				deep: true
			}
		},
		computed: {
			showLeftBtnOpacity() {
				return this.audioActiveIndex === 0 ? 0.5 : 1;
			},
			showRightBtnOpacity() {
				return this.audioActiveIndex + 1 === this.audioList.length ? 0.5 : 1;
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.audioActiveIndex = this.activeIndex;
				this.audioList = this.audioData;
				this.startPlay();
			})
		},
		beforeDestroy() {
			// #ifdef MP-ALIPAY || MP-LARK
			innerAudioContext.destroy();
			// #endif
			// #ifdef H5
			innerAudioContext.pause();
			// #endif
		},
		methods: {
			minTimeFmt(val) {
				let minute = parseInt(val / 60);
				let seconds = Math.ceil(val % 60)
				return `${minute>=10?minute:'0'+minute}:${seconds>=10?seconds:'0'+seconds}`
			},
			onOpenList() {
				this.$emit("onOpenAudioList")
			},
			startPlay() {
				innerAudioContext = uni.getBackgroundAudioManager();
				/*
				play		播放（H5端部分浏览器需在用户交互时进行）
				pause		暂停
				stop		停止
				seek	position	跳转到指定位置，单位 s
				destroy		销毁当前实例
				*/
				innerAudioContext.startTime = 0; //开始播放的位置（单位：s）
				this.setAudioInfo(false);
				// #ifdef H5
				innerAudioContext.playbackRate(1.0);
				// #endif
				// #ifndef H5
				innerAudioContext.playbackRate = this.speed; //放的倍率。可取值：0.5/0.8/1.0/1.25/1.5/2.0
				// 音频播放事件
				innerAudioContext.onPlay(() => {
					this.onPlay();
				});
				// 音频暂停事件
				innerAudioContext.onPause(() => {
					this.onPause();
				});
				// 音频进入可以播放状态，但不保证后面可以流畅播放
				innerAudioContext.onCanplay(() => {
					this.onCanplay();
				});
				// 音频自然播放结束事件
				innerAudioContext.onEnded(() => {
					this.onEnded();
				});
				// 音频播放错误事件
				innerAudioContext.onError((res) => {
					this.onError(res)
				});
				// 音频播放进度更新事件
				innerAudioContext.onTimeUpdate(() => {
					this.setPlayData();
				});
				// #endif
				// #ifndef H5 || MP-ALIPAY || MP-LARK
				// 用户在系统音乐播放面板点击上一曲事件（iOS only）
				innerAudioContext.onPrev(() => {
					// 切换到上一个音频
					this.onSwitchAudio(this.audioActiveIndex - 1);
					// console.log("用户在系统音乐播放面板点击下一曲事件（iOS only）");
				});
				// 用户在系统音乐播放面板点击下一曲事件（iOS only）
				innerAudioContext.onNext(() => {
					// 切换到下一个音频
					this.onSwitchAudio(this.audioActiveIndex + 1);
					// console.log("用户在系统音乐播放面板点击下一曲事件（iOS only）");
				});
				// #endif
			},
			// 暂停播放切换
			onPlayPause() {
				if (this.isPaused) {
					if (this.isEndAcudio) {
						innerAudioContext.title = this.audioList[this.audioActiveIndex]?.title;
						innerAudioContext.coverImgUrl = this.audioList[this.audioActiveIndex]?.image;
						innerAudioContext.src = encodeURI(this.audioList[this.audioActiveIndex]?.fileUrl).replace(/\+/g,
							"%2B"); //音频的数据链接，用于直接播放。
					}
					innerAudioContext.play()
					this.isPaused = false;
				} else {
					innerAudioContext.pause()
					this.isPaused = true;
				}
			},
			// 切换音频
			onSwitchAudio(index) {
				if (index < 0 || index >= this.audioList.length) {
					return;
				}
				if (this.audioActiveIndex === index) {
					this.setAudioInfo(true);
					return
				}
				this.audioActiveIndex = index;
				this.$emit("onAudioChange", this.audioList[this.audioActiveIndex], index)
				this.setAudioInfo(true);
			},
			// 调整播放倍速
			onSpeed() {
				if (this.speed == 1) {
					// #ifdef H5
					innerAudioContext.playbackRate(1.5);
					this.speed = 1.5;
					// #endif
					// #ifndef H5
					innerAudioContext.playbackRate = 2.0;
					this.speed = 2;
					// #endif
				} else {
					// #ifdef H5
					innerAudioContext.playbackRate(1.0);
					// #endif
					// #ifndef H5
					innerAudioContext.playbackRate = 1.0;
					// #endif
					this.speed = 1;
				}
			},
			// 调整播放位置
			onSeek(num) {
				if (!this.currentTime) return;
				let seekNum = num + this.currentTime;
				this.isSlidering = true;
				if (seekNum < 0) {
					// 调整后时间小于0
					this.currentTime = 0;
					innerAudioContext.seek(0)
				} else if (seekNum > this.duration) {
					// 调整后时间大于总时长
					this.currentTime = this.duration;
					innerAudioContext.seek(this.duration)
				} else {
					this.currentTime = seekNum;
					innerAudioContext.seek(seekNum)
				}
				this.isSlidering = false;
			},
			// 滑块滚动到的位置
			sliderChange(e) {
				this.isSlidering = false;
				this.currentTime = e.detail.value;
				innerAudioContext.seek(e.detail.value);
			},
			// 滑块滚动到的位置 实时
			sliderChanging(e) {
				this.isSlidering = true;
				this.currentTime = e.detail.value;
			},
			// 设置以及转换信息
			setPlayData(event) {
				// #ifndef H5
				if (this.isSlidering) return;
				if (!innerAudioContext.duration && !innerAudioContext.currentTime) return;
				this.duration = innerAudioContext.duration || 0;
				this.currentTime = innerAudioContext.currentTime || 0;
				this.$emit("onPlayProgress", this.currentTime, this.duration)
				// #endif
				// #ifdef H5
				if (this.isSlidering) return;
				this.duration = event.detail.duration || 0;
				this.currentTime = event.detail.currentTime || 0;
				this.$emit("onPlayProgress", this.currentTime, this.duration)
				// #endif
			},
			// 设置播放
			setAudioInfo(isAutoplay) {
				if (innerAudioContext && this.audioActiveIndex > -1 && this.audioList[this.audioActiveIndex]?.fileUrl) {
					innerAudioContext.title = this.audioList[this.audioActiveIndex]
					?.title; //音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
					innerAudioContext.coverImgUrl = this.audioList[this.audioActiveIndex]
					?.image; //封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
					innerAudioContext.src = encodeURI(this.audioList[this.audioActiveIndex]?.fileUrl).replace(/\+/g,
					"%2B"); //音频的数据链接，用于直接播放。
					// #ifndef H5 || MP-ALIPAY || MP-LARK
					// 播放本地文件
					if (this.audioList[this.audioActiveIndex]?.fileUrl.startsWith('/')) {
						innerAudioContext.src = this.audioList[this.audioActiveIndex]?.fileUrl
					}
					// #endif
					innerAudioContext.epname = this.audioList[this.audioActiveIndex]
					?.epname; //专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
					innerAudioContext.singer = this.audioList[this.audioActiveIndex]
					?.singer; //歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
					innerAudioContext.webUrl = this.audioList[this.audioActiveIndex]
					?.webUrl; //页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
					if (isAutoplay || this.autoplay) {
						innerAudioContext.play();
					} else {
						// setTimeout(()=>{
						innerAudioContext.pause();
						// },100)
					}
				}
				if (!this.audioList[this.audioActiveIndex]?.fileUrl) {
					this.duration = 0;
					this.currentTime = 0;
					this.isPaused = true;
					innerAudioContext.pause();
				}
			},
			// 播放事件
			onPlay() {
				// console.log('音频播放事件');
				this.isEndAcudio = false;
				this.isSlidering = false;
				this.isPaused = false;
			},
			// 暂停事件
			onPause() {
				// console.log("音频暂停事件");
				this.isPaused = true;
			},
			// 播放结束事件
			onEnded() {
				// 是否最后一个音频
				if (this.audioActiveIndex + 1 >= this.audioList.length) {
					// console.log("最后一个音频")
					// 循环播放
					if (this.loopPlay) {
						this.onSwitchAudio(0);
						return;
					}
					this.currentTime = 0;
					this.isPaused = true;
					this.isEndAcudio = true;
					this.$emit("onAudioEnd")
					return;
				}
				// 切换到下一个音频
				this.onSwitchAudio(this.audioActiveIndex + 1);
				// console.log("音频自然播放结束事件");
			},
			// 音频进入可以播放状态
			onCanplay(event) {
				// console.log('音频进入可以播放状态，但不保证后面可以流畅播放');
				// console.log("音频时长：", innerAudioContext.duration)
				this.isSlidering = false;
				this.setPlayData(event);
			},
			// 播放失败
			onError(res) {
				// console.log("音频播放错误事件", res);
				this.duration = 0;
				this.currentTime = 0;
				this.isPaused = true;
				innerAudioContext.pause();
			},

		}
	}
</script>

<style lang="scss" scoped>
	.audio-content {
		width: 100vw;
		padding: 0 64rpx;
		box-sizing: border-box;

		.audio-progress {
			display: flex;
			align-items: center;
			justify-content: space-between;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.audio-bar {
				flex: 1;
				padding: 0 26rpx;
				box-sizing: border-box;

				.audio-slider {
					margin: 0 !important;
				}
			}
		}

		.bar-tips {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 74rpx;
			margin-bottom: 32rpx;
			color: #B8BECC;
			font-size: 24rpx;
			line-height: 10rpx;
		}

		.audio-btn {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 64rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.play-box {
				display: flex;
				align-items: center;
			}

			.play-btn {
				width: 96rpx;
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 64rpx;
				background: #475266;
				border-radius: 50%;

				image {
					width: 96rpx;
					height: 96rpx;
				}
			}

			.play-list-text {
				position: absolute;
				bottom: 0;
				left: -14rpx;
				color: #475266;
				font-size: 20rpx;
			}

			.speed-text {
				position: absolute;
				top: 20rpx;
				right: 0;
				color: #475266;
				font-size: 16rpx;
				font-weight: 600;
			}
		}
	}
</style>