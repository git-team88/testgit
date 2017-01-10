// 加载flag
var loading = false;
// 最多可加载的条目
var maxItems = 50;
// 每次加载添加多少条目
var itemsPerLoad = 10;
function addItems(number, lastIndex) {
	// 生成新条目的HTML
	var html = '';
	for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
		html += '<li class="item-content">'
					+'<div class="item-inner">'
						+'<div class="item-title">'
							+'<div class="rank_num">'
								+'<span class="rank_num1">1</span>'
								<!--+'<span class="rank_num2">2</span>'-->
								<!--+'<span class="rank_num3">3</span>'-->
								<!--+'<span class="rank_num4">4</span>'-->
							+'</div>'
							+'<div class="star_head"><img src="images/tou.jpg" alt="" /></div>'
							+'<div class="star_cont">'
								+'<span class="star_name">周杰伦</span>'
								+'<span class="star_charm">魅力值 :<b>'+2355213+'</b></span>'
							+'</div>'
							+'<a class="support_btn" href="javascript:;"></a>'
						+'</div>'
					+'</div>'
				'</li>';
	}
	// 添加新条目
	$('.infinite-scroll-bottom .list-container').append(html);

}
//预先加载10条
addItems(itemsPerLoad, 0);
// 上次加载的序号
var lastIndex = 10;

// 注册'infinite'事件处理函数
$(document).on('infinite', '.infinite-scroll-bottom',function() {
	// 如果正在加载，则退出
	if (loading) return;
	// 设置flag
	loading = true;
	// 模拟1s的加载过程
	setTimeout(function() {
		// 重置加载flag
		loading = false;
		if (lastIndex >= maxItems) {
			// 加载完毕，则注销无限加载事件，以防不必要的加载
			$.detachInfiniteScroll($('.infinite-scroll'));
			// 删除加载提示符
			$('.infinite-scroll-preloader').remove();
			return;
		}
		// 添加新条目
		addItems(itemsPerLoad, lastIndex);
		// 更新最后加载的序号
		lastIndex = $('.list-container li').length;
		//容器发生改变,如果是js滚动，需要刷新滚动
		$.refreshScroller();
	}, 1000);
});