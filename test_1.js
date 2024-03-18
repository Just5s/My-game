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
const enemies = new Enemies ({
    imageSrc: './img/spikes.png',
    
})


let level = 1
let levels = {
    1:{
        init: () =>{
             parsedCollisions = collisionslevel1.parse2D()
             collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

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

            enemies.collisionBlocks = collisionBlocks
            enemies.position.x = 400
            enemies.position.y = 400
            enemies.enemieExists = true

            if (this.currentAnimation) this.currentAnimation.isActive = false

            backround = new Sprite({
                position:{
                    x:0,
                    y:0,
                },
                imageSrc: './img/level 3.png',
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

        // collisionBlocks.forEach((collisionBlock) => {
        //     collisionBlock.draw()
        // })

        doors.forEach((door) => {
            door.draw()
        })

        if(enemies.enemieExists){
            enemies.draw(100, 53)
            enemies.update()
        }
        
        
       
        

        player.handleInput(keys)

        if (player.playerExists) {
            // Update player
            player.update();
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