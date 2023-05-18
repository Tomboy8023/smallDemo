let lis = $(".mc-play li")
let img = $(".head-pic img")
let title = $(".m-title")
let next = $(".m-next")
let prev = $(".m-prev")
let play = $(".m-play")
let mp3 = $("audio")
let index = 0  // 记录索引
let timer = null
let musicStatus = false  // 未播放状态
let where = null  // 判断是从哪个按钮触发播放
let showConsole = false  // 判断控制台是收起还是展开

mp3.muted = false
mp3.loop = false

mp3.on("ended", function(){
    if(mp3.get(0).currentTime == mp3.get(0).duration) {
        next.trigger("click",  'trigger')
    }
})

lis.on("click", function() {
    index = $(this).index()
    console.log("手动触发-pic" + `第${index + 1}首歌曲播放中...`)
    playWithStyle(index)
    mp3.attr("src", "music/" + (index + 1) + ".mp3")
    playMusic()
    musicStatus = true
})

play.on("click", function(){
    if(musicStatus) {
        pauseWithStyle()
        pauseMusic()
        timer = mp3.get(0).currentTime
    } else {
        mp3.attr("src", "music/" + (index + 1) + ".mp3")
        if(timer) {
            mp3.get(0).currentTime = timer
        }
        playWithStyle(index)
        playMusic()
        where = 'playBtn'
    }
})
next.on("click", function(e) {

    index++
    index = index > 4 ? 0 : index
    if(!e.isTrigger) {
        console.log("手动-nextBtn ==> " + `第${index + 1}首歌曲播放中...`)
    }else {
        console.log("auto ==> **自动切歌**第" + (index + 1) + "首歌曲播放中...")
    }
    mp3.attr("src", "music/" + (index + 1) + ".mp3")
    playWithStyle(index)
    playMusic()
})

prev.on("click", function() {
    index--
    index = index < 0 ? 4 : index
    console.log("手动-prevBtn ==> " + `第${index + 1}首歌曲播放中...`)
    mp3.attr("src", "music/" + (index + 1) + ".mp3")
    playWithStyle(index)
    playMusic()
})

// 暂停歌曲
function pauseMusic(){
    mp3.get(0).pause()
    musicStatus = false
    console.log("暂停歌曲")
}

// 播放歌曲
function playMusic() {
    mp3.get(0).play()
    musicStatus = true
    console.log(`第${index + 1}首歌曲播放中...`)
}

/* 设置暂停时的样式
*   1.头像停止旋转
*   2.播放按钮更换成暂停按钮
*
 */
function pauseWithStyle() {
    lis.eq(index).children().addClass('deactive')  // 停止头像旋转
    play.removeClass("m-pause").addClass("m-play")  // 暂停按钮更换成播放按钮
}

/*
* 设置播放时的样式
*   1.头像旋转
*   2.歌曲名字更换
*   3.歌手头像更换
*   4.play按钮更换
*   5.背景图更换
*/
function playWithStyle(index) {
    changeHeadPic(index)  // 更换歌手的头像
    changeTitle(index)  // 更换歌曲的名称
    changePlayBtn()  // 播放按钮更换成暂停按钮
    changeBg(index + 1)  // 背景图更换
    rotateImg()  // 头像旋转
}

// 头像旋转
function rotateImg() {
    lis.eq(index).children().removeClass('deactive')
    lis.children().removeClass('active')
    lis.eq(index).children().addClass('active')
}

// 背景图更换
function changeBg(index) {
    $("body").css({
        "background": "url(" + "images/" + index + "_bg.jpg" + ")" + 'no-repeat',
        'background-size': 'cover'
    })
}

// 播放按钮更换成暂停按钮
function changePlayBtn() {
    play.removeClass("m-play").addClass("m-pause")
}

// 更换歌曲的名称
function changeTitle(index) {
    title.text(lis.eq(index).attr("title"))
}

// 更换歌手的头像
function changeHeadPic(index) {
    img.attr("src", lis.eq(index).children().attr("src"))
}

$(".m-close").on("click", function(){
    if(!showConsole) {  // 收起控制台
        $(".console").addClass('m-hidden')
        $(".m-close").addClass('m-open')
    }else {  // 展开控制台
        $(".console").removeClass('m-hidden')
        $(".m-close").removeClass('m-open')
    }
    showConsole = !showConsole
})

// 辅助测试的代码，点击后3s结束歌曲播放
$('button').on("click", function(){
    if(!mp3.get(0).paused) {
        mp3.get(0).currentTime = mp3.get(0).duration - 3
        console.log("播放时间已改变", mp3.get(0).currentTime)
    } else {
        alert("请先播放音乐")
    }
})