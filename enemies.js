class Enemies extends Sprite{
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
        this.collisionBoxColor = 'red';


        this.enemieExists = false

    }

    



    update(){

        this.position.x += this.velocity.x

        this.updateHitbox()

        this.checkHorizontalCollision()
        this.applyGravity()

        this.updateHitbox(100, 50)

        this.checkVerticalCollision()
    
        

    }
    draw(width, height) {
        if (!this.loaded) return;

        const cropbox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0
            },
            width: this.width,
            height: this.height,
        };

        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            width, // Use provided width parameter
            height // Use provided height parameter
        );
        

        this.updateFrames();
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
    updateHitbox(width, height) {
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: width,
            height: height,
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
}