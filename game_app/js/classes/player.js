class Player extends Sprite{
constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }){
    super({imageSrc, frameRate, animations, loop})
    this.position = {
        x: 200,
        y: 200
    }

    this.velocity = {
        x:0,
        y:0,
    }
    
    this.sides = {
        bottom: this.position.y + this.height,
        right: this.position.x + this.width,
        left: this.position.x
    }
    this.gravity = 1

    this.collisionBlocks = collisionBlocks
    this.playerExists = true


}





update(collisionBlocks){

    this.position.x += this.velocity.x

    this.updateHitbox()

    this.checkHorizontalCollision()
    //this.checkHorizontalCollisionPlatform()
    this.applyGravity()

    this.updateHitbox()

    this.checkVerticalCollision()
    this.checkVerticalCollisionPlatform(collisionBlocks)

    
    
    

    

}

handleInput(keys){
    if (this.preventInput) return
    this.velocity.x = 0
    if (keys.d.pressed){
    this.switchSprite('runRight')
    this.velocity.x = 5
    this.lastDirection = 'right'
    }else if (keys.a.pressed){
    this.switchSprite('runLeft')
    this.velocity.x = -5
    this.lastDirection = 'left'
    }else if (this.lastDirection == 'left'){
    this.switchSprite('idleLeft')
    }else if (this.lastDirection == 'right'){
    this.switchSprite('idleRight')
    }
}

switchSprite(name){
    if (this.image === this.animations[name].image) return
    this.currentFrame = 0
    this.image = this.animations[name].image
    this.frameRate = this.animations[name].frameRate
    this.frameRate = this.animations[name].frameBuffer
    this.loop = this.animations[name].loop
    this.currentAnimation = this.animations[name]
    
}
updateHitbox() {
    this.hitbox = {
        position: {
            x: this.position.x + 58,
            y: this.position.y + 34,
        },
        width: 50,
        height: 53,
    }

}

checkHorizontalCollision(){
    for (let i = 0; i < this.collisionBlocks.length; i++){
        
        const collisionBlock = this.collisionBlocks[i]

        if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
            this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
            this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ){
                
                if (this.velocity.x <= 0){
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }

                if (this.velocity.x > 0){
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }

        }
    }
}
deletePlayer() {
    
    this.playerExists = false;
    levels[level].init()
    this.playerExists = true;
    
}
applyGravity(){
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
}
checkVerticalCollision(){
    for (let i = 0; i < this.collisionBlocks.length; i++){
        
        const collisionBlock = this.collisionBlocks[i]

        if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
            this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
            this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ){
                
                if (this.velocity.y < 0){
                    const offset = this.hitbox.position.y - this.position.y
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }

                if (this.velocity.y > 0){
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }

        }
    }
}

checkHorizontalCollisionPlatform(){
    for (let i = 0; i < this.collisionBlocks.length; i++){
        
        const collisionBlock = this.collisionBlocks[i]

        if (this.hitbox.position.x <= Platforms.hitbox.position.x + Platforms.hitbox.width &&
            this.hitbox.position.x + this.hitbox.width >= Platforms.hitbox.position.x &&
            this.hitbox.position.y + this.hitbox.height >= Platforms.hitbox.position.y &&
            this.hitbox.position.y <= Platforms.hitbox.position.y + Platforms.hitbox.height
            ){
                
                if (this.velocity.x < 0){
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = Platforms.hitbox.position.x + Platforms.hitbox.width - offset + 0.01
                    break
                }

                if (this.velocity.x > 0){
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = Platforms.hitbox.position.x - offset - 0.01
                    break
                }

        }
    }
}

checkVerticalCollisionPlatform(collisionBlocks){
    for (let i = 0; i < collisionBlocks.length; i++){
        
        
        const collisionBlock = collisionBlocks[i]

        if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
            this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
            this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ){
                
                
                if (this.velocity.y < 0){
                    const offset = this.hitbox.position.y - this.position.y
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    console.log('asd')
                    break
                }

                if (this.velocity.y > 0){
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    console.log('asd')
                    break
                }

        }
    }
}

}
