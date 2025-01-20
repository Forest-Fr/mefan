/*************************************************** 
 * scripts.js
 * 
 * 1. Hero轮播：全屏 100vh (PC端)，自动切换
 * 2. EmailJS表单提交
 * 3. 预留更多JS功能(对比按钮、3D旋转、在线聊天) 
 ***************************************************/

/* 轮播 */
const heroSlides = document.getElementById('hero-slides');
if (heroSlides) {
  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;

  // 确保图片容器 hero-slides 的宽度可以适应所有子元素
  heroSlides.style.width = `${100 * totalSlides}%`; // 容器宽度设置为图片数量的 100%

  // 自动切换
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;  // 循环切换
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`; // 根据当前索引移动轮播图
  }, 5000);  // 每 5 秒切换一次
}

/* EmailJS */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("HXCThZROMytOt-wyp");  // 公共密钥
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

  // 1. 预留对比按钮点击事件
  const compareBtn = document.querySelector(".compare-features .btn");
  if(compareBtn) {
    compareBtn.addEventListener("click", () => {
      alert("对比功能暂未实现 (预留)！");
      // 未来可在此跳转对比页面或弹出对比Modal
    });
  }

  // 2. 预留 3D模型 or 动态推荐 logic
  // 3. 预留 在线聊天 or FAQ panel
});
