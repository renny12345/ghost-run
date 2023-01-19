//variable declaration
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

//loading pictures and other files 
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);//creating area
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1; //to move tower down
  //creating groups
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()

  //create ghost
  ghost=createSprite(200,200,50,50)
  ghost.scale=0.3
  ghost.addImage(ghostImg)
}

function draw() {
  background(200);

  if(gameState=="play"){
      //infinite tower
      if(tower.y > 400){
          tower.y = 300
        }
      drawSprites();
      spawnDoors(); //calling function
      //ghost control
      if(keyDown("left")){
        ghost.x=ghost.x -3;
        //ghost.x -= 3;
      }

      if(keyDown("right")){
        ghost.x=ghost.x +3
      }
      if(keyDown("space")){
        ghost.velocityY = -5
      }
      ghost.velocityY = ghost.velocityY +0.8;

      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY=0
      }
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600 ){
      ghost.destroy()
      gameState="end"
      }
}
if(gameState=="end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230,250)
}

  
}


//to spawn doors
function spawnDoors(){
  if(frameCount%240==0){
    var door=createSprite(200,-50)
    door.addImage(doorImg)
    door.velocityY =1 
    door.x = Math.round(random(120,400))
    door.lifetime =600
    doorsGroup.add(door)

    var climber=createSprite(200,10)
    climber.addImage(climberImg)
    climber.velocityY =1
    climber.x = door.x
    climber.lifetime =600
    climbersGroup.add(climber)


    var invisibleBlock = createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.lifetime=600
    //changing depth of ghost
    ghost.depth = door.depth +1
  }
}