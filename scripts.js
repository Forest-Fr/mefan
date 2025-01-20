/*************************************************** 
 * scripts.js
 * 
 * 1. Hero轮播：全屏 100vh (PC端)，自动切换
 * 2. EmailJS表单提交
 * 3. 预留更多JS功能(对比按钮、3D旋转、在线聊天) 
 ***************************************************/

/* 轮播功能 */
const initHeroCarousel = () => {
  const heroSlides = document.getElementById('hero-slides');
  
  if (!heroSlides) return;
  
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;

  const updateSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  setInterval(updateSlide, 5000); // 每5秒切换
};

initHeroCarousel();

/* EmailJS 表单提交功能 */
const initEmailJS = () => {
  if (typeof emailjs === 'undefined') return;

  emailjs.init("HXCThZROMytOt-wyp");  // 公共密钥

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // 使用 EmailJS 发送表单数据
      emailjs.sendForm("service_1ffkva1", "template_ypdj9n9", contactForm)
        .then(() => {
          alert("邮件已发送成功，我们将尽快与您联系！");
          contactForm.reset();
        })
        .catch((err) => {
          console.error("邮件发送失败：", err);
          alert("邮件发送失败，请稍后再试。");
        });
    });
  }
};

document.addEventListener('DOMContentLoaded', initEmailJS);

/* 弹出框显示与隐藏功能 */
const productBtn = document.querySelector('.header-gradient nav ul li a[href="products.html"]');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');

// 点击产品按钮显示弹出框
productBtn.addEventListener('click', (e) => {
  e.preventDefault();  // 防止默认跳转行为
  modal.classList.add('show');
  modalOverlay.classList.add('show');
});

// 点击背景遮罩层隐藏弹出框
modalOverlay.addEventListener('click', () => {
  modal.classList.remove('show');
  modalOverlay.classList.remove('show');
});

/* 预留对比按钮点击事件 */
const initCompareFeature = () => {
  const compareBtn = document.querySelector(".compare-features .btn");

  if (compareBtn) {
    compareBtn.addEventListener("click", () => {
      alert("对比功能暂未实现 (预留)！");
      // 未来可在此跳转对比页面或弹出对比Modal
    });
  }
};

/* 预留 3D模型或动态推荐逻辑 */
const init3DModelOrRecommendations = () => {
  // 未来可实现的功能
};

/* 预留 在线聊天或FAQ面板 */
const initChatOrFAQ = () => {
  // 未来可集成在线聊天或FAQ面板
};

/* 初始化所有预留功能 */
const initReservedFunctions = () => {
  initCompareFeature();
  init3DModelOrRecommendations();
  initChatOrFAQ();
};

document.addEventListener('DOMContentLoaded', initReservedFunctions);

