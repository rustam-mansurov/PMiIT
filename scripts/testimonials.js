document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    
    // Показываем текущий отзыв
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Переключение на следующий отзыв
    function nextTestimonial() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }
    
    // Переключение на предыдущий отзыв
    function prevTestimonial() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = testimonials.length - 1;
        }
        showTestimonial(newIndex);
    }
    
    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Обработчики событий для точек
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Автоматическое переключение каждые 5 секунд
    let interval = setInterval(nextTestimonial, 5000);
    
    // Остановка автоматического переключения при наведении
    const container = document.querySelector('.testimonials-container');
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', () => {
        interval = setInterval(nextTestimonial, 5000);
    });
    
    // Инициализация первого отзыва
    showTestimonial(0);
});