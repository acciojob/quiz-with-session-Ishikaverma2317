

// Load saved progress (if any)
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// References
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Render quiz with restored selections
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const questionObj = questions[i];

    const questionDiv = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = questionObj.question;
    questionDiv.appendChild(qText);

    // Create answer options
    questionObj.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore checked value
      if (savedProgress[i] === choice) input.checked = true;

      // Save progress to session storage whenever user selects an option
      input.addEventListener("change", () => {
        savedProgress[i] = input.value;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionDiv.appendChild(input);
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// Submit button logic
submitBtn.addEventListener("click", () => {
  let score = 0;

  // Count correct answers
  for (let i = 0; i < questions.length; i++) {
    if (savedProgress[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});


