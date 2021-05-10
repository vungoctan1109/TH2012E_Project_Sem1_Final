$(document).ready(function () {
  $(".customer-logos").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  function scrollAppear() {
    var introText = $(".intro-text");
    for (var i = 0; i < introText.length; i++) {
      var introPosition = introText[i].getBoundingClientRect().top;
      var screenPosition = window.innerHeight / 1.2;
      if (introPosition < screenPosition) {
        introText[i].classList.add("intro-appear");
      }
    }
  }

  window.addEventListener("scroll", scrollAppear);
});
