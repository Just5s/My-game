const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let parsedCollisions
let collisionBlocks
let backround
let doors

const player = new Player ({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
      idleRight: {
        frameRate: 11,
        frameBuffer: 10,
        loop: true,
        imageSrc: './img/king/idle.png',
      },
      idleLeft: {
        frameRate: 11,
        frameBuffer: 10,
        loop: true,
        imageSrc: './img/king/idleLeft.png',
      },
      runRight: {
        frameRate: 8,
        frameBuffer: 4,
        loop: true,
        imageSrc: './img/king/runRight.png',
      },
      runLeft: {
        frameRate: 8,
        frameBuffer: 4,
        loop: true,
        imageSrc: './img/king/runLeft.png',
      },
      enterDoor: {
        frameRate: 8,
        frameBuffer: 8,
        loop: false,
        imageSrc: './img/king/enterDoor.png',
        onComplete: () => {
            gsap.to(overlay,{
                opacity: 1,
                onComplete: () =>{
                    
                    
                    badman.enemieExists = false
                    VeriSpikes.enemieExists = false
                    HoriSpikes.enemieExists = false
                    bullet1.enemieExists = false
                    cannon.enemieExists = false

                    player.currentAnimation.isActive = false;
                    level++
                    levels[level].init()
                    player.switchSprite('idleRight')
                    player.preventInput = false

                    

                    gsap.to(overlay,{
                        opacity: 0,
                    }) 
                
                },

            })    
        }
        }
    }
})
const HoriSpikes = new Hspikes ({
    imageSrc: './img/spikes.png',
    
})
const VeriSpikes = new Vspikes ({
    imageSrc: './img/spikesV.png',
    
})

const bullet1 = new Bullet ({
    imageSrc: './img/CannonBall.png',
    
})

const cannon = new Platforms ({
    imageSrc: './img/cannon2.png',
    
})

const badman = new BadGuy ({
    imageSrc: './img/king/runRight.png',
    frameRate: 8,
    animations: {
        BrunRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png',
          },
          BrunLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
          },
    }
    
})


let level = 1
let levels = {
    
    1:{
        init: () =>{
             parsedCollisions = collisionslevel1.parse2D()
             collisionBlocks = parsedCollisions.createObjectsFrom2D()
            

            player.collisionBlocks = collisionBlocks
            player.position.x = 200
            player.position.y = 200

            HoriSpikes.enemieExists = false

           


            
            
            bullet1.enemieExists = false


            
            cannon.enemieExists = false








            if (this.currentAnimation) this.currentAnimation.isActive = false



            backround = new Sprite({
                position:{
                    x:0,
                    y:0,
                },
                imageSrc: './img/backgroundlevel1.png',
            })
            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]

        }
    },
    2:{
        init: () =>{
             parsedCollisions = collisionslevel2.parse2D()
             collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            badman.collisionBlocks = collisionBlocks
            badman.initialPosition = 130
            badman.moveDistance = 400
            badman.position.x = 130
            badman.position.y = 400
            badman.enemieExists = true

            VeriSpikes.collisionBlocks = collisionBlocks
            VeriSpikes.position.x = 255
            VeriSpikes.position.y = 200
            VeriSpikes.enemieExists = true


           


            

            if (this.currentAnimation) this.currentAnimation.isActive = false

            backround = new Sprite({
                position:{
                    x:0,
                    y:0,
                },
                imageSrc: './img/backgroundlevel2.png',
            })
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]

        }
    },
    3:{
        init: () =>{
             parsedCollisions = collisionslevel3.parse2D()
             collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 740
            player.position.y = 140

            HoriSpikes.collisionBlocks = collisionBlocks
            HoriSpikes.position.x = 400
            HoriSpikes.position.y = 396
            HoriSpikes.enemieExists = true

           


            bullet1.collisionBlocks = collisionBlocks
            bullet1.initialPosition = 700
            bullet1.moveDistance = 600
            bullet1.movingRight = false
            bullet1.position.x = 700
            bullet1.position.y = 335
            
            bullet1.enemieExists = true


            cannon.collisionBlocks = collisionBlocks
            cannon.position.x = 650
            cannon.position.y = 293
            cannon.enemieExists = true


            

            if (this.currentAnimation) this.currentAnimation.isActive = false

            backround = new Sprite({
                position:{
                    x:0,
                    y:0,
                },
                imageSrc: './img/level_3.png',
            })
            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 334,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]

        }
    }
}
const keys = {
    w:{
        pressed : false
    },
    a:{
        pressed : false
    },
    d:{
        pressed : false
    },
}
   

const overlay = {
    opacity: 0
}

    function animate(){
        window.requestAnimationFrame(animate)

        backround.draw()

        

        doors.forEach((door) => {
            door.draw()
        })

        if(HoriSpikes.enemieExists){
            HoriSpikes.draw(100, 53)
            HoriSpikes.update(player)
        }

        if(VeriSpikes.enemieExists){
            VeriSpikes.draw(40, 100)
            VeriSpikes.update(player)
        }

        if(badman.enemieExists){
            badman.draw(150, 130)
            badman.update(player)
        }

        if(bullet1.enemieExists){
            bullet1.draw(40, 40)
            bullet1.update(player)
        }

        if(cannon.enemieExists){
            cannon.draw(150, 130)
            cannon.update(player)
        }
        
        
       
        

        player.handleInput(keys)

        if (player.playerExists) {
            // Update player
            player.update(cannon.collisionBlocks);
            // Draw player
            player.draw();
        }

        c.save()
        c.globalAlpha = overlay.opacity
        c.fillStyle = 'black'
        c.fillRect(0,0, canvas.width, canvas.height)
        c.restore()

        
    }

    levels[level].init()
    animate()