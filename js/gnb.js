$(document).ready(function () {
  $('.menu_btn').on('click', function () {
    $('.gnb').addClass('open'); 
    $('body').css('overflow', 'hidden');
  }); //gnb 열기

  $('#X_mark').on('click', function () {
    $('.gnb').removeClass('open');
    $('body').css('overflow', 'auto');
  }); //닫기


  $(function() {
    const $inputs = $('.pc_search input, .search_box input');
    const $pops = $('.pc_search .keywords, .search_box .keywords');

    $inputs.on("focus", function() {
      $(this).siblings('.keywords').show();
    });

    //인풋 밖 클릭 시 닫기
    $(document).on("click", function(e) {
      // 클릭된 곳이 pc_search나 search_box가 아니라면 모두 닫기
      if (!$(e.target).closest(".pc_search, .search_box").length) {
        $pops.hide();
      }
    });

    // 인기검색어 클릭 시 입력 및 닫기
    $pops.find('li').on("click", function() {
      const selectedText = $(this).text();
      $(this).closest('.keywords').siblings('input').val(selectedText);
      $pops.hide();
    });

    // 닫기 버튼 클릭
    $pops.find('p span').on("click", function() {
      $(this).closest('.keywords').hide();
    });
  });

  $('.gnb_btns a').on('click', function (e) {
    $(this).addClass('choose').siblings().removeClass('choose');
  }); //버튼 활성화


  $('.gnb').on('scroll', function () {
    const container = $(this);
    const containerTop = container.offset().top;
    const spans = $('.lnb_box span');
    const buttons = $('.gnb_btns a');

    spans.each(function (index) {
      const spanTop = $(this).offset().top;

      if (spanTop - containerTop <= 130) {
        buttons.removeClass('choose');
        buttons.eq(index).addClass('choose');

        const targetBtn = buttons.eq(index);
        const btnContainer = $('.gnb_btns');
        if (targetBtn.length) {
          const scrollLeft = targetBtn.position().left + btnContainer.scrollLeft() - 16;
          btnContainer.stop().animate({ scrollLeft: scrollLeft }, 100);
        }
      }
    });
  }); //스크롤 맞춰서 버튼 활성화



}); //jQuery
