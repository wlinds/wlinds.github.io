document.addEventListener('DOMContentLoaded', () => {
  let hamburger = document.querySelector('.hamburger-menu');
  let menu = document.querySelector('nav');

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  const backToTopButton = document.querySelector("#back-to-top-btn");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});