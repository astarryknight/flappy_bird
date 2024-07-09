function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);//clear canvas
        ctx.fillStyle="rgb(0,200,255)";
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
}


var gameSpeed=1000;
var speed=gameSpeed; //inverse scale - lower number = faster speed

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

window.addEventListener("load", draw());

var start=Date.now();


//main game loop
function loop(){
    var now = Date.now();
    if((now-start)>=speed){
        start=Date.now();
    }
    draw();
    window.requestAnimationFrame(loop);
}

//handling keypresses
addEventListener("keydown", (event) => {
    if (event.isComposing || calc) {
        return;
    }
    if(event.key==" "){
        free=freeY(pieces[0])
        while(free&&pieces[0].pos[1]<(height-1)){
            pieces[0].pos = [pieces[0].pos[0], pieces[0].pos[1]+1];
            free=freeY(pieces[0]);
        }
        speed=1;
    }//quick drop
});

window.requestAnimationFrame(loop)