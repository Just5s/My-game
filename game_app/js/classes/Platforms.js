class Platforms extends Enemies {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop, additionalProperty }) {
        super({ collisionBlocks, imageSrc, frameRate, animations, loop });
        this.additionalProperty = additionalProperty;
        // Add any additional properties specific to this enemy type
    }

    update(player){

        this.updateHitbox()

        this.checkHorizontalCollision()
        

        this.updateHitbox(100, 50)

        this.checkCollisionWithPlayer(player)

        

    }
    
        
    
    
}