/***************************************************
 * scripts.js
 * 用于 MeFan 网站的核心脚本
 * -----------------------------------------------
 * 1. Hero轮播 (电脑端/移动端)
 * 2. EmailJS表单提交
 ***************************************************/

/* 英文注释仅示例，如需中文可自行替换 */

// Hero轮播：自动每5秒切换
const heroSlides = document.getElementById('hero-slides');
if (heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 5000);
}

/* EmailJS整合：公共密钥 + Service/Template ID (可选) */
/* 仅当在 contact.html 中引入了 emailjs-com CDN 并给 form加id=contactForm */
document.addEventListener('DOMContentLoaded', () => {
  // 初始化EmailJS（若不需要可删除此块）
  if (typeof emailjs !== 'undefined') {
    emailjs.init("HXCThZROMytOt-wyp"); // 您给的公共密钥
  }

  const contactForm = document.getElementById("contactForm");
  if(contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Service ID: service_1ffkva1
      // 发送邮件模板: template_ypdj9n9
      // (若接收邮件模板另有设置，也可改)
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
