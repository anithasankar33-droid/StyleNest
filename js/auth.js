/* =========================================================
   StyleNest — auth.js
   Runs on login.html and signup.html. Client-side validation
   only (no real backend) — stores a mock session in
   localStorage so profile.html/orders.html can greet the user.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Show / hide password ---------- */
    document.querySelectorAll('.toggle-pass').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            btn.textContent = isHidden ? 'Hide' : 'Show';
        });
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setSession(name, email) {
        localStorage.setItem('sn_user', JSON.stringify({ name, email }));
    }

    /* ---------- Login form ---------- */
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            const emailError = document.getElementById('loginEmailError');
            const passError = document.getElementById('loginPasswordError');

            let valid = true;
            email.classList.remove('invalid');
            password.classList.remove('invalid');
            emailError.textContent = '';
            passError.textContent = '';

            if (!emailPattern.test(email.value.trim())) {
                email.classList.add('invalid');
                emailError.textContent = 'Enter a valid email address.';
                valid = false;
            }
            if (password.value.length < 6) {
                password.classList.add('invalid');
                passError.textContent = 'Password must be at least 6 characters.';
                valid = false;
            }
            if (!valid) return;

            setSession(email.value.split('@')[0], email.value.trim());
            if (window.SN) window.SN.toast('Signed in — welcome back.');
            setTimeout(() => { window.location.href = 'profile.html'; }, 900);
        });
    }

    /* ---------- Signup form ---------- */
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const passwordInput = document.getElementById('signupPassword');
        const meter = document.getElementById('strengthMeter');
        const strengthLabel = document.getElementById('strengthLabel');

        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            let score = 0;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val) && val.length >= 10) score++;

            meter.classList.remove('weak', 'medium', 'strong');
            if (val.length === 0) { strengthLabel.textContent = 'Password strength'; }
            else if (score <= 1) { meter.classList.add('weak'); strengthLabel.textContent = 'Weak'; }
            else if (score === 2) { meter.classList.add('medium'); strengthLabel.textContent = 'Medium'; }
            else { meter.classList.add('strong'); strengthLabel.textContent = 'Strong'; }
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName');
            const email = document.getElementById('signupEmail');
            const emailError = document.getElementById('signupEmailError');
            const terms = document.getElementById('agreeTerms');

            let valid = true;
            email.classList.remove('invalid');
            emailError.textContent = '';

            if (!emailPattern.test(email.value.trim())) {
                email.classList.add('invalid');
                emailError.textContent = 'Enter a valid email address.';
                valid = false;
            }
            if (passwordInput.value.length < 8) {
                passwordInput.classList.add('invalid');
                valid = false;
            }
            if (!terms.checked) {
                valid = false;
                if (window.SN) window.SN.toast('Please accept the Terms to continue.');
            }
            if (!valid) return;

            setSession(name.value.trim(), email.value.trim());
            if (window.SN) window.SN.toast('Account created — welcome to StyleNest.');
            setTimeout(() => { window.location.href = 'profile.html'; }, 900);
        });
    }
});