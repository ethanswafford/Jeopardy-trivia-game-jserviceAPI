/*Declare the starting variables*/
let playerAnswer = "";
let currentScore = "0";

/* make use of document object model to create a functional button that will fetch the next question*/
const nextButton = document.getElementById('nextButton');
const submitAnswer = document.getElementById('submitButton');
const revealAnswer = document.getElementById('revealButton');

/*chain the event listener(user clicks) and function for the API fetch query to the nextBttn */
nextBttn.addEventListener('click', function () {
  
  
  /* API fetch request to jservice for a random trivia question is made*/
  fetch('https://opentdb.com/api.php?amount=10')

    .then(res => res.json())
    .then(data => {
      let question = data.results[0].question;
      let answer = data.results[0].correctAnswer;
      console.log("Q", question);
      console.log("A", answer);
    });
  
     /*if a problem occurs with the request it is logged to the console with a status code */
    function inspectApiResponse(response) {
      if (res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        console.log("API response from opentdb.com: ", data);
        console.log("Trivia question: ", data.results[0].question);
        console.log("What is: ", data.results[0].correctAnswer);
        return;
      };

         
         /* if the fetch request is fulfilled without error the response is parsed into json and used to build out the content for the game
         the category of the question and the question itself is displayed on the page through the DOM*/
      response.json().then(function(data) {
        answer = data[0].answer;
        let category = data[0].category.title;
        let question = data[0].question;
        document.getElementById("category").innerHTML = category;
        document.getElementById("question").innerHTML = question;

        /*this is going to be a cheaters button, or a "i give up button" and will reveal the answer without rendering any points
        for the player and effectively restarting the game */
        //document.getElementById("answer").innerHTML = answer;
        revealAnswerButton("click")

        /*this is an area for user input where the player will tyoe their answer in and click a button to submit. The players answers should
        be compared against the embedded answer and determined if the player was correct
        or incorrect, the players answer should be automatically uppercased or lowercased to
        to match casing of the returned answer from the jservice api before comparison and determination
        of a correct or incorrect answer is made*/

        /* i need a text box displayed on the page that actually captures the playerAnswer and saves it as 
        a variable for comparison to the api returned answer*/
        submitAnswerButton("click")
      });
    }
  )
     
     /* this is a catch function for technical errors (i think....its been a couple years i could be worng here)*/
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

/* function to revealAnswerButton and display the answer on the html document and build the scoreboard, i believe i was running into 
some bugs here andd was kinda hung up at this point on how to make the game function like i envisioned it, i do remember this is where
i was getting stumped and kinda lost in the code and running out of time to finish the assignment and submit my code and final pushes
to github, this was a stressful time for me :( */
function revealAnswerButton(){
  document.getElementById("answer").style.display = "block";
  revealAnswer.addEventListener('click', function(){
  let revealAnswer =document.getElementById("answer").innerHTML = answer;
  document.getElementById("score").innerHTML = score;
  score.innerHTML = '<div id="score"><b> STREAK:0 </b><span class="score-count"></span></div>';
  document.getElementById("nextBttn").innerHTML = '<div id="nextBttn">Reset Game</div>'
  nextBttn.addEventListener('click', function(){ 
    location.reload() 
    // can i some how reset the game to the initial browser screen here?
  })
})
}

/* the function to capture playerAnswer or userAnswer and compare to the real answer
maybe my mistake was less in the syntax and functionality of the code and more simply in the ordering of the code,
perhaps this function should be above the revealAnswerButton function? */
function submitAnswerButton(){
  document.getElementById("submit").innerHTML = submit;
  let userAnswer = document.getElementsByName("userAnswer").value
  document.getElementById('submit').addEventListener('click', function(){
    if (userAnswer.value.toString().toLowerCase() === data[0].answer.value) {
      document.createElementById("div").innerHTML = "Correct!"
   } else{
     document.createElementById("div").innerHTML = "Incorrect!"
     } 
  document.getElementById("score").innerHTML = score;
  score.innerHTML = '<div id="score"><b> STREAK:0 </b><span class="score-count"></span></div>';
 //userAnswer to answer=data[].answer boolean maybe? or player-answer === answer?
 //assign +1 to score for correct submitAnswerButton clicks, else reset score to 0 on userSubmit clicks 
  })
};

 