$(document).ready(function () {

  // 치료과정: 태블릿 · 모바일에서만 Swiper 실행
  const media = window.matchMedia("(max-width: 1024px)");
  const sliders = [];

  $(".section03 .process-list").each(function () {
    sliders.push({
      element: this,
      instance: null,
    });
  });

  function updateProcessSwiper() {
    sliders.forEach(function (slider) {
      if (media.matches && !slider.instance) {
        slider.instance = new Swiper(slider.element, {
          slidesPerView: 1,     // 가운데 원 한 개 기준
          slidesPerGroup: 1,    // 한 단계씩 이동
          centeredSlides: true,
          spaceBetween: 20,
          speed: 500,
          loop: true,           // 마지막에서 첫 단계로 연결
          grabCursor: true,

          pagination: {
            el: slider.element.querySelector(".swiper-pagination"),
            type: "bullets",
            clickable: true,
          },
        });
      } else if (!media.matches && slider.instance) {
        slider.instance.destroy(true, true);
        slider.instance = null;
      }
    });
  }

  updateProcessSwiper();
  media.addEventListener("change", updateProcessSwiper);


  // 주의사항 탭과 아코디언
  $(".scetion04 .tab").each(function () {
    const tab = $(this);
    const menus = tab.find(".tab-gnb li");
    const panels = tab.find(".tab-list > ul > li");
    const items = tab.find(".tab-list dl");

    // 설명을 닫고, 각 목록의 첫 항목만 열기
    items.removeClass("active");
    items.children("dd").hide();

    panels.each(function () {
      $(this).find("dl").first()
        .addClass("active")
        .children("dd").show();
    });

    // 탭 메뉴가 있을 때만 적용
    if (menus.length) {
      menus.removeClass("active").eq(0).addClass("active");
      panels.hide().eq(0).show();

      menus.on("click", function () {
        const index = $(this).index();

        menus.removeClass("active");
        $(this).addClass("active");

        panels.hide().eq(index).show();
      });
    }

    // 제목을 클릭하면 부드럽게 열고 닫기
    items.children("dt").on("click", function () {
      const item = $(this).parent("dl");
      const description = item.children("dd");
      const shouldOpen = !item.hasClass("active");

      item.siblings("dl").removeClass("active");
      item.siblings("dl").children("dd")
        .stop(true, true)
        .slideUp(300);

      item.toggleClass("active", shouldOpen);

      if (shouldOpen) {
        description.stop(true, true).slideDown(300);
      } else {
        description.stop(true, true).slideUp(300);
      }
    });

  });
    // 충치 단계별 치료과정 Swiper
  const cavityElement = document.querySelector(".cavity-slider");
  const cavityMedia = window.matchMedia("(max-width: 1024px)");

  let cavitySwiper = null;

  function updateCavitySwiper() {
    if (!cavityElement) return;

    if (cavityMedia.matches && !cavitySwiper) {
      cavitySwiper = new Swiper(cavityElement, {
        slidesPerView: 1,     // 가운데 원 한 개 기준
        slidesPerGroup: 1,    // 한 단계씩 이동
        centeredSlides: true,
        spaceBetween: 20,
        speed: 500,
        loop: true,
        grabCursor: true,

        pagination: {
          el: cavityElement.querySelector(".swiper-pagination"),
          type: "bullets",
          clickable: true,
        },
      });
    } else if (!cavityMedia.matches && cavitySwiper) {
      // PC로 돌아오면 원 4개 한 줄로 복원
      cavitySwiper.destroy(true, true);
      cavitySwiper = null;
    }
  }

  updateCavitySwiper();
  cavityMedia.addEventListener("change", updateCavitySwiper);
  

    // 교정장치 비교 Swiper
  $(".orthodontic-device .device-list").each(function () {
    new Swiper(this, {
      slidesPerView: 1, // 설명과 사진을 한 세트씩 표시
      slidesPerGroup: 1,
      spaceBetween: 40,
      speed: 500,       // 부드럽게 이동
      loop: true,       // 클리피씨 → 세라믹 → 메탈 → 반복
      grabCursor: true,

      pagination: {
        el: this.querySelector(".swiper-pagination"),
        type: "bullets",
        clickable: true,
      },
    });
  });

  

});

 