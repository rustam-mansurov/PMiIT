document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner");
  
  // Инициализация математических символов на фоне
  initMathBackground();
});
// Скроллим наверх сразу при начале загрузки
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// И при полной загрузке страницы
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  // Небольшая задержка на случай если что-то подгружается
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

// И после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
});
function initMathBackground() {
  const symbols = [
    "∫", "∑", "∏", "∂", "∇", "√", "∞", "π", "≈", "≠", "≤", "≥", "Λ", "Ω" , "Ψ"
  ];
const colors = [
  "#4A90E2", "#50E3C2", "#417505", "#F5A623", "#D0021B", "#7ED321",
  "#8B572A", "#B8E986", "#4A4A4A", "#9B9B9B"
];
  
  const banner = document.getElementById("banner");
  const bannerRect = banner.getBoundingClientRect();

  // Очищаем предыдущие символы (если есть)
  const existingSymbols = banner.querySelectorAll('.math-symbol');
  existingSymbols.forEach(symbol => symbol.remove());

  for (let i = 0; i < 40; i++) {
    const symbol = document.createElement("div");
    symbol.className = "math-symbol";
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Случайный цвет из массива
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    symbol.style.color = randomColor;
    
    // Используем пиксельные значения вместо процентов
    const left = Math.random() * (bannerRect.width - 40); // -40 чтобы не вылезали за край
    const top = Math.random() * (bannerRect.height - 40);
    
    symbol.style.left = `${left}px`;
    symbol.style.top = `${top}px`;
    symbol.style.transform = `rotate(0deg)`;
	symbol.style.color = "black";
    symbol.style.opacity = 0.2; // opacity от 0.1 до 0.5
    symbol.style.fontSize = `${30}px`; // размер от 20 до 45px
	symbol.style.zIndex = "-1";    
    banner.appendChild(symbol);
    
    // Запускаем анимацию для этого символа
    animateMathSymbol(symbol);
  }
}

function animateMathSymbol(symbol) {
  const banner = document.getElementById("banner");
  const bannerRect = banner.getBoundingClientRect();
  
  // Начальные позиции в пикселях
  let x = parseFloat(symbol.style.left);
  let y = parseFloat(symbol.style.top);
  let rotation = parseFloat(symbol.style.transform.replace('rotate(', '').replace('deg)', ''));
  
  // Случайная скорость
  let speedX = (Math.random() - 0.5) * 1.2;
  let speedY = (Math.random() - 0.5) * 1.2;
  const rotationSpeed = (Math.random() - 0.5) * 0.6;
  
  function animate() {
    if (!document.body.contains(symbol)) {
      return; // Прекращаем анимацию если элемент удален
    }
    
    // Обновляем позицию
    x += speedX;
    y += speedY;
    rotation += rotationSpeed;
    
    // Получаем текущий размер символа
    const symbolWidth = symbol.offsetWidth;
    const symbolHeight = symbol.offsetHeight;
    
    // Проверяем границы баннера
    if (x <= 0 || x + symbolWidth >= bannerRect.width) {
      speedX = -speedX * 0.95;
      x = Math.max(0, Math.min(bannerRect.width - symbolWidth, x));
    }
    
    if (y <= 0 || y + symbolHeight >= bannerRect.height) {
      speedY = -speedY * 0.95;
      y = Math.max(0, Math.min(bannerRect.height - symbolHeight, y));
    }
    
    // Применяем новые значения
    symbol.style.left = `${x}px`;
    symbol.style.top = `${y}px`;
    
    // Продолжаем анимацию
    requestAnimationFrame(animate);
  }
  
  // Запускаем анимацию
  animate();
}

// Функция для пересчета позиций при изменении размера окна
function handleResize() {
  const banner = document.getElementById("banner");
  const symbols = banner.querySelectorAll('.math-symbol');
  const bannerRect = banner.getBoundingClientRect();
  
  symbols.forEach(symbol => {
    // Пересчитываем позиции относительно нового размера баннера
    const currentLeft = parseFloat(symbol.style.left);
    const currentTop = parseFloat(symbol.style.top);
    
    // Сохраняем пропорции
    symbol.style.left = `${Math.min(currentLeft, bannerRect.width - symbol.offsetWidth)}px`;
    symbol.style.top = `${Math.min(currentTop, bannerRect.height - symbol.offsetHeight)}px`;
  });
}

// Обработчик изменения размера окна
window.addEventListener('resize', handleResize);

// Перезапуск анимации каждые 3 минуты
setInterval(() => {
  initMathBackground();
}, 180000);