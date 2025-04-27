import { getActiveUser, clearActiveUser, getQuizzes } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = getActiveUser();
    if (!user) return window.location = 'index.html';

    document.getElementById('userName').textContent = `Hello, ${user.email}`;
    document.getElementById('logoutBtn').addEventListener('click', () => {
        clearActiveUser();
        window.location = 'index.html';
    });

    const list = document.getElementById('quizList');
    const quizzes = getQuizzes();
    if (!quizzes.length) {
        list.textContent = 'No quizzes available.';
    } else {
        quizzes.forEach((q, i) => {
            const div = document.createElement('div');
            div.className = 'quiz-item';
            div.textContent = q.title;
            div.addEventListener('click', () => {
                window.location = `quiz.html?quizId=${i}`;
            });
            list.appendChild(div);
        });
    }
});
