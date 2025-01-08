// 移动端导航切换
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector("nav ul");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Hero 轮播
const heroSlides = document.getElementById("hero-slides");
const totalSlides = heroSlides.children.length;
let currentIndex = 0; // 当前展示第几张

// 每隔5秒自动切换到下一张
setInterval(() => {
  currentIndex++;
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }
  // 利用 transform 来左右平移
  heroSlides.style.transform = `translateX(-${100 * currentIndex}%)`;
}, 5000);
