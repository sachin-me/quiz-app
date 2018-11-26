let displayQuestion = document.querySelector('.question');
let displayChoice = document.querySelector('.choice');
let choiceWrapper = document.querySelector('.quiz-wrapper');
let category = document.querySelector('.category-div');
let questionStatus = document.querySelector('.question-status');

class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  checkAnswer(e) {
    let count = 0;
    if (this.quizList[this.currentIndex].answer == this.quizList[this.currentIndex].choices[e.target.dataset.id]) {
      count += this.score++;
      console.log(`Your score is ${count}`);
      return count;
    } else if (this.quizList[this.currentIndex].answer != this.quizList[this.currentIndex].choices[e.target.dataset.id]) {
      return `Sorry, Something's wrong!!!`;
    }
  }
}
class Quiz extends Question {
  constructor(quizList, text, choices, answer) {
    super(text, choices, answer);
    this.score = 0;
    this.currentIndex = 0;
    this.quizList = quizList;
  }
  displayQuestions() {
    if ((this.quizList).length == this.currentIndex) {
      displayQuestion.style.display = 'none';
      questionStatus.style.display = 'none';
      return displayChoice.innerHTML = `
        <div class="score">Your score is: ${this.score}</div>
      `;
    } else {
      displayQuestion.innerHTML = `${this.quizList[this.currentIndex].text} ?`;
      displayChoice.innerHTML  = `
      <li data-id="${0}">${this.quizList[this.currentIndex].choices[0]}</li>
      <button class="submit-btn" data-id="${0}">Submit</button>
      <li data-id="${1}">${this.quizList[this.currentIndex].choices[1]}</li>
      <button class="submit-btn" data-id="${1}">Submit</button>
      `
      questionStatus.innerText = `
        Question ${this.currentIndex + 1} out of ${(this.quizList).length}
      `
    }
    JSON.parse(localStorage.getItem('list'));
  }
  displayCategory() {
    choiceWrapper.innerHTML = `
      <div class="category-div">
        <button class="category-btn" data-id="${0}">General Knowledge</button>
        <button class="category-btn" data-id="${1}">Science</button>
      </div>
    `;
  }
}

var generalKnowledge = [
  new Question('who is the Current CEO of Google', ['Sundar Pichai', 'Tim Cook'], 'Sundar Pichai'),
  new Question('who is the national father of india', ['Stephen Hawkins', 'Mahatma Gandhi'], 'Mahatma Gandhi'),
  new Question('where is the biggest statue in world', ['Switzerland', 'India'], 'India'),
  new Question('where is the bussiest port in world', ['Manchester', 'New York'], 'New York'),
  new Question('where is the longest railway platform in Asia', ['Gorakhpur (India)', 'Kollam (India)'], 'Gorakhpur (India)')
];

var science = [
  new Question('Who is honored as Father of Modern Chemistry', ['Antoine Lavoisier', 'RatherFord'], 'Antoine Lavoisier'),
  new Question(" Which is the most abundant gas in the earth's atmosphere", ['Nitrogen', 'Oxygen'], 'Nitrogen'),
  new Question("Which gases cause acid rain", ['Carbon dioxide, Chloro Floro Carbon' ,'Sulphur dioxide, Nitrogen oxides'], 'Sulphur dioxide, Nitrogen oxides'),
  new Question("Which metal is used in the making of microchips", ['Silicon', 'Iron'], 'Silicon'),
  new Question("Which type of plastics can be recycled", ['Thermoplastics', 'Thermosetting plastics'], 'Thermoplastics')
];

localStorage.setItem('list', JSON.stringify(generalKnowledge));


var q2 =  new Quiz(generalKnowledge ,'who is the pm of india', ['Narendra Modi', 'Rahul Gandhi'], 'Narendra Modi');
q2.displayCategory();

displayChoice.addEventListener("click", q2.checkAnswer.bind(q2))

var q3 = new Quiz(science, 'Who is honored as Father of Modern Chemistry', ['Antoine Lavoisier', 'RatherFord'], 'Antoine Lavoisier');
q3.displayCategory();

displayChoice.addEventListener("click", q3.checkAnswer.bind(q3))

choiceWrapper.addEventListener('click', function(e) {
  if (e.target.dataset.id == 0) {
    displayChoice.addEventListener('click', function(e) {
      if (e.target.classList.contains('submit-btn')) {
        q2.currentIndex++;
        q2.displayQuestions();
      }
    })
    q2.displayQuestions();
  } if (e.target.dataset.id == 1) {
    displayChoice.addEventListener("click", function(e) {
      if (e.target.classList.contains('submit-btn')) {
        q3.currentIndex++;
        q3.displayQuestions();
      }
    })
    q3.displayQuestions();
  }
})

