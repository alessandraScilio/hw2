let currentSlide = 0;
let slideInterval;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  
  for (const slide of slides) {
    slide.classList.remove('active');
  }
  
  currentSlide = (n + slides.length) % slides.length;
  
  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startSlideShow() {
  stopSlideShow();
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

function handleNextClick() {
  nextSlide();
  startSlideShow();
}

function handlePrevClick() {
  prevSlide();
  startSlideShow();
}

function initCarousel() {
  showSlide(0);
  
  document.querySelector('.next').addEventListener('click', handleNextClick);
  document.querySelector('.prev').addEventListener('click', handlePrevClick);
  
  const slideshow = document.querySelector('.header-slideshow');
  slideshow.addEventListener('mouseenter', stopSlideShow);
  slideshow.addEventListener('mouseleave', startSlideShow);
  
  startSlideShow();
}

document.addEventListener('DOMContentLoaded', initCarousel);