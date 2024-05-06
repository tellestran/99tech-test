addEventListener("DOMContentLoaded", (event) => {
  var accordions = document.querySelectorAll(
    ".accordion, .faqs, .dropbtn-mobile"
  );
  accordions.forEach(function (accordion) {
    accordion.addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  var navMobile = document.getElementsByClassName("nav__content-mobile")[0];
  var menuBtn = document.getElementById("menu-btn");
  var exitBtn = document.getElementById("exit-btn");

  if (menuBtn && navMobile) {
    menuBtn.addEventListener("click", function () {
      console.log("menu");
      navMobile.classList.add("open");
    });
  }

  if (exitBtn && navMobile) {
    exitBtn.addEventListener("click", function () {
      console.log("exit");
      navMobile.classList.remove("open");
    });
  }
});
