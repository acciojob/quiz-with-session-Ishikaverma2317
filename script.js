const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin"],
        answer: "Paris"
    }
];

const questionsDiv = document.getElementById("questions");

questions.forEach((q, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <p>${q.question}</p>
        ${q.choices.map(choice =>
            `<label><input type="radio" name="q${index}" value="${choice}">${choice}</label><br>`
        ).join("")}
    `;

    questionsDiv.appendChild(div);
});

document.getElementById("submit").addEventListener("click", () => {
    let score = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("score").innerText = `Score: ${score}/${questions.length}`;
});
