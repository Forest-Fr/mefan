// 导航折叠菜单
const mobileMenu = document.getElementById("mobile-menu");
const navUl = document.querySelector("nav ul");

if(mobileMenu && navUl) {
  mobileMenu.addEventListener("click", () => {
    navUl.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
}

// Hero轮播
const heroSlides = document.getElementById("hero-slides");
if(heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 5000);
}

// “了解更多”弹窗示例
function learnMore() {
  alert("更多信息即将上线，敬请期待！");
}
