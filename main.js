const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const play = document.getElementById("play-button");

//FIXME: snake doesnt return when it goes to the rigth side of the canvas

play.onclick = () => {
  startGame();
};

function startGame() {
  setInterval(showGame, 1000 / 20);
}

function showGame() {
  updateGame();
  drawGame();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  eatSomeApple();
  checkWall();
}

function eatSomeApple() {
  if (
    snake.tail[snake.tail.length - 1].x == apple.x &&
    snake.tail[snake.tail.length - 1].y == apple.y
  ) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
    apple = new Apple();
  }
}

function checkWall() {
  let headTail = snake.tail[snake.tail.length - 1];

  if (headTail.x == -snake.size) {
    headTail.x = canvas.width - snake.size;
  } else if (headTail.x == canvas.widh) {
    headTail.x = 0;
  } else if (headTail.y == -snake.size) {
    headTail.y = canvas.height - snake.size;
  } else if (headTail.y == canvas.height) {
    headTail.y = 0;
  }
}

function drawGame() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  createRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.tail.length; i++) {
    createRect(
      snake.tail[i].x + 2.5,
      snake.tail[i].y + 2.5,
      snake.size - 5,
      snake.size - 5,
      "white"
    );
  }

  ctx.font = "20px Arial";
  ctx.fillStyle = "#00FF42";
  ctx.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18);
  createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
  setTimeout(() => {
    if (event.key === "ArrowLeft" && snake.rotateX != 1) {
      snake.rotateX = -1;
      snake.rotateY = 0;
    } else if (event.key === "ArrowUp" && snake.rotateY != 1) {
      snake.rotateX = 0;
      snake.rotateY = -1;
    } else if (event.key === "ArrowRight" && snake.rotateX != -1) {
      snake.rotateX = 1;
      snake.rotateY = 0;
    } else if (event.key === "ArrowDown" && snake.rotateY != -1) {
      snake.rotateX = 0;
      snake.rotateY = 1;
    }
  }, 1);
});

class Snake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = 0;
    this.rotateY = 1;
  }

  move() {
    let newRect;

    if (this.rotateX == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateX == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateY == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    } else if (this.rotateY == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }
}

class Apple {
  constructor() {
    let isTouching;

    while (true) {
      isTouching = false;
      this.x =
        Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
      this.y =
        Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;

      for (let i = 0; i < snake.tail.length; i++) {
        if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
          isTouching = true;
        }
      }

      this.size = snake.size;
      this.color = "red";

      if (!isTouching) {
        break;
      }
    }
  }
}

const snake = new Snake(20, 20, 20);
let apple = new Apple();
