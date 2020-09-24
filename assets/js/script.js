let highScores; // array of high scores; stored as [xx-nn, xx-nn, xx-nn]
let quizSelections = []; // indicies of questions to choose

function hideAllSectionsExcept(secId) {
  // hide all sections
  document.getElementById('intro').style.display = "none";
  document.getElementById('quiz').style.display = "none";
  document.getElementById('quizComplete').style.display = "none";
  document.getElementById('highScores').style.display = "none";
  // clear status and input fields
  document.getElementById('done-status').innerHTML = "";
  document.getElementById('quiz-status').innerHTML = "";
  document.getElementById('highscore-status').innerHTML = "";
  document.getElementById('initials').value = "";
  // unhide specifed section
  document.getElementById(secId).style.display = "block";
}

function showIntro() {
  // Hide all sections on the page except for the intro block
  hideAllSectionsExcept('intro');
}

function startQuiz() {
  hideAllSectionsExcept('quiz');
  if (quizSelections.length > 0) {
    let quizIdx = quizSelections.pop(); 
    document.getElementById('question').innerHTML = quizQuestions[quizIdx].question;
    document.getElementById('choice1').innerHTML = quizQuestions[quizIdx].choice1;
    document.getElementById('choice2').innerHTML = quizQuestions[quizIdx].choice2;
    document.getElementById('choice3').innerHTML = quizQuestions[quizIdx].choice3;
    document.getElementById('choice4').innerHTML = quizQuestions[quizIdx].choice4;
    //document.getElementById(quizQuestions[quizIdx].id).classList.add('bg-info');
  }
  setTimeout(showQuizScore, 5000);
}

function showQuizScore() {
  let score = document.getElementById('timerVal').textContent;
  document.getElementById('score').innerHTML = score;
  hideAllSectionsExcept('quizComplete');
}

function showHighScores() {
  document.getElementById('highScoreList').innerHTML = "";
  hideAllSectionsExcept('highScores');
  if (highScores.length == 0) {
    document.getElementById('highscore-status').innerHTML = "There are currently no highscores.";
  } else {
    let initials, score, listItem;
    for (let idx=0; idx < highScores.length; idx++) {
      [initials, score] = highScores[idx].split('-');
      listItem = document.createElement("li");
      listItem.innerHTML = `${initials} - ${score}`;
      document.getElementById('highScoreList').append(listItem);
    }
  }
}

function updateHighScores() {
  document.getElementById('done-status').innerHTML = "";
  let score = document.getElementById('timerVal').textContent;
  // validate text input
  let initials = document.getElementById('initials').value;
  if (!/\w+/.test(initials)) {
    document.getElementById('done-status').innerHTML = "Please enter only letters or numbers";
  } else {
    // check if 'initials-score' already exists
    //   if it exists, do nothing, it's already saved
    let newScore = `${initials}-${score}`;
    if (highScores.indexOf(newScore)<0) {
      // score doesn't exist, add it to array
      highScores.push(newScore);
      // sort scores
      highScores.sort(function(initialScore1, initialScore2) {
        return initialScore2.split('-')[1] - initialScore1.split('-')[1];
      });
      // save scores in storage
      localStorage.setItem('highScores', JSON.stringify(highScores));
    }
    document.getElementById('done-status').innerHTML = "Score saved!";
    setTimeout(showHighScores, 1000);
  }
}

function clearHighScores() {
  localStorage.removeItem('highScores');
  highScores = [];
  // update list on screen
  showHighScores();
}

// setup button listeners
document.getElementById('start').addEventListener('click', startQuiz);
document.getElementById('submitScore').addEventListener('click', updateHighScores);
document.getElementById('back').addEventListener('click', showIntro);
document.getElementById('clear').addEventListener('click', clearHighScores);
document.getElementById('highScoreLink').addEventListener('click', showHighScores);

// temp test code
document.getElementById('timerVal').innerHTML = Math.floor(Math.random()*101);

// initialize highscores array
let tmp = localStorage.getItem('highScores');
if (tmp == null) {
  highScores = [];  
} else {
  highScores = JSON.parse(tmp);
}

// randomize questions
while (quizSelections.length<5) {
  let idx = Math.floor(Math.random() * 10);
  if (quizSelections.indexOf(idx)<0) {
    quizSelections.push(idx);
  }
}
console.log(`[global]`, quizSelections)

showIntro();
console.log(`[global]: ${quizQuestions[3].question}`);