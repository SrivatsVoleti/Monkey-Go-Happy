var back_groundImage,back_ground;
var player, player_running;
var ground,ground_img;

var foodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  back_groundImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  back_ground=createSprite(0,0,800,400);
  back_ground.addImage(back_groundImage);
  back_ground.scale=1.5;
  back_ground.x=back_ground.width/2;
  back_ground.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  
  if (keyDown("space") && player.y >= 210) {
    player.velocityY = -14;
  }                               
  player.velocityY = player.velocityY + 0.2;

  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(back_ground.x<100){
    back_ground.x=back_ground.width/2;
  }
  
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
    score = score + 1;
    }
    switch(score  ){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") && player.y >= 300 ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
     
    if(obstaclesGroup.isTouching(player)){
      score = 0;
    }
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
    
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  text("Jump On Rock = Full points Deduction",50,50);
}

function spawnFood() {
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,400,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;  
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}