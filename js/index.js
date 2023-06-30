const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') /*c stands for context*/
const gravity = 1   
var wallcrash =  new Audio('hugecrack.mp3')
var bonecrack =  new Audio('broke.mp3')
var hitenemy  =  new Audio('ene_sound.mp3')
var hitplayer =  new Audio('pla_sound.mp3')

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
    x:50,
    y:38
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
        imageSrc: './img/Demon/PNG/demon-attack1.png',
        framesMax:11,
        framesHold:5,
    },
    attack2:{
        imageSrc: './img/Demon/PNG/demon-attack.png',
        framesMax:11,
        framesHold:5
    },
    runback:{
        imageSrc: './img/Demon/PNG/demon-flyback.png',
        framesMax:6,
        framesHold:5,
    }
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

function ani() {
    window.requestAnimationFrame(ani)
    c.fillStyle = 'pink'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()
    g.update()
    player.velocity.x=0
    enemy.velocity.x=0
    
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
        && player.isAttacking
    ){
           player.isAttacking = false
           hitplayer.play();
           enemy.health -= 5
           document.querySelector('#enemyHealth').style.width = enemy.health + '%'
           console.log("Bitch")
    }
    //detect for collision for enemy
    if(rcollision({rectangle1: enemy,rectangle2: player})&& enemy.isAttacking)
        {enemy.isAttacking = false
            hitenemy.play();
            player.health -= 5
            document.querySelector('#playerHealth').style.width = player.health + '%'
            console.log("HA HA HA nigga")
            player.switchSprite('hit')
        }
        // end game based on health
        if (enemy.health <= 0 || player.health <=0)
        {
          determineWinner({player,enemy,timerId})  
        }
}

ani()

window.addEventListener('keydown', (event)=> {
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
        break
        case 'e':
        player.attack(1)
        break

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
        break
        case 'ArrowDown':
        enemy.attack(0)
        break
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