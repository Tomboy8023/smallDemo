/**
 * 分析：
 * 	1. 获取li的index()
 *  2. 更换背景图片
 * 	3. 更换播放器图片、文本
 * 	4. 更换播放器按钮及title为暂停
 * 	5. 图片旋转
 * 	6. 播放歌曲
 * 
 * 其他：
 * 	1. 暂停/播放歌曲
 * 	2. 上一首 下一首
 * 	3. 播放器可以显示与隐藏
 */

// 准备工作 收集数据
var index = 0;// li初始索引
var li = $(".banner ul li");// 获取所有的li元素
var img = $(".music .m_img img");// 获取播放器img元素
var text = $(".music .m_text");// 获取播放器m_text元素
var prev = $(".music .m_btn .m_prev");// 上一首按钮
var play = $(".music .m_btn .m_play");// 播放按钮
var next = $(".music .m_btn .m_next");// 下一首按钮
var mp3 = $(".music .m_mp3");// 媒体元素
var flag = false;// 歌曲是否播放的标记 true播放 false暂停
var close = false;// 播放器是否显示 true显示 false隐藏

/**
 * 获取点击li的索引
 */
li.click(function() {
	index = $(this).index();
	
	// 播放歌曲
	show();
});

/**
 * 封装一个函数 方便上一首 下一首调用
 */
function show() {
	// 更换背景图片，+1是因为索引从 0 开始，图片名称从 1 开始
	change_bg(index);
	// 更换播放器图片、文本
	change_img_text(index);
	// 更换播放器按钮及title为暂停
	change_btn_title();
	// 图片旋转
	img_rotate();
	// 播放歌曲
	play_mp3();
}

/**
 * 更换背景图片
 */
function change_bg(idx) {
	$("body").css({
		"background": "url(img/" + (idx+1) + "_bg.jpg) no-repeat",
		"background-size": "cover"
	});
}

/**
 * 更换播放器图片、文本
 */
function change_img_text(idx) {
	img.attr("src", "img/" + (idx+1) + ".jpg");// 更换播放器图片
	text.html(li.eq(index).attr("title"));// 获取li的title属性然后替换文本
}

/**
 * 更换播放器按钮及title为暂停
 */
function change_btn_title() {
	play.removeClass("m_play");// 移除原有的播放样式
	play.addClass("m_pause");// 添加暂停样式
	play.attr("title", "暂停");// 更换title
}

/**
 * 图片旋转
 */
function img_rotate() {
	li.removeClass("img_rotate");// 移除所有li的旋转样式
	li.eq(index).addClass("img_rotate");// 给当前li添加旋转样式
	
	// li.children().removeClass("img_rotate");// 移除所有img的旋转样式
	// li.eq(index).children().addClass("img_rotate");// 给当前li的img添加旋转样式
}

/**
 * 播放歌曲
 */
function play_mp3() {
	/* 获取选中的li的datasrc属性，并设置到MP3元素中*/
	mp3.attr("src", li.eq(index).attr("datasrc"));
	mp3.get(0).play();// 播放歌曲
	flag = true;// 歌曲是否播放的标记 true播放 false暂停
}

/**
 * 暂停或者播放歌曲
 */
play.click(function() {
	/**
	 * 如果歌曲播放
	 * 	1. 暂停歌曲
	 * 	2. 图片旋转停止
	 * 	3. 暂停按钮更换为播放按钮
	 * 	4. title更换为播放
	 */
	if (flag) {
		mp3.get(0).pause()// 暂停歌曲
		li.removeClass("img_rotate");// 移除所有li的旋转样式
		// 暂停按钮更换为播放按钮，title更换为播放
		play.removeClass("m_pause").addClass("m_play").attr("title", "播放");
		flag = false;// 歌曲是否播放的标记 true播放 false暂停
	} else {
		/**
		 * 如果歌曲暂停
		 * 	1. 播放歌曲
		 * 	2. 图片旋转
		 * 	3. 播放按钮更换为暂停按钮
		 * 	4. title更换为暂停
		 */
		mp3.get(0).play()// 播放歌曲
		li.eq(index).addClass("img_rotate");// 添加旋转样式
		// 播放按钮更换为暂停按钮，title更换为暂停
		play.removeClass("m_play").addClass("m_pause").attr("title", "暂停");
		flag = true;// 歌曲是否播放的标记 true播放 false暂停
		
		// 第一次进入页面直接点击播放按钮时背景处理
		change_bg(index);
	}
});

/**
 * 上一首
 */
prev.click(function() {
	index--;
	// 轮回到最后一首
	if (0 > index) {
		index = li.length - 1;
	}
	// 播放歌曲
	show();
});

/**
 * 下一首
 */
next.click(function() {
	index++;
	// 轮回到第一首
	if (li.length - 1 < index) {
		index = 0;
	}
	// 播放歌曲
	show();
});

/**
 * 播放器显示与隐藏
 */
$(".music .m_close").click(function() {
	// 如果显示则隐藏
	if (close) {
		$(this).addClass("m_open");
		/* 添加向左移动样式 0.8 秒完成 */
		$(".music").animate({"left": "-520px"}, 800);
		close = false;// 播放器是否显示 true显示 false隐藏
	} else {
		// 如果隐藏则显示
		$(this).removeClass("m_open");
		// 恢复初始值
		$(".music").animate({"left": "0px"}, 800);
		close = true;// 播放器是否显示 true显示 false隐藏
	}
});