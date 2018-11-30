function CreateBox(x) {

  this.init = function () {
    createBalls();
    ballsMovement();
  }

  var getBalls = document.getElementsByClassName('balls');
  var radius = Math.floor(Math.random() * (21) + 20);

  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255; 
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }

  var createBalls = function () {
    for (i = 0; i <= x; i++) {
      var container = document.getElementById('container');
      container.style.position = 'relative';
      var boxContainer = document.createElement('div');
      var posX = Math.floor(Math.random() * 500);
      var posY = Math.floor(Math.random() * 300);

      boxContainer.classList.add('balls');
      boxContainer.style.position = 'absolute';
      boxContainer.style.height = radius * 2 + 'px';
      boxContainer.style.width = radius * 2 + 'px';
      boxContainer.style.backgroundColor = random_rgba();
      boxContainer.style.borderRadius = '50%';
      boxContainer.style.left = posX + 'px';
      boxContainer.style.top = posY + 'px';
      container.appendChild(boxContainer);
    }
  }


  var ballsMovement = function () {
    var checker = [];
    var parsedTopStore = [];
    var parsedLeftStore = [];
    // var xDir = [0, 1, 0, -1];
    // var yDir = [-1, 0, 1, 0];

    var xDir = [0,-1,-1,1,0,1,1,-1];
    var yDir = [-1,0,-1,-1,1,0,1,1]
    var dir = [];

    for (i = 0; i < getBalls.length; i++) {
      var parsedIntTop = parseInt(getBalls[i].style.top);
      parsedTopStore.push(parsedIntTop);

      var parsedIntLeft = parseInt(getBalls[i].style.left);
      parsedLeftStore.push(parsedIntLeft);

      dir.push(Math.floor(Math.random() * 8));

      var a = true;
      checker.push(a);
    }

    setInterval(function () {
      for (var i = 0; i < getBalls.length; i++) {

        console.log(dir);
        getBalls[i].style.top = parsedTopStore[i] + xDir[dir[i]] + 'px';
        getBalls[i].style.left = parsedLeftStore[i] + yDir[dir[i]] + 'px';

        parsedTopStore[i] += xDir[dir[i]];
        parsedLeftStore[i] += yDir[dir[i]];

        if (parsedTopStore[i] >= 400 - parseInt(getBalls[i].style.height) || parsedLeftStore[i] >= 600 - parseInt(getBalls[i].style.width)) {
          dir[i] = (dir[i] + 4) % 8;
        }

        if (parsedTopStore[i] <= 0 || parsedLeftStore[i] <= 0) {
          dir[i] = (dir[i] + 4) % 8;
        }

        var initR = parseInt(getBalls[i].style.height) / 2;
        var initX = parsedTopStore[i] + initR;
        var initY = parsedLeftStore[i] + initR;

        for (var j = 0; j < getBalls.length; j++) {
          var r = parseInt(getBalls[j].style.height) / 2
          var circleX = parsedTopStore[j] + r;
          var circleY = parsedLeftStore[j] + r;

          var d = distance(initX, initY, circleX, circleY);
          if (d < initR + r) {
            var temp = dir[i];
            dir[i] = dir[j];
            dir[j] = temp;
          }

        }

      }
    }, 10)
  }

  var distance = function (x1, y1, x2, y2) {
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    return Math.sqrt(dx * dx + dy * dy);
  }

}

var newBox = new CreateBox(5);
newBox.init();