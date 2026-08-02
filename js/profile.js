/* =========================================================
   StyleNest — profile.js
   Runs on profile.html. Switches between account panels and
   prefills the details form from the mock sn_user session.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.account-nav-item[data-panel]');
    if (navItems.length === 0) return;

    /* ---------- Greeting + prefill from mock session ---------- */
    let user = null;
    try { user = JSON.parse(localStorage.getItem('sn_user')); } catch { }

    const greeting = document.getElementById('greeting');
    if (user && user.name) {
        greeting.textContent = `Hello, ${user.name.split(' ')[0]}.`;
        document.getElementById('profileName').value = user.name;
        document.getElementById('profileEmail').value = user.email || '';
    } else {
        greeting.textContent = 'Hello, guest.';
    }

    /* ---------- Panel switching ---------- */
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            document.querySelectorAll('.account-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(`panel-${item.dataset.panel}`).classList.add('active');
        });
    });

    /* ---------- Save details ---------- */
    const detailsForm = document.getElementById('detailsForm');
    detailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('profileName').value.trim();
        const email = document.getElementById('profileEmail').value.trim();
        localStorage.setItem('sn_user', JSON.stringify({ name, email }));
        if (window.SN) window.SN.toast('Account details saved.');
        if (name) greeting.textContent = `Hello, ${name.split(' ')[0]}.`;
    });

    document.getElementById('saveSizing').addEventListener('click', () => {
        if (window.SN) window.SN.toast('Size profile saved.');
    });

    /* ---------- Sign out ---------- */
    document.getElementById('signOutBtn').addEventListener('click', () => {
        localStorage.removeItem('sn_user');
        if (window.SN) window.SN.toast('Signed out.');
        setTimeout(() => { window.location.href = 'login.html'; }, 700);
    });
});