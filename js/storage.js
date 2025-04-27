// Helpers for localStorage
export function getUsers() {
    return JSON.parse(localStorage.getItem('registeredUsers')) || [];
}
export function saveUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}
export function getActiveUser() {
    return JSON.parse(localStorage.getItem('activeUser'));
}
export function setActiveUser(user) {
    localStorage.setItem('activeUser', JSON.stringify(user));
}
export function clearActiveUser() {
    localStorage.removeItem('activeUser');
}
export function getQuizzes() {
    return JSON.parse(localStorage.getItem('quizzes')) || [];
}
export function initQuizzes(data) {
    localStorage.setItem('quizzes', JSON.stringify(data));
}
