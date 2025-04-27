import { getActiveUser, setActiveUser, getUsers, saveUsers, getQuizzes, clearActiveUser } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = getActiveUser();
    if (!user) return window.location = 'index.html';

    document.getElementById('logoutBtn').addEventListener('click', () => {
        clearActiveUser(); window.location = 'index.html';
    });
    document.getElementById('backBtn').addEventListener('click', () => history.back());

    const params = new URLSearchParams(location.search);
    const quizId = params.get('quizId');
    const quizzes = getQuizzes();
    const quiz = quizzes[quizId];
    if (!quiz) return document.querySelector('.quiz-container').innerHTML = '<h2>Quiz not found</h2>';

    document.getElementById('quizTitle').textContent = quiz.title;
    const questionsDiv = document.getElementById('questions');
    quiz.questions.slice(0, 3).forEach((q, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'question';
        wrapper.innerHTML = `<p>Q${idx + 1}: ${q.question}</p>`;
        q.options.forEach(opt => {
            const id = `q${idx}_${opt}`;
            wrapper.innerHTML += `
        <label for="${id}">
            <input type="radio" name="q${idx}" id="${id}" value="${opt}" required>
            ${opt}
        </label>`;
        });
        questionsDiv.appendChild(wrapper);
    });

    document.getElementById('quizForm').addEventListener('submit', e => {
        e.preventDefault();
        let score = 0;
        quiz.questions.slice(0, 3).forEach((q, idx) => {
            const sel = document.querySelector(`input[name="q${idx}"]:checked`);
            if (sel && sel.value === q.answer) score++;
        });
        document.getElementById('quizResult').textContent = `You scored ${score} / 3`;

        // Save score
        user.quizScores = user.quizScores || {};
        user.quizScores[quiz.title] = score;
        setActiveUser(user);

        let users = getUsers();
        users = users.map(u => u.email === user.email ? user : u);
        saveUsers(users);
    });
});
