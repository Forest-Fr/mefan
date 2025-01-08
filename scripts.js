// 若有移动端菜单折叠，可以用
const headerNav = document.querySelector('header nav ul');
const logoImg = document.querySelector('.logo-img'); // 如需JS操作logo
// 这里没有menu-toggle，但若想加，可再HTML内增加一个按钮

// Hero轮播
const heroSlides = document.getElementById('hero-slides');
if(heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 5000);
}

// 也可加一些点击事件函数
function learnMore() {
  alert("更多信息即将上线！");
}
