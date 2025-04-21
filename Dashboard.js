document.addEventListener("DOMContentLoaded", () => {
    displayUsers();
});

function displayUsers() {
    const usersListDiv = document.getElementById("usersList");
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (registeredUsers.length === 0) {
        usersListDiv.textContent = "No registered users found.";
        return;
    }

    // Create a table to display user information
    const table = document.createElement("table");
    table.style.width = "100%";
    table.setAttribute("border", "1");

    // Create table header
    const headerRow = document.createElement("tr");
    const emailHeader = document.createElement("th");
    emailHeader.textContent = "Email";
    const scoresHeader = document.createElement("th");
    scoresHeader.textContent = "Quiz Scores";

    headerRow.appendChild(emailHeader);
    headerRow.appendChild(scoresHeader);
    table.appendChild(headerRow);

    // Populate the table with registered users data
    registeredUsers.forEach(user => {
        const row = document.createElement("tr");

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const scoresCell = document.createElement("td");
        if (user.quizScores) {
            let scoresHTML = "";
            // Loop through each quiz score stored for the user
            Object.keys(user.quizScores).forEach(quizTitle => {
                scoresHTML += `<strong>${quizTitle}:</strong> ${user.quizScores[quizTitle]}<br>`;
            });
            scoresCell.innerHTML = scoresHTML;
        } else {
            scoresCell.textContent = "No scores recorded";
        }
        row.appendChild(scoresCell);

        table.appendChild(row);
    });

    usersListDiv.appendChild(table);
}