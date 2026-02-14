// Элементы
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const stickerImg = document.getElementById('stickerImg');
const questionText = document.getElementById('questionText');
const attackText = document.getElementById('attackText');
const buttonsContainer = document.getElementById('buttonsContainer');
const mainContainer = document.getElementById('mainContainer');
const successScreen = document.getElementById('successScreen');
const bgHearts = document.getElementById('bgHearts');

// Счетчик нажатий на "Нье"
let noClickCount = 0;

// Размеры кнопок
let yesSize = 1;
let noSize = 1;

// Создание фоновых сердечек
function createBackgroundHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '💞', '💓'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (10 + Math.random() * 10) + 's';
        bgHearts.appendChild(heart);
    }
}

// Обработчик нажатия на "Нье"
btnNo.addEventListener('click', function() {
    noClickCount++;
    
    // Уменьшаем кнопку "Нье" и увеличиваем "Дьа"
    noSize = Math.max(0.1, noSize - 0.2);
    yesSize = yesSize + 0.4;
    
    btnNo.style.transform = `scale(${noSize})`;
    btnYes.style.transform = `scale(${yesSize})`;
    
    // Меняем стикер на sticker2.webp после первого клика
    if (noClickCount === 1) {
        stickerImg.src = 'sticker2.webp';
        attackText.style.display = 'block';
    }
    
    // Добавляем тряску к кнопке "Нье"
    btnNo.style.animation = 'none';
    setTimeout(() => {
        btnNo.style.animation = 'shake 0.5s';
    }, 10);
    
    // Если кнопка "Нье" стала очень маленькой, скрываем её
    if (noSize <= 0.15) {
        btnNo.style.opacity = '0';
        btnNo.style.pointerEvents = 'none';
    }
    
    // Если кнопка "Дьа" стала очень большой
    if (yesSize >= 3) {
        btnYes.style.fontSize = '48px';
        btnYes.style.padding = '40px 80px';
    }
});

// Создание летящих SVG сердечек
function createFlyingHeart(x, y, svgNumber) {
    const heart = document.createElement('img');
    heart.src = `${svgNumber}.svg`;
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.width = '60px';
    heart.style.height = '60px';
    
    // Случайное отклонение для красивого разлёта
    const randomX = (Math.random() - 0.5) * 200;
    heart.style.setProperty('--randomX', randomX + 'px');
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Создание конфетти
function createConfetti(x, y) {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff69b4', '#c71585'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Случайное направление
    const randomX = (Math.random() - 0.5) * 400;
    const randomRotation = Math.random() * 720;
    confetti.style.setProperty('--randomX', randomX + 'px');
    confetti.style.setProperty('--randomRotation', randomRotation + 'deg');
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Обработчик нажатия на "Дьа"
btnYes.addEventListener('click', function(e) {
    const rect = btnYes.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Создаём множество летящих SVG сердечек
    const svgs = ['1', '2', '3'];
    const heartsCount = 30;
    
    for (let i = 0; i < heartsCount; i++) {
        setTimeout(() => {
            const svgNumber = svgs[Math.floor(Math.random() * svgs.length)];
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;
            createFlyingHeart(centerX + offsetX, centerY + offsetY, svgNumber);
        }, i * 50);
    }
    
    // Создаём конфетти
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfetti(
                centerX + (Math.random() - 0.5) * 200,
                centerY + (Math.random() - 0.5) * 200
            );
        }, i * 20);
    }
    
    // Показываем экран успеха
    setTimeout(() => {
        successScreen.style.display = 'flex';
        
        // Создаём дополнительные эффекты на экране успеха
        setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createConfetti(x, y);
        }, 200);
        
        // Летящие сердечки на фоне
        setInterval(() => {
            const svgNumber = svgs[Math.floor(Math.random() * svgs.length)];
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFlyingHeart(x, y, svgNumber);
        }, 300);
    }, 500);
});

// Анимация тряски
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(${noSize}); }
        25% { transform: translateX(-10px) scale(${noSize}); }
        75% { transform: translateX(10px) scale(${noSize}); }
    }
`;
document.head.appendChild(style);

// Инициализация
createBackgroundHearts();

// Добавляем дополнительные анимации для летящих сердечек
const flyStyle = document.createElement('style');
flyStyle.textContent = `
    @keyframes fly {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            transform: translateY(-150vh) translateX(var(--randomX, 0)) rotate(360deg) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) translateX(var(--randomX, 0)) rotate(var(--randomRotation, 720deg));
            opacity: 0;
        }
    }
`;
document.head.appendChild(flyStyle);