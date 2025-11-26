const questionsData = [
  { q: "What does HTML stand for?", answer: "b",
    options: { a: "Hyper Trainer Marking Language", b: "Hyper Text Markup Language", c: "High Text Machine Language", d: "Hyper Tech Markup Level" }
  },
  { q: "Which language runs in a web browser?", answer: "a",
    options: { a: "JavaScript", b: "Python", c: "C++", d: "Java" }
  },
  { q: "Which company developed JavaScript?", answer: "c",
    options: { a: "Microsoft", b: "Apple", c: "Netscape", d: "Oracle" }
  },
  { q: "Which HTML tag is used for JavaScript?", answer: "d",
    options: { a: "<js>", b: "<scripted>", c: "<javascript>", d: "<script>" }
  },
  { q: "What does CSS stand for?", answer: "b",
    options: { a: "Computer Style System", b: "Cascading Style Sheets", c: "Creative Style Syntax", d: "Color System Style" }
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");

// ✅ Load saved score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
}

// ✅ Load saved progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ✅ DISPLAY QUESTIONS
questionsData.forEach((item, index) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${item.q}</p>
    ${Object.keys(item.options)
      .map(
        key => `
      <label>
        <input type="radio" name="q${index}" value="${key}"
        ${progress[index] === key ? "checked" : ""}>
        ${item.options[key]}
      </label><br>`
      )
      .join("")}
  `;
  questionsContainer.appendChild(div);
});

// ✅ Save progress when selecting an answer
document.querySelectorAll("input[type='radio']").forEach(input => {
  input.addEventListener("change", () => {
    progress[input.name.replace("q", "")] = input.value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });
});

// ✅ Submit quiz
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  questionsData.forEach((question, index) => {
    if (progress[index] === question.answer) {
      score++;
    }
  });

  scoreDisplay.textContent = `Your score is ${score} out of 5.`;

  // ✅ Save score in localStorage
  localStorage.setItem("score", score);
});
