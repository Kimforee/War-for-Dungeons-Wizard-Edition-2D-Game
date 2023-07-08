const menucanvas = document.querySelector('#maincanvas');
const context = menucanvas.getContext('2d');
const heading = document.querySelector('.path');
// Add event listeners for button clicks
document.getElementById('startButton').addEventListener('click', function() {
  // Handle start button click
});

document.getElementById('exitButton').addEventListener('click', function() {
  // Handle exit button click
});

class Spritemenu {
  constructor({ imageSrc, parallaxSpeed = 0, position = { x: 0, y: 0 } }) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.position = position;
    this.parallaxSpeed = parallaxSpeed;
    this.duplicatePosition = { x: -this.image.width, y: this.position.y };
  }

  draw(context) {
    context.drawImage(this.image, this.position.x, this.position.y);
    context.drawImage(
      this.image,
      this.duplicatePosition.x,
      this.duplicatePosition.y
    ); 
  }

  update(context) {
    this.position.x -= this.parallaxSpeed;
    this.duplicatePosition.x -= this.parallaxSpeed;

    // Reset positions if the original image goes off the screen
    if (this.position.x + this.image.width < 0) {
      this.position.x = this.duplicatePosition.x + this.image.width;
    }

    // Reset positions if the duplicate image goes off the screen
    if (this.duplicatePosition.x + this.image.width < 0) {
      this.duplicatePosition.x = this.position.x + this.image.width;
    }

    this.draw(context);
   }
}


// Heading animation
anime({
    targets:heading,
    strokeDashoffset: [anime.setDashoffset, 0],
    // stroke: ['#000000','#FF5E00', '#CE0509'],
    easing: 'easeInOutSine',
    duration: 6500,
    delay: function(el, i) { return i *10 },
    direction: 'alternate',
    loop: true
  });

// parallax images
 
const l0= new Spritemenu({
        imageSrc: './img/Backlayers/12.png',
        parallaxSpeed: 0.1,
      });
     const l1= new Spritemenu({

        imageSrc: './img/Backlayers/11.png',
        parallaxSpeed: 0.2,
      });
    const  l2= new Spritemenu({

        imageSrc: './img/Backlayers/10.png',
        parallaxSpeed: 0.3,
      });
    const  l3= new Spritemenu({

        imageSrc: './img/Backlayers/9.png',
        parallaxSpeed: 0.4,
      });
    const  l4= new Spritemenu({

        imageSrc: './img/Backlayers/8.png',
        parallaxSpeed: 0.5,
      });
    const  l5= new Spritemenu({

        imageSrc: './img/Backlayers/7.png',
        parallaxSpeed: 0.6,
      });
    const  l6= new Spritemenu({

        imageSrc: './img/Backlayers/6.png',
        parallaxSpeed: 0.7,
      });
     const l7= new Spritemenu({

        imageSrc: './img/Backlayers/5.png',
        parallaxSpeed: 0.8,
      });
    const  l8= new Spritemenu({

        imageSrc: './img/Backlayers/4.png',
        parallaxSpeed: 1.0,
      });
    const  l9= new Spritemenu({

        imageSrc: './img/Backlayers/3.png',
        parallaxSpeed: 1.2,
      });
    const  l10= new Spritemenu({

        imageSrc: './img/Backlayers/2.png',
        parallaxSpeed: 1.4,
      });
    const  l11= new Spritemenu({

        imageSrc: './img/Backlayers/1.png',
        parallaxSpeed: 1.2,
      });


const skullmenu = new Sprite({
    position:{
        x:470,
        y:5
    },
    imageSrc: './img/Demon/fire-skull.png',
    framesMax:8,
    scale : 0.9,
    framesHold:10
})
//Moom 0
const moon= new Sprite({
    position:{
        x:880,
        y:375
    },
    imageSrc: './img/RedMoon.png',
    framesMax:11,
    scale : 1.25,
    framesHold:10
})

// Moon 1
const moon1= new Sprite({
    position:{
        x:30,
        y:375
    },
    imageSrc: './img/RedMoon.png',
    framesMax:11,
    scale : 1.25,
    framesHold:10
})

// Wizard
const EvilWizard = new Fighter ({
    position:{
    x:150,
    y:0
},
velocity: {
    x: 0,
    y: 10
},
offset:{
    x:0 ,
    y:10
},
imageSrc:'./img/EvilWizard/Idle.png',
framesMax:8,
scale:1,
offset:{
    x:160,
    y:70
},
sprites:{
    idle:{
       imageSrc: './img/EvilWizard/Idle.png',
       framesMax :8,
       framesHold :10
    },
    run:{
        imageSrc:'./img/EvilWizard/Run.png',
        framesMax:8,
        framesHold :6
    },
    jump:{
        imageSrc:'./img/EvilWizard/Jump.png',
        framesMax:2,
        framesHold :4

    },
    fall:{
        imageSrc:'./img/EvilWizard/Fall.png',
        framesMax:2,
        framesHold :6
    },
    attack1:{
        imageSrc:'./img/EvilWizard/Attack2.png',
        framesMax:8,
        framesHold :2
    },
    attack2:{
        imageSrc:'./img/EvilWizard/Attack1.png',
        framesMax:8,
        framesHold:2
    },
    runback: {
        imageSrc:'./img/EvilWizard/Runback.png',
        framesMax: 8,
        framesHold: 6,
      },
    hit:{
        imageSrc:'./img/EvilWizard/Take hit.png',
        framesMax:3,
        framesHold:10,
    }
}
})
EvilWizard.draw()

function animation(){
    window.requestAnimationFrame(animation)
    context.clearRect(0, 0, menucanvas.width, menucanvas.height);

    l0.update(context); 
    l1.update(context);
    l2.update(context);
    l3.update(context);
    l4.update(context);
    l5.update(context);
    l6.update(context); 
    l7.update(context);
    l8.update(context);
    l9.update(context);
    moon.update();
     moon1.update();
    l10.update(context);
    l11.update(context);
    EvilWizard.update()
    skullmenu.update()
    
   

    
}
animation()

let direction = 1;
let moves = 0;

function movePlayer() {
    
    console.log(EvilWizard.position.x)
    if (EvilWizard.position.x <=150) {
        // console.log("inside run")
         EvilWizard.switchSprite('run');
        direction = 1; // Reached left boundary, change direction to move right
        console.log(EvilWizard.position.x)
     } // } else if (EvilWizard.position.x >= 780) {
        if (EvilWizard.position.x === 80)
        {
            EvilWizard.velocity.y = -40;
            // console.log("inside jump")
            EvilWizard.switchSprite('jump')
        }
        else if (EvilWizard.position.x >= 720)
        {
            // console.log("inside runback")
            direction = -1; // Reached right boundary, change direction to move left
            EvilWizard.switchSprite('runback');    
        }
    

    EvilWizard.velocity.x = 4 * direction;
}
setInterval(movePlayer, 1000);
// let timermoves = 20 
// let timerI
//   function movesdetector(){
//     console.log(timermoves);
//       if(timermoves > 0)  {
//           EvilWizard.switchSprite('idle');
//           timerI = setTimeout(movesdetector, 1000);
//           timermoves--;       
//       }  
//       else if (timermoves > 15 ) 
//       {
//         timermoves = 20
//         timerId = setTimeout(movesdetector, 1000);
//         console.log(timermoves)
//         EvilWizard.attack(0)

           
//       }   
//   }
// movesdetector()

