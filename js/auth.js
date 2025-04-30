import {
    getUsers, saveUsers, getActiveUser,
    setActiveUser, clearActiveUser
} from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('auth.js loaded, setting up tabs');  

    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;            
            console.log('tab clicked:', target);         

            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`${target}Form`).classList.add('active');
        });
    });

// Registration
document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.registerEmail.value.trim();
    const pw = e.target.registerPassword.value;
    const pw2 = e.target.registerConfirmPassword.value;
    const err = document.getElementById('registerError');
    err.textContent = '';

    if (pw !== pw2) { err.textContent = 'Passwords do not match.'; return; }
    let users = getUsers();
    if (users.some(u => u.email === email)) {
        err.textContent = 'Email already registered.'; return;
    }
    users.push({ email, password: pw });
    saveUsers(users);
    err.textContent = 'Registered successfully!';
    e.target.reset();
});

// Login
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.loginEmail.value.trim();
    const pw = e.target.loginPassword.value;
    const err = document.getElementById('loginError');
    err.textContent = '';

    const users = getUsers();
    const user = users.find(u => u.email === email);
    if (!user) { err.textContent = 'Email not found.'; return; }
    if (user.password !== pw) { err.textContent = 'Incorrect password.'; return; }

    setActiveUser(user);
    // Redirect
    if (email === 'admin@quiz.com' && pw === 'admin123') {
        window.location = 'dashboard.html';
    } else {
        window.location = 'home.html';
    }
});

// Auto-logout if already logged in on auth page
if (getActiveUser()) {
    clearActiveUser();
}
});
