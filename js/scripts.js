//Floor class and its protoypes
class Floor{
  constructor(thisR, thisC){
    this.row = thisR;
    this.col = thisC;
    this.roomArr = new Array(thisR).fill(0).map(() => new Array(thisC).fill(0));
  }
}

//Room class and its protoypes
class Room{
  constructor(posX, posY){
    this.y = posX;
    this.x = posY;
  }
}

//Player class and its prototypes
class Player{
  constructor(name, job, startPosX, startPosY){
    //Player Attributes
    this.name = name;
    this.job = job;
    this.currentHP;
    //Player Inventory
    this.weapon;
    this.items = [];
    //Player Position
    this.x = startPosX;
    this.y = startPosY;
  }
}

//Player explore functions
Player.prototype.moveGrid = function moveGrid(){

}

Player.prototype.checkGrid = function checkGrid(){

}

//Player combat functions
Player.prototype.attack = function playerAtk(){
}

Player.prototype.useSpecial= function useSpecial(){
  if (this.job === "warrior") {

  } else if (this.job === "wizard") {

  } else if this.job === "thief") {

  }
}
//Player general functions
Player.prototype.checkItems = function checkItems(){
}

Player.prototype.useItems = function useItems(){

}




Player.prototype.getStats = function getStats(){
  if (this.job === "warrior") {
    this.maxHP = 90;
    this.attack = 5;
    this.defense = 4;
    this.magic = 1;
    this.speed =2;
  } else if (this.job === "wizard"){
    this.maxHP = 70;
    this.attack = 1;
    this.defense = 2;
    this.magic = 5;
    this.speed = 3;
  } else if (this.job === "thief"){
    this.maxHP = 80;
    this.attack = 3;
    this.defense = 3;
    this.magic = 2;
    this.speed = 5;
  }
}

Player.prototype.checkIfDead = function checkIfDead(){
  if (this.currentHP <= 0) {

  }
}


//Enemy functions
class Enemy{
  constructor(type, positionX, positionY){
  this.type = type;
  this.x = positionX;
  this.y = positionY;
  }
}

Enemy.prototype.getStats = function getStats(){
  if...
}

Enemy.prototype.enemyAtk = function enemyAtk(){

}

Enemy.prototype.checkIfDead = function checkIfDead(){
  if (this.currentHP <= 0) {

  }
}

//Helper Functions
function printFloor(floorObj){
  console.log('Printing out our floor Layout');
  for(var i = 0; i < floorObj.row; i++){
    var rowStr = '';
    for(var j = 0; j < floorObj.col; j++){
      var colStr = '['+i+','+j;
      if(j === floorObj.col - 1){
        colStr += ']\n';
      }else{
        colStr += ']';
      }
      rowStr += colStr;
    }
    console.log(rowStr);
  }
}
//globals
let dungeonOne = new Floor(4, 4);
printFloor(dungeonOne);
console.log(dungeonOne.roomArr);
