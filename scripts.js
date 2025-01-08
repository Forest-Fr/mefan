// 移动端导航切换
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector("nav ul");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Hero 轮播逻辑
const heroSlides = document.getElementById("hero-slides");
const totalSlides = heroSlides.children.length;
let currentIndex = 0;

// 每5秒切换到下一张
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  heroSlides.style.transform = `translateX(-${100 * currentIndex}%)`;
}, 5000);
