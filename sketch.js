
//create a ball
var ball;
var database;
var position;
function setup(){
 database = firebase.database();
 console.log(database)
    createCanvas(500,500);
   
   //given spirte to the ball
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballposition = database.ref('ball/position');
    ballposition.on("value",readPosition,showError);
}

function draw(){
    background("white");
   
  //controlling ball using keys 
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    })

}
function readPosition(data){
    position = data.val();
    console.log(position.x)
    ball.x = position.x;
    ball.y = position.y;
}
function showError(){
    console.log("Error writing database");
}