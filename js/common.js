$(document).ready(function () { //시작
  $("header .inner .gnb > li").mouseenter(function () {
    $("header .depth2, header .depth2-bg").stop().fadeIn();
  });

  $("header").mouseleave(function () {
    $("header .depth2, header .depth2-bg").stop().fadeOut();
  });


  //mgnb
  $("header .inner .utill .ham").click(function () {
    $("header .mgnb-wrap").animate({ "right": "0" })
  })

  $(".mgnb-close").click(function () {
    $(".mgnb-wrap").animate({ "right": "-100%" });
  });


  $("header .mgnb-select").click(function () {
    // 하위 메뉴가 없는 항목은 X
    if (!$(this).next(".mdepth2").length) return;

    // 다른 메뉴 닫기
    $("header .mgnb-select").not(this).removeClass("active");
    $("header .mgnb-select").not(this)
      .next(".mdepth2").stop().slideUp();

    // 클릭한 메뉴 열기 / 닫기
    $(this).toggleClass("active");
    $(this).next(".mdepth2").stop().slideToggle();
  });

  // 하위 메뉴를 클릭하면 파란색으로 표시
  $("header .mdepth2 a").click(function () {
    $("header .mdepth2 a").removeClass("active");
    $(this).addClass("active");
  });

  //main swiper
  // 문구 스와이퍼
  const textSwiper = new Swiper(".visual-text-swiper", {
    effect: 'fade',
    // 밀려 넘어가지 않고, 서서히 사라지며 다음 장으로 바뀌는 효과(페이드인)
    fadeEffect: { crossFade: true },
  });

  // 사진 스와이퍼
  const imageSwiper = new Swiper(".visual-img", {
    pagination: {
      el: '.visual-pagination',
      clickable: true,
      // 버튼을 누르면 해당 페이지로 이동 - fraction일 경우 필요는 없음
    },

    loop: true,

    speed: 1500,


    autoplay: {
      delay: 2500,
      // 슬라이드가 머무르는 시간 (2500 = 2.5초)
      disableOnInteraction: false,
      // 마우스로 클릭/터치해도 오토플레이가 멈추지 않고 계속 유지됨
    }
  });

imageSwiper.on("slideChange", function () {
  textSwiper.slideTo(imageSwiper.realIndex, 800);
});

// 첫 화면 동기화
textSwiper.slideTo(imageSwiper.realIndex, 0);

const careerNum = document.querySelector(".count-num");


//카운팅
if (careerNum) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      let count = 0;
      const target = 20;
      const duration = 1000;
      const start = performance.now();

      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);

        count = Math.floor(progress * target);
        careerNum.textContent = count;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          careerNum.textContent = target;
        }
      }

      requestAnimationFrame(animate);
      observer.disconnect();
    }
  }, {
    threshold: 0.5
  });

  observer.observe(careerNum);
}

const treatmentSwiper = new Swiper(".treatment-swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  speed: 600,

  breakpoints: {
    0: {
      slidesPerView: 1.4,
      centeredSlides: true,
      spaceBetween: 15,
      
    },

    769: {
      slidesPerView: 2.2,
      centeredSlides: true,
      spaceBetween: 25,
      
    },

    1401: {
      slidesPerView: 4,
      centeredSlides: false,
      spaceBetween: 20,
      allowTouchMove: false,
      loop: false,
      
    },
  },
});


/* FAQ*/

$("#faq .faq-item.active .faq-answer").show();

$("#faq .faq-question").click(function () {

  const item = $(this).closest(".faq-item");
  const isOpen = item.hasClass("active");


  $("#faq .faq-item").removeClass("active");
  $("#faq .faq-answer").stop().slideUp(300);


  if (!isOpen) {
    item.addClass("active");
    item.find(".faq-answer").stop().slideDown(300);
  }

});

AOS.init({
  duration: 1000,

  once: true,
  offset: 100
});

}); //끝
