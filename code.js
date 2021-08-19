/*function getGeolocationAllow(data) {
   let location = data.coords; 
}
function getGeolocationFail() {
   const fallbackLocation = { latitude: 48.8575, longitude: 2.2982 }
}
navigator.geolocation.getCurrentPosition(getGeolocationAllow, getGeolocationFail)
console.log("hello friend")*/
let answer = ""

let nextBttn = document.getElementById('nextBttn');
nextBttn.addEventListener('click', function (){
   fetch('http://jservice.io/api/random')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
        response.status);
        return;
      }

      response.json().then(function(data) {
        answer = data[0].answer;
        let category = data[0].category.title;
        let question = data[0].question;
        document.getElementById("category").innerHTML = category;
        document.getElementById("question").innerHTML = question;
        //document.getElementById("answer").innerHTML = answer;
        revealAnswerButton("click")
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

});
function revealAnswerButton(){
   document.getElementById("answer").style.display = "block";
}
revealAnswer.addEventListener('click', function(){
  document.getElementById("answer").innerHTML = answer;
})
 