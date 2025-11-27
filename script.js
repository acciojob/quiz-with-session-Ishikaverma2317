// Correct answers
const correctAnswers = ["Delhi", "4", "JavaScript", "Hyper Text Markup Language", "Styling"];

// Load progress if available
window.onload = () => {
    const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

    // Restore selected answers
    Object.keys(savedProgress).forEach(q => {
        const value = savedProgress[q];
        const selector = `input[name="${q}"][value="${value}"]`;
        const option = document.querySelector(selector);
        if (option) option.checked = true;
    });

    // Load last score if exists
    const lastScore = localStorage.getItem("score");
    if (lastScore !== null) {
        document.getElementById("score").textContent =
            `Your score is ${lastScore} out of 5.`;
    }
};

// Save progress in sessionStorage
document.querySelectorAll("input[type='radio']").forEach(input => {
    input.addEventListener("change", () => {
        let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

        progress[input.name] = input.value;

        sessionStorage.setItem("progress", JSON.stringify(progress));
    });
});

// Submit button
document.getElementById("submit").addEventListener("click", () => {
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    let score = 0;

    correctAnswers.forEach((ans, index) => {
        if (progress[`q${index}`] === ans) {
            score++;
        }
    });

    // Display score
    document.getElementById("score").textContent =
        `Your score is ${score} out of 5.`;

    // Save score in localStorage
    localStorage.setItem("score", score);
});
