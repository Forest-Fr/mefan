// Hero轮播逻辑 (简单示例)
const heroSlides = document.getElementById("hero-slides");
let currentIndex = 0;
const totalSlides = heroSlides.children.length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  heroSlides.style.transform = `translateX(-${100 * currentIndex}%)`;
}, 5000);
