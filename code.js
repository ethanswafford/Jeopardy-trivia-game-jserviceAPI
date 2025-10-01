/*Declare the starting variables*/
let answer = '';
let playerAnswer = '';
let score = 0;

/* make use of document object model to create a functional button that will fetch the next question*/
const nextButton = document.getElementById ('nextButton');
const submitButton = document.getElementById ('submitButton');
const revealButton = document.getElementById ('revealButton');
const categoryEl = document.getElementById ('category');
const questionEl = document.getElementById ('question');
const answerEl = document.getElementById ('answer');
const scoreEl = document.querySelector('.score-count');
const userInput = document.getElementById ('userAnswer');

/*chain the event listener(user clicks) and function for the API fetch query to the nextBttn */
function fetchQuestion () {
  // Hide Intro text "click next question to play"
  const introText = document.getElementById('introText');
  if (introText) {
    introText.style.display = 'none';
  }

   // Re-enable input and submit for the new question
  userInput.disabled = false;
  submitButton.disabled = false;
  userInput.value = '';

  /* API fetch request to jservice for a random trivia question is made*/
  fetch ('https://opentdb.com/api.php?amount=10')
    .then (res => {
      if (!res.ok) {
        throw new Error (`HTTP ERROR! STATUS: ${res.status}`);
      }
      return res.json ();
    })
    .then (data => {
      let questionData = data.results[0];

      answer = questionData.correct_answer;

      categoryEl.innerHTML = questionData.category + ': ';
      categoryEl.innerHTML = questionData.category;
      questionEl.innerHTML = questionData.question;
      answerEl.style.display = 'none'; // hide old answer
      userInput.value = ''; // clear input

      console.log ('Question: ', questionData.question);
      console.log ('Answer: ', answer);
    })
    .catch (err => {
      console.error ('Fetch Error: ', err);
    });
}

/* === Reveal Answer (Cheat / Give Up) === */
function revealAnswerHandler () {
  answerEl.style.display = 'block';
  answerEl.innerHTML = `Correct Answer: <b>${answer}</b>`;

  // Disable player input after button is clicked 
  userInput.disabled = true;
  submitButton.disabled = true;

  resetScore (); // if they give up, streak resets
}

/* === Submit Answer and Check Correctness === */
function submitAnswerHandler () {
  playerAnswer = userInput.value.trim ().toLowerCase ();

  if (playerAnswer === answer.toLowerCase ()) {
    score++;

    questionEl.innerHTML += "<br><span style='color: green;'>Correct!</span>";
  } else {
    questionEl.innerHTML += `<br><span style='color: red;'>Incorrect! Correct Answer was: ${answer}</span>`;
    resetScore ();
  }

  updateScore ();
}

/* === Scoreboard Functions === */
function updateScore () {
  scoreEl.textContent = score;
}

function resetScore () {
  score = 0;
  updateScore ();
}

/* === Event Listeners === */
nextButton.addEventListener('click', fetchQuestion);
submitButton.addEventListener('click', submitAnswerHandler);
revealButton.addEventListener('click', revealAnswerHandler);

/* === Start Game === */
updateScore(); // initialize score display
fetchQuestion(); // load first question
