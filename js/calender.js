$(function () {

    const $calendarLayer = $("#calendarLayer");
    const $dateBtn = $("#dateBtn");
    const $calTitle = $("#calTitle");
    const $calClose = $("#calClose");
    
    let startDate = null;
    let endDate = null;
    let flightData = {};

    //초기 날짜 세팅 (오늘 ~ 일주일 뒤)
    function setInitialDate() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        startDate = today;
        endDate = nextWeek;

        $dateBtn.text(`${formatDate(startDate)} ~ ${formatDate(endDate)}`);
    }

    function formatDate(date) {
        if (!date) return "";
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}.${m}.${d}`;
    }

    // JSON 데이터 로드 (01~04월) 및 가격 렌더링
    async function loadPrices() {
        const months = ['01', '02', '03', '04'];
        for (const m of months) {
            try {
                const res = await fetch(`./json/flightPrices_${m}.json`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                Object.assign(flightData, data); 
            } catch (e) {
                console.warn(`${m}월 가격 데이터를 불러올 수 없습니다.`);
            }
        }
        renderPricesAndEvents();
        updateUI(); 
    }

    function renderPricesAndEvents() {
        $(".month").each(function () {
            const monthText = $(this).find("h3").text(); 
            const monthKey = monthText.replace(".", "-"); 
            const prices = flightData[monthKey] || [];

            $(this).find(".days div").each(function () {
                const $dayDiv = $(this);
                const dayNum = $dayDiv.text().trim();

                if (dayNum !== "") {
                    const dateStr = `${monthKey}-${dayNum.padStart(2, '0')}`;
                    const priceInfo = prices.find(p => p.date === dateStr);
                    
                    if (priceInfo) {
                        const formattedPrice = Number(priceInfo.price).toLocaleString();
                        $dayDiv.append(`<span class="price">${formattedPrice}</span>`);
                    }

                    $dayDiv.addClass("day-item").on("click", function () {
                        const [y, m] = monthKey.split("-").map(Number);
                        const clickedDate = new Date(y, m - 1, parseInt(dayNum));
                        handleDateClick(clickedDate);
                    });
                }
            });
        });
    }

    // 날짜 선택 로직 (왕복)
    function handleDateClick(date) {
        if (!startDate || endDate) {
            startDate = date;
            endDate = null;
            $calTitle.text("도착일 선택");
        } else if (date < startDate) {
            startDate = date;
            endDate = null;
        } else {
            endDate = date;
            $dateBtn.text(`${formatDate(startDate)} ~ ${formatDate(endDate)}`);

            setTimeout(() => $calendarLayer.fadeOut(200), 300);
        }
        updateUI();
    }

    function updateUI() {
        $(".days div").removeClass("start end range");
        
        $(".month").each(function () {
            const monthKey = $(this).find("h3").text().replace(".", "-");
            const [y, m] = monthKey.split("-").map(Number);

            $(this).find(".days div").each(function () {
                const dayNumText = $(this).contents().filter(function() { 
                    return this.nodeType === 3; 
                }).text().trim();

                if (!dayNumText) return;
                const dayNum = parseInt(dayNumText);
                const cur = new Date(y, m - 1, dayNum);
                const curTime = cur.getTime();

                if (startDate && curTime === startDate.getTime()) {
                    $(this).addClass("start");
                }
                if (endDate && curTime === endDate.getTime()) {
                    $(this).addClass("end");
                }
                if (startDate && endDate && curTime > startDate.getTime() && curTime < endDate.getTime()) {
                    $(this).addClass("range");
                }
            });
        });
    }

    // 모달 제어 이벤트
    $dateBtn.on("click", function () {
        $calTitle.text("출발일 선택");
        $calendarLayer.css("display", "flex").hide().fadeIn(200);
    });

    $calClose.on("click", function () {
        $calendarLayer.fadeOut(200);
    });

    $calClose.add("#close_btn").on("click", function () {
        $calendarLayer.fadeOut(200);
    });

    setInitialDate();
    updateUI(); 
    loadPrices();
});




/**********************/

$(function () {
    let currentCalPage = 0; 

    function moveCalendar() {
        const moveX = currentCalPage * 50;

        if ($(window).width() >= 1025) {
            $("#calendarWrap").css({
                "transform": `translateX(-${moveX}%)`,
                "transition": "transform 0.5s ease-in-out"
            });
        } else {
            $("#calendarWrap").css("transform", "translateX(0)");
        }

        $("#prevMonth").css("visibility", currentCalPage === 0 ? "hidden" : "visible");
        $("#nextMonth").css("visibility", currentCalPage === 1 ? "hidden" : "visible");
    }

    // 다음 버튼 클릭
    $("#nextMonth").on("click", function () {
        if (currentCalPage < 1) {
            currentCalPage++;
            moveCalendar();
        }
    });

    // 이전 버튼 클릭
    $("#prevMonth").on("click", function () {
        if (currentCalPage > 0) {
            currentCalPage--;
            moveCalendar();
        }
    });

    // 창 크기 조절 시 대응
    $(window).on("resize", function () {
        if ($(window).width() < 1025) {
            $("#calendarWrap").css("transform", "translateX(0)");
        } else {
            moveCalendar();
        }
    });

    // 달력 열기 버튼 클릭 시 초기화 (옵션)
    $(".date_btn").on("click", function() {
        currentCalPage = 0;
        moveCalendar();
        $("#calendarLayer").fadeIn();
    });
});