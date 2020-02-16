window.addEventListener("load", function() {
  //1获取元素
  var focus = document.querySelector(".focus");
  var ul = focus.children[0];
  var ol = this.document.querySelector("ol");
  //获得focus的宽度
  var imgWidth = focus.offsetWidth;

  //2、利用定时器自动轮播图图片
  var index = 0;
  var timer = setInterval(function() {
    index++;
    var translatex = -index * imgWidth;
    ul.style.transition = "all .3s";
    ul.style.transform = "translateX(" + translatex + "px)";
  }, 2000);

  //等着我们过渡完成之后再去判断 监听过渡完成的事件transitionend
  ul.addEventListener("transitionend", function() {
    //无缝滚动,若等于3会有bug问题
    if (index >= 3) {
      index = 0;
      //去掉过渡效果让我们的ul快速地跳过目标位置
      ul.style.transition = "none";
      //利用最新的索引号乘以宽度去滚动图片
      var translatex = -index * imgWidth;
      ul.style.transform = "translateX(" + translatex + "px)";
    } else if (index < 0) {
      index = 2;
      //去掉过渡效果让我们的ul快速地跳过目标位置
      ul.style.transition = "none";
      //利用最新的索引号乘以宽度去滚动图片
      var translatex = -index * imgWidth;
      ul.style.transform = "translateX(" + translatex + "px)";
    }

    //3、小圆点跟随变化
    //把ol里面li带有current类名的选出来去掉类名remove
    ol.querySelector(".current").classList.remove("current");
    //让当前索引号的小li加上current add
    ol.children[index].classList.add("current");
  });

  //需求2：手指滑动轮播图
  //触摸元素touchstart:获取手指初始坐标
  var startX = 0;
  var moveX = 0;
  var flag = false;
  //手指按下
  ul.addEventListener("touchstart", function(e) {
    startX = e.targetTouches[0].pageX;
    //停止定时器
    clearInterval(timer);
  });
  //移动手指touchmove:计算手指的滑动距离，并且移动盒子
  ul.addEventListener("touchmove", function(e) {
    moveX = e.targetTouches[0].pageX - startX;
    //移动盒子，盒子原来位置+手指移动的距离
    var translatex = -index * imgWidth + moveX;
    //手指拖动的时候，不需要动画效果所以要取消过渡效果
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + translatex + "px)";
    //如果用户手指移动过，我们再去判断否则不做判断效果
    flag = true;
  });
  //手指离开 根据移动距离判断是回弹还是播放上一张下一张
  ul.addEventListener("touchend", function(e) {
    if (flag) {
      // 1、如果移动距离大于50px,就播放上一张或下一张
      if (Math.abs(moveX) > 50) {
        //如果是右滑就是播放上一张 moveX是正值
        if (moveX > 0) {
          index--;
        } else {
          //如果是左滑就是播放上一张 moveX是负值
          index++;
        }
        var translatex = -index * imgWidth;
        ul.style.transition = "all .3s";
        ul.style.transform = "translateX(" + translatex + "px)";
      } else {
        //2)如果移动距离小于50px我们就回弹
        var translatex = -index * imgWidth;
        ul.style.transition = "all .1s";
        ul.style.transform = "translateX(" + translatex + "px)";
      }
    }

    clearInterval(timer);
    timer = setInterval(function() {
      index++;
      var translatex = -index * imgWidth;
      ul.style.transition = "all .3s";
      ul.style.transform = "translateX(" + translatex + "px)";
    }, 2000);
  });
});
