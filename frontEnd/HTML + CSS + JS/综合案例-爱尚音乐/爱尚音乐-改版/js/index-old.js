let count = -1  // 点击同一首歌的次数（歌手头像）
let musicStatus = false  // true：播放状态，false：暂停状态，用来控制.m-play的暂停和播放
let isFirst = true
let time = 0  // 控制头像的暂停和播放，保证点击头像暂停播放后再点击可以继续播放而不是重新播放
let audio = $(".m-mp3")[0]  // 获取audio标签
audio.muted = false  // 非静音播放
let where = ''  // 表示音乐以什么方式（手工点击、自动切歌）播放，如果是手工点击还可以判断是点了哪个位置的btn
// let showDialog = true  // 第一次弹窗
$("li").eq(0).children().addClass("active deactive")

// 辅助测试的代码，点击后5s结束歌曲播放
$('button').on("click", function(){
    if(!audio.paused) {
        audio.currentTime = audio.duration - 5
        console.log("播放时间已改变", audio.currentTime)
    } else {
        alert("请先播放音乐")
    }
})

function getBgImgURL(src) {  // 构造背景图的url
    let path_list = src.split('.')   // 将传进来的src通过.分割成数组
    path_list.pop()  // 删除最后一个元素（图片的后缀名）
    return path_list.join(".")  // 将数组通过.连接成字符串
}
function withSingShow() {
    // 切换背景图
    $('body').css("background", "url(" + getBgImgURL($(".active")[0].src) + "_bg.jpg" + ")" + ' no-repeat')
    $("body").css("background-size", "cover")

    // 切换歌手头像
    $('.head-pic img')[0].src = $(".active")[0].src

    // 切换歌曲名
    $(".m-title").text($(".active")[0].parentNode.title)
}

function getNextSing(where) {
    if(audio.currentTime == 0) {
        console.log(`手动触发-${where}`)
    }
    audio.addEventListener('ended', function(){
        if(audio.currentTime == audio.duration) {
            where = 'auto'
            playNextSing(where)
        }
    })
}

function playNextSing(where) {
    audio.loop = false
    let nextSingNum = parseInt(audio.src.split('/')[audio.src.split('/').length - 1])
    nextSingNum++  // 下一首歌曲的索引
    nextSingNum > 5 ? nextSingNum = 1 : nextSingNum
    newSrc = 'music/' + nextSingNum + '.mp3'
    audio.src = newSrc
    // audio.load()
    // setTimeout(function(){
        audio.play()
        musicStatus = true
    // }, 3000)

    console.log("播放结束, 3秒后开始下一首..." + `“${where}”` + ` | (${nextSingNum})`)

    // 控制头像旋转
    let nextEle = $("ul")[0].children[nextSingNum - 1].children[0]
    $(".active").removeClass("active")
    nextEle.classList.add("active")
    nextEle.classList.remove("deactive")

    withSingShow()  // 歌曲播放时，切换背景图、歌手头像、歌曲名
}

window.addEventListener('DOMContentLoaded', function(){
    if(window.navigator.userAgent.indexOf('Mobile') > -1) {
        alert("查看完整页面样式，请在PC端打开")
    }
})

$("ul li img").on('click', function(e){ // 点击头像切换歌曲、暂停播放、自动切换下一首
    // showDialog = false

    // 控制头像旋转
    $(".active").removeClass("active")
    $(this).toggleClass("active")

    withSingShow()  // 歌曲播放时，切换背景图、歌手头像、歌曲名

    // 播放音乐
    playFlag = e.currentTarget.parentNode.dataset.src.split('/')[1] === audio.src.split('/')[audio.src.split('/').length - 1]
    if(playFlag) {
        count++  // 点击同一首歌曲
    }else {
        count = 0  // 点击不同歌曲
    }
    if(!audio.paused && playFlag && count % 2 === 1){
        $(".active").addClass("deactive")
        $('.m-btn .m-play').removeClass("m-pause")
        audio.pause()
        musicStatus = false
        time = audio.currentTime
        console.log("暂停音乐")
    } else {
        $(".active").removeClass("deactive")
        audio.src = e.currentTarget.parentNode.dataset.src
        audio.currentTime = time
        audio.play()
        musicStatus = true
        isFirst = false  // 不再是首次播放了
        $('.m-btn .m-play').addClass("m-pause")

        if(!e.isTrigger) {
            where = "pic"
            console.log("播放音乐")
        }else {
            console.log("下一首播放")
        }

        getNextSing(where)  // 自动切歌，切换到下一首，index++
    }
})

$(".m-btn .m-prev").on('click', function(){  // 点击切换上一首歌曲
    // audio.load()
    // showDialog = false
    reg = /(\d+)/
    index = $(".active")[0].parentNode.dataset.src.match(reg)[0] || 0
    index --  // 上一首歌曲的索引
    index < 1 ? index = 5 : index
    $(".active").removeClass("active")
    $('ul')[0].children[0].children[0].classList.remove("deactive")

    $("ul")[0].children[index - 1].children[0].classList.add("active")
    $(".active").removeClass("deactive")
    where = 'prevBtn'

    withSingShow()

    // 播放音乐
    audio.src = 'music/' + index + '.mp3'
    audio.currentTime = time
    audio.play()
    musicStatus = true
    $('.m-btn .m-play').addClass("m-pause")
    console.log("上一首播放音乐")

    getNextSing(where)  // 自动切歌，切换到下一首，index++
})

$(".m-btn .m-next").on('click', function(){  // 点击切换下一首歌曲
    // audio.load()
    // showDialog = false
    reg = /(\d+)/
    index = $(".active")[0].parentNode.dataset.src.match(reg)[0] || 0
    index++  // 下一首歌曲的索引
    index > 5 ? index = 1 : index
    $(".active").removeClass("active")
    $('ul')[0].children[0].children[0].classList.remove("deactive")

    $("ul")[0].children[index - 1].children[0].classList.add("active")
    where = 'nextBtn'
    $(".active").trigger("click", 'trigger')

})

$(".m-btn .m-play").on("click", function() {  //  开始播放/暂停播放
    // showDialog = false
    if(isFirst) {
        console.log("播放音乐-playBtn首次播放")  // 首次播放是点了（播放/暂停）按钮
        audio.src = 'music/1.mp3'
        audio.play()
        musicStatus = true
        $('.m-btn .m-play').addClass("m-pause")
        // 控制头像旋转
        $(".active").removeClass("deactive")
        withSingShow()  // 歌曲播放时，切换背景图、歌手头像、歌曲名
        isFirst = false  // 不再是首次播放了
    }else{
        if(musicStatus) {
            audio.pause()
            musicStatus = false
            $('.m-btn .m-play').removeClass("m-pause")
            $(".active").addClass("deactive")
            console.log("playBtn暂停音乐")
        }else {
            audio.play()
            musicStatus = true
            $('.m-btn .m-play').addClass("m-pause")
            $(".active").removeClass("deactive")
            console.log("playBtn播放音乐")
        }
    }
    where = 'playBtn'
    getNextSing(where)  // 自动切歌，切换到下一首，index++
})


let isScreenOff = false; // 是否息屏标志
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {  // 息屏操作
        isScreenOff = true;
        audio.pause()
        musicStatus = false
        $(".active").addClass("deactive")
        console.log('屏幕已息屏');
    } else {
        // setTimeout(function() {  // 亮屏后1.2s后执行操作
            isScreenOff = false;
            $(".active").removeClass("deactive")
            audio.play()
            musicStatus = true
            console.log("定时器(1.2s)执行中...")
        // }, 1200)
        console.log('屏幕已开启');
    }
}, false)