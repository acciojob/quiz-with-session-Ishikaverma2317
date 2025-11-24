// --- Restore progress from session storage ---
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// DOM elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before rendering again

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    const questionDiv = document.createElement("div");
    questionDiv.textContent = q.question;

    q.choices.forEach(choice => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // restore selection
      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      // save to sessionStorage when user selects
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      questionDiv.appendChild(input);
      questionDiv.appendChild(document.createTextNode(choice));
    });

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// Submit button logic
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // save score to localStorage
  localStorage.setItem("score", score);
});
