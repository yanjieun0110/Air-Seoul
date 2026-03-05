$(document).ready(function () {
/*****/
let slider;
let isPaused = false;

function initSlider() {
  const windowWidth = $(window).width();
  const isPC = windowWidth >= 1025;

  if (slider) slider.destroySlider();

  slider = $('.bxslider').bxSlider({
    mode: 'fade',
    adaptiveHeight: true,
    pager: false,
    auto: true,
    pause: 3000,
    autoControls: false,
    stopAutoOnClick: false,
    touchEnabled: !isPC,
    preventDefaultSwipeX: isPC ? false : true,
    onSlideAfter: function($el, oldIndex, newIndex) {
      $('#p_now').text(newIndex + 1);
    }
  });
}

initSlider();// 초기화

$(window).resize(function() {
  initSlider();
});// 윈도우 리사이즈 시 재설정

$('#p_total').text($('.bxslider > div').length);// 총 슬라이드 수


$('.bxslider .visual a').on('click', function(e){
  const href = $(this).attr('href');
  if(href) window.location.href = href;
});// a 클릭 강제 이동

$('.prev_btn').on('click', function() {
  slider.goToPrevSlide();
  slider.stopAuto(); 
  slider.startAuto();
});// 이전 버튼

$('.next_btn').on('click', function() {
  slider.goToNextSlide();
  slider.stopAuto();
  slider.startAuto(); 
});// 다음 버튼

$('.pause_btn').on('click', function() {
  if (isPaused) {
    slider.startAuto();
    $(this).html('<i class="fa-solid fa-pause"></i>');
  } else {
    slider.stopAuto();
    $(this).html('<i class="fa-solid fa-play"></i>');
  }
  isPaused = !isPaused;
});// 일시정지/재생 버튼

$('#p_total').text($('.bxslider > div').length);// 총 슬라이드 수



/*****/
  new Swiper('.notice_bar .swiper-container', {
    direction: 'vertical',
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
  }); //notice_bar


  /******/
  $('.tip_name > li').on('click', function () {
  const $current = $(this);
  const isPC = window.innerWidth >= 1025;

  if (isPC) {
    $current.siblings().css({
      height: '150px',
      justifyContent: 'center'
    });
  } else {
    $('.tip_name > li').css('height', '');
  } // li 스타일드 초기화

  const isOpen = $current.hasClass('open');

  if (isPC) {
    if (!isOpen) {
      $current.css({
        height: '284px',
        justifyContent: 'flex-start'
      });
    } else {
      $current.css({
        height: '150px',
        justifyContent: 'center'
      });
    }
  } // 속성주기

  // 클래스 토글
  $current.toggleClass('open').siblings().removeClass('open');

  // 아이콘 변경
  $current.find('.icon').css('background-image', function () {
    const current = $(this).css('background-image');
    return current.includes('icon_on.png')
      ? "url('./images/icon_off.png')"
      : "url('./images/icon_on.png')";
  });

  $current.siblings().find('.icon')
    .css('background-image', "url('./images/icon_on.png')");
}); //팁 아코디언 메뉴 및 아이콘 변경


/*****/
  let swiper = new Swiper(".mySwiper", {
    lazy: {
        loadPrevNext: true,
    },
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 16,

    observer: true, 
    observeParents: true,
    watchSlidesProgress: true,

    loopedSlides: 8, 
    
    slideToClickedSlide: true,

    breakpoints: {
      601: {
        slidesPerView: 3.5,
        centeredSlides: true,
      },
      1025: {
        slidesPerView: 5,
        centeredSlides: true,
        navigation: {
          nextEl: ".popular .swiper-button-next",
          prevEl: ".popular .swiper-button-prev",
        },
      }
    }
}); //popular_swiper

  $('input[name="res_box"]').on('change', function () {
    $('.label_box label').removeClass('label_chk');
    const checkedId = $(this).attr('id');
    $('label[for="' + checkedId + '"]').addClass('label_chk');
  }); //예약박스 라벨 클래스 변경


  document.querySelectorAll('.persons > div').forEach(person => {
    const minusBtn = person.querySelector('.minus');
    const plusBtn = person.querySelector('.plus');
    const countEl = person.querySelector('.count');
    let count = parseInt(countEl.textContent);

    const isAdult = person.className.indexOf('adult') !== -1;;

    minusBtn.addEventListener('click', () => {
      if ((isAdult && count > 1) || (!isAdult && count > 0)) {
        count--;
        countEl.textContent = count;
      } else {
        alert('인원수를 더 이상 줄일 수 없습니다.\n(성인은 최소 1명, 아동·유아는 성인 동반 필요)');
      }
    });

    plusBtn.addEventListener('click', () => {
      count++;
      countEl.textContent = count;
    });
  }); //탑승객 인원 버튼

  $('#info').on('click', function (e) {
    e.stopPropagation();

    $('.i_box').toggle();
  }); //인포버튼 (나이 계산기)

  $('body').on('click', function () {
    $('.i_box').css('display', 'none');
  }); //i_box 바깥 창닫기
  $('.i_box').on('click', function (e) {
    e.stopPropagation();
  }); //i_box는 제외


  /* 예매 선택 알림창 */
  const $resBtn = $("#resBtn"); // 예약 버튼
  const $dateBtn = $("#dateBtn"); // 날짜 버튼

  $resBtn.on("click", function () {
    const from = $(".route_box .from").text();
    const to = $(".route_box .to").text();
    const date = $dateBtn.text() || "-";
    const adult = $(".adult .count").text();
    const child = $(".passenger .count").eq(0).text();
    const infant = $(".passenger .count").eq(1).text();

    // 출발지/도착지 선택 여부 확인
    if (from === "출발" || to === "도착") {
      alert("출발지와 도착지를 모두 선택해주세요");
      return; // 선택 안 됐으면 예약 진행 중단
    }


    // 예약 완료 팝업
    alert(
      `예약이 완료되었습니다.\n\n출발: ${from}\n도착: ${to}\n날짜: ${date}\n성인: ${adult}명\n아동: ${child}명\n유아: ${infant}명`
    );
  });





  $('input[name="graph"]').on('change', function () {
    $('.g_label label').removeClass('g_chk');
    const checkedId = $(this).attr('id');
    $('label[for="' + checkedId + '"]').addClass('g_chk');
  }); //그래프박스 라벨 클래스 변경


  $('.aco_btn').on('click', function () {
    $(this).next('.aco_inner').slideToggle();
  }); //푸터 기업정보 아코디언


  $('#b_menu_btn').on('click', function (e) {
    e.preventDefault();

    $('.gnb').addClass('open');
    $('body').css('overflow', 'hidden');
  }); //하단 네비 gnb 열기




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
      if (!isOpen) {
        $("#chat_box")
          .css("display", "flex")
          .hide()
          .fadeIn(300);

        $("#chatBot img").attr("src", "./images/chatBot_on.png");
        isOpen = true;
      } else {
        closeChat();
      }
    }
  }); //토글 (pc)

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
    $("#chatBot img").attr("src", "./images/chatBot.png");
    $("body").css("overflow", "");
    isOpen = false;
  }

  const proInput = document.querySelector('.e_pro input');
  const proBtn = document.querySelector('#proBtn');

  proInput.addEventListener('click', function(e) {
    e.preventDefault();
  });

  proBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('할인쿠폰이 발급되었습니다!');
    proInput.value = '';
  });

  


}); //jQuery




