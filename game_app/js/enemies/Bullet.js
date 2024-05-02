class Bullet extends Enemies {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop, additionalProperty }) {
        super({ collisionBlocks, imageSrc, frameRate, animations, loop });
        this.additionalProperty = additionalProperty;
        this.velocity.x = 4;



        if(this.movingRight){
            this.velocity.x = 4;
        }else if(!this.movingRight){
            this.velocity.x = -4;
        }
         // Indicates whether the enemy is moving right initially
        this.moveDistance = 100; // Distance to move left and right
        this.initialPosition = 100;
        // Add any additional properties specific to this enemy type
    }

    update(player){

        this.position.x += this.velocity.x

        this.updateHitbox()

        

        this.move()

        

        this.updateHitbox()

        
        this.drawColisions()

        this.checkCollisionWithPlayer(player)

    }

    
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 10,
                y: this.position.y + 7,
            },
            width: 25,
            height: 25,
        }

    }

    move() {
        
        // If moving right and reached the move distance, start moving left
        if (this.movingRight && this.position.x >= this.initialPosition + this.moveDistance) {
            this.position.x = this.initialPosition
        }else if(!this.movingRight && this.position.x <= this.initialPosition - this.moveDistance){
            
            this.position.x = this.initialPosition  
            this.velocity.x = -4;
        }
        
    }
    
}