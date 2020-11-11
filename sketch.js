var dogImg, dog, happyDog, dataBase, foodS, foodStock;
//rmng stands for Remaning
var rmngFood = 20;

function preload(){

  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")

}

function setup() {

  dataBase = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250, 400, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  foodStock = dataBase.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){

    //writeStock(foodS);
  
    if(rmngFood<=0){

      rmngFood=0

      dog.addImage(dogImg);
  
    }else{
  
      rmngFood=rmngFood-1;
  
    }
    
    dog.addImage(happyDog);

  }

  if(keyWentDown(DOWN_ARROW)){

    //writeStock(foodS);
    
    dog.addImage(dogImg);

  }

  drawSprites();

  textSize(20);
  fill("red")
  strokeWeight(4);
  stroke("white");
  text("Food: "+rmngFood, 225, 250);
  text("Press Up arrow to feed the dog/make the dog sit", 125, 50);
  text("Press Down arrow to make the dog stand", 75, 90);

}

function readStock(data){

  foodS = data.val();

}

function writeStock(x){

  dataBase.ref('/').update({

    Food: x

  })

}