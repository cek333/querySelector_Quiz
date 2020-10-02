/* 
// HTML snippet on which questions are based
   <main>
     <section>
hl1    <h1>Lorem ipsum dolor</h1>
hl2    <p class="checked">Sit amet consectetur adipisicing elit.</p>
hl3    <input type="radio" id="ipsum" name="lorem" value="lorem" checked>
hl4    <label for="ipsum">dolor</label><br>
hl5    <p class="ipsum">Exercitation earum eligendi alias fugit</p> 
hl6    <p id="lorem">Example: [hl7] <img src="./img.gif" alt="ex1"></p>
hl8    <img class="checked" src="./img.gif" alt="ex2">
     </section>
   </main> 
*/

let quizQuestions = [
  { 
    question: "hl2", // id of code snippet to highlight
    choice1: "main > p",
    choice2: "p.checked",
    choice3: "section input",
    choice4: "#checked",
    answer: 2
  },
  { 
    question: "hl5",
    choice1: ".ipsum",
    choice2: "main > p",
    choice3: "#ipsum",
    choice4: "p[ipsum]",
    answer: 1
  },
  { 
    question: "hl3",
    choice1: "p input",
    choice2: "main > input",
    choice3: "input",
    choice4: ".ipsum",
    answer: 3
  },
  { 
    question: "hl8",
    choice1: "p > img",
    choice2: "#checked",
    choice3: "img[alt=\"ex1\"]",
    choice4: "section > img",
    answer: 4
  },
  { 
    question: "hl4",
    choice1: "#ipsum",
    choice2: "input + label",
    choice3: ".ipsum",
    choice4: "main > label",
    answer: 2
  },
  { 
    question: "hl3",
    choice1: "[type]",
    choice2: "p + label",
    choice3: ".ipsum",
    choice4: "main > input",
    answer: 1
  },
  { 
    question: "hl7",
    choice1: ".lorem",
    choice2: "img[alt=\"ex2\"]",
    choice3: "img[alt=\"ex1\"]",
    choice4: "p + img",
    answer: 3
  },
  { 
    question: "hl6",
    choice1: ".lorem",
    choice2: "#lorem",
    choice3: ".ipsum",
    choice4: ".checked",
    answer: 2
  },
  { 
    question: "hl1",
    choice1: "h2",
    choice2: "main > h1",
    choice3: ".lorem",
    choice4: "section :first-child",
    answer: 4
  },
  { 
    question: "hl8",
    choice1: "#checked",
    choice2: "section > :last-child",
    choice3: "p img",
    choice4: "img[alt=\"ex1\"]",
    answer: 2
  }
]