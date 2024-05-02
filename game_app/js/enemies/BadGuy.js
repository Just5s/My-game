class BadGuy extends Enemies {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop, additionalProperty }) {
        super({ collisionBlocks, imageSrc, frameRate, animations, loop });
        this.additionalProperty = additionalProperty;
        this.velocity.x = 4;

        this.movingRight = true; // Indicates whether the enemy is moving right initially
        this.moveDistance = 100; // Distance to move left and right
        this.initialPosition = 100;
        // Add any additional properties specific to this enemy type
    }

    update(player){

        this.position.x += this.velocity.x

        this.updateHitbox()

        this.checkHorizontalCollision()
        this.move()

        this.applyGravity()

        this.updateHitbox()

        this.checkVerticalCollision()
    
        this.checkCollisionWithPlayer(player)

    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width: 50,
            height: 60,
        }

    }

    
    

    move(initialPosition, moveDistance) {
        
        // If moving right and reached the move distance, start moving left
        if (this.movingRight && this.position.x >= this.initialPosition + this.moveDistance) {
            this.movingRight = false;
            this.velocity.x *= -1; // Change direction
            this.switchSprite('BrunLeft')
        }
        // If moving left and reached the initial position, start moving right
        else if (!this.movingRight && this.position.x <= this.initialPosition) {
            this.movingRight = true;
            this.velocity.x *= -1; // Change direction
            this.switchSprite('BrunRight')
        }
    }
    
}