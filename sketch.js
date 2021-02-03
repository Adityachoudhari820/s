//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;

var fruit1 ,fruit2 ,fruit3 ,fruit4 , fruitGroup;

var sadSound , knifeSound , aloneSong;

var back , backImg;

var alien1 , alien2;

var monstersG;

var gameover;

function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  sadSound = loadSound("sad.wav");
  knifeSound = loadSound("knife.mp3");
  aloneSong = loadSound("aloneSong.mp3");
  
  backImg = loadImage("background.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  gameOver = loadImage("gameover.png")
 
  backimage= loadImage("explode.jpg");
}



function setup() {
  createCanvas(600, 600);
  
  back = createSprite(300,300,600,600);
  back.addImage(backImg);
  
  
  gameover = createSprite(300,300,400.400);
  gameover.addImage(gameOver);
  
  fruitGroup = createGroup();
  
  monstersG = createGroup();
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  //knife.debug = true;
  knife.setCollider("circle",0,0 ,190)
  
  aloneSong.play();
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
}

function draw() {
  background("black");
  
  if(gameState===PLAY){
    gameover.visible = false;
    
    back.visible = true;
    
    //calling fruit and monster function
    fruits();
    monster();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   
    if(fruitGroup.isTouching(knife)){
      
      score=score+10;
      
      fruitGroup.destroyEach();
      
      knifeSound.play();
      
    }
    
    // Go to end state if knife touching enemy
     
        if(monstersG.isTouching(knife)){
      gameState = END;
      
      sadSound.play();
    }
  }
  else if(gameState===END){
           score =0;
           back.visible = false;
           fruitGroup.velocityY = 0;
           monstersG.velocityY = 0;
           gameover.visible = true;
           textSize(25);
           text('press space to restart',200,200);
           if(keyDown("space")){
             
             gameState = PLAY;
             
             
             
           }
           }
    
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(frameCount%60===0){
     
var fruit= createSprite(random(10,390),0,30,40);

    fruit.velocityY = (10+(score/5));
    
    fruit.scale = 0.4;
 
    var rand = Math.round(random(1,4));
    
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
    }
    fruit.lifetime = 600;
    fruitGroup.add(fruit);
    
     }
  
}

function monster(){
  
 if(frameCount%80==0){
   
var monsters = createSprite(random(10,390),0,30,40)

monsters.velocityY = (9+(score/5));
   var rand = Math.round(random(1,2));
   switch(rand) {
      case 1: monsters.addImage(alien1);
              break;
      case 2: monsters.addImage(alien2);
              break;
              
    }
   monsters.lifetime = 600;
  monstersG.add(monsters);
}
}