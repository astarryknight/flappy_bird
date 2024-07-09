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
    get xPos(){
        return 100
    }
    get width(){
        return 50
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
    constructor(xPos, yPos, baseHeight){
        this.xPos_ = xPos;
        this.yPos_ = yPos;
        this.baseHeight_ = baseHeight;
    }
    get xPos(){
        return this.xPos_
    }
    get yPos(){
        return this.yPos_
    }
    get baseHeight(){
        return this.baseHeight_
    }
    get width(){
        return 75;
    }
    set xPos(xPos){
        this.xPos_ = xPos
    }
    set yPos(yPos){
        this.yPos_ = yPos
    }
}

var bird = new Bird(100,1,0);

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
        ctx.fillRect(bird.xPos, bird.yPos, bird.width, bird.width);

        //draw pipes
        for (let pipe of pipes){
            ctx.fillStyle="rgb(0,200,0)"
            //top
            ctx.fillRect(pipe.xPos, pipe.yPos, pipe.width, pipe.baseHeight)


            // let A = {
            //     x: bird.xPos,
            //     y: bird.yPos,
            //     w: bird.width,
            //     h: bird.width,
            // }
        
            // let B = {
            //     x: pipe.xPos,
            //     y: pipe.yPos,
            //     w: pipe.width,
            //     h: pipe.baseHeight
            // }
        
            // ctx.fillStyle="rgba(100,0,0,0.4)"
            // ctx.fillRect(A.x, A.y, A.w, A.h);
        
            // ctx.fillStyle="rgba(0,0,100,0.4)"
            // ctx.fillRect(B.x, B.y, B.w, B.h);
        }

        
    }
}

var gameSpeed=25;
var speed=gameSpeed; //inverse scale - lower number = faster speed

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var start=Date.now();
var pipeTimer=0
var upForce=0;
var bounded = false;
var pipes=[];

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
        } else if(bird.yPos>canvas.height-bird.width){
            bird.yVel=0
            bird.yPos=canvas.height-bird.width
        }

        for(let i=0;i<pipes.length;i++){
            pipes[i].xPos-=5.5
        }
        checkCollisions();
        start=now;
    }
    //generate new pipe
    if((now-pipeTimer)>=2000){
        generateNewPipe();
        pipeTimer=now;
    }
    draw(bird);
    window.requestAnimationFrame(loop);
}

function generateNewPipe(){
    rand = getRandomInt(200);
    pipe1 = new Pipe(canvas.width, canvas.height-(50+rand), 50+rand);
    pipe2 = new Pipe(canvas.width, 0, 400-(rand*2))
    pipes.push(pipe1);
    pipes.push(pipe2);
}

function checkCollisions(){
    for(let pipe of pipes){
        checkPipeCollision(pipe);
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function checkPipeCollision(pipe){

    

    if(bird.xPos < pipe.xPos+pipe.width &&
        bird.xPos+bird.width > pipe.xPos){

        console.log("hi")            
    }
    return false;
}

//handling keypresses
addEventListener("keydown", (event) => {
    if (event.isComposing) {
        return;
    }
    if(event.key==" "){
        bird.yVel=11
    }
});

window.requestAnimationFrame(loop)