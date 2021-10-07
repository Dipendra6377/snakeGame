let direction = { x: 0, y: 0 };
const foodSound = new Audio("music/food2.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
let score = 0;
let started = false;

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
}

// function isCollide(snake){
//     for(i=0;i<snake.length;i++){
//         if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
//             return true;
//         }

//     }
//     if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y<=0){
//         return true
//     }
//     return false;
// }

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //part1:updating snake array anf food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    alert("game is over");

    direction = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;
    console.log(score);
    foodSound.play();

    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scorebox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };

    const Level = document.querySelector("#lvl");

    if (score >= 0 && score <= 4) {
      speed = 4;
      Level.innerHTML = "Level:1";
    }

    if (score > 4 && score <= 6) {
      speed = 6;
      Level.innerHTML = "Level:2";
    }
    if (score > 6 && score <= 8) {
      speed = 8;
      Level.innerHTML = "Level:3";
    }
    if (score > 8 && score <= 12) {
      speed = 10;
      Level.innerHTML = "Level:3";
    }
    if (score > 12 && score <= 15) {
      speed = 12;
      Level.innerHTML = "Level:4";
    }
    if (score > 15 && score <= 19) {
      speed = 14;
      Level.innerHTML = "Level:5";
    }
    if (score > 19 && score <= 21) {
      speed = 16;
      Level.innerHTML = "Level:6";
    }
    if (score > 21 && score <= 24) {
      speed = 18;
      Level.innerHTML = "Level:7";
    }
    if (score > 24) {
      speed = 20;
      Level.innerHTML = "Level:8";
    }
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; //spread operator
  }

  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  //display snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("tail");
    }
    board.appendChild(snakeElement);
  });

  //display food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//for showing highscore

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  moveSound.play();
  direction = { x: 1, y: 0 };

  switch (e.key) {
    case "ArrowUp":
      console.log("arrowup");
      direction.x = 0;
      direction.y = -1;
      break;

    case "ArrowDown":
      console.log("arrowdown");
      direction.y = 1;
      direction.x = 0;
      break;

    case "ArrowLeft":
      console.log("arrowleft");
      direction.x = -1;
      direction.y = 0;
      break;

    case "ArrowRight":
      console.log("arrowright");
      direction.x = 1;
      direction.y = 0;
      break;
  }
});
