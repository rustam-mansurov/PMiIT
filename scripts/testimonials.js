document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существуют ли необходимые элементы на странице
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;

    // Получаем все элементы слайдера
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    // Если нет отзывов или элементов управления - выходим
    if (testimonials.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let autoSlideInterval;

    // Основная функция показа отзыва
    function showTestimonial(index) {
        // Проверка на валидность индекса
        if (index < 0 || index >= testimonials.length) return;
        
        // Сбрасываем активные элементы
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.opacity = '0';
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Плавное появление нового отзыва
        setTimeout(() => {
            testimonials[index].classList.add('active');
            testimonials[index].style.opacity = '1';
            dots[index].classList.add('active');
            currentIndex = index;
            
            // Прокрутка к активному отзыву (для мобильных устройств)
            testimonials[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }, 50);
    }

    // Следующий отзыв
    function nextTestimonial() {
        const newIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(newIndex);
    }

    // Предыдущий отзыв
    function prevTestimonial() {
        const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(newIndex);
    }

    // Инициализация точек навигации
    function initDots() {
        dots.forEach((dot, index) => {
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', function() {
                const dotIndex = parseInt(this.getAttribute('data-index'));
                if (!isNaN(dotIndex)) {
                    showTestimonial(dotIndex);
                    resetAutoSlide();
                }
            });
        });
    }

    // Автоматическое перелистывание
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 500000000);
    }

    // Сброс автоматического перелистывания
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Инициализация событий
    function initEvents() {
        // Обработчики для кнопок
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetAutoSlide();
        });
        
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetAutoSlide();
        });
        
        // Остановка при наведении
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Обработка касаний для мобильных устройств
        testimonialsContainer.addEventListener('touchstart', () => {
            clearInterval(autoSlideInterval);
        }, { passive: true });
        
        testimonialsContainer.addEventListener('touchend', () => {
            startAutoSlide();
        }, { passive: true });
    }

    // Добавляем поддержку клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
            resetAutoSlide();
        }
    });

    // Инициализация
    initDots();
    initEvents();
    showTestimonial(0);
    startAutoSlide();

    // Адаптация при изменении размера окна
    window.addEventListener('resize', () => {
        showTestimonial(currentIndex);
    });
});