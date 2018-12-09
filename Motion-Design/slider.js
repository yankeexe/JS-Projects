let carousels = document.getElementsByClassName('slide-show');
[].forEach.call(carousels,function(c){
  let next = c.getElementsByClassName('right-slide-button')[0],
   prev = c.getElementsByClassName('left-slide-button')[0],
   circlesContainer = c.getElementsByClassName('circles')[0],
   slider = c.getElementsByClassName('slider')[0],
   images = slider.getElementsByTagName('img'), 
   currentImageIndex = 0, 
   width = 640;
   bubbles= [];


  // Add Buttons based on number of images
  for(i=0; i < images.length; i++){
    let b = document.createElement('span');
    b.classList.add('bubble');
    circlesContainer.appendChild(b)
    bubbles.push(b);
  }


  // Automatic Slide Show
  function autoSwitch() {
    slider.style.left = -width * currentImageIndex + 'px';
    currentImageIndex++;
    if(currentImageIndex >= images.length){ 
      currentImageIndex = 0;
    }

    bubbles.forEach(function(b,i){
      if(i === currentImageIndex){
        b.classList.add('active')
      } else {
        b.classList.remove('active')
      }
    })
  }

  document.getElementsByClassName('slider')[0].style.width = width * images.length + 'px'
  var slideTime = 0;

  function slideImages(){
    // console.log(slider);
    slider.style.left = slideTime + 'px';
    slideTime -= 5;
    var parseLeft = parseInt(slider.style.left);

    if(parseLeft  <= -1920) {
      slideTime = 0;
    }
  }
  var interval = setInterval(slideImages,10000/60)

  //Switch Image with click event
  function switchImage() {
    slider.style.left = -width * currentImageIndex + 'px';
    bubbles.forEach(function(b,i){
      if(i === currentImageIndex){
        b.classList.add('active')
      } else {
        b.classList.remove('active')
      }
    })
   }

   var switchTime = 640;
   function switchThat(){
    slider.style.left =-switchTime  + 'px';
   }
   var nextInterval=null;
   next.addEventListener('click',function(){
    if(!nextInterval){
      console.log('Initial',nextInterval,currentImageIndex);
        clearInterval(interval);
        nextInterval=setInterval(function(){
          // console.log(nextInterval);
          slider.style.left=slideTime+'px';
          slideTime-=5;
          // console.log(slideTime);
          if(parseInt(slider.style.left)<=-width * (currentImageIndex+1)){
            clearInterval(nextInterval);
            nextInterval=null;
            interval = setInterval(slideImages,10000/60);
            currentImageIndex++;
            currentImageIndex%=images.length;
          }
        },10);
     }

    //  console.log('HI');
    // clearInterval(interval);
    
    // currentImageIndex++;

    // if(currentImageIndex >= images.length){
    //   currentImageIndex = 0;
    // }
    // switchImage();
   });

   prev.addEventListener('click',function(){
    currentImageIndex--;

    if(currentImageIndex < 0){
      currentImageIndex = images.length-1;
    }
    switchImage();
   });
});   