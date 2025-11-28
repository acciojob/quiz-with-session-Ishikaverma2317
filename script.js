// ---------------------------
// QUESTIONS DATA
// ---------------------------
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
    answer: 2
  },
  {
    question: "What year was JavaScript created?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: 1
  },
  {
    question: "What is the correct full form of JSON?",
    options: ["Java Syntax Object Notation", "JavaScript Object Notation", "Java Source Oriented Notation", "None"],
    answer: 1
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ---------------------------
// LOAD PROGRESS IF EXISTS
// ---------------------------
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ---------------------------
// RENDER QUESTIONS
// ---------------------------
function displayQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");

    qDiv.innerHTML = `
      <p><b>${index + 1}. ${q.question}</b></p>
      ${q.options
        .map(
          (opt, optIndex) => `
        <label>
          <input type="radio" 
                 name="q${index}" 
                 value="${optIndex}"
                 ${savedProgress[index] == optIndex ? "checked" : ""}/>
          ${opt}
        </label><br>`
        )
        .join("")}
    `;

    questionsDiv.appendChild(qDiv);
  });

  attachListeners();
}

// ---------------------------
// SAVE USER SELECTION TO SESSION STORAGE
// ---------------------------
function attachListeners() {
  const radios = document.querySelectorAll("input[type='radio']");

  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const qIndex = e.target.name.replace("q", "");
      const option = e.target.value;

      savedProgress[qIndex] = option;

      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });
  });
}

// ---------------------------
// CALCULATE SCORE
// ---------------------------
function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
    if (savedProgress[index] == q.answer) {
      score++;
    }
  });

  return score;
}

// ---------------------------
// HANDLE SUBMIT
// ---------------------------
submitBtn.addEventListener("click", () => {
  const score = calculateScore();

  scoreDiv.innerText = `Your score is ${score} out of 5`;

  localStorage.setItem("score", score);
});

// ---------------------------
// SHOW LAST SCORE IF EXISTS
// ---------------------------
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDiv.innerText = `Your last score was ${lastScore} out of 5`;
}

// ---------------------------
// INITIAL RENDER
// ---------------------------
displayQuestions();
