// 移动端导航切换
const mobileMenu = document.getElementById("mobile-menu");
const navUl = document.querySelector("nav ul");

mobileMenu.addEventListener("click", () => {
  navUl.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// 简单轮播逻辑（若要自动切换三张图片）
const heroSlides = document.getElementById("hero-slides");
let currentIndex = 0;
const totalSlides = heroSlides.children.length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
}, 5000);

// 按钮点击事件示例
function learnMore() {
  alert("更多信息敬请期待...");
}
