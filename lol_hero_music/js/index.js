window.addEventListener('load', function() {
    // 获取元素
    var index = 0;
    var li = $('.banner ul li')
    var img = $('.music .m_img img')
    var text = $('.music .m_text')
    var prev = $('.m_btn a:eq(0)')
    var play = $('.m_btn a:eq(1)')
    var next = $('.m_btn a:eq(2)')
    var display = $('.m_close')
    var music = $('.music')
    var mp3 = $('.music .m_mp3');
    //歌曲播放的标记
    var flag = false;
    // 播放器显示隐藏的标记
    var close = false;
    //给li添加点击事件
    li.click(function() {
        //获取当前点击的索引
        index = $(this).index();
        console.log(index);
        show()
    });
    //封装一个一系列效果的函数
    function show() {
        //根据索引改变背景图片
        change_bg(index + 1);
        //根据索引改变播放器图片
        change_music_img_and_tet(index + 1);
        //改变播放器暂停和title
        change_music_button();
        //图片旋转
        img_rotated();
        //播放歌曲
        play_m4a();
    }
    //封装一个更换背景的函数
    function change_bg(idx) {
        $("body").css({
            "background": "url(img/" + idx + "bg.jpg) no-repeat",
            "background-size": "cover"
        })
    }
    //封装一个更换播放器图片的函数
    function change_music_img_and_tet(idx) {
        img.attr("src", "img/" + idx + ".png ");
        text.html(li.eq(idx - 1).attr('title'))
    }
    //封装一个播放器按钮更换和title的函数
    function change_music_button() {
        play.attr({
            "class": "icon-pause2",
            "title": "暂停"
        });
    }
    //图像旋转
    function img_rotated() {
        //排它思想，移除所有li上的rotated属性
        li.children().removeClass("rotated");
        li.eq(index).children().addClass("rotated")
    }
    //播放歌曲
    function play_m4a() {
        mp3.attr("src", li.eq(index).attr("datasrc"));
        //play方法是原生js对象中的方法，要把mp3转化成原生js对象
        //jq转原生jq[0]或者jq.get(0)
        mp3[0].play()
        flag = true;
    }
    //给播放暂停按钮添加点击事件
    play.click(function() {
        //如果歌曲在播放1、暂停歌曲 2、图片旋转停止 3、更换播放按钮为停止 4、flag改为false
        if (flag) {
            mp3[0].pause();
            li.eq(index).children().removeClass("rotated");
            play.removeClass("icon-pause2").addClass("icon-play3").attr("title", "播放");
            flag = false
        } else {
            mp3[0].play();
            li.eq(index).children().addClass("rotated");
            play.removeClass("icon-play3").addClass("icon-pause2").attr("title", "暂停");
            flag = true
        }
    });
    //给上一首添加点击事件
    prev.click(function() {
        if (index != 0) {
            index--;
            show();
        } else {
            index = li.length - 1;
            show()
        }
    });
    //给下一首添加点击事件
    next.click(function() {
        if (index != li.length - 1) {
            index++;
            show();
        } else {
            index = 0;
            show()
        }
    });
    display.click(function() {
        if (!close) {
            music.css("transform", "translateX(-508px)");
            close = true
            $(this).removeClass("icon-arrow-left").addClass("icon-arrow-right")
        } else {
            music.css("transform", "");
            close = false
            $(this).removeClass("icon-arrow-right").addClass("icon-arrow-left")
        }
    })
})