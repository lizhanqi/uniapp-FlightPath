 <template> 
 		<view    style="display: flex;
		   
		 height: 100%; width: 100%; 
		flex-direction: row; "> 
		 
					
		<view  style="   margin-left: 30rpx; padding: 0rpx 20rpx;  " class="cal-day-li" >
 						  		<text  >{{cMonth}}</text>
 						  		<text  style="margin-top: -10rpx;">月</text>  
 	 	</view>		 
					
 			<swiper style="flex-grow:0;   height: 100%;   width: calc(100% - 80rpx);  " :current="current" ref="calSwiper"  :duration="200" circular @animationfinish="swiperFisnish">
 				<swiper-item style="height: 100%;  " v-for="(days,i) of weeks" :key="i">
 					<view  class="cal-ul "style="height: 100%; ">
 						<view   class="cal-li" v-for="(item,j) of days" :key="j" @click="changeSelected(item)">
 							<view  style="   " class="cal-day-li" :class="{'cal-day-li-selected':item.timeSpan == baseData.selectedDate.timeSpan}"  >
 						  			 	<text  >{{item.d}}</text>
							 			 	<text style="margin-top: -10rpx;">{{getCurrentDate(item)}}</text> 
							 
 							</view>
 						</view>
 					</view>
 				</swiper-item>
 			</swiper>
			
 		</view> 
  
 </template>
 <style lang="scss" scoped>
  
 
 
 	 
 
 	 
  
 
	
	
 		.cal-ul { 
 			display: flex; 
 			.cal-li {
 				width: calc(100% / 7);
 				text-align: center;
 			}
 		}
  
 
 
 		.cal-day-li { 
			display: flex; flex-direction: column; 
			 height:auto;width:auto; 
			 text-align: center;
			 margin-top:15rpx;
 		 }
 
 		.cal-day-li-selected {
 			background-color: #3ea3ff;
 			border-radius: 0%  0% 	10% 10%;
 			color: #fff !important;
 		}
 </style>
 
 
 
 











<script>
	/**
	 * weekCalendar 周日历选择组件
	 * @description 日历选择某一天的组件
	 * @bug 因是使用swiper组件开发快速滑动多屏 无法触发 @animationfinish 导致展示异常
	 * @property {Number} defaultDate 默认时间时间戳
	 * @event {Function} changeDate 当前选中日期发生改变
	 * @example <chenmushan-week-calendar @changeDate="changeDate"></chenmushan-week-calendar>
	 */
	export default { 
		props: {
			defaultDate: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				weeks: [],
				propDate: null,
				current: 0,
				cMonth:'1',
				baseData: {
					weekTitles: ['日', '一', '二', '三', '四', '五', '六'],
					current: 0,
					selectedDate: {
						d: null, // 在当前月份中的天
						ym: '', // 年月拼接
						timeSpan: 0, // 时间戳
					}
				}
			};
		},
		mounted() { 
			this.propDate = this.defaultDate == 0 ? new Date() : new Date(this.defaultDate);
		 this.cMonth=(this.propDate.getMonth()+1) 
			this.initData();
		},
		methods: { 
			 getCurrentDate(dt) { 
			      var myDate = new Date(dt.timeSpan) 
			      var year = myDate.getFullYear(); //年 
			      var month = myDate.getMonth() + 1; //月 
			      var day = myDate.getDate(); //日 
			      var days = myDate.getDay(); 
			      switch(days) { 
			            case 1: 
			                  days = '周一'; 
			                  break; 
			            case 2: 
			                  days = '周二'; 
			                  break; 
			            case 3: 
			                  days = '周三'; 
			                  break; 
			            case 4: 
			                  days = '周四'; 
			                  break; 
			            case 5: 
			                  days = '周五'; 
			                  break; 
			            case 6: 
			                  days = '周六'; 
			                  break; 
			            case 0: 
			                  days = '周日'; 
			                  break; 
			      } 
			      var str = year + "年" + month + "月" + day + "日  " + days; 
			      return days; 
			},

			initData() {
				let lastSat = new Date(this.propDate); 
				this.$set(this.baseData, 'selectedDate', {
					d: lastSat.getDate(),
					ym: `${lastSat.getFullYear()}${lastSat.getMonth() + 1}`,
					timeSpan: +lastSat,
					m: new Date(lastSat)
				});

				// 寻找到距离当前日期最近的周六
				while (lastSat.getDay() != 6) lastSat.setDate(lastSat.getDate() + 1); 
				this.$set(this.weeks, 0, this.getWeekDaysByLastSat(lastSat));
				this.$set(this.weeks, 1, this.getWeekDaysByWeeks(this.weeks[0], true));
				this.$set(this.weeks, 2, this.getWeekDaysByWeeks(this.weeks[0], false));
				this.current = 0;
			},
			swiperFisnish(e) {
				let current = e.detail.current;
				this.changeWeeks(current > this.baseData.current, current);
				this.$set(this.baseData, 'upCurrIndex', current);
			},
			changeWeeks(direction, current) {
				let nextIndex = current + 1 > 2 ? 0 : current + 1;
				let prevIndex = current - 1 < 0 ? 2 : current - 1;
				this.$set(this.weeks, nextIndex, this.getWeekDaysByWeeks(this.weeks[current], true));
				this.$set(this.weeks, prevIndex, this.getWeekDaysByWeeks(this.weeks[current], false));
			},
			// 通过周六数据获取一周的数据
			getWeekDaysByLastSat(lastSat) { 
				lastSat = new Date(lastSat);
				let reuslt = []; 
				for (var i = 0; i < 7; i++) {
					reuslt.push({
						d: lastSat.getDate(),
						ym: `${lastSat.getFullYear()}${lastSat.getMonth() + 1}`,
						timeSpan: +lastSat,
						m: new Date(lastSat)
					});

					lastSat.setDate(lastSat.getDate() - 1)
				} 
				return reuslt.reverse();
			},
			// 通过一周的数据获取本周的上周或下周
			getWeekDaysByWeeks(weeks, direction) {
				// 下周
				if (direction) {
					let nextLastSat = new Date(weeks[weeks.length - 1].timeSpan);
					nextLastSat.setDate(nextLastSat.getDate() + 7);
					return this.getWeekDaysByLastSat(nextLastSat)
				}
				// 上周
				else {
					let prevLstSat = new Date(weeks[0].timeSpan);
					prevLstSat.setDate(prevLstSat.getDate() - 1);
					return this.getWeekDaysByLastSat(prevLstSat)
				}
			},
			// 修改当前选中
			changeSelected(item) {  
					 this.cMonth=(new Date(item.timeSpan).getMonth()+1)
				if (this.baseData.selectedDate.timeSpan != item.timeSpan) {
					this.$set(this.baseData, 'selectedDate', {
						...item,
						m: new Date(item.timeSpan)
					}); 
					this.$emit('changeDate', this.baseData.selectedDate);
				}
			}
		},
		computed: {
			nowSelectDateString() {
				let m = this.baseData.selectedDate.m;
				return m ? `${m.getFullYear()}年${m.getMonth() + 1 }月${m.getDate()}日` : '';
			}
		},
		watch: {
			defaultDate: {
				handler(newVal, oldVal) {
					this.propDate = this.defaultDate == 0 ? new Date() : new Date(this.defaultDate);
					this.initData();
				},
				immediate: true
			}
		},
	}
</script>
