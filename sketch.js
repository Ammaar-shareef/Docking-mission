var bg,Iss,spaceCraft;
var SpaceBgImg,IssImg;
var spaceCraft_idle;
var spaceCraft1,spaceCraft2,spaceCraft3;
var hasDocked = false;

var invisGround;

function preload()
{
  SpaceBgImg = loadImage("spacebg.jpg");
  IssImg = loadImage("iss.png");
  spaceCraft_idle = loadAnimation("spacecraft1.png");
  spaceCraft1 = loadAnimation("spacecraft2.png");
  spaceCraft2 = loadAnimation("spacecraft3.png");
  spaceCraft3 = loadAnimation("spacecraft4.png");
}

function setup() {
  createCanvas(800,400);
  
  bg = createSprite(400,200,50,50);
  bg.addImage(SpaceBgImg);
  bg.scale = 1.5;

  iss = createSprite(400,120,50,50);
  iss.addImage(IssImg);
  iss.scale = 0.5;
  //iss.debug = true;
  iss.setCollider("rectangle",0,-80,450,300);

  spaceCraft = createSprite(Math.round(random(50,350)),350,50,50);
  spaceCraft.addAnimation("idle",spaceCraft_idle);
  spaceCraft.scale = 0.13;
  spaceCraft.velocityY = 1;
  //spaceCraft.debug = true;
  spaceCraft.setCollider("rectangle",0,-10,450,450);

  spaceCraft.addAnimation("both",spaceCraft1);
  spaceCraft.addAnimation("left",spaceCraft2);
  spaceCraft.addAnimation("right",spaceCraft3);

  invisGround = createSprite(400,400,800,10);
  invisGround.visible = false;
}

function draw() {
  background("grey");  

  if(!hasDocked){
    if(keyIsDown(UP_ARROW)){
      spaceCraft.position.y = spaceCraft.position.y - 3;
      spaceCraft.changeAnimation("idle")
    }
    if(keyWentDown(DOWN_ARROW)){
      spaceCraft.changeAnimation("both");
      spaceCraft.velocityY = 0;
    }
    if(keyWentUp(DOWN_ARROW)){
      spaceCraft.changeAnimation("idle");
      spaceCraft.velocityY = 1;
    }
    if(keyIsDown(RIGHT_ARROW)){
      spaceCraft.position.x = spaceCraft.position.x + 3;
      spaceCraft.changeAnimation("left");
    }
    if(keyIsDown(LEFT_ARROW)){
      spaceCraft.position.x = spaceCraft.position.x - 3;
      spaceCraft.changeAnimation("right");
    }
  }

  spaceCraft.collide(invisGround);

  drawSprites();
  
  if(spaceCraft.collide(iss)){
    hasDocked = true;
    
    spaceCraft.position.x = 370;
    spaceCraft.position.y = 180;

    fill("white");
    text("Docking Successfull",400,200);
  }
}
