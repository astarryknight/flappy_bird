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
    get width(){
        return 75;
    }
    set xPos(xPos){
        this.xPos_ = xPos
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
        ctx.fillRect(50, bird.yPos, bird.width, bird.width);

        //draw pipes
        for (let pipe of pipes){
            ctx.fillStyle="rgb(0,200,0)"
            //top
            ctx.fillRect(pipe.xPos, canvas.height-(50+pipe.baseHeight), pipe.width, 50+pipe.baseHeight)
            ctx.fillRect(pipe.xPos, 0, pipe.width, 400-pipe.baseHeight*2);
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
    pipe = new Pipe(canvas.width,getRandomInt(200));
    pipes.push(pipe);
}

function checkCollisions(){
    for(let pipe of pipes){
        checkPipeCollision(pipe);
    }
}

function checkPipeCollision(pipe){
    if((bird.xPos+bird.width)>=(pipe.xPos) && bird.xPos<pipe.xPos+pipe.width){
        if(bird.yPos+bird.width >= canvas.height-(50+pipe.baseHeight) && bird.yPos <= (400-pipe.baseHeight*2)){
            alert("HIHIHIHIHIHIIIHIHIHIHIHIHIHIHIH")
        }
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