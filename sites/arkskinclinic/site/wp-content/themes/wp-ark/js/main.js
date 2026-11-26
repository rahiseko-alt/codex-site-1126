jQuery(function () {
  $(document).ready( function(){
    // ページ読み込み時に実行したい処理
    $('body').addClass('read');
    });
  //スムーススクロール
  $('a[href^="#"]').click(function() {
    // スクロールの速度
    let speed = 400; // ミリ秒で記述
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });
  //menu
  $(".c-menu_btn").on("click", function() {
    $(this).toggleClass('open');
    $(".c-menu_area").toggleClass('open');
    $("body").toggleClass('open');
    $(".c-menu_area").fadeToggle(500);
  });

  var userAgent = window.navigator.userAgent.toLowerCase();
  if(userAgent.indexOf('edge') != -1 || userAgent.indexOf('chrome') != -1) {
  } else if(userAgent.indexOf('safari') != -1) {
    $(".c-menu_area a").on("click", function() {
      $("body").removeClass('open');
      $(".c-menu_area").removeClass('open');
      $(".c-menu_btn").removeClass('open');
      $(".c-menu_area").css("display","none");
    });
  }
  $(".js-aco_ttl").on("click", function() {
    $(this).toggleClass("open");
    $(this).next().slideToggle();
  });
  $(".js-aco_ttl_l").on("click", function() {
    $(this).toggleClass("open");
    $(this).parent().next().slideToggle();
  });
    $(".js-button").on({
      click: function () {
        scrollPosition = $(window).scrollTop();
        $("body").addClass("fixed").css({ top: -scrollPosition });
        $($(this).data("target")).fadeIn();
        return false;
      },
    });
    $(".js-close").on("click", function () {
      $("body").removeClass("fixed");
      window.scrollTo(0, scrollPosition);
      $($(this).data("target")).fadeOut();
      return false;
    });
});