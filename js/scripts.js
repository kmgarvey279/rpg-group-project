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
  $("#combat-log").append("<br>" + "Items:" + "<br>");
  this.items.forEach(function(item) {
    $("#item-list").append(item.name + "<br>");
  });
}

Player.prototype.addItem = function addItem(itemToAdd) {
  this.items.push(itemToAdd);
}

Player.prototype.useItem = function useItems(selectedItem){
  var itemToUse;
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].name === selectedItem) {
      itemToUse = this.items[i];
    }
  }
  if (itemToUse.type === "heal") {
    var healTotal = (this.currentHP + parseInt(itemToUse.potency));
    if (healTotal > this.maxHP) {
      this.currentHP = healTotal - (healTotal - this.maxHP);
    } else {
      this.currentHP = healTotal;
    }
  } else if (itemToUse.type === "damage") {
    return itemToUse.potency;
  } else if (itemToUse.type === "equip") {
    this.weapon = itemToUse.name;
    this.strength = this.strength + itemToUse.potency;
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
  constructor(name, type, potency){
    this.name = name;
    this.type = type;
    this.potency = potency
  }
}

// Item.prototype.effect = function effect() {
//   if (this.type === heal) {
//     return heal
//   } else if (this.type)
// }


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
  //item test start
  var potion = new Item("small potion", "heal", 2);
  var bomb = new Item ("firecracker", "damage", 2);
  var sword = new Item("longsword", "equip", 3);
  newPlayer.addItem(potion);
  $("#combat-log").append("<br>" + newPlayer.name + " picked up the " + potion.name + "<br>");
  newPlayer.addItem(bomb);
  $("#combat-log").append("<br>" + newPlayer.name + " picked up the " + bomb.name + "<br>");
  newPlayer.addItem(sword);
  $("#combat-log").append("<br>" + newPlayer.name + " picked up the " + sword.name + "<br>");
  newPlayer.useItem("longsword");
  //item test end
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

    $("#items-combat").click(function(event) {
      event.preventDefault();
      newPlayer.checkItems();
      // $("#combat-log").empty().append("<br>" + newPlayer.name + " used " + item + "<br>");
      // $("#player-hp").empty().append(newPlayer.name + " HP:" + newPlayer.currentHP + "/" + newPlayer.maxHP + "<br>");
      // $("#enemy-hp").empty().append(newEnemy.type + " HP:" + newEnemy.currentHP + "/" + newEnemy.maxHP + "<br>");
      // newEnemy.enemyTurn();
      // checkForDeath(newPlayer.alive, newEnemy.alive);
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
