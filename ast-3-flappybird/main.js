function Game() {

  var container = document.getElementById('container');
  container.style.position = 'relative';
  var bird  = document.createElement('div');


  function createBird(){
    this.posTop = bird.style.top;
    bird.style.width = "30px";
    bird.style.height = "21px";
    bird.style.backgroundImage = "url('images/bird.png')";
    bird.style.position = "absolute";
    bird.style.left = "50px";
    bird.style.top = "250px";
    container.appendChild(bird);
   }


   function birdMovement(){
    setInterval(function(){
      var xPos = parseInt(bird.style.top); 
      bird.style.top = (xPos+10)+'px';

      if(xPos>=470){
        var audio = new Audio('/sounds/sfx_hit.ogg');
        audio.play();

        alert('Game Over');
        createBird();
      } 
    },1000);

    container.onclick = function() {
      var audio = new Audio('/sounds/sfx_wing.ogg');
      audio.play();

      var xPos = parseInt(bird.style.top);
      bird.style.top = xPos - 10+'px';
    }
}



  this.init = function() {
    createBird();
    birdMovement();
  }
}

var newGame = new Game();
newGame.init();





  
  
