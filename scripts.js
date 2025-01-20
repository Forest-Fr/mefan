// 弹出框显示与隐藏功能
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

// 恢复表单的邮件发送逻辑
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
});
