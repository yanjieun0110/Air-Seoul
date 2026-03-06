## 📌 Project Overview
본 웹사이트는 팀 프로젝트로 진행되었으며, 12컬럼 그리드 시스템을 기반으로 반응형 웹으로 제작되었습니다.

## ⏱️ Development Period
코딩기간 : 26/01/02 ~ 26/01/20 (19일)

## 🛠️ Tech Stack
1. HTML
2. CSS / SCSS
3. JavaScript
4. jQuery
5. Swiper

--------------------------------------------------------

## /* 팁 배너 토글 jQuery */
→ 팁 배너를 클릭하면 토글 방식으로 콘텐츠가 펼쳐지도록 구현했으며, 배너의 상태에 따라 아이콘이 함께 변경되도록 처리했습니다.

<클릭 전>
<img width="1321" height="297" alt="image" src="https://github.com/user-attachments/assets/e4b38aea-1874-41e5-a2ad-54f12262d840" />
<클릭 후>
<img width="1306" height="296" alt="image" src="https://github.com/user-attachments/assets/d63ec567-f0d4-4072-ad9b-9cd53407fd98" />

```javascript
$('.tip_name > li').on('click', function() {
  const $current = $(this);
  const isPC = window.innerWidth >= 1025;

  if (isPC) {
    $current.siblings().css({
      height: '150px',
      justifyContent: 'center'
    });
  } else {
    $('.tip_name > li').css('height', '');
  }

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
  }

  $current.toggleClass('open').siblings().removeClass('open');

  $current.find('.icon').css('background-image', function () {
    const current = $(this).css('background-image');
    return current.includes('icon_on.png')
      ? "url('./images/icon_off.png')"
      : "url('./images/icon_on.png')";
  });

  $current.siblings().find('.icon')
    .css('background-image', "url('./images/icon_on.png')");
});
```

##

/* 인기노선 스와이퍼 js */
## Swiper.js의 breakpoints 옵션을 활용하여 화면 크기에 따라 표시되는 슬라이드 개수가 달라지도록 인기 노선 슬라이더를 반응형으로 구현했습니다.

```javascript
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
});
```

##

/* 예약 박스 count jQuery */
## 버튼 클릭 이벤트를 통해 수량(count)을 증가 및 감소하도록 구현했으며, 조건문을 활용하여 특정 조건에서 알림창이 나타나도록 처리했습니다.
<카운트 증가>
<img width="470" height="208" alt="image" src="https://github.com/user-attachments/assets/0b4da7db-020a-4e56-81a4-23e650db20b5" />
<카운트 감소>
<img width="492" height="179" alt="image" src="https://github.com/user-attachments/assets/71280c5c-9839-4faa-b8f5-5b93bbd4c868" />

```javascript
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
  });
```

##

/* 인포박스 토글 jQuery */
## 아이콘에 클릭 이벤트를 적용하여 인포박스가 토글 방식으로 열리고 닫히도록 구현했습니다.

<img width="437" height="265" alt="image" src="https://github.com/user-attachments/assets/1fab28d2-efa7-4807-8ba8-0d6e00777094" />

```javascript
$('#info').on('click', function (e) {
    e.stopPropagation();

    $('.i_box').toggle();
  });

  $('body').on('click', function () {
    $('.i_box').css('display', 'none');
  });
  $('.i_box').on('click', function (e) {
    e.stopPropagation();
  });
```

##

/* 예매 선택 알림창 */
## 입력 조건에 맞지 않을 경우 알림창이 표시되도록 처리했으며, 조건을 모두 충족한 후 예약 버튼을 클릭하면 선택한 정보가 불러와져 화면에 동적으로 삽입되도록 구현했습니다.

<출/도착지 알림>
<img width="466" height="147" alt="image" src="https://github.com/user-attachments/assets/54151e7c-4344-4424-853d-bb671fb943a3" />
<예약 완료 알림>
<img width="1282" height="652" alt="image" src="https://github.com/user-attachments/assets/3ddf400b-5f05-49e0-8fb4-6c1e1ffb5921" />

```javascript
  const $resBtn = $("#resBtn"); 
  const $dateBtn = $("#dateBtn");

  $resBtn.on("click", function () {
    const from = $(".route_box .from").text();
    const to = $(".route_box .to").text();
    const date = $dateBtn.text() || "-";
    const adult = $(".adult .count").text();
    const child = $(".passenger .count").eq(0).text();
    const infant = $(".passenger .count").eq(1).text();

    if (from === "출발" || to === "도착") {
      alert("출발지와 도착지를 모두 선택해주세요");
      return; // 선택 안 됐으면 예약 진행 중단
    }

    alert(
      `예약이 완료되었습니다.\n\n출발: ${from}\n도착: ${to}\n날짜: ${date}\n성인: ${adult}명\n아동: ${child}명\n유아: ${infant}명`
    );
  });
```

##

/* 모바일/테블릿 탭메뉴 스크롤 활성화 jQuery */
## 

<img width="435" height="447" alt="image" src="https://github.com/user-attachments/assets/8039fac4-8c40-420e-9366-e4dbb146d290" />
<img width="420" height="340" alt="image" src="https://github.com/user-attachments/assets/417cceef-ddae-406e-ba7d-3f3bee034215" />
  
```javascript
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
  });
```

##

/* 공항 하이라이트 + 출발지 제외 js */
## 출발지와 도착지를 선택할 때 `.ch_chk` 클래스를 적용하여 선택 상태를 표시했으며, 출발지를 선택하면 동일한 항목이 도착지 목록에서는 표시되지 않도록 구현했습니다.

<출발지 선택 + 하이라이트>
<img width="964" height="408" alt="image" src="https://github.com/user-attachments/assets/72d736a9-9959-4cb6-98a8-8ad44800b2bb" />
<도착지 선택시 출발지 제외>
<img width="992" height="420" alt="image" src="https://github.com/user-attachments/assets/99b74232-6c63-40f6-83cc-0ac502890de8" />


```javascript
  function updateAirportCheck() {
    document.querySelectorAll(".choose p").forEach(p => {
      p.classList.remove("ch_chk");

      if (currentType === "dep" && p.id === selectedDep) p.classList.add("ch_chk");
      if (currentType === "arr" && p.id === selectedArr) p.classList.add("ch_chk");

      if (currentType === "arr" && p.id === selectedDep) {
        p.style.display = "none";
      } else {
        p.style.display = "block";
      }
    });
  }
```
