// Прокрутка при клике на кнопки
const ribbon = document.querySelector('.photo-ribbon');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

if (ribbon && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        ribbon.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        ribbon.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    // Прокрутка мышью/тачем
    let isDown = false;
    let startX;
    let scrollLeft;
    
    ribbon.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - ribbon.offsetLeft;
        scrollLeft = ribbon.scrollLeft;
    });
    
    ribbon.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    ribbon.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    ribbon.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - ribbon.offsetLeft;
        const walk = (x - startX) * 2;
        ribbon.scrollLeft = scrollLeft - walk;
    });
    
    // Для мобильных устройств
    ribbon.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - ribbon.offsetLeft;
        scrollLeft = ribbon.scrollLeft;
    });
    
    ribbon.addEventListener('touchend', () => {
        isDown = false;
    });
    
    ribbon.addEventListener('touchmove', (e) => {
        if(!isDown) return;
        const x = e.touches[0].pageX - ribbon.offsetLeft;
        const walk = (x - startX) * 2;
        ribbon.scrollLeft = scrollLeft - walk;
    });
}

// Модальное окно для просмотра фотографий
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("expandedImg");
const captionText = document.getElementById("imgCaption");
const closeBtn = document.querySelector(".close");

// Обработчик клика по фотографиям
document.querySelectorAll('.photo-item img').forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.nextElementSibling.innerHTML;
    // Блокируем прокрутку страницы при открытом модальном окне
    document.body.style.overflow = 'hidden';
  });
});

// Закрытие по клику на крестик
closeBtn.addEventListener('click', closeModal);

// Закрытие по клику в любом месте модального окна
modal.addEventListener('click', function(e) {
  // Закрываем только если клик не на самом изображении
  if (e.target === modal || e.target === captionText) {
    closeModal();
  }
});

// Закрытие по нажатию Esc
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
  // Восстанавливаем прокрутку страницы
  document.body.style.overflow = 'auto';
}