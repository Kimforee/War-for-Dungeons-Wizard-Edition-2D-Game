const menucanvas = document.querySelector('#maincanvas');
const context = menucanvas.getContext('2d');

// Add event listeners for button clicks
document.getElementById('startButton').addEventListener('click', function() {
  // Handle start button click
});

document.getElementById('exitButton').addEventListener('click', function() {
  // Handle exit button click
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

function animation(){
    window.requestAnimationFrame(animation)
    context.fillStyle = 'pink';
    context.fillRect(0, 0, menucanvas.width, menucanvas.height);
    background.update()
    player.update()
    skullmenu.update()
}
animation()
let direction = 1; // 1 for moving right, -1 for moving left

function movePlayer() {
    
    if (player.position.x <=0) {
         player.switchSprite('run');
        direction = 1; // Reached left boundary, change direction to move right
       
        bonecrack.play();
    } else if (player.position.x >= 991) {
        direction = -1; // Reached right boundary, change direction to move left
        player.switchSprite('runback');
        bonecrack.play();
    }

    player.velocity.x = 6 * direction;
}

setInterval(movePlayer, 1000/60);