document.addEventListener("DOMContentLoaded", () => {
    setupAuthTabs();
    handleRegistration();
    handleLogin();
    displayQuizList();
    loadQuizPage();
});

// Function to toggle between login and registration pages
function setupAuthTabs() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Ensure elements exist on the page (some pages may not contain all elements)
    if (loginTab && registerTab && loginForm && registerForm) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }
}

// Function to handle the registration form
function handleRegistration() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('The two passwords do not match!');
            return;
        }

        // Load the list of registered users or initialize it as an empty array if it doesn't exist
        let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Check if the email is already registered
        const exists = registeredUsers.some(user => user.email === email);
        if (exists) {
            alert('This email is already registered!');
            return;
        }

        // Add the new user to the list
        registeredUsers.push({ email, password });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        alert('Registered successfully!');
        registerForm.reset();
    });
}

// Function to handle the login form
function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const foundUser = registeredUsers.find(user => user.email === email);

        if (!foundUser) {
            alert('This email is not registered!');
            return;
        }
        if (foundUser.password !== password) {
            alert('Incorrect password!');
            return;
        }

        // Save the user data as the active user
        localStorage.setItem('activeUser', JSON.stringify(foundUser));
        alert('You have successfully logged in!');
        loginForm.reset();

        // Redirect based on whether the user is admin or not
        if (foundUser.email === "admin@quiz.com" && foundUser.password === "admin123") {
            window.location.href = 'dashboard.html'; // Admin Dashboard
        } else {
            window.location.href = 'home.html'; // Regular User Home
        }
    });
}

// Function to display the list of quizzes on the home page
function displayQuizList() {
    const listOfQuizzes = document.getElementById("listOfQuizzes");
    if (!listOfQuizzes) return;

    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    if (quizzes.length === 0) {
        listOfQuizzes.textContent = "There are no tests currently available.";
        return;
    }

    quizzes.forEach((quiz, index) => {
        const quizDiv = document.createElement("div");
        quizDiv.className = "quiz-item";
        quizDiv.textContent = `Quiz ${index + 1}: ${quiz.title}`;
        quizDiv.addEventListener("click", () => {
            window.location.href = `quiz.html?quizId=${index}`;
        });
        listOfQuizzes.appendChild(quizDiv);
    });
}

// Function to handle the quiz page
function loadQuizPage() {
    // Ensure the quiz form exists on the page (also ensure quiz elements exist)
    const quizForm = document.getElementById("quizForm");
    if (!quizForm) return;

    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const quiz = quizzes[quizId];

    if (!quiz) {
        document.body.innerHTML = "<h1>Quiz not found</h1>";
        return;
    }

    // Set the quiz title
    document.getElementById("quizTitle").textContent = quiz.title;
    const questions = quiz.questions.slice(0, 3);
    const quizQuestionsDiv = document.getElementById("quizQuestions");

    // Create question display and answer options
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        const questionText = document.createElement("p");
        questionText.textContent = `Q${index + 1}: ${q.question}`;
        questionDiv.appendChild(questionText);

        q.options.forEach(option => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = option;
            input.required = true;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));

            const optionDiv = document.createElement("div");
            optionDiv.appendChild(label);
            questionDiv.appendChild(optionDiv);
        });

        quizQuestionsDiv.appendChild(questionDiv);
    });

    // Handle quiz submission and score calculation
    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });

        // Display the quiz result to the user
        const quizResultDiv = document.getElementById("quizResult");
        quizResultDiv.textContent = `You scored ${score} out of ${questions.length}`;

        // Retrieve active user data
        const activeUser = JSON.parse(localStorage.getItem("activeUser"));
        if (activeUser) {
            // Add quizScores property to the user if it doesn't exist
            if (!activeUser.quizScores) {
                activeUser.quizScores = {};
            }
            // Save the quiz result using quizId as the key
            activeUser.quizScores[quizId] = score;
            // Update active user data in localStorage
            localStorage.setItem("activeUser", JSON.stringify(activeUser));

            // Update the user's account in the registered users list
            let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            registeredUsers = registeredUsers.map(user => {
                if (user.email === activeUser.email) {
                    if (!user.quizScores) {
                        user.quizScores = {};
                    }
                    user.quizScores[quiz.title] = score;
                }
                return user;
            });
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        } else {
            alert("User not logged in. Score not saved.");
        }
    });
}