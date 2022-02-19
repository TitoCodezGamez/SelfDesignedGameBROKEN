const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

/* Physics Engine */ var engine, world;

/* Grounds */ var ground, StartGround;

/* General Variables */ var i, Timerr, gameState, StartButton;
/* General Variables Image */ var StartButtonI;

/* Platforms */ var SmallGrassPlatform, MediumGrassPlatform, LargeGrassPlatform;
/* Platforms Image */ var SmallGrassPlatformI, MediumGrassPlatformI, LargeGrassPlatformI;

/* Loading Screens */ var GrassMenu, GrassLevelsMenu, LockedLevel;
/* Loading Screens Image */ var GrassMenuI, GrassLevelsMenuI, LockedLevelI;

//G = Grayed Out
/* Levels */ var Level1, level2G, Level2;
/* Levels Image */ var Level1I, Level2GI, Level2I;

/* Backgrounds */ var CityBackground;
/* Background Images */ var CityBackgroundI;

/*Characters*/ var BoyCharacter, BoyCharacterC;
/*Characters Image*/ var BoyCharacterI;



function preload(){

    //Characters
    BoyCharacterI = loadImage("Textures/Characters/BC/BoyCharacterF1.png" /*, "Textures/Characters/BC/BoyCharacterF2.png"*/);

    //Platforms
    SmallGrassPlatformI = loadImage("Textures/Platforms/Grass/SmallGrassPlatform.png");
    MediumGrassPlatformI = loadImage("Textures/Platforms/Grass/MediumGrassPlatform.png");
    LargeGrassPlatformI = loadImage("Textures/Platforms/Grass/LongGrassPlatform.png");

    //Menus
    GrassMenuI = loadImage("Textures/Menus/GrassStartMenu.png");
    GrassLevelsMenuI = loadImage("Textures/Menus/GrassLevelsMenu.png");
    LockedLevelI = loadImage("Textures/Menus/GLU.png");

    //Levels
    Level1I = loadImage("Textures/Menus/L1.png");
    Level2GI = loadImage("Textures/Menus/L2G.png");
    Level2I = loadImage("Textures/Menus/L2.png");

    //Backgrounds
    CityBackgroundI = loadImage("Textures/Backgrounds/CityBackground.png");

    //General Stuff
    StartButtonI = loadImage("Textures/Menus/Start.png");
}

function setup(){
    createCanvas(displayWidth, displayHeight);


    engine = Engine.create();
    world = engine.world;


    var opt = {
        density: 1
    }
    BoyCharacter = Bodies.rectangle(100,500,50,50,opt);
    World.add(world,BoyCharacter);

    gameState = "LoadingScreen";

    ground = new Ground(width/2, height-20, width, 50);

    //C = Camera Position

    BoyCharacterC = createSprite(BoyCharacter.position.x, BoyCharacter.position.y);
    BoyCharacterC.addImage(StartButtonI);
    BoyCharacterC.visible = false;

    /*CityBackground = createSprite(10800,displayHeight/2);
    CityBackground.addImage("labless",CityBackgroundI);
    CityBackground.visible = false;*/

    StartButton = createSprite(displayWidth/2, displayHeight/2+180);
    StartButton.addImage(StartButtonI);
    StartButton.visible = false;

    GrassLevelsMenu = createSprite(displayWidth/2, displayHeight/2);
    GrassLevelsMenu.addImage(GrassLevelsMenuI);
    GrassLevelsMenu.visible = false;

    LockedLevel = createSprite(displayWidth/2, displayHeight/2);
    LockedLevel.addImage(LockedLevelI);
    LockedLevel.visible = false;

    Level1 = createSprite(displayWidth/2, displayHeight/2);
    Level1.addImage(Level1I);
    Level1.position.x = 999999;

    Level2G = createSprite(displayWidth/2, displayHeight/2);
    Level2G.addImage(Level2GI);
    Level2G.position.x = 999999;

    Level2 = createSprite(displayWidth/2, displayHeight/2);
    Level2.addImage(Level2I);
    Level2.position.x = 999999;

    
}

function draw(){

    Engine.update(engine);


    BoyCharacterC.x = BoyCharacter.position.x
    BoyCharacterC.y = BoyCharacter.position.y

    



    if(gameState==="LoadingScreen"){
        background(GrassMenuI);

        StartButton.visible = true;
        if(mousePressedOver(StartButton)){
            gameState = "Levels";
            StartButton.visible = false;
        }
        
    }

    if(gameState==="Levels"){
        GrassLevelsMenu.visible = true;
        Level1.position.x = displayWidth/6;
        Level1.position.y = displayHeight/4;

        Level2G.position.x = displayWidth/6+200;
        Level2G.position.y = displayHeight/4;

        if(mousePressedOver(Level1)){
            gameState = "Level1";
            GrassLevelsMenu.visible = false;
            Level1.visible = false;
            Level2.visible = false;
            Level2G.visible = false;
        }

        if(mousePressedOver(Level2G)){
            LockedLevel.visible = true;
            Timerr = "on";
        }

    }


    if(Timerr==="on"){
        for(i=0;i<60;i++);
        console.log(i);
        if(i>60){
            LockedLevel.visible = false;
            Timerr = "off";
        }
    }
    
    if(Timerr==="off"){LockedLevel.visible = false;}

    if(gameState==="Level1"){
        //background(255);
        imageMode(CENTER);
        image(CityBackgroundI,10800,displayHeight/2);
        //CityBackground.visible = true;
    }

    drawSprites();

        fill(0);
        imageMode(CENTER);
        image(BoyCharacterI,BoyCharacter.position.x,BoyCharacter.position.y-90,BoyCharacter.width,BoyCharacter.height);
        //rectMode(CENTER);
        //rect(BoyCharacter.position.x, BoyCharacter.position.y,50,50);
    
    ground.display();

        if(keyIsDown(65)){
        BoyCharacter.position.x = BoyCharacter.position.x -0.2;}
        if(keyIsDown(68)){
        BoyCharacter.position.x = BoyCharacter.position.x +0.2;}
        

        if(Matter.SAT.collides(BoyCharacter,ground.body).collided===true){
            console.log("ERROR");
        }
    
    camera.x = BoyCharacterC.x;

}


function keyPressed(){

    /*
    if(keyDown===65){
        if(BoyCharacter.speed.x > -30){BoyCharacter.position.x = BoyCharacter.position.x -10;}
        else{BoyCharacter.position.x = -30;}
    }
    if(keyDown===87){
        if(BoyCharacter.speed.x < 30){BoyCharacter.position.x = BoyCharacter.position.x +10;}
        else{BoyCharacter.position.x = 30;}
    }
    */
vy =2;
    if(keyCode===32/*&& BoyCharacter.position.y >= 1025*/){
        BoyCharacter.velocity.y= BoyCharacter.velocity.y-50;}
        console.log(BoyCharacter.position.y);
        console.log(BoyCharacter.velocity.y);

}
