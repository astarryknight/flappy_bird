class Bird{
    constructor(yPos, yVel, yAcc){
        this.yPos_ = yPos;
        this.yVel_ = yVel;
        this.yAcc_ = yAcc;
    }
    get yPos(){
        return this.yPos_
    }
    get yVel(){
        return this.yVel_
    }
    get yAcc(){
        return this.yAcc_
    }
    set yPos(yPos){
        this.yPos_ = yPos;
    }
    set yVel(yVel){
        this.yVel_ = yVel;
    }
    set yAcc(yAcc){
        this.yAcc_ = yAcc;
    }
}

class Pipe{
    constructor(xPos, baseHeight){
        this.xPos_ = xPos;
        this.baseHeight_ = baseHeight;
    }
    get xPos(){
        return this.xPos_
    }
    get baseHeight(){
        return this.baseHeight_
    }
    set xPos(xPos){
        this.xPos_ = xPos
    }
}

var bird = new Bird(100,1,0);
var birdWidth = 50
var pipeWidth = 75

function draw(bird) {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);//clear canvas

        //draw background
        ctx.fillStyle="rgb(0,200,255)";
        ctx.fillRect(0,0,canvas.width, canvas.height);

        //draw bird
        ctx.fillStyle="rgb(200,200,0)";
        ctx.fillRect(50, bird.yPos, birdWidth, birdWidth);

        //draw pipes
        for (let pipe of pipes){
            ctx.fillStyle="rgb(0,200,0)"
            //pipes[i]
            ctx.fillRect(pipe.xPos, canvas.height-75, pipeWidth, 75)
        }
    }
}

var gameSpeed=25;
var speed=gameSpeed; //inverse scale - lower number = faster speed

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var start=Date.now();
var upForce=0;
var bounded = false;
var pipes=[new Pipe(400, 5)];

//main game loop
function loop(){
    var now = Date.now();
    if((now-start)>=speed){
        var bound = 15
        if(bird.yVel>-bound){bird.yVel+=-1};
        bird.yPos-=bird.yVel

        if(bird.yPos<0){
            bird.yVel=0
            bird.yPos=0
        } else if(bird.yPos>canvas.height-birdWidth){
            bird.yVel=0
            bird.yPos=canvas.height-birdWidth
        }

        for(i=0;i<pipes.length;i++){
            pipes[i].xPos-=10
        }

        //generate new pipe
        if((now-start)>=50){
            generateNewPipe();
        }

        start=Date.now();
    }
    draw(bird);
    window.requestAnimationFrame(loop);
}

function generateNewPipe(){
    pipe = new Pipe(400,5);
    pipes.push(pipe);
}

//handling keypresses
addEventListener("keydown", (event) => {
    if (event.isComposing) {
        return;
    }
    if(event.key==" "){
        if (bird.yVel<25){
            bird.yVel+=19
        } else{
            bird.yVel=19
        }
    }
});

window.requestAnimationFrame(loop)