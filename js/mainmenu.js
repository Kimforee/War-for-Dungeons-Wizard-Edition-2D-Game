var canvas = document.getElementById('maincanvas');
var c = canvas.getContext('2d');

// Add event listeners for button clicks
document.getElementById('startButton').addEventListener('click', function() {
  // Handle start button click
});

document.getElementById('exitButton').addEventListener('click', function() {
  // Handle exit button click
});

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './img/Background.png'
})

const skull = new Sprite({
    position:{
        x:470,
        y:160
    },
    imageSrc: './img/Demon/fire-skull.png',
    framesMax:8,
    scale : 0.9,
    framesHold:10
})
