let lineTXT = document.querySelector('.line__txt');
let position = 0
window.addEventListener('scroll', function() {
    let scrollStep = window.scrollY/8
    lineTXT.style.transform = `translateX(${-scrollStep}px)` 
});
function openModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('registerModal').style.display = 'none';
}


window.onclick = function(event) {
    const modal = document.getElementById('registerModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Форма отправлена!");
    closeModal();
});


const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
    });

    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

setInterval(showTestimonial, 3000); 



let lineTXT2 = document.querySelector('.line__txt2');
let position2 = 0
window.addEventListener('scroll', function() {
    let scrollStep2 = window.scrollY/8
    lineTXT2.style.transform = `translateX(${scrollStep2}px)` 
})

const toggleButtons = document.querySelectorAll('.toggle-button');


toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        const hiddenText = button.previousElementSibling;

        
        hiddenText.classList.toggle('visible');

        
        if (hiddenText.classList.contains('visible')) {
            button.textContent = 'Скрыть'; 
        } else {
            button.textContent = 'Показать больше'; 
        }
    });
});



const menuToggle = document.getElementById('mobile-menu');
        const navbar = document.querySelector('.navbar ul');

        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

const boxes = document.querySelectorAll('.main__box');


boxes.forEach(box => {
    const img = box.querySelector('img');
    const arrow = box.querySelector('.arrow');

    
    img.addEventListener('click', () => {
        box.classList.toggle('active');
    });

    
    arrow.addEventListener('click', () => {
        box.classList.toggle('active');
    });
});




