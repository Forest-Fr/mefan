/***************************************************
 * scripts.js
 * 用于 MeFan 网站的核心脚本，包括：
 * 1. Hero轮播
 * 2. 可选的移动端折叠菜单
 ***************************************************/

/* Hero轮播：简单定时器切换 */
const heroSlides = document.getElementById('hero-slides');
if (heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;

  // 每隔5秒自动切换到下一张
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    // 使用 transform: translateX(-N*100%) 来横向移动
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 5000);
}

/* 可选：移动端菜单折叠逻辑 
   若HTML里存在：
   <div class="menu-toggle" id="mobile-menu">
     <span class="bar"></span> ...
   </div>
   与CSS对应 .menu-toggle, nav ul.active 等
*/
const mobileMenu = document.getElementById('mobile-menu');
const headerNavUl = document.querySelector('header nav ul');

if (mobileMenu && headerNavUl) {
  mobileMenu.addEventListener('click', () => {
    headerNavUl.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
}

/* 可选：Learn More按钮等点击示例 
   HTML中如： <button onclick="learnMore()">了解更多</button>
*/
function learnMore() {
  alert('更多信息即将上线，敬请期待！');
}

/* 联系表单提交事件、或其他JS逻辑可在此继续添加 */
