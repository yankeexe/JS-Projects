const GRAVITY = 0;
const GAME_STATUS = {
  start: 1,
  playing: 2,
  over: 3
};

(function() {
  function StartScreen() {
    this.init = function(container) {
      this.start = document.createElement("div");
      this.start.setAttribute("id", "startgame");
      this.start.style.backgroundImage = "url('images/start.png')";
      this.start.style.position = "absolute";
      this.start.style.width = "188px";
      this.start.style.height = "170px";
      this.start.style.left = "280px";
      this.start.style.top = "150px";
      this.start.style.display = "inline";
      container.appendChild(this.start);
    };

    this.update = function(value) {
      this.start.style.display = value;
    };
  }

  function Bird() {
    var that = this;
    this.width = 30;
    this.height = 21;
    this.x = 50;
    this.y = 350;
    this.gravity = GRAVITY;
    this.upThurst = 4;
    this.init = function(container) {
      this.bird = document.createElement("div");
      this.bird.style.backgroundImage = "url('images/bird.png')";
      this.bird.style.position = "absolute";
      this.bird.style.height = this.height + "px";
      this.bird.style.width = this.width + "px";
      this.bird.style.left = this.x + "px";
      this.bird.style.top = this.y + "px";
      container.appendChild(this.bird);
      this.fall();
      container.addEventListener("click", this.update);
    };

    this.update = function() {
      var audio = new Audio("/sounds/sfx_wing.ogg");
      audio.play();

      that.gravity < -that.upThurst
        ? (that.gravity -= that.upThurst)
        : (that.gravity = -that.upThurst);
      that.bird.style.top = that.y + "px";
    };

    this.fall = function() {
      this.gravity += 0.35;
      that.y += this.gravity;
      that.bird.style.top = that.y + "px";
    };
  }

  function Pipe() {
    this.gap = 121;
    this.width = 50;
    this.x = 948;
    this.y = 0;
    this.ht = Math.floor(Math.random() * 242);
    this.hb = 500 - this.ht - this.gap;
    this.speed = 4;
    this.color;

    this.pipeUp = document.createElement("div");
    this.pipeDown = document.createElement("div");

    this.init = function(container) {
      this.pipeUp.style.position = "absolute";
      this.pipeUp.style.width = this.width + "px";
      this.pipeUp.style.left = this.x + "px";
      this.pipeUp.style.backgroundColor = this.color;
      this.pipeUp.style.top = this.y + "px";
      this.pipeUp.style.height = this.ht + "px";

      this.pipeDown.style.position = "absolute";
      this.pipeDown.style.width = this.width + "px";
      this.pipeDown.style.left = this.x + "px";
      this.pipeDown.style.backgroundColor = this.color;
      this.pipeDown.style.bottom = this.y + "px";
      this.pipeDown.style.height = this.hb + "px";

      container.appendChild(this.pipeUp);
      container.appendChild(this.pipeDown);
    };

    this.update = function() {
      this.x -= this.speed;
      this.pipeUp.style.left = this.x + "px";
      this.pipeDown.style.left = this.x + "px";
    };

    this.changeColor = function(kolor) {
      this.color = kolor;
    };
  }

  function Score(container) {
    this.point = 0;

    this.init = function(container) {
      this.score = document.createElement("div");
      this.score.style.position = "relative";
      this.score.style.left = "10px";
      this.score.style.top = "5px";
      container.appendChild(this.score);
    };

    this.update = function(score) {
      this.score.innerText = "Score: " + score;
      var audio = new Audio("/sounds/sfx_point.ogg");
      audio.play();
    };
  }

  function Land() {
    land.style.backgroundImage = "url('images/base.png')";
    land.style.backgroundRepeat = "repeat-x";
    land.style.bottom = 0;
    land.style.position = "absolute";
    land.style.height = "112px";
    land.style.width = "100%";
    container.appendChild(land);
  }

  function GameOver() {
    this.init = function(container) {
      this.gameOver = document.createElement("div");
      this.gameOver.setAttribute("id", "gameover");
      this.gameOver.style.backgroundImage = "url('images/game-over.png')";
      this.gameOver.style.width = container.style.width;
      this.gameOver.style.height = container.style.height;
      this.gameOver.style.zIndex = 1;
      this.gameOver.style.position = "absolute";
      this.gameOver.style.left = 0;
      this.gameOver.style.top = 0;
      this.gameOver.style.backgroundSize = "cover";
      container.appendChild(this.gameOver);
    };
  }

  function Game() {
    this.height = 500;
    this.width = 1000;
    this.status = GAME_STATUS.start;

    this.container = document.getElementById("container");
    this.container.style.position = "relative";
    this.container.style.height = this.height + "px";
    this.container.style.width = this.width + "px";

    this.init = function() {
      var that = this;
      this.counter = 0;
      this.store = [];

      this.score = new Score();
      this.score.init(this.container);
      this.score.update(0);

      this.bird = new Bird();
      this.bird.init(this.container);

      this.gameStart = new StartScreen(this.container);

      this.removeStart = e => {
        if (e.keyCode == 32) {
          document.getElementById("startgame").remove();
          document.removeEventListener("keydown", this.removeStart);
          this.status = GAME_STATUS.playing;
          console.log(this.gameStart);
        }
      };

      this.restartGame = function(e) {
        if (e.keyCode == 32) {
          document.getElementById("gameover").remove();
          that.container.innerHTML = "";
          this.status = GAME_STATUS.start;
          game = new Game();
          game.init();
        }
      };

      if (this.status == GAME_STATUS.start) {
        this.gameStart.init(this.container);
        document.addEventListener("keydown", this.removeStart);
        clearInterval(this.gameplay);
      }

      this.gameplay = setInterval(function() {
        if (that.status == GAME_STATUS.playing) {
          if (that.counter % 100 == 0) {
            this.pipe = new Pipe();
            this.pipe.changeColor("green");
            this.pipe.init(this.container);
            that.store.push(this.pipe);
          }

          that.counter++;
          that.bird.fall();

          that.store.forEach(function(pipe) {
            pipe.update();

            //Collision
            if (
              that.bird.x + that.bird.width >= pipe.x &&
              that.bird.x <= pipe.x + pipe.width &&
              (that.bird.y <= pipe.y + pipe.ht ||
                that.bird.y + that.bird.height >= pipe.ht + pipe.gap)
            ) {
              pipe.changeColor("blue");
              pipe.init(this.container);
              that.status = GAME_STATUS.over;

              this.gameOver = new GameOver();
              this.gameOver.init(that.container);
              document.getElementById("gameover").style.opacity = "0.6";

              document.addEventListener("keydown", that.restartGame);
              clearInterval(this.gameplay);
            }

            if (pipe.x <= -50) {
              //Score Update
              that.score.point += 1;
              that.score.update(that.score.point);

              //Pipe Remove
              that.store.shift();
              this.container.removeChild(this.container.childNodes[2]);
            }
          });
        }
      }, 1000 / 30);
    };
  }

  var game = new Game();
  game.init();
})();
