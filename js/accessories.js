// Women's Accessories — interaction layer

document.addEventListener('DOMContentLoaded', () => {

    // Fade-in reveal for each catalog block as it scrolls into view
    const blocks = document.querySelectorAll('.cat-block');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    blocks.forEach(block => {
        block.classList.add('reveal');
        observer.observe(block);
    });

    // Highlight the nav link that matches the section in view
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = ['home-section', 'catalog']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => navObserver.observe(section));

    // Fade each product image in once it finishes loading
    const chipImages = document.querySelectorAll('.chip-img');
    chipImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => { img.style.opacity = '0.15'; });
        }
    });

});