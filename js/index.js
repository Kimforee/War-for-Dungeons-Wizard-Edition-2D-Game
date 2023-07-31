const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') /*c stands for context*/
const gravity = 1   
var wallcrash =  new Audio('hugecrack.mp3')
var bonecrack =  new Audio('broke.mp3')


const soundEffect = [];

// loading sound effects
function loadEffect(){
    soundEffect['firebreath'] = new Howl({
        src: ['audio/short-fire_2.wav'],
        volume:0.5
    });
    soundEffect['breath'] = new Howl({
        src: ['audio/short-fire_2.wav'],
        volume:0.5
    });
    soundEffect['hit_player'] = new Howl({
        src: ['audio/Demon Hurt Roar.mp3'],
        volume:0.4
    });
    soundEffect['hit_enemy'] = new Howl({
        src: ['audio/ene_sound.mp3'],
        volume:0.5
    });
    soundEffect['demondead'] = new Howl({
        src: ['audio/Demon Hurt Roar 6.mp3'],
        volume:0.3
    });
    soundEffect['wizardattack'] = new Howl({
        src: ['audio/wizard-fire.wav'],
        volume:0.3
    });
    soundEffect['wizardgethit'] = new Howl({
        src: ['audio/wizhit_2.wav'],
        volume:0.3
    });
}

function playEffect(effectName){
    const sound = soundEffect[effectName];
    if(sound){
        sound.play();
    }
}

loadEffect();

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

const ghost = new Sprite({
    position:{
        x:470,
        y:160
    },
    imageSrc: './img/Dark VFX 2.png',
    framesMax:16,
    scale : 2,
})

const breath = new Fighter({
    position:{
        x:755,
        y:440
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset:{
     x:0,
     y:5
    },
    imageSrc: './img/Demon/PNG/breath.png',
    framesMax:5,
    framesHold:2,
    scale:1.1
})

const breath_fire = new Fighter({
    position:{
        x:755,
        y:440
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset:{
     x:0,
     y:5
    },
    imageSrc: './img/Demon/PNG/breath-fire.png',
    framesMax:5,
    framesHold:6,
    scale:1.1
})

const g = new Sprite({
    position:{
        x:755,
        y:350
    },
    imageSrc: './img/Demon/PNG/demon-attack.png',
    framesMax:11,
    framesHold:4
})

const player = new Fighter ({
    position:{
    x:100,
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
scale:1.5,
offset:{
    x:160,
    y:150
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
        framesHold:0.5
    },
    runback: {
        imageSrc:'./img/EvilWizard/Runback.png',
        framesMax: 8,
        framesHold: 6,
      },
    hit:{
        imageSrc:'./img/EvilWizard/Takehit.png',
        framesMax:3,
        framesHold:6,
    },
    death:{
        imageSrc:'./img/EvilWizard/Death.png',
        framesMax:7,
        framesHold:1,
    }
},
attackBox: {
    offset: {
      x: 100,
      y: 0  
    },
    width: 100,
    height: 47
  }
})
player.draw()

const enemy = new Fighter ({
    position:{
    x:880,
    y:100
},
   velocity: {
    x: 0,
    y: 0
},
  offset:{
    x:0,
    y:0
  },
  imageSrc:'./img/Demon/PNG/demon-idle.png',
  framesMax:6,
  scale:1,
  offset:{
    x:6,
    y:55
  },
  sprites:{
    idle:{
        imageSrc: './img/Demon/PNG/demon-idle.png',
        framesMax:6,
        framesHold:5
    },
    run:{
        imageSrc: './img/Demon/PNG/demon-idle.png',
        framesMax:6,
        framesHold:5
    },
    jump:{
        imageSrc: './img/Demon/PNG/demon-idle.png',
        framesMax:6,
        framesHold:5
    },
    fall:{
        imageSrc: './img/Demon/PNG/demon-idle.png',
        framesMax:6,
        framesHold:5
    },
    attack1:{
        imageSrc: './img/Demon/PNG/demon-attack2.png',
        scale:1.4,
        framesMax:11,
        framesHold:5,
    },
    attack2:{
        imageSrc: './img/Demon/PNG/demon-attack-no-breath1.png',
        framesMax:8,
        framesHold:5
    },
    runback:{
        imageSrc: './img/Demon/PNG/demon-flyback.png',
        framesMax:6,
        framesHold:5,
    },
    hit:{
        imageSrc: './img/Demon/PNG/demon-flyback.png',
        framesMax:6,
        framesHold:5,
    },
    death:{
        imageSrc: './img/Demon/PNG/demon_dead.png',
        framesMax:6,
        framesHold:1,
    }
},
attackBox: {
    offset: {
      x: -100,
      y: 0  
    },
    width: 148,
    height: 47
  }
})

enemy.draw()
console.log(player)
const keys = {
    a: {
    pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

decreaseTimer()
let isBreathAnimationActive = false;
let isFireAnimationActive = false;
function ani() {
    window.requestAnimationFrame(ani)
    c.fillStyle = 'red'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()
    player.velocity.x=0
    enemy.velocity.x=0
    if (isBreathAnimationActive) {
        breath.update();
        if (breath.frameCurrent === breath.framesMax - 1){
          isBreathAnimationActive = false;
          breath.frameCurrent = 0 
        }
      }

    if (isFireAnimationActive) 
    {
        breath_fire.update();
        if (breath_fire.frameCurrent === breath_fire.framesMax - 1){
            isFireAnimationActive = false;
            breath_fire.frameCurrent = 0
        }
      }

    //Player Movement
    if (keys.a.pressed && player.lastkey === 'a'){
        player.switchSprite('runback')
        if(player.position.x <= 0)
        {
            bonecrack.play();
            player.velocity.x = 0
        }
        else {
        player.velocity.x = -6
        }  
    } else if (keys.d.pressed && player.lastkey === 'd') {
        player.switchSprite('run')
        if(player.position.x >= 991)
        {
            bonecrack.play();
            player.velocity.x = 0
        }
        else{
        player.velocity.x = 6
        }
    }
    else{
        player.switchSprite('idle')
    }

    // player Jumping
    if (player.velocity.y < 0)           {
        player.switchSprite('jump')      
    }
        else if (player.velocity.y > 0)  {
        player.switchSprite('fall')      
    }

    //Enemy Movement
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        if(enemy.position.x <= 0)
         {
            bonecrack.play();
            enemy.velocity.x = 0
         }
         else{
         enemy.velocity.x = -6
         breath.position.x = enemy.position.x + (-130); 
         breath_fire.position.x = enemy.position.x + (-130);         
             }
        enemy.switchSprite('run')
             
    }   else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        
        if(enemy.position.x >= 991)
        {
            bonecrack.play();
            enemy.velocity.x = 0
        }
        else{
        enemy.velocity.x = 6
        breath.position.x = enemy.position.x + (-130);
        breath_fire.position.x = enemy.position.x + (-130);
            }
        enemy.switchSprite('runback')
     }else{
        enemy.switchSprite('idle')
    }               

    //Jumping
    if (enemy.velocity.y < 0 && enemy.position.y == 0)
    {
        enemy.switchSprite('jump')
       
    }else if (enemy.velocity.y > 0)
    {
        enemy.switchSprite('fall')
    }
    
    //detect for collision for player
    if(rcollision({
       rectangle1: player,
       rectangle2: enemy
    })
        && player.isAttacking && player.frameCurrent === 6
    ){
           player.isAttacking = false
           playEffect('hit_player');
           enemy.takeHit();
           document.querySelector('#enemyHealth').style.width = enemy.health + '%'
           
           // when the opponent is weak or strong use this
           //    enemy.health -= 5
    }

    // if player misses attack
    if (player.isAttacking && player.frameCurrent === 6){
        player.isAttacking = false
    }

    // detect for collision for enemy the demon
    if(rcollision({
        rectangle1: enemy,
        rectangle2: player})
        && enemy.isAttacking && enemy.frameCurrent === 7
        )
        {   enemy.isAttacking = false
            playEffect('wizardgethit');     
            document.querySelector('#playerHealth').style.width = player.health + '%'
            player.takeHit();
 
            // when the opponent is weak or strong use this
            // player.health -= 5
            // breath.update();
            // player.switchSprite('hit')   
        }
            // if enemy misses attack
    if (enemy.isAttacking && enemy.frameCurrent === 7){
        
        enemy.isAttacking = false
    }

        // end game based on health
        let determine = false;
        if (enemy.health <= 0 || player.health <=0 && determine === false)
        {
          determine = true;
          determineWinner({player,enemy,timerId})  
        }
}

ani()

window.addEventListener('keydown', (event)=> {
    if (!player.dead){
    switch(event.key){
        // Hero
        case 'd':
        keys.d.pressed = true
        player.lastkey = 'd'
        break
        case 'a':
        keys.a.pressed = true
        player.lastkey = 'a'
        break
        case 'w':
        player.velocity.y= -20
        break
        case 's':
        player.attack(0)
        playEffect('wizardattack')
        break
        case 'e':
        player.attack(1)
        playEffect('wizardattack')
        break
    }
}
    if (!enemy.dead){
    switch(event.key){

        //Enemy
        case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastkey = 'ArrowRight'
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastkey = 'ArrowLeft'
        break
        case 'ArrowUp':
        enemy.velocity.y = -20
        breath.velocity.y = -20
        breath_fire.velocity.y = -20
        break
        // blue fire breathing style
        case 'ArrowDown':
        playEffect('firebreath');
        if (!isBreathAnimationActive){
            enemy.attack(0)
            isBreathAnimationActive = true;
          }
        break
        // fire breathing style :)
        case 'Control':  
        playEffect('firebreath');
        if (!isFireAnimationActive){
            enemy.attack(0)
            isFireAnimationActive = true;
        }
        break;
    }
}
})

window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
    }
    
    //Enemy Keys
    switch(event.key){
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
})