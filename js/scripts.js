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
    this.items = [];
    //Player Position
    this.x = startPosX;
    this.y = startPosY;
  }
}

Player.prototype.getStats = function getStats(){
  if (this.job === "warrior") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.strength = 4;
    this.speed = 3;
    this.specialName = "Guard";
    this.special = function special() {
      $("#combat-log").append(this.name + " defended against the enemy " + "<br>");
      return "defend";
    };
  } else if (this.job === "wizard"){
    this.maxHP = 10;
    this.currentHP = 10;
    this.maxMP = 10;
    this.currentMP = 10;
    this.strength = 5;
    this.speed = 4;
    this.specialName = "Cast";
    this.special = function special() {
      $("#combat-log").append(newPlayer.name + " casts fireball" + "<br>");
      this.currentMP = this.currentMP - 3;
      $("#player-mp").empty().append(newPlayer.name + " MP:" + newPlayer.currentMP + "/" + newPlayer.maxMP + "<br>");
      return "fireball"
    };
  } else if (this.job === "thief"){
    this.maxHP = 15;
    this.currentHP = 15;
    this.strength = 2;
    this.speed = 5;
    this.specialName = "Steal";
    this.special = function special() {
      this.steal();
    };
  }
}

//Player explore functions
Player.prototype.moveGrid = function moveGrid(){

}

Player.prototype.checkGrid = function checkGrid(){

}

//Player combat functions
Player.prototype.fight = function fight(){
  return this.strength;
}

// Player.prototype.cast = function cast(spellToCast){
//   if (spellToCast === "Heal") {
//     this.currentHP = this.maxHP;
//   } else if (spellToCast === "Fireball") {
//     return "fireball";
//   }
// }

Player.prototype.steal = function steal(){
  $("#combat-log").empty().append("<br>" + this.name + " attempts to steal" + "<br>");
  // roll for random item
}


Player.prototype.run = function run(){
  var escapeRoll = this.speed + Math.floor((Math.random() * 5 ) + 1);
  if (escapeRoll >= 8) {
    return true;
  } else {
    return false;
  }
}

Player.prototype.takeDamage = function takeDamage(damageTaken){
this.currentHP = this.currentHP - damageTaken;
if (this.currentHP <= 0) {
  this.alive = false;
  }
}

//Player item functions
Player.prototype.checkItems = function checkItems(){
  $("#combat-log").append("Items:" + "<br>");
  this.items.forEach(function(item) {
    $("#combat-log").append(item + "<br>");
  });
}

Player.prototype.addItem = function addItem(itemToAdd) {
  this.items.push(itemToAdd);
}

Player.prototype.useItem = function useItems(itemToUse){
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
    this.strength = 1;
    this.speed = 1;
  } else if (this.type === "Troll") {
    this.maxHP = 15;
    this.currentHP = 15;
    this.strength = 5;
    this.speed = 2;
  } else if (this.type === "Dragon") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.strength = 10;
    this.speed = 4;
  }
}

Enemy.prototype.enemyTurn = function enemyTurn(){
  var damageTaken = this.strength;
  newPlayer.takeDamage(damageTaken);
  $("#combat-log").append("<br>" + this.type + " attacked and did " + damageTaken + " damage" + "<br>");
  $("#player-hp").empty().append(newPlayer.name + " HP:" + newPlayer.currentHP + "/" + newPlayer.maxHP + "<br>");
  $("#enemy-hp").empty().append(this.type + " HP:" + this.currentHP + "/" + this.maxHP + "<br>");
}

Enemy.prototype.takeDamage = function takeDamage(damageTaken){
this.currentHP = this.currentHP - damageTaken;
$("#enemy-hp").empty().append(this.type + " HP:" + this.currentHP + "/" + this.maxHP + "<br>");
if (this.currentHP <= 0) {
  this.alive = false;
  }
}

class Item{
  constructor(){
    
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
    $("#combat-log").append("<br>" + newPlayer.name + " was defeated" + "<br>" + "<strong><span id='death'>YOU DIED</span></strong>");
  } else if (enemyStatus === false) {
    $("#combat-log").append("<br>" + newPlayer.name + " defeats the enemy" + "<br>" + "<strong>You won!</strong>");
    function exitCombat() {
      $(".combat-UI").hide();
    }
    setTimeout(exitCombat, 4000);
  }
}


