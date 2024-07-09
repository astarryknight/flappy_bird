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


//main game loop
function loop(){
    var now = Date.now();
    if((now-start)>=speed){
        start=Date.now();
    //     bird.yAcc = upForce-5 //calculate bird's acceleration
         var bound = 15
    //     //calculate bird's velocity, bounded by (-bound,bound)
    //     if(bird.yVel<-bound&&bird.yAcc>0){
    //         //bird.yVel += bird.yAcc
    //     } else if(bird.yVel>bound){
    //         //bird.yVel += bird.yAcc
    //     } else{
    //         //bird.yVel += bird.yAcc
    //     }
    //     if(bird.yPos<canvas.height-(birdWidth)){
    //         bird.yPos-=bird.yVel
    //         //upForce > 0 && (upForce-=.1);
    //      } // else{
    //     //     bird.yPos=canvas.height-birdWidth
    //     // }
    //    (bird.yVel<-bound || bird.yVel>bound) && (bounded=true)
    //     document.getElementById("dbg").textContent = bird.yVel



        if(bird.yVel>-bound){bird.yVel+=-1};
        bird.yPos-=bird.yVel
    }
    draw(bird);
    window.requestAnimationFrame(loop);
}

//handling keypresses
addEventListener("keydown", (event) => {
    if (event.isComposing) {
        return;
    }
    if(event.key==" "){
        if (bird.yVel<35){
            bird.yVel+=25
        } else{
            bird.yVel=25 
        }
    }
});

window.requestAnimationFrame(loop)