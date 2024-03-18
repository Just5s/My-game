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

    



    update(){

        this.position.x += this.velocity.x

        this.updateHitbox()

        this.checkHorizontalCollision()
        this.applyGravity()

        this.updateHitbox()

        this.checkVerticalCollision()

        if(enemies.enemieExists){
            this.checkCollisionWithEnemies();
        }
        
    
        

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
                   
                    if (this.velocity.x < 0){
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
        // Remove player from drawing and update logic
        this.playerExists = false;
        levels[level].init()
        this.playerExists = true;
        // Optionally, remove any references to the player object
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
    checkCollisionWithEnemies() {
        
            if (this.hitbox.position.x < enemies.hitbox.position.x + enemies.hitbox.width &&
                this.hitbox.position.x + this.hitbox.width > enemies.hitbox.position.x &&
                this.hitbox.position.y < enemies.hitbox.position.y + enemies.hitbox.height &&
                this.hitbox.position.y + this.hitbox.height > enemies.hitbox.position.y) {
                // Collision detected with enemy
                // Handle the collision as per your game logic
                // For example, stop player movement
                this.deletePlayer()
                // You can also apply damage to the player or any other action
            }
        }
    }
