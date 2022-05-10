var astro, A1, A2;
var restart, gameoverImg, bg, gameover, restartImg;
var bgImage, wall1, wall2;
var ob1,ob2, ob3, ob4, ob1Img, ob2Img, ob3Img, ob4Img;
var obstaclesGroup, obstacle1;
var PLAY = 0;
var END = 1;
var score=0;
var gameState = PLAY;


function preload(){
   bgImage = loadImage("bg mars.jpg");
   A1 = loadImage("astro1.png");
   A2 = loadImage("astro2.png");
   gameoverImg = loadImage("gameOver.png");
   restartImg = loadImage("restart.png");
   ob1Img = loadImage("ob1.png");
   ob2Img = loadImage("ob2.png");
   ob3Img = loadImage("ob3.png");
   ob4Img = loadImage("ob4.png");
}

function setup() {
createCanvas(800,400);
bg = createSprite(400,100,200,200);
bg.addImage(bgImage);

wall1 = createSprite(400,395,800,10);
wall1.visible = false;
wall2 = createSprite(400,5,800,10);
wall2.visible = false;

astro = createSprite(100,170,20,30);
astro.addImage(A1);
astro.scale = 0.25;

 gameover  = createSprite(350,170);
 gameover.addImage(gameoverImg);
 gameover.scale = 0.5;
 gameover.visible = false;

 restart = createSprite(350,220);
 restart.addImage(restartImg);
 restart.scale = 0.09;
 restart.visible = false;

 obstaclesGroup = new Group();

}

function draw() {
background("green");

if (gameState === PLAY){
bg.velocityX=-3
 if(bg.x<400) {
 bg.x=450
 }

 if(astro.isTouching(wall1)){
  gameState = END;
  gameover.visible = true;
  restart.visible = true;
 }

 if(astro.isTouching(wall2)){
  gameState = END;
  gameover.visible = true;
  restart.visible = true;
 }

if(keyDown("space")) {
  astro.velocityY = -5; 
}
  astro.velocityY =astro.velocityY + 0.5;

  score = score + Math.round(getFrameRate()/60);
  console.log("score")

  if(obstaclesGroup.isTouching(astro)){
    gameState = END;
  }

  spawnObstacles();

  

}

else if(gameState === END){
  bg.velocityX = 0;
  gameover.visible = true;
  restart.visible = true;
  astro.velocityY = 0; 
  astro.addImage(A2);
  astro.scale= 0.25;
  obstaclesGroup.destroyEach();
  //obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);

  if(mousePressedOver(restart)) {
    obstaclesGroup.destroyEach();
    restart.visible = false;
    gameover.visible = false;
    astro.addImage(A1);
    score = 0;
    gameState = PLAY;
}
  
}

drawSprites(); 

  textSize(15);
  stroke("white");
  fill("lightpink")
  text("Score: "+ score,700,30);

}

function spawnObstacles(){
    if (frameCount%120 === 0){
      
      var  obstacle = createSprite(camera.position.x+400,300,50,50);
      obstacle.velocityX = -(6 + 3*score/100); 
   
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(ob1Img);
                obstacle.scale = 0.2;
                break;
        case 2: obstacle.addImage(ob2Img);
                obstacle.scale = 0.2;
                break;
        case 3: obstacle.addImage(ob3Img);
                obstacle.scale = 0.3;  
                break;
        case 4: obstacle.addImage(ob4Img);
               obstacle.scale = 0.5;
                break;
        default: break;
      }
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
        
    }
}

