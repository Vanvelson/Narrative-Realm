// Плавна прокрутка до розділів
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анімація кнопок
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Скоро тут з`явиться більше інформації про книгу!');
    });
});

// Додавання ефекту появи карток при скролі
const cards = document.querySelectorAll('.tip-card, .book-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});