let highScores; // array of high scores; stored as [xx-nn, xx-nn, xx-nn]
let quizSelections = []; // indicies of questions to choose
let quizIdx; // index (in quizSelections[]) of currently displayed question
let quizTimer; 

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
  // clear code highlights
  // let codeList = document.querySelectorAll('TBD');
  // for (let idx=0; idx < codeList.length; idx++) {
  //   codeList.classList.remove('bg-info');
  // }
  // console.log('[hideAllExcept]:', btnList);
  // Selected user choice remains pressed after question. Clear selection.
  let btnPressed = document.querySelectorAll("#multipleChoice button:focus");
  // only expecting one button pressed (despite loop)
  for (let idx=0; idx < btnPressed.length; idx++) {
    btnPressed[idx].blur();
  }
  // unhide specifed section
  document.getElementById(secId).style.display = "block";
}

function initQuiz() {
  // Initialize time to 2min
  document.getElementById('timerVal').innerHTML = "120";

  // randomize questions
  quizSelections = [];
  while (quizSelections.length<5) {
    let sel = Math.floor(Math.random() * 10);
    if (quizSelections.indexOf(sel)<0) {
      quizSelections.push(sel);
    }
  }
}

function showIntro() {
  // randomize questions
  initQuiz();
  // Hide all sections on the page except for the intro block
  hideAllSectionsExcept('intro');
}

function updateTimer(subVal) {
  let curVal = Number(document.getElementById('timerVal').innerHTML);
  curVal -= subVal;
  document.getElementById('timerVal').innerHTML = curVal;
}

function displayQuestion() {
  hideAllSectionsExcept('quiz');
  if (quizSelections.length > 0) {
    if (quizSelections.length==5) {
      // first question => start timer
      quizTimer = setInterval(updateTimer, 1000, 1);
    }
    quizIdx = quizSelections.pop(); 
    document.getElementById('question').innerHTML = quizQuestions[quizIdx].question;
    document.getElementById('choice1').innerHTML = quizQuestions[quizIdx].choice1;
    document.getElementById('choice2').innerHTML = quizQuestions[quizIdx].choice2;
    document.getElementById('choice3').innerHTML = quizQuestions[quizIdx].choice3;
    document.getElementById('choice4').innerHTML = quizQuestions[quizIdx].choice4;
    //document.getElementById(quizQuestions[quizIdx].id).classList.add('bg-info');
  }
}

function checkQuizSelection(event) {
  let userChoice = event.target.id;
  // userChoice contains 'choiceX' where X is 1 to 4
  let userChoiceNum = Number(userChoice[6]);
  let answer = quizQuestions[quizIdx].answer;
  if (answer == userChoiceNum) {
    document.getElementById('quiz-status').innerHTML = "Correct!"
  } else {
    document.getElementById('quiz-status').innerHTML = `Wrong! The correct answer is ${answer}.`;
    updateTimer(10);
  }
  // give 1sec for status to be displayed then go on to the next question
  if (quizSelections.length > 0) {
    setTimeout(displayQuestion, 2000);
  } else {
    // stop timer
    clearInterval(quizTimer);
    setTimeout(showQuizScore, 2000);
  }
}

function showQuizScore() {
  let score = document.getElementById('timerVal').textContent;
  document.getElementById('score').innerHTML = score;
  hideAllSectionsExcept('quizComplete');
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

function clearHighScores() {
  localStorage.removeItem('highScores');
  highScores = [];
  // update list on screen
  showHighScores();
}

// setup button listeners
document.getElementById('start').addEventListener('click', displayQuestion);
document.getElementById('submitScore').addEventListener('click', updateHighScores);
document.getElementById('back').addEventListener('click', showIntro);
document.getElementById('clear').addEventListener('click', clearHighScores);
document.getElementById('highScoreLink').addEventListener('click', showHighScores);
document.getElementById('multipleChoice').addEventListener('click', checkQuizSelection);

// initialize highscores array
let tmp = localStorage.getItem('highScores');
if (tmp == null) {
  highScores = [];  
} else {
  highScores = JSON.parse(tmp);
}

showIntro();