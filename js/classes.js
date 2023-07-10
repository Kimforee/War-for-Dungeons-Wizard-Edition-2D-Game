class Sprite {
    constructor({position,imageSrc,scale = 1,framesMax = 1,offset = {x:0 , y:0}}){
        this.position = position
        this.width    = 30
        this.height   = 100
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
    }
 
    draw() {
        c.drawImage(this.image,
                    this.frameCurrent *(this.image.width/this.framesMax),
                    0,
                    this.image.width /this.framesMax,
                    this.image.height,
                    this.position.x - this.offset.x, 
                    this.position.y - this.offset.y, 
                    (this.image.width /this.framesMax)* this.scale, 
                    this.image.height* this.scale
                    )
    }

    animateFrame() {
        this.framesElapsed ++
     if(this.framesElapsed % this.framesHold === 0)
     {
     if(this.frameCurrent < this.framesMax - 1)
     {
        this.frameCurrent ++
     }else 
     {
        this.frameCurrent = 0
     }
    }
    }

    update(){
     this.draw()
     this.animateFrame()
    }
    
    Spriteattack(breath)
    {
        if(this.image !== breath.image)
                {
                    this.image      = breath.image
                    this.framesMax  = breath.framesMax
                    this.framesHold = breath.framesHold
                    this.frameCurrent = 0
                }
    }    
}

class Fighter extends Sprite {
    constructor({position,
                velocity ,
                color= 'blue',
                imageSrc,
                scale = 1,
                framesMax = 1,
                framesHold = 10,
                offset = {x:0 , y:0},
                sprites,
                attackBox ={offset:{}, width: undefined,height:undefined}
        }){
            super({
                position,
                imageSrc,
                scale,
                framesMax,
                framesHold,
                offset
            })
        this.velocity = velocity
        this.width    = 30
        this.height   = 100
        this.lastkey
        this.attackBox = {
             position: {  
                x: this.position.x,
                y: this.position.y    
            },
            offset: attackBox.offset,
            width : attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 6
        this.sprites = sprites

        for (const sprite in this.sprites)
        {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
        }
}

    update(){
     this.draw()
     this.animateFrame()
     this.attackBox.position.x = this.position.x + this.attackBox.offset.x
     this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // c.fillRect(this.attackBox.position.x,
        //             this.attackBox.position.y,
        //             this.attackBox.width,
        //             this.attackBox.height 
        //         )
    
     this.position.x = this.position.x + this.velocity.x
     this.position.y = this.position.y + this.velocity.y
     
     //  gravity function 
     if(this.position.y + this.height + this.velocity.y >=canvas.height-50)
     {
        this.velocity.y=0
         this.position.y=430
     }
     else{
        this.velocity.y = this.velocity.y + gravity
     }
    }
    attack(attacktype)
    {
    if (attacktype == 0)
    {
       this.switchSprite('attack1')

    } 
    else if (attacktype == 1)
    {
       this.switchSprite('attack2')
    }
    this.isAttacking = true
    //   setTimeout(() => {
    //     this.isAttacking = 
    //     false
    //      }, 100 ); 
    }

    takeHit(){
        this.switchSprite('hit')
        this.health -= 5
    }

    switchSprite(sprite)
    {
        if (this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.framesMax - 1) {
        return;
        }
        if (this.image === this.sprites.attack2.image && this.frameCurrent < this.sprites.attack2.framesMax - 1) {
        return;
        }
        if (this.image === this.sprites.hit.image && this.frameCurrent < this.sprites.hit.framesMax - 1) {
        return;
        }
        // if (this.image === this.sprites.hit.image && this.frameCurrent < this.sprites.hit.framesMax - 1) {
        //     return;
        //     }
        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image)
                {
                    this.image      = this.sprites.idle.image
                    this.framesMax  = this.sprites.idle.framesMax
                    this.framesHold = this.sprites.idle.framesHold
                    this.frameCurrent = 0
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image)
                {
                    this.image     = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesHold= this.sprites.run.framesHold
                    this.frameCurrent = 0
                }
                break
            case 'runback':
                if(this.image !== this.sprites.runback.image)
                {
                    this.image     = this.sprites.runback.image
                    this.framesMax = this.sprites.runback.framesMax
                    this.framesHold= this.sprites.runback.framesHold
                    this.frameCurrent = 0
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image)
                {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesHold = this.sprites.jump.framesHold
                    this.frameCurrent = 0
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image)
                {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesHold = this.sprites.fall.framesHold
                    this.frameCurrent = 0
                }
                break
            case 'hit':
                    if(this.image !== this.sprites.hit.image)
                {
                    this.image = this.sprites.hit.image
                    this.framesMax = this.sprites.hit.framesMax
                    this.framesHold = this.sprites.hit.framesHold
                    this.frameCurrent = 0
                }
                break
            case 'attack2':
                    if(this.image !== this.sprites.attack2.image)
                {
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesHold = this.sprites.attack2.framesHold
                    this.frameCurrent = 0
                }
                break
            
            case 'attack1':
                if(this.image !== this.sprites.attack1.image)
            {
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesHold = this.sprites.attack1.framesHold
                this.frameCurrent = 0
            }
            break
            default:
                break;
        }
    }

}
