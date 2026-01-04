let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "red", "blue"];
let highestScore = [];

let started = false;
let level = 0;
let score = 0;

let currIdx = -1;

let h2 = document.querySelector("h2");
let highestScoreDisplay = document.querySelector(".highscore");

document.addEventListener("keypress", function () {
  if (started == false) {
    score = 0;
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");

  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  level++;
  score++;
  highestScore = Math.max(score, highestScore);
  highestScoreDisplay.innerHTML = `Highest Score : ${highestScore}`;
  userSeq = [];
  currIdx = -1;
  h2.innerText = `level ${level}`;

  //choose random button
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  
  gameSeq.push(randomColor);
  console.log(gameSeq);
  gameFlash(randomBtn);
  playSound(randomColor);
}

function checkAns(idx) {
    currIdx ++;
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");
    h2.innerHTML = `Game is over! Your score was<b> ${level}</b>. <br>Press any key to start the game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "rgb(45, 138, 185)";
    }, 200);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  playSound(userColor);

  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");

for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
