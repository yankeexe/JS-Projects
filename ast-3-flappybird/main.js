(function() {
  function Bird() {
    var that = this;
    this.width = 30;
    this.height = 21;
    this.x = 50;
    this.y = 350;
    this.gravity = 0;
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

    this.pipeUp = document.createElement("div");
    this.pipeDown = document.createElement("div");

    this.init = function(container) {
      this.pipeUp.style.position = "absolute";
      this.pipeUp.style.width = this.width + "px";
      this.pipeUp.style.left = this.x + "px";
      this.pipeUp.style.backgroundColor = "red";
      this.pipeUp.style.top = this.y + "px";
      this.pipeUp.style.height = this.ht + "px";

      this.pipeDown.style.position = "absolute";
      this.pipeDown.style.width = this.width + "px";
      this.pipeDown.style.left = this.x + "px";
      this.pipeDown.style.backgroundColor = "red";
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

    this.update = function(score){
      this.score.innerText = "Score: " + score;
    }
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

  function Game() {
    this.container = document.getElementById("container");
    this.container.style.position = "relative";

    this.init = function() {
      var that = this;
      this.counter = 0;
      this.store = [];

      //Score
      this.score = new Score();
      this.score.init(this.container);
      this.score.update(0);

      //Bird
      this.bird = new Bird();
      this.bird.init(this.container);

      //Interval
      this.gameplay = setInterval(function() {
        if (that.counter % 100 == 0) {
          this.pipe = new Pipe();
          this.pipe.init(this.container);
          that.store.push(this.pipe);
        }

        that.counter++;
        that.bird.fall();

        that.store.forEach(function(pipe) {
          pipe.update();

          //Collision
          if (
            that.bird.x + that.bird.width > pipe.pipeUp.left &&
            that.bird.x <= pipe.pipeUp.left + pipe.pipeUp.width &&
            (that.bird.y <= pipe.pipeUp.top + pipe.pipeUp.height ||
              that.bird.y + that.bird.height >= pipe.pipeUp.height + pipe.gap)
          ) {
            console.log("HIT");
          }

          //Pipe Generation
          if (pipe.x <= -50) {

            //Score Update
            that.score.point += 1;
            that.score.update(that.score.point)

            //Pipe Remove
            that.store.shift();
            this.container.removeChild(this.container.childNodes[2]);
          }
        });
      }, 1000 / 30);
    };
  }

  var game = new Game();
  game.init();
})();
