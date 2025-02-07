const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
    });

    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

setInterval(showTestimonial, 3000); 