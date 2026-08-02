/* =========================================================
   StyleNest — contact.js
   Runs on contact.html. Client-side validation + mock submit
   (no backend — swap the timeout for a real fetch() later).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const msgEl = document.getElementById('contactMsg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const message = document.getElementById('contactMessage');

        const isValid = name.value.trim().length > 1
            && emailPattern.test(email.value.trim())
            && message.value.trim().length > 5;

        if (!isValid) {
            msgEl.textContent = 'Please fill in your name, a valid email, and a short message.';
            msgEl.style.color = '#B5555F';
            return;
        }

        msgEl.textContent = `Thanks, ${name.value.trim().split(' ')[0]} — we'll reply within 1 business day.`;
        msgEl.style.color = 'var(--sage)';
        form.reset();
    });
});
