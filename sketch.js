var trex,trex_running,trex_collided;
var ground,invisible_ground,ground_image;
var cloud,cloud_image,CloudsGroup;
var obstacle,obstaclesGroup,ob1,ob2,ob3,ob4,ob5,ob6
var count = 0
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart,gameover,restarti,gameoveri
//localStorage["highscore"] = 0
var highscore = 0
var jumpSound





function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided = loadAnimation("trex_collided.png")
  ground_image = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  restarti = loadImage("restart.png")
  gameoveri = loadImage("gameOver.png")
  jumpSound = loadSound("jump.mp3")
  
}

function setup() {
  createCanvas(600, 200);
 trex = createSprite(50,180,20,40)
  trex.addAnimation("running",trex_running)
  trex.scale = 0.5
  trex.addAnimation("trex_collide",trex_collided)
  
  ground = createSprite(1000,180,600,20)
  ground.addImage("ground",ground_image)
  ground.velocityX = -6
  
  invisible_ground = createSprite(300,190,600,20)
  invisible_ground.visible = false
  
  CloudsGroup = new Group() 
  obstaclesGroup = new Group()
   gameover = createSprite(300,100,20,20)
   restart = createSprite(300,150,20,20)
    gameover.visible = false
    restart.visible = false
  
  restart.addImage(restarti);
    restart.scale = 0.7
   gameover.addImage(gameoveri)
    gameover.scale = 0.6
   
}
 
function draw() {
  background(255);
   
  text("Score: "+ count, 500,50);
  
  if(highscore > 0){
    text("High Score: " + highscore, 50,50)
  }
  
  
  
  
  
  if(gameState === PLAY){
  if(keyDown("space") && trex.y > 150){
    trex.velocityY = -10
    jumpSound.play()
     }
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(invisible_ground)
  
  if(ground.x < 0){
  ground.x = 1000
  }
  
  spawnClouds()
  
  spawnObstacles()
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  
  
  if(frameCount % 10==0  ){
      count = count + 1
      if(count%100 == 0 && count > 0){
    //playSound("checkPoint.mp3", false);
    ground.velocityX = ground.velocityX - 1
   
      }
    }
  }
  else if(gameState === END) {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1)
    CloudsGroup.setLifetimeEach(-1)
    trex.changeAnimation("trex_collide",trex_collided);
    trex.velocityY = 0
    restart.visible = true
    gameover.visible = true
    
    
    if(mousePressedOver(restart)){
      reset()
      
    }
    
  }
  drawSprites()
  
 
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 220;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
    
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
   obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    console.log(ground.velocityX)
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch (rand)
{ 
  case 1: obstacle.addImage("ob1",ob1)
    break;
    case 2: obstacle.addImage("ob2",ob2)
    break;
    case 3: obstacle.addImage("ob3",ob3)
    break;
    case 4: obstacle.addImage("ob4",ob4)
    break;
    case 5: obstacle.addImage("ob5",ob5)
    break;
    case 6: obstacle.addImage("ob6",ob6)
    break;
            
            
            
            
            }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
gameState = PLAY
  obstaclesGroup.destroyEach();   
  CloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running)
  
  if(highscore<count){
    highscore = count
  }
  
  count = 0
  restart.visible = false
  gameover.visible = false
  ground.velocityX = -6



}