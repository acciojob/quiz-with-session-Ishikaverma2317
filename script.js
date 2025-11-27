describe("Checking questions", () => {

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
      question: "2 + 2 = ?",
      choices: ["3", "4", "5", "6"]
    },
    {
      question: "What color is the sky?",
      choices: ["Blue", "Green", "Red", "Yellow"]
    },
    {
      question: "Which animal barks?",
      choices: ["Cat", "Dog", "Cow", "Sheep"]
    },
    {
      question: "HTML stands for?",
      choices: [
        "HyperText Markup Language",
        "HighText Makeup Language",
        "Hyperloop Machine Learning",
        "Home Tool Markup Language"
      ]
    }
  ];

  it("Checking questions", () => {
    cy.visit("/main.html"); // Base URL check

    cy.get("#questions > div")
      .should("have.length", 5);

    // 👉 CHECK EACH QUESTION
    cy.get("#questions > div").each((sele, index) => {
      cy.wrap(sele)
        .within(() => {
          cy.get("p")
            .invoke("text")
            .then(text => text.trim())       // ⭐ FIXED: REMOVE \n and spaces
            .should("equal", questions[index].question);

          // 👉 CHECK OPTIONS
          cy.get("input").each((input, i) => {
            cy.wrap(input)
              .invoke("val")
              .should("equal", questions[index].choices[i]);
          });
        });
    });

    // 👉 SUBMIT BUTTON SHOULD BE EMPTY BEFORE SUBMIT
    cy.get("#score").should("be.empty");

  });

});
