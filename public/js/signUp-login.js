const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const box = document.querySelector(".box");

sign_up_btn.addEventListener("click", () => {
  box.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  box.classList.remove("sign-up-mode");
});

// loader
$(window).on("load", function (event) {
  $("body").removeClass("preloading");
  $(".loaderbox").delay(1000).fadeOut("slow");
});


 