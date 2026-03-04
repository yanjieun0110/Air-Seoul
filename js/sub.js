$(document).ready(function(){

  $('.aco_btn').on('click', function () {
      $(this).next('.aco_inner').slideToggle();
    }); //푸터 기업정보 아코디언


  $('#b_menu_btn').on('click', function (e) {
    e.preventDefault();
    
    $('.gnb').addClass('open'); 
    $('body').css('overflow', 'hidden');
  }); //하단 네비 gnb 열기


  $(".label_box label").click(function() {
    $(".label_box label").removeClass("label_chk");
    $(this).addClass("label_chk");
  });//탭버튼 클래스 변경



  let isOpen = false;

  $("#chatClose").click(function(){
    closeChat();
  });//모바일 닫기 버튼

  function isMobile() {
    return window.innerWidth < 601;
  }

  $("#chatBot").click(function(e){
    e.stopPropagation();

    if (isMobile()) { // 모바일 풀페이지
      $("#chat_box")
        .css("display", "flex")
        .hide()
        .fadeIn(300);
      $("body").css("overflow", "hidden"); // 스크롤 막기
      isOpen = true;
    } else {
      // 테블릿 이후 토글
      if (!isOpen) {
        $("#chat_box")
          .css("display", "flex")
          .hide()
          .fadeIn(300);

        $("#chatBot img").attr("src", "../images/chatBot_on.png");
        isOpen = true;
      } else {
        closeChat();
      }
    }
  });

  // 바깥 클릭 닫기 (테블릿 이상만)
  $(document).click(function(){
    if (!isMobile() && isOpen) {
      closeChat();
    }
  });

  $("#chat_box").click(function(e){
    e.stopPropagation();
  });

  function closeChat() {
    $("#chat_box").fadeOut(300);
    $("#chatBot img").attr("src", "../images/chatBot.png");
    $("body").css("overflow", "");
    isOpen = false;
  }


  //브레드크럼 셀렉트
  $('#tabSelect').on('change', function() {
    var selectedId = $(this).val();
    $('#' + selectedId).prop('checked', true); 
});


  function checkWindowSize() {
    const downloadBtn = $('#down_btn');
    
    if (window.innerWidth >= 1025) {
      // 1025px 이상: 다운로드 속성 제거 및 새 탭 열기
      downloadBtn.removeAttr('download');
      downloadBtn.attr('target', '_blank');
    } else {
      // 모바일/태블릿: 다운로드 속성 다시 추가
      downloadBtn.attr('download', '');
      downloadBtn.removeAttr('target');
    }
  }

  // 초기 실행 및 리사이즈 시 실행
  checkWindowSize();
  $(window).resize(checkWindowSize);


});//jQuery