/***************************************************
 * scripts.js
 * -----------------------------------------------
 * 1. Hero轮播: hero高度100vh, 图片全屏铺满
 * 2. EmailJS表单提交 (可选)
 ***************************************************/

const heroSlides = document.getElementById('hero-slides');
if (heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 5000);
}

/* EmailJS整合 */
document.addEventListener('DOMContentLoaded', () => {
  if(typeof emailjs !== 'undefined') {
    emailjs.init("HXCThZROMytOt-wyp");
  }
  const contactForm = document.getElementById("contactForm");
  if(contactForm) {
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
});
