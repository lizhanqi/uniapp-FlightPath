<template>
	<view class="container" v-show="showMask">
		<view class="mask" :style="{'opacity': maskVal}" @click="hide"></view>
		<view class="main"  style="height: 90%; "> 
		<slot></slot>
		</view>
	</view>
</template>

<script>
	export default { 
		/**
		 *  @ speed [String] {运动曲线}
		 *  @ height [Number] {弹框高度 单位：rpx}
		 *  @ maskVal [Number] {蒙层透明度}
		 */
		props:{ 
			height: {
				type:Number,
				default: 1080
			},
			maskVal:{
				type: Number,
				default: 0.4
			}
		},
		data () {
			return {
				showMask: false, 
			}
		},
		methods: {
			show () { 
				this.showMask = true  
			},
			hide () { 
				this.showMask = false
			},
		 
		}
	}
</script>


<style scoped lang="scss">
.mask {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgb(0,0,0);
}

.main {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	background-color: #FFFFFF;
	border-radius: 20rpx 20rpx 0 0;
	transition: transform 0.4s;
}
</style>
