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
    this.alive = true;
    //Player Inventory
    this.weapon = "fists";
    this.armor;
    this.items = [];
    //Player Position
    this.x = startPosX;
    this.y = startPosY;
  }
}

//Player explore functions
Player.prototype.moveGrid = function moveGrid(){
  if (combat === true) {
    //roll to attempt to escape, otherwise can't move and lose turn
  } else {
    //regular movement here
  }
}

Player.prototype.checkGrid = function checkGrid(){

}

//Player combat functions
Player.prototype.fight = function fight(){
  return this.attack;
}

Player.prototype.takeDamage = function takeDamage(damageTaken){
this.currentHP === this.currentHP - damageTaken;
if (this.currentHP <= 0) {
  this.alive = false;
  }
}

//Player general functions
Player.prototype.checkItems = function checkItems(){
  items.forEach(function(item) {
  })
}

Player.prototype.useItems = function useItems(){

}

Player.prototype.getStats = function getStats(){
  if (this.job === "warrior") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.attack = 4;
    this.speed = 2;
  } else if (this.job === "wizard"){
    this.maxHP = 10;
    this.currentHP = 10;
    this.attack = 5;
    this.speed = 3;
  } else if (this.job === "thief"){
    this.maxHP = 15;
    this.currentHP = 15;
    this.attack = 2;
    this.speed = 5;
  }
}

//Enemy functions
class Enemy{
  constructor(type, positionX, positionY){
  this.type = type;
  this.alive = true;
  this.x = positionX;
  this.y = positionY;
  }
}

Enemy.prototype.getStats = function getStats(){
  if (this.type === "Slime") {
    this.maxHP = 5;
    this.currentHP = 5;
    this.attack = 1;
    this.speed = 1;
  } else if (this.type === "Troll") {
    this.maxHP = 15;
    this.currentHP = 15;
    this.attack = 5;
    this.speed = 2;
  } else if (this.type === "Dragon") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.attack = 10;
    this.speed = 4;
  }
}

Enemy.prototype.fight = function fight(){
  return this.attack;

}

Enemy.prototype.takeDamage = function takeDamage(damageTaken){
this.currentHP = this.currentHP - damageTaken;
if (this.currentHP <= 0) {
  this.alive = false;
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

function determineTurnOrder(playerSpeed, enemySpeed) {
  if (playerSpeed >= enemySpeed) {
    return true;
  } else {
    return false;
  }
}

function checkForDeath(playerStatus, enemyStatus) {
  if (playerStatus === false) {
    alert("game over")
  } else if (enemyStatus === false) {
    $("#combat-log").append(newPlayer.name + " defeats the enemy" + "<br>");
  }
}


function combat() {
  $(".dungeon-UI").hide();
  $(".combat-UI").show();
  var newEnemy = new Enemy("Slime");
  newEnemy.getStats()
  $("#combat-log").append(newEnemy.type + " attacked!" + "<br>");
  var firstMove = determineTurnOrder(newPlayer.speed, newEnemy.speed);
  if (firstMove === false) {
    var damageTaken = newEnemy.fight();
    newPlayer.takeDamage(damageTaken);
    $("#combat-log").append(newEnemy.type + " attacked and did " + damageTaken + " damage" + "<br>");
    checkForDeath(newPlayer.alive, newEnemy.alive);
  }
    $("#attack-combat").click(function(event) {
      event.preventDefault();
      debugger
      var damageDone = newPlayer.fight();
      newEnemy.takeDamage(damageDone);
      $("#combat-log").append(newPlayer.name + " attacked with their " + newPlayer.weapon + "<br>" + newEnemy.type + " took " + damageDone + " damage " + "<br>");
      checkForDeath(newPlayer.alive, newEnemy.alive);
      var damageTaken = newEnemy.fight();
      newPlayer.takeDamage(damageTaken);
      $("#combat-log").append(newEnemy.type + " attacked and did " + damageTaken + " damage" + "<br>");
      checkForDeath(newPlayer.alive, newEnemy.alive);
  });

    $("#items").click(function(event) {
      event.preventDefault();
      newPlayer.checkItems();
      newEnemy.attack();
    });

    $("#run").click(function(event) {
      event.preventDefault();
      newPlayer.run();
      if (success = true) {
        $("#combat-log").append(newPlayer.name + " successfully ran away" + "<br>");
      }
        $("#combat-log").append(newPlayer.name + " failed to run away" + "<br>");
        newEnemy.attack();
      });

    alert("test");
  }

//globals
let dungeonOne = new Floor(4, 4);
printFloor(dungeonOne);
console.log(dungeonOne.roomArr);
var newPlayer = new Player();

//User input logic
$(document).ready(function() {
  $("#start-game").click(function(event) {
    event.preventDefault();
    $(".start-UI").hide();
    newPlayer.name = "Kevin";
    newPlayer.job = "wizard";
    newPlayer.getStats();
    combat();
  });
});