function combat() {
  $(".dungeon-UI").hide();
  $(".combat-UI").show();
  $("#player-hp").empty().append(newPlayer.name + " HP:" + newPlayer.currentHP + "/" + newPlayer.maxHP);
  if (newPlayer.job === "wizard") {
  $("#player-mp").empty().append(" MP:" + newPlayer.currentMP + "/" + newPlayer.maxMP + "<br>");
  }
  var newEnemy = new Enemy("Slime");
  newEnemy.getStats()
  $("#combat-log").append("<br>" + newEnemy.type + " attacked!" + "<br>");
  $("#enemy-hp").empty().append("<br>" + newEnemy.type + " HP:" + newEnemy.currentHP + "/" + newEnemy.maxHP + "<br>");
  var firstMove = determineTurnOrder(newPlayer.speed, newEnemy.speed);
  if (firstMove === false) {
    newEnemy.enemyTurn();
    checkForDeath(newPlayer.alive, newEnemy.alive);
  }
    $("#attack-combat").click(function(event) {
      event.preventDefault();
      var damageDone = newPlayer.fight();
      newEnemy.takeDamage(damageDone);
      $("#combat-log").empty().append("<br>" + newPlayer.name + " attacked with their " + newPlayer.weapon + "<br>" + newEnemy.type + " took " + damageDone + " damage " + "<br>");
      checkForDeath(newPlayer.alive, newEnemy.alive);
      if (newEnemy.alive === true) {
        newEnemy.enemyTurn();
        checkForDeath(newPlayer.alive, newEnemy.alive);
      }
  });

    $("#special-combat").click(function(event) {
      event.preventDefault();
      var specialEffect = newPlayer.special();
      if (specialEffect === "defend") {
        $("#combat-log").empty().append("<br>" + newEnemy.type + "'s attack had no effect on " + newPlayer.name + "<br>");
        checkForDeath(newPlayer.alive, newEnemy.alive);
      } else if (specialEffect === "fireball") {
        newEnemy.takeDamage(8);
        $("#combat-log").empty().append("<br>" + newEnemy.type + " took 8 damage from the spell" + "<br>");
        checkForDeath(newPlayer.alive, newEnemy.alive);
      } else {
        newEnemy.enemyTurn();
        checkForDeath(newPlayer.alive, newEnemy.alive);
      }
    });

    $("#items-combat").click(function(event) {
      event.preventDefault();
      newPlayer.checkItems();
      $("#combat-log").empty().append("<br>" + newplayer.name + " used " + item + "<br>");
      $("#player-hp").empty().append(newPlayer.name + " HP:" + newPlayer.currentHP + "/" + newPlayer.maxHP + "<br>");
      $("#enemy-hp").empty().append(newEnemy.type + " HP:" + newEnemy.currentHP + "/" + newEnemy.maxHP + "<br>");
      newEnemy.enemyTurn();
      checkForDeath(newPlayer.alive, newEnemy.alive);
    });

    $("#run-combat").click(function(event) {
      event.preventDefault();
      var success = newPlayer.run();
      if (success === true) {
        $("#combat-log").empty().append("<br>" + newPlayer.name + " successfully ran away" + "<br>");
        //switch to dungeon phase
      } else {
        $("#combat-log").empty().append("<br>" + newPlayer.name + " failed to run away" + "<br>");
        newEnemy.enemyTurn();
        checkForDeath(newPlayer.alive, newEnemy.alive);
      }
      });
  }

//globals
let dungeonOne = new Floor(4, 4);
printFloor(dungeonOne);
console.log(dungeonOne.roomArr);
let newPlayer = new Player();

//User input logic
$(document).ready(function() {
  $("#start-game").click(function(event) {
    event.preventDefault();
    $(".start-UI").hide();
    newPlayer.name = $("#character-name").val();
    newPlayer.job = $("#character-job").val();
    newPlayer.getStats();
    $("#special-name").append(newPlayer.specialName);
    combat();
  });
});
