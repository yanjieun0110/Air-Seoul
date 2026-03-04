document.addEventListener("DOMContentLoaded", () => {
  const fromText = document.querySelector(".route_box .from");
  const toText = document.querySelector(".route_box .to");

  const depRadio = document.getElementById("dep");
  const arrRadio = document.getElementById("arr");

  const depLabel = document.querySelector('label[for="dep"]');
  const arrLabel = document.querySelector('label[for="arr"]');

  const modal = document.querySelector(".route_modal");
  const closeBtn = document.getElementById("roClose");

  let currentType = "dep";
  let selectedDep = null;
  let selectedArr = null;

  /* 모달 열기 */
  fromText.addEventListener("click", () => openModal("dep"));
  toText.addEventListener("click", () => openModal("arr"));

  function openModal(type) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  currentType = type;
  depRadio.checked = type === "dep";
  arrRadio.checked = type === "arr";

  // 선택된 공항이 속한 지역 자동 활성화
  let selectedId = type === "dep" ? selectedDep : selectedArr;
  if (selectedId) {
    Object.keys(depGroups).forEach(key => {
      const group = depGroups[key];
      const airportIds = Array.from(group.querySelectorAll("p")).map(p => p.id);
      if (airportIds.includes(selectedId)) {

        areaTabs.forEach(t => t.classList.remove("area_chk"));
        document.getElementById(key).classList.add("area_chk");

        Object.keys(depGroups).forEach(k => depGroups[k].style.display = k === key ? "block" : "none");
      }
    });
  }

  updateRouteLabel();
  updateAirportCheck();
}

// 선택된 공항의 지역 자동 활성화
function activateRegionForSelectedAirport() {
  let selectedId = currentType === "dep" ? selectedDep : selectedArr;
  if (!selectedId) return;

  Object.keys(depGroups).forEach(key => {
    const group = depGroups[key];
    const airportIds = Array.from(group.querySelectorAll("p")).map(p => p.id);

    if (airportIds.includes(selectedId)) {
      areaTabs.forEach(t => t.classList.remove("area_chk"));
      document.getElementById(key).classList.add("area_chk");

      Object.keys(depGroups).forEach(k => depGroups[k].style.display = k === key ? "block" : "none");
    }
  });
}


  /* 지역 탭 */
  const areaTabs = document.querySelectorAll(".dep_box .area p");
  const depGroups = {
    kor: document.querySelector(".kor_box"),
    north: document.querySelector(".north_box"),
    south: document.querySelector(".south_box")
  };

  Object.keys(depGroups).forEach(key => {
    depGroups[key].style.display = key === "kor" ? "block" : "none";
  });

  areaTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      areaTabs.forEach(t => t.classList.remove("area_chk"));
      tab.classList.add("area_chk");
      Object.keys(depGroups).forEach(key => {
        depGroups[key].style.display = key === tab.id ? "block" : "none";
      });
    });
  });

  /* 공항 선택 */
  document.querySelectorAll(".choose p").forEach(item => {
    item.addEventListener("click", () => {
      if (item.style.display === "none") return;

      const id = item.id;
      const text = item.textContent;

      if (currentType === "dep") {
        selectedDep = id;
        fromText.textContent = text;
        currentType = "arr";
        arrRadio.checked = true;
        depRadio.checked = false;
      } else {
        selectedArr = id;
        toText.textContent = text;
        closeModal();
      }

      updateRouteLabel();
      updateAirportCheck();
    });
  });

  /* 공항 하이라이트 + 출발지 제외  */
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

  /*  라벨 전환  */
  depRadio.addEventListener("change", () => {
    currentType = "dep";
    updateRouteLabel();
    updateAirportCheck();
  });
  arrRadio.addEventListener("change", () => {
    currentType = "arr";
    updateRouteLabel();
    updateAirportCheck();
  });
  function updateRouteLabel() {
    depLabel.classList.toggle("ro_chk", depRadio.checked);
    arrLabel.classList.toggle("ro_chk", arrRadio.checked);
  }

  /* 모달 닫기  */
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", closeModal);

  /*  출발 도착 스왑 */
  const swapBtn = document.querySelector(".route_box i.fa-arrow-right-arrow-left");
  swapBtn.addEventListener("click", () => {
    if (!selectedDep || !selectedArr) return;

    // 텍스트 스왑
    [fromText.textContent, toText.textContent] = [toText.textContent, fromText.textContent];
    // ID 스왑
    [selectedDep, selectedArr] = [selectedArr, selectedDep];

    updateAirportCheck();
  });


  $(function () {
    // 왕복/편도 라벨 클릭 이벤트
    $(".route_modal .ro_label label").on("click", function () {
        $(".route_modal .ro_label label").removeClass("ro_chk");
        $(this).addClass("ro_chk");
    });

    // 지역 선택 (대분류) 탭 전환
  
    $(".route_modal .dep_box .area p").on("click", function () {
        $(".route_modal .dep_box .area p").removeClass("area_chk");
        $(this).addClass("area_chk");
    });

    // 세부 공항 선택
    $(".route_modal .dep_box .choose > div p").on("click", function () {
        $(".route_modal .dep_box .choose > div p").removeClass("ch_chk");
        $(this).addClass("ch_chk");

        let airportName = $(this).text();
        console.log("선택된 공항: " + airportName);
    });

    // 모달 닫기 버튼
    $("#roClose").on("click", function () {
        $(".route_modal").fadeOut(300); // 부드럽게 닫기
    });

});
});