/* 그래프 */
window.onload = function () {
  const graphBox = document.getElementById('g_tab_box');
  const popupEl = document.getElementById('price_popup');
  const tabMap = { graph01: 'fukuoka', graph02: 'nhatrang', graph03: 'danang', graph04: 'osaka' };
  let graphData = {};

  fetch('./json/graph.json')
    .then(res => res.json())
    .then(data => {
      graphData = data;
      renderGraph('fukuoka');
    });

  function renderGraph(city) {
    if (!graphData[city]) return;

    graphBox.innerHTML = '';
    const data = graphData[city];
    const validPrices = data.filter(d => d.price !== null).map(d => Number(d.price));
    const minPrice = validPrices.length ? Math.min(...validPrices) : 0;
    const maxPrice = validPrices.length ? Math.max(...validPrices) : 1;

    // 최초 팝업 표시
    popupEl.classList.add('lowest');
    popupEl.innerHTML = `
      <div class="price">최저가 ${minPrice.toLocaleString()}원</div>
      <a href="#" class="ticket_btn">항공권 조회</a>
    `;

    // 막대 최대 높이 계산 (CSS .g_tab_box 높이에 맞춤)
    const graphBoxHeight = parseFloat(window.getComputedStyle(graphBox).height);
    const maxBarHeight = graphBoxHeight - 60; // 날짜 영역 + 여유 60px

    data.forEach(item => {
      const wrap = document.createElement('div');
      wrap.className = 'bar_wrap';

      const bar = document.createElement('div');
      bar.className = 'bar';

      if (item.price !== null) {
        const heightVal = (item.price / maxPrice) * maxBarHeight;
        bar.style.height = `${heightVal}px`;

        if (Number(item.price) === minPrice) bar.classList.add('lowest');

        // 막대 클릭 시 팝업 업데이트
        bar.addEventListener('click', () => {
          document.querySelectorAll('.bar').forEach(b => b.classList.remove('active'));
          bar.classList.add('active');

          const isLowest = Number(item.price) === minPrice;
          popupEl.classList.toggle('lowest', isLowest);
          popupEl.innerHTML = `
            <div class="price">${isLowest ? '최저가 ' : ''}${Number(item.price).toLocaleString()}원</div>
            <a href="#" class="ticket_btn">항공권 조회</a>
          `;
        });
      }

      const date = document.createElement('div');
      date.className = 'date';
      const d = new Date(item.date);
      date.textContent = `${d.getMonth() + 1}/${d.getDate()}`;

      wrap.appendChild(bar);
      wrap.appendChild(date);
      graphBox.appendChild(wrap);
    });
  }

  // 라벨 클릭 → 탭 변경
  const labels = document.querySelectorAll('.g_label label');
  document.querySelectorAll('input[name="graph"]').forEach((radio, idx) => {
    radio.addEventListener('change', () => {
      labels.forEach(l => l.classList.remove('g_chk'));
      labels[idx].classList.add('g_chk');
      renderGraph(tabMap[radio.id]);
    });
  });

  // 화면 리사이즈 시 다시 렌더링
  window.addEventListener('resize', () => {
    const activeRadio = document.querySelector('input[name="graph"]:checked');
    if (activeRadio) renderGraph(tabMap[activeRadio.id]);
  });
}; //그래프_js