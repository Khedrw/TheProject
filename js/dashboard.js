import { getActiveUser, clearActiveUser, getUsers } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const admin = getActiveUser();
    if (!admin || admin.email !== 'admin@quiz.com') {
        return window.location = 'index.html';
    }
    document.getElementById('logoutBtn').addEventListener('click', () => {
        clearActiveUser(); window.location = 'index.html';
    });

    const tbody = document.querySelector('#usersTable tbody');
    const users = getUsers();
    users.forEach(u => {
        const tr = document.createElement('tr');
        const tdEmail = document.createElement('td');
        tdEmail.textContent = u.email;
        const tdScores = document.createElement('td');
        tdScores.innerHTML = u.quizScores
            ? Object.entries(u.quizScores)
                .map(([t, s]) => `<strong>${t}:</strong> ${s}`).join('<br>')
            : '–';
        tr.append(tdEmail, tdScores);
        tbody.append(tr);
    });
});
