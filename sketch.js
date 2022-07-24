var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.velocityY=1;
  ghost.scale=0.4

  invisibleBlockGroup=createGroup()
  climbersGroup=createGroup()
}

function draw() {
  background(200);
  if(gameState==="play"){
    
    if(tower.y > 400){
    tower.y = 300
    }

    if(keyDown("up")){
      ghost.velocityY= -10;
    }

    if(keyDown("left")){
      ghost.x-=3;
    }

    if(keyDown("right")){
      ghost.x+=3;
    }

    //gravity
    ghost.velocity.y+=0.5

    spawnObjects()
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0;
    }
    if(ghost.isTouching(invisibleBlockGroup)){
      gameState="end"
    }
      
    drawSprites()
  }
    else if(gameState==="end"){
      text("gameOver",250,300);
    }

}
function spawnObjects(){
  if(frameCount%340===0){
    door=createSprite(random(70,width-70),-50)
    door.addImage("door",doorImg)
    door.velocityY=1;

    climber=createSprite(door.x,0)
    climber.addImage("climber",climberImg)
    climber.velocityY=1;

    invisibleBlock=createSprite(door.x,10,climber.width,2)
    invisibleBlock.velocityY=1;
    invisibleBlock.visible=false

    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

    
  }
}
