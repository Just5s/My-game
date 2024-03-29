class Player {
    constructor({
        collisionBlocks = [] 
    }){
       
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x:0,
            y:0,
        }
        this.width = 25
        this.height = 25
        this.sides = {
            bottom: this.position.y + this.height,
            right: this.position.x + this.width,
            left: this.position.x
        }
        this.gravity = 1

        this.collisionBlocks = collisionBlocks
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){

        this.position.x += this.velocity.x
        //check horizontal collision
        this.checkHorizontalCollision()
        this.applyGravity()
        this.checkVerticalCollision()

       

        

                

    }

    checkHorizontalCollision(){
        for (let i = 0; i < this.collisionBlocks.length; i++){
            
            const collisionBlock = this.collisionBlocks[i]

            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
                ){
                   
                    if (this.velocity.x < 0){
                        
                        this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                        break
                    }

                    if (this.velocity.x > 0){
                        
                        this.position.x = collisionBlock.position.x - this.width - 0.01
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

            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
                ){
                   
                    if (this.velocity.y < 0){
                        this.velocity.y = 0
                        this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                        break
                    }

                    if (this.velocity.y > 0){
                        this.velocity.y = 0
                        this.position.y = collisionBlock.position.y - this.height - 0.01
                        break
                    }

            }
        }
    }

  
}