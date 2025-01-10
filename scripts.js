/***************************************************
 * scripts.js
 * -----------------------------------------------
 * 1. Hero轮播: 100vh全屏
 * 2. EmailJS表单提交
 * 3. 预留更多JS功能(对比、3D模型等) 
 ***************************************************/

// Hero轮播
const heroSlides = document.getElementById('hero-slides');
if (heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 5000);
}

// EmailJS整合
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("HXCThZROMytOt-wyp"); // 公共密钥
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
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

  // 1. 预留对比弹窗 / 3D旋转 / 动态推荐等功能
  // 2. 预留移动端在线聊天点击事件
  // ...
});
