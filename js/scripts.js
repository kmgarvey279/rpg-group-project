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
    this.potions = 1;
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
    this.weapon = "rusted sword";
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
    this.strength = 2;
    this.speed = 4;
    this.weapon = "wooden staff";
    this.specialName = "Cast";
    this.special = function special() {
      $("#combat-log").append(newPlayer.name + " casts fireball" + "<br>");
      this.currentMP = this.currentMP - 3;
      $("#player-mp").empty().append(newPlayer.name + " MP:" + newPlayer.currentMP + "/" + newPlayer.maxMP + "<br>");
      return "fireball";
    };
  } else if (this.job === "archer"){
    this.maxHP = 15;
    this.currentHP = 15;
    this.strength = 3;
    this.speed = 5;
    this.weapon = "worn bow";
    this.specialName = "Barrage";
    this.special = function special() {
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
Player.prototype.addPotion = function addPotion() {
  this.potions = this.potions + 1;
}

Player.prototype.usePotion = function usePotion(){
  this.potions = this.Potions - 1;
  this.currentHP = this.currentHP + 8;
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
    this.weapon = "fangs";
  } else if (this.type === "Troll") {
    this.maxHP = 15;
    this.currentHP = 15;
    this.strength = 5;
    this.speed = 2;
    this.weapon = "club";
  } else if (this.type === "Dragon") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.strength = 10;
    this.speed = 4;
    this.weapon = "firebreath";
  }
}

Enemy.prototype.enemyTurn = function enemyTurn(){
  var damageTaken = this.strength;
  newPlayer.takeDamage(damageTaken);
  $("#combat-log").append("<br>" + this.type + " attacked with their " + this.weapon + "<br>" + newPlayer.name + " took " + damageTaken + " damage" + "<br>");
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
  $("#player-mp").empty().append("MP:" + newPlayer.currentMP + "/" + newPlayer.maxMP + "<br>");
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
        $("#combat-log").append("<br>" + newEnemy.type + " took 8 damage from the spell" + "<br>");
        checkForDeath(newPlayer.alive, newEnemy.alive);
      } else {
        $("#combat-log").empty().append("<br>" + newPlayer.name + " unleashed a barrage of arrows" + "<br>");
        for (var i = 0; i < 5; i++) {
          var shot = Math.floor((Math.random() * 5 ) + 1);
          if (newEnemy.alive === true) {
            if (shot > 4) {
              $("#combat-log").append("<br>" + newPlayer.name + "'s attack missed" + "<br>");
              break;
            } else {
              $("#combat-log").append("<br>" + newEnemy.type + " took " + shot + "damage" + "<br>");
              newEnemy.takeDamage(shot);
              checkForDeath(newPlayer.alive, newEnemy.alive);
            }
          }
        }
        if (newEnemy.alive === true) {
          newEnemy.enemyTurn();
          checkForDeath(newPlayer.alive, newEnemy.alive);
        }
      }
    });

    $("#potion-combat").click(function(event) {
      event.preventDefault();
      if (newPlayer.potions = 0) {
        $("#combat-log").empty().append("<br>" + newPlayer.name + " has no potions to use" + "<br>");
        return;
      } else {
        newPlayer.usePotion();
        $("#combat-log").empty().append("<br>" + newPlayer.name + " used a potion and recovered 8 HP" + "<br>");
      }
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
