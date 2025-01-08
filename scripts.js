/***************************************************
 * scripts.js
 * 用于 MeFan 网站的核心脚本
 * -----------------------------------------------
 * 1. Hero轮播 (自动切换)
 * 2. EmailJS表单提交 (可选)
 ***************************************************/

/* Hero轮播 */
const heroSlides = document.getElementById('hero-slides');
if (heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 5000);
}

/* EmailJS整合 (若需) */
document.addEventListener('DOMContentLoaded', () => {
  // 初始化EmailJS（若CDN已引入）
  if(typeof emailjs !== 'undefined') {
    emailjs.init("HXCThZROMytOt-wyp"); // 公共密钥
  }

  const contactForm = document.getElementById("contactForm");
  if(contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Service ID: service_1ffkva1
      // Template ID: template_ypdj9n9
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
});
