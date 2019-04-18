
class IState{
  Update(){};
  HandleInput(){};

  Enter(){};
  Exit(){};
}

class StateMachine{
  _stateDict = new Map();
  _current = new IState();
  Add(myStr, stateObj){
    this._stateDict.set(myStr, stateObj);
  }
  Remove(myStr){
    this._stateDict.delete(myStr);
  }
  Clear(){
    this._stateDict.clear();
  }
  Change(myStr){
    this._current.Exit();
    _next = new IState();
    this._stateDict.set(myStr, _next);
    this._current = _next;
  }
  Update(){
    this._current.Update();
  }
  HandleInput(){
    this._current.HandleInput();
  }
}
class MovementState extends IState{
  Update(){

  };
  HandleInput(){
    document.addEventListener('keydown', function(event){
      if(!myInputs.keyPressed){
        switch (event.key) {
          case myInputs.up:
            playerOne.moveNorth(dungeonOne);
            myInputs.keyPressed = true;
            setTimeout(keyPressReady, 750, myInputs);
            break;
          case myInputs.down:
            playerOne.moveSouth(dungeonOne);
            myInputs.keyPressed = true;
            setTimeout(keyPressReady, 750, myInputs);
            break;
          case myInputs.right:
            playerOne.moveEast(dungeonOne);
            myInputs.keyPressed = true;
            setTimeout(keyPressReady, 750, myInputs);
            break;
          case myInputs.left:
            playerOne.moveWest(dungeonOne);
            myInputs.keyPressed = true;
            setTimeout(keyPressReady, 750, myInputs);
            break;
        }
      }
    });
  };

  Enter(){

  };
  Exit(){

  };
}
class BattleState extends IState{
  Update(){
  };
  HandleInput(){

  };

  Enter(){

  };
  Exit(){

  };
}
let _gameState = new StateMachine();
_gameState.Add('movement', new MovementState(this));
_gameState.Add('combat', new BattleState(this));
//which holds our desired User-Inputs
class Keys{
  up = 'ArrowUp';
  down = 'ArrowDown';
  right = 'ArrowRight';
  left = 'ArrowLeft';
  keyPressed = false;
}

//Floor class and its protoypes
class Floor{
  constructor(thisR, thisC){
    this.row = thisR;
    this.col = thisC;
    this.roomArr = new Array(thisR).fill(0).map(() => new Array(thisC).fill(0));
  }
}
Floor.prototype.rowImportant = function rowImportant(myY, startingX, endX, isRecursive){
  if(startingX > endX){
    if(startingX - endX === 1 && !isRecursive){
      console.log('rowImportant Special case where dist is 1');
      if(this.roomArr[myY][startingX - 1].isImport){
        return true;
      }else{
        return false;
      }
    }
    for(var i = startingX - 1; i > endX; i--){
      if(this.roomArr[myY][i].isImport){
        return true;
      }
    }
  }else{
    if(endX - startingX === 1 && !isRecursive){
      console.log('rowImportant Special case where dist is 1');
      if(this.roomArr[myY][startingX + 1].isImport){
        return true;
      }else{
        return false;
      }
    }
    for(var i = startingX + 1; i < endX; i++){
      if(this.roomArr[myY][i].isImport){
        return true;
      }
    }
  }
  return false;
}
Floor.prototype.colImportant = function colImportant(myX, startingY, endY, isRecursive){
  if(startingY > endY){
    if(startingY - endY === 1 && !isRecursive){
      console.log('colImportant Special case where dist is 1');
      if(this.roomArr[startingY - 1][myX].isImport){
        return true;
      }else{
        return false;
      }
    }
    for(var i = startingY - 1; i > endY; i--){
      if(this.roomArr[i][myX].isImport){
        return true;
      }
    }
  }else{
    if(endY - startingY === 1 && !isRecursive){
      console.log('colImportant Special case where dist is 1');
      if(this.roomArr[startingY + 1][myX].isImport){
        return true;
      }else{
        return false;
      }
    }
    for(var i = startingY + 1; i < endY; i++){
      if(this.roomArr[i][myX].isImport){
        return true;
      }
    }
  }
  return false;
}
Floor.prototype.constructFloors = function constructFloors(){
  console.log('Populating Floor with Rooms');
  for(var i = 0; i < this.row; i++){
    for(var j = 0; j < this.col; j++){
      this.roomArr[i][j] = new Room(i, j);
    }
  }
}
Floor.prototype.closestEmpty = function closestEmpty(posY, posX, isImportant){
  var closestRoom;
  var closePosY;
  var closePosX;
  var distanceFrom = this.row + this.col;
  if(typeof this.roomArr[posY][posX] != 'object'){
    console.log('Room at ' +posY+ ',' +posX+' was already empty');
    isImportant ? closestRoom = new Room(posY, posX, true) : closestRoom = new Room(posY, posX, false);
    this.roomArr[posY][posX] = closestRoom;
    return closestRoom;
  }
  for(var i = 0; i < this.row; i++){
    for(var j = 0; j < this.col; j++){
      if(typeof this.roomArr[i][j] != 'object'){
        if(i >= posY){
          var tempY = i - posY;
        }else{
          var tempY = posY - i;
        }
        if(j >= posX){
          var tempX = j - posX;
        }else{
          var tempX = posX - j;
        }
        var tempDistance = tempY + tempX;
        if(tempDistance < distanceFrom){
          distanceFrom = tempDistance;
          closePosY = i;
          closePosX = j;
        }
      }
    }
  }
  if(closePosY === null){
    console.log('Array is already FULL, cannot insert');
    return;
  }
  console.log('['+posY+','+posX+'] was already taken. Closest empty node found at ['+closePosY+','+closePosX+']');
  isImportant ? closestRoom = new Room(closePosY, closePosX, true) : closestRoom = new Room(closePosY, closePosX, false);
  this.roomArr[closePosY][closePosX] = closestRoom;
  return closestRoom;
}
Floor.prototype.generateKeyRooms = function generateKeyRooms(playerObj){
  var tempRoom;
  var playerRoom = new Room(playerObj.y, playerObj.x, true);
  this.roomArr[playerObj.y][playerObj.x] = playerRoom;
  //Boss Room
  var bossY = randNum(Math.floor(this.row/4), 0);
  var bossX = randNum(this.col - 1, Math.floor(this.col/2));
  console.log('bossY is '+bossY);
  console.log('bossX is '+bossX);
  var bossRoom = new Room(bossY, bossX, true);
  this.roomArr[bossY][bossX] = bossRoom;
  this.roomArr[bossY][bossX].containsBoss = true;
  playerRoom.buildPath(bossRoom, this, true);
  printFloor(dungeonOne);
  //Boss Key Room
  var bossKeyY = randNum(this.row - 1, 0);
  var bossKeyX = randNum(this.col -1, 0);
  var bossKeyRoom = this.closestEmpty(bossKeyY, bossKeyX, true);
  this.roomArr[bossKeyRoom.y][bossKeyRoom.x].containsKey = true;
  tempRoom = this.closestNode(bossKeyRoom.y, bossKeyRoom.x);
  bossKeyRoom.buildPath(tempRoom, this);
  printFloor(dungeonOne);
  //Super weapon Room
  var weaponRoomY = randNum(this.row - 1, 0);
  var weaponRoomX = randNum(this.col -1, 0);
  var weaponRoom = this.closestEmpty(weaponRoomY, weaponRoomX, true);
  this.roomArr[weaponRoom.y][weaponRoom.x].containsTreasure = true;
  tempRoom = this.closestNode(weaponRoom.y, weaponRoom.x);
  weaponRoom.buildPath(tempRoom, this);
  printFloor(dungeonOne);
  //Super weapon key
  var weaponKeyY = randNum(this.row - 1, 0);
  var weaponKeyX = randNum(this.col -1, 0);
  var weaponKeyRoom = this.closestEmpty(weaponKeyY, weaponKeyX, true);
  this.roomArr[weaponKeyRoom.y][weaponKeyRoom.x].containsKey = true;
  tempRoom = this.closestNode(weaponKeyRoom.y, weaponKeyRoom.x);
  weaponKeyRoom.buildPath(tempRoom, this);
}

Floor.prototype.closestNode =  function closestNode(posY, posX){
  var closestRoom;
  var closePosY;
  var closePosX;
  var distanceFrom = this.row + this.col;
  for(var i = 0; i < this.row; i++){
    for(var j = 0; j < this.col; j++){
      if(i === posY && j === posX){
        console.log('Skipping entered node');
        continue;
      }
      if(this.roomArr[i][j].isImport){
        console.log('Key room found, skipping..');
        continue;
      }
      if(typeof this.roomArr[i][j] === 'object'){
        var surroundingObj = [];
        if(i != this.row - 1){
          if(typeof this.roomArr[i+1][j] === 'object' && !(i + 1 === posY && j === posX)){
            if(this.roomArr[i+1][j].isImport){
              surroundingObj.push(this.roomArr[i+1][j]);
            }
          }
        }
        if(i != 0){
          if(typeof this.roomArr[i-1][j] === 'object' && !(i - 1 === posY && j === posX)){
            if(this.roomArr[i-1][j].isImport){
              surroundingObj.push(this.roomArr[i-1][j]);
            }
          }
        }
        if(j != this.col - 1){
          if(typeof this.roomArr[i][j+1] === 'object' && !(i === posY && j+1 === posX)){
            if(this.roomArr[i][j+1].isImport){
              surroundingObj.push(this.roomArr[i][j+1]);
            }
          }
        }
        if(j != 0){
          if(typeof this.roomArr[i][j-1] === 'object' && !(i === posY && j-1 === posX)){
            if(this.roomArr[i][j-1].isImport){
              surroundingObj.push(this.roomArr[i][j-1]);
            }
          }
        }
        if(surroundingObj.length >= 2){
          console.log('Found a very crowded node, skipping it...');
          continue;
        }
        if(i >= posY){
          var tempY = i - posY;
        }else{
          var tempY = posY - i;
        }
        if(j >= posX){
          var tempX = j - posX;
        }else{
          var tempX = posX - j;
        }
        console.log('Y distance: '+tempY+' at '+i);
        console.log('X distance: '+tempX+' at '+j);


        var tempDistance = tempY + tempX;
        console.log('tempDistance is '+tempDistance+' compared to distanceFrom: '+distanceFrom);
        if(tempDistance < distanceFrom){
          distanceFrom = tempDistance;
          closePosY = i;
          closePosX = j;
        }
      }
    }
  }
  if(closePosY === null){
    console.log('Array is empty, cant find closest');
    return;
  }
  console.log('Closest Node found at '+closePosY+','+closePosX);
  closestRoom = this.roomArr[closePosY][closePosX];
  return closestRoom;
}


//Room class and its protoypes
class Room{
  constructor(posY, posX, isImportant){
    this.y = posY;
    this.x = posX;
    this.isImport = isImportant;
  }
  playerHere = false;
  beenTraveled = false;
  containsKey = false;
  containsBoss = false;
  containsTreasure = false;
}
Room.prototype.setImportance = function setImportance(){
  this.isImport = true;
}
Room.prototype.buildPath = function buildPath(roomObjNext, floorObj, initialPath){//First unintentional recursive function I have ever written, holy moly
  var meetingPoint;
  var smallY;
  var largeY;
  var smallX;
  var largeX;
  var isInit = initialPath;
  if(isInit){//First Path Exception
    floorObj.roomArr[this.y][roomObjNext.x] = meetingPoint = new Room(this.y, roomObjNext.x);
    meetingPoint.buildPath(roomObjNext, floorObj);
    meetingPoint.buildPath(this, floorObj);
    return;
  }
  if(this.x < roomObjNext.x){
    smallX = this.x;
    largeX = roomObjNext.x;
  }else{
    smallX = roomObjNext.x;
    largeX = this.x;
  }
  if(this.y < roomObjNext.y){
    smallY = this.y;
    largeY = roomObjNext.y;
  }else{
    smallY = roomObjNext.y;
    largeY = this.y;
  }
  if(this.x === roomObjNext.x && !floorObj.colImportant(this.x, this.y, roomObjNext.y, true)){// x coord is same, but dif y
    for(var i = smallY + 1; i < largeY; i++){
      floorObj.roomArr[i][this.x] = new Room(i, this.x);
    }
    return;
  }
  if(this.y === roomObjNext.y && !floorObj.rowImportant(this.y, this.x, roomObjNext.x, true)){// y coord is same, but dif x
    for(var i = smallX + 1; i < largeX; i++){
      floorObj.roomArr[this.y][i] = new Room(this.y, i);
    }
    return;
  }
  var tempX;
  var tempY;
  var room_1;
  var room_2;
  var randCheck = 1; //randNum(2,1);
  console.log('RandCheck is: '+ randCheck);
  if(randCheck === 1){
    if(floorObj.rowImportant(this.y, this.x, roomObjNext.x)){
      if(this.y + 1 < floorObj.row && !floorObj.roomArr[this.y + 1][this.x].isImport){
        tempY = this.y + 1;
        floorObj.roomArr[tempY][this.x] = room_1 = new Room(tempY, this.x);
      }else if(this.y - 1 >= 0 && !floorObj.roomArr[this.y - 1][this.x].isImport){
        tempY = this.y - 1;
        floorObj.roomArr[tempY][this.x] = room_1 = new Room(tempY, this.x);
      }
    }else{
      tempY = this.y;
    }
    if(floorObj.colImportant(roomObjNext.x, roomObjNext.y, this.y)){
      if(roomObjNext.x - 1 >= 0 && !floorObj.roomArr[roomObjNext.y][roomObjNext.x - 1].isImport){
        tempX = roomObjNext.x - 1;
        if(tempY === this.y && roomObjNext.x - 1 === this.x){
          console.log('Making sure the meetingPoint does NOT overide our starting node');
          tempY = roomObjNext.y;
        }
        floorObj.roomArr[roomObjNext.y][tempX] = room_2 = new Room(roomObjNext.y, tempX);
      }else if(roomObjNext.x + 1 < floorObj.col && !floorObj.roomArr[roomObjNext.y][roomObjNext.x + 1].isImport){
        tempX = roomObjNext.x + 1;
        if(tempY === this.y && roomObjNext.x + 1 === this.x){
          console.log('Making sure the meetingPoint does NOT overide our starting node');
          tempY = roomObjNext.y;
        }
        floorObj.roomArr[roomObjNext.y][tempX] = room_2 = new Room(roomObjNext.y, tempX);
      }
    }else{
      tempX = roomObjNext.x;
    }
    floorObj.roomArr[tempY][tempX] = meetingPoint = new Room(tempY, tempX);
    console.log(meetingPoint);
    if(room_2){
      meetingPoint.buildPath(room_2, floorObj);
    }else{
      meetingPoint.buildPath(roomObjNext, floorObj);
    }
    if(room_1){
      meetingPoint.buildPath(room_1, floorObj);
    }else{
      meetingPoint.buildPath(this, floorObj);
    }
    return;
  }else{
    if(floorObj.rowImportant(roomObjNext.y, roomObjNext.x, this.x) || floorObj.colImportant(this.x, this.y, roomObjNext.y)){
      console.log('Special Case! Meeting Point will override a key Room!');
      floorObj.roomArr[this.y][roomObjNext.x] = meetingPoint =  new Room(this.y, roomObjNext.x);
    }else{
      floorObj.roomArr[roomObjNext.y][this.x] = meetingPoint = new Room(roomObjNext.y, this.x);
    }
    meetingPoint.buildPath(roomObjNext, floorObj);
    meetingPoint.buildPath(this, floorObj);
    console.log(meetingPoint);
    return;
  }
}

//Player class and its prototypes
class Player{

  constructor(startPosY, startPosX, name, job){
    //Player Attributes
    this.name = name;
    this.job = job;
    this.currentHP;
    this.alive = true;
    //Player Inventory
    this.potions = 1;
    //Player Position
    this.y = startPosY;
    this.x = startPosX;
    this.mapLocation = 5;
  }
}

Player.prototype.initPlayerPos = function initPlayerPos(floorObj){
  floorObj.roomArr[this.y][this.x].playerHere = true;
}
Player.prototype.moveGrid = function moveGrid(direction, floorObj){
  switch (direction) {
    case 'North':
      this.moveNorth(floorObj);
      break;
    case 'West':
      this.moveWest(floorObj);
      break;
    case 'South':
      this.moveSouth(floorObj);
      break;
    case 'East':
      this.moveEast(floorObj);
      break;
  }
}
Player.prototype.moveNorth = function moveNorth(floorObj){
  if(this.y - 1 < 0|| typeof floorObj.roomArr[this.y - 1][this.x] != 'object'){
    console.log('The player runs into a wall and does not move');
    $('#map-info').append(playerOne.name + ' finds a wall blocking their path' + "<br>");
    return;
  }
  if(floorObj.roomArr[this.y - 1][this.x].isImport){
    console.log('You need a key to enter this room');
    $('#map-info').append(playerOne.name + ' needs a key to enter this room' + "<br>");
    var boxToMark = this.mapLocation - 1;
    $("#box" + boxToMark).addClass("locked");
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.y -= 1; //Updating Players Y pos
  this.initPlayerPos(floorObj); //Updating moved to room to know Player is now there
  console.clear();
  console.log('The player walked into the north room');
  $('#map-info').append(playerOne.name + ' traveled north' + "<br>");
  $("#box" + this.mapLocation).removeClass("current");
  $("#box" + this.mapLocation).addClass("explored");
  this.mapLocation -= 1;
  $("#box" + this.mapLocation).removeClass("explored");
  $("#box" + this.mapLocation).addClass("current");
  printFloor(dungeonOne);
  var myNum = combatRoll();
  var lootOdds = combatEncounter(myNum);
  lootCheck(lootOdds);
}
Player.prototype.moveWest = function moveWest(floorObj){
  if(this.x - 1 < 0 || typeof floorObj.roomArr[this.y][this.x - 1] != 'object'){
    console.log('The player runs into a wall and does not move');
    $('#map-info').append(playerOne.name + ' finds a wall blocking their path' + "<br>");
    return;
  }
  if(floorObj.roomArr[this.y][this.x - 1].isImport){
    console.log('You need a key to enter this room');
    $('#map-info').append(playerOne.name + ' needs a key to enter this room' + "<br>");
    var boxToMark = this.mapLocation - 5;
    $("#box" + boxToMark).addClass("locked");
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.x -= 1; //Updating Players X pos
  this.initPlayerPos(floorObj); //Updating moved to room to know Player is now there
  console.clear();
  console.log('The player walked into the west room');
  $('#map-info').append(playerOne.name + ' traveled west' + "<br>");
  $("#box" + this.mapLocation).removeClass("current");
  $("#box" + this.mapLocation).addClass("explored");
  this.mapLocation -= 5;
  $("#box" + this.mapLocation).removeClass("explored");
  $("#box" + this.mapLocation).addClass("current");
  printFloor(dungeonOne);
  var myNum = combatRoll();
  var lootOdds = combatEncounter(myNum);
  lootCheck(lootOdds);
}
Player.prototype.moveSouth = function moveSouth(floorObj){
  if(this.y + 1 > floorObj.row - 1 || typeof floorObj.roomArr[this.y + 1][this.x] != 'object'){
    console.log('The player runs into a wall and does not move');
    $('#map-info').append(playerOne.name + ' finds a wall blocking their path' + "<br>");
    return;
  }
  if(floorObj.roomArr[this.y + 1][this.x].isImport){
    console.log('You need a key to enter this room');
    $('#map-info').append(playerOne.name + ' needs a key to enter this room' + "<br>");
    var boxToMark = this.mapLocation + 1;
    $("#box" + boxToMark).addClass("locked");
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.y += 1; //Updating Players Y pos
  this.initPlayerPos(floorObj); //Updating moved to room to know PLayer is now there
  console.clear();
  console.log('The player walked into the south room');
  $('#map-info').append(playerOne.name + ' traveled south' + "<br>");
  $("#box" + this.mapLocation).removeClass("current");
  $("#box" + this.mapLocation).addClass("explored");
  this.mapLocation += 1;
  $("#box" + this.mapLocation).removeClass("explored");
  $("#box" + this.mapLocation).addClass("current");
  printFloor(dungeonOne);
  var myNum = combatRoll();
  var lootOdds = combatEncounter(myNum);
  lootCheck(lootOdds);
}
Player.prototype.moveEast = function moveEast(floorObj){
  if(this.x + 1 > floorObj.col - 1 || typeof floorObj.roomArr[this.y][this.x + 1] != 'object'){
    console.log('The player runs into a wall and does not move');
    $('#map-info').append(playerOne.name + ' finds a wall blocking their path' + "<br>");
    return;
  }
  if(floorObj.roomArr[this.y][this.x + 1].isImport){
    console.log('You need a key to enter this room');
    $('#map-info').append(playerOne.name + ' needs a key to enter this room' + "<br>");
    var boxToMark = this.mapLocation + 5;
    $("#box" + boxToMark).addClass("locked");
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.x += 1; //Updating Players X pos
  this.initPlayerPos(floorObj); //Updating moved to room to know PLayer is now there
  console.clear();
  console.log('The player walked into the east room');
  $('#map-info').append(playerOne.name + ' traveled east' + "<br>");
  $("#box" + this.mapLocation).removeClass("current");
  $("#box" + this.mapLocation).addClass("explored");
  this.mapLocation += 5;
  $("#box" + this.mapLocation).removeClass("explored");
  $("#box" + this.mapLocation).addClass("current");
  printFloor(dungeonOne);
  var myNum = combatRoll();
  var lootOdds = combatEncounter(myNum);
  lootCheck(lootOdds);
}

Player.prototype.getStats = function getStats(){
  if (this.job === "warrior") {
    $("#character-avatar").append('<img src="img/heros/warrior.png" weight="400px" height="400px" />');
    this.maxHP = 20;
    this.currentHP = 20;
    this.maxMP = 10;
    this.currentMP = 10;
    this.strength = 5;
    this.speed = 3;
    this.weapon = "rusted sword";
    this.specialName = "Guard";
    this.special = function special() {
      this.currentMP = this.currentMP - 3;
      $("#player-mp").empty().append("<br>" + "MP:" + this.currentMP + "/" + this.maxMP + "<br>");
      return "guard";
    };
  } else if (this.job === "wizard"){
    $("#character-avatar").append('<img src="img/heros/wizard.png" weight="400px" height="400px" />');
    this.maxHP = 10;
    this.currentHP = 10;
    this.maxMP = 10;
    this.currentMP = 10;
    this.strength = 2;
    this.speed = 4;
    this.weapon = "wooden staff";
    this.specialName = "Cast";
    this.special = function special() {
      $("#combat-log").append(this.name + " casts fireball" + "<br>");
      this.currentMP = this.currentMP - 3;
      $("#player-mp").empty().append(this.name + " MP:" + this.currentMP + "/" + this.maxMP + "<br>");
      return "fireball";
    };
  } else if (this.job === "archer"){
    $("#character-avatar").append('<img src="img/heros/archer2.png" weight="400px" height="400px" />');
    this.maxHP = 15;
    this.currentHP = 15;
    this.maxMP = 10;
    this.currentMP = 10;
    this.strength = 3;
    this.speed = 5;
    this.weapon = "worn bow";
    this.specialName = "Barrage";
    this.special = function special() {
    };
  }
}

Player.prototype.createLifeBar = function createLifeBar(){
  let health = document.getElementById("player-health");
  health.value = this.currentHP
  health.max = this.maxHP
  let magic = document.getElementById("player-magic");
  magic.value = this.currentMP
  magic.max = this.maxMP
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
let health = document.getElementById("player-health");
health.value -= damageTaken;
if (this.currentHP <= 0) {
  this.alive = false;
  }
}

//Player item functions
Player.prototype.addPotion = function addPotion(){
  this.potions = this.potions + 1;
}

Player.prototype.usePotion = function usePotion(){
  this.potions = this.potions - 1;
  if ((this.maxHP - this.currentHP) < 8){
    this.currentHP = this.maxHP
  } else {
  this.currentHP = this.currentHP + 8;
  }
  let health = document.getElementById("player-health");
  health.value += 8;
  alert(health.value);
}

Player.prototype.equip = function equip(weaponName, weaponAtk){
this.weapon = weaponName;
this.strength = this.strength + weaponAtk;
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
  if (this.type === "Imp") {
    this.maxHP = 6;
    this.currentHP = 6;
    this.strength = 1;
    this.speed = 1;
    this.weapon = "fangs";
    $("#enemy-image").empty().append('<img src="img/enemies/imp2.png" weight="400px" height="400px" />');
  } else if (this.type === "Golem") {
    this.maxHP = 15;
    this.currentHP = 15;
    this.strength = 4;
    this.speed = 2;
    this.weapon = "fist";
    $("#enemy-image").empty().append('<img src="img/enemies/golem.png" weight="400px" height="400px" />');
  } else if (this.type === "Undead") {
    this.maxHP = 10;
    this.currentHP = 10;
    this.strength = 4;
    this.speed = 10;
    this.weapon = "dark aura";
    $("#enemy-image").empty().append('<img src="img/enemies/undead.png" weight="400px" height="400px" />');
  } else if (this.type === "Dragon") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.strength = 10;
    this.speed = 4;
    this.weapon = "firebreath";
    $("#enemy-image").empty().append('<img src="img/enemies/dragon3png.png" weight="400px" height="400px" />');
  }
}

Enemy.prototype.createLifeBar = function createLifeBar(){
  let health = document.getElementById("enemy-health");
  health.value = this.currentHP;
  health.max = this.maxHP;
}

Enemy.prototype.enemyTurn = function enemyTurn(){
  var damageTaken = this.strength;
  playerOne.takeDamage(damageTaken);
  $("#combat-log").append("<br>" + this.type + " attacked with their " + this.weapon + "<br>" + playerOne.name + " took " + damageTaken + " damage" + "<br>");
  $("#player-hp").empty().append("<br>" + "HP:" + playerOne.currentHP + "/" + playerOne.maxHP + "<br>");
  $("#enemy-hp").empty().append("<br>" + " HP:" + this.currentHP + "/" + this.maxHP + "<br>");
}

Enemy.prototype.takeDamage = function takeDamage(damageTaken){
this.currentHP = this.currentHP - damageTaken;
let health = document.getElementById("enemy-health");
health.value -= damageTaken;
$("#enemy-hp").empty().append("<br>" + " HP:" + this.currentHP + "/" + this.maxHP + "<br>");
if (this.currentHP <= 0) {
  this.alive = false;
  }
}

//Helper Functions
function combatEncounter(myRoll){
  if(myRoll <= 55){
    console.log('The room seems to be utterly devoid of hostile forces...');
    return false;
  }else if(myRoll > 55 && myRoll <= 65){
    console.log('You have been attacked by an '+enemyTable[2].type+'!');
    combatBegin(playerOne, enemyTable[2]);
    return true;
  }else if(myRoll > 65 && myRoll <= 80){
    console.log('You have been attacked by an '+enemyTable[1].type+'!');
    combatBegin(playerOne, enemyTable[1]);
    return true;
  }else if(myRoll > 80 && myRoll <= 100){
    console.log('You have been attacked by an '+enemyTable[0].type+'!');
    combatBegin(playerOne, enemyTable[0]);
    return true;
  }
  return false;
}
function printFloor(floorObj){
  console.log('Printing out our floor Layout');
  for(var i = 0; i < floorObj.row; i++){
    var rowStr = '';
    for(var j = 0; j < floorObj.col; j++){
      var colStr = '';
      if(floorObj.roomArr[i][j].playerHere === true){
        colStr = '[ P ]';
        rowStr += colStr;
        continue;
      }
      if(floorObj.roomArr[i][j].containsKey === true){
        colStr = '[ K ]';
        rowStr += colStr;
        continue;
      }
      if(floorObj.roomArr[i][j].containsBoss === true){
        colStr = '[ B ]';
        rowStr += colStr;
        continue;
      }
      if(floorObj.roomArr[i][j].containsTreasure === true){
        colStr = '[ T ]';
        rowStr += colStr;
        continue;
      }
      if(floorObj.roomArr[i][j] === 0){
        colStr = '[   ]';
      }else{
        colStr = '['+i+','+j+']';
      }

      if(j === floorObj.col - 1){
        colStr += '\n';
      }
      rowStr += colStr;
    }
    console.log(rowStr);
    $('#display-map').text(rowStr);
  }
}
function keyPressReady(inputObj){
  inputObj.keyPressed = false;
  console.log('Ready to receive input');
}
function randNum(max, min){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function determineTurnOrder(playerSpeed, enemySpeed) {
  if (playerSpeed >= enemySpeed) {
    return true;
  } else {
    return false;
  }
}

function checkForDeath(playerStatus, enemyStatus, playerObj) {
  if (playerStatus === false) {
    function gameOver() {
      $("#combat-log").append("<br>" + playerObj.name + " was defeated" + "<br>" + "<strong><span id='death'>YOU DIED</span></strong>");
      location.reload()
    }
    setTimeout(gameOver, 4000)
  } else if (enemyStatus === false) {
    $("#combat-log").append("<br>" + playerObj.name + " defeats the enemy" + "<br>" + "<strong>You won!</strong>");
    function exitCombat() {
      $(".combat-UI").hide();
      $("#combat-log").empty();
      $(".dungeon-UI").show()
    }
    setTimeout(exitCombat, 4000);
  }
}
function combatRoll(){
  var myRoll = randNum(100, 0);
  console.log(myRoll);
  return myRoll;
}
function lootCheck(myBool){
  var lootRoll = randNum(100, 0);
  console.log('Your loot roll is '+lootRoll+' and your monster kill is: '+myBool);
  if(myBool ? lootRoll <= 75 : lootRoll <= 25){
    console.log(myBool ? "You rummage through the monster's remains and manage to find a potion!" : "You look around the empty room and spot a potion in some rubble...");
  }else{
    console.log(myBool ? "The monster had nothing on it....." : "The room appears to be entirely empty...");
  }
}


function combatBegin(playerObj, enemyObj){
  $(".dungeon-UI").hide();
  $(".combat-UI").show();
  $("#player-name-display").empty().append(playerObj.name);
  $("#player-hp").empty().append("<br>" + " HP:" + playerObj.currentHP + "/" + playerObj.maxHP);
  playerObj.createLifeBar();
  $("#player-mp").empty().append("MP:" + playerObj.currentMP + "/" + playerObj.maxMP + "<br>");
  enemyObj.getStats()
  $("#combat-log").append("<br>" + enemyObj.type + " attacked!" + "<br>");
  currEnemy = enemyObj;
  $("#enemy-name-display").empty().append(enemyObj.type);
  $("#enemy-hp").empty().append("<br>" + " HP:" + enemyObj.currentHP + "/" + enemyObj.maxHP + "<br>");
  enemyObj.createLifeBar();
  var firstMove = determineTurnOrder(playerObj.speed, enemyObj.speed, playerObj);
  if (firstMove === false) {
    enemyObj.enemyTurn();
    checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
  }
}
function combatAttack(playerObj, enemyObj, isSpecial){
  if(!isSpecial){
    var damageDone = playerObj.fight();
    enemyObj.takeDamage(damageDone);
    $("#combat-log").append("<br>" + playerObj.name + " attacked with their " + playerObj.weapon + "<br>" + enemyObj.type + " took " + damageDone + " damage " + "<br>");
    checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
    if (enemyObj.alive === true) {
      enemyObj.enemyTurn();
      checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
    }
  }else{
    var specialEffect = playerObj.special();
    if (specialEffect === "guard") {
      $("#combat-log").append("<br>" + playerObj.name + "took a defensive stance and boosted their defence" + "<br>");
      enemyObj.strength = enemyObj.strength - 1;
      checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
      if (enemyObj.alive === true) {
        enemyObj.enemyTurn();
        checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
      }
    } else if (specialEffect === "fireball") {
      enemyObj.takeDamage(8);
      $("#combat-log").append("<br>" + enemyObj.type + " took 8 damage from the spell" + "<br>");
      checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
      if (enemyObj.alive === true) {
        enemyObj.enemyTurn();
        checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
      }
    } else {
      $("#combat-log").append("<br>" + playerObj.name + " unleashed a barrage of arrows" + "<br>");
      for (var i = 0; i < 5; i++) {
        var shot = Math.floor((Math.random() * 5 ) + 1);
        if (enemyObj.alive === true) {
          if (shot <= 1) {
            $("#combat-log").append("<br>" + playerObj.name + "'s attack missed" + "<br>");
            break;
          } else {
            $("#combat-log").append("<br>" + enemyObj.type + " took " + shot + "damage" + "<br>");
            enemyObj.takeDamage(shot);
              checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
          }
        }
      }
      if (enemyObj.alive === true) {
        enemyObj.enemyTurn();
        checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
      }
    }
  }
}
function combatHeal(playerObj, enemyObj){
  if (playerObj.potions === 0) {
    $("#combat-log").append("<br>" + playerObj.name + " has no potions to use" + "<br>");
    return;
  } else {
    playerObj.usePotion();
    $("#combat-log").append("<br>" + playerObj.name + " used a potion and recovered 8 HP" + "<br>");
  }
  $("#player-hp").empty().append("<br>" + " HP:" + playerObj.currentHP + "/" + playerObj.maxHP + "<br>");
  $("#enemy-hp").empty().append("<br>" + " HP:" + enemyObj.currentHP + "/" + enemyObj.maxHP + "<br>");
  enemyObj.enemyTurn();
  checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
}
function escapeCombat(playerObj, enemyObj){
  var success = playerObj.run();
  if (success === true) {
    $("#combat-log").append("<br>" + playerObj.name + " successfully ran away" + "<br>");
    setTimeout(exitCombat, 4000);
    $("#combat-log").empty();
  } else {
    $("#combat-log").append("<br>" + playerObj.name + " failed to run away" + "<br>");
    enemyObj.enemyTurn();
    checkForDeath(playerObj.alive, enemyObj.alive, playerObj);
  }
}

function exitCombat() {
  $(".combat-UI").hide();
  $(".dungeon-UI").show()
}
//globals
let myInputs = new Keys(); //Init which Keys are detected
let dungeonOne = new Floor(5, 5);// 64 tile grid
//dungeonOne.constructFloors();
let playerOne = new Player(dungeonOne.row - 1, 0);
let enemyTable = [];
let enemyImp = new Enemy("Imp");
enemyTable.push(enemyImp);
let enemyGolem = new Enemy("Golem");
enemyTable.push(enemyGolem);
let enemyUndead = new Enemy("Undead");
enemyTable.push(enemyUndead);
let enemyDragon = new Enemy("Dragon");
let currEnemy;
console.log(enemyTable);
$('#display-map').append(enemyTable);
dungeonOne.generateKeyRooms(playerOne);
console.log(dungeonOne.roomArr);
$('#display-map').append(dungeonOne.roomArr);
playerOne.initPlayerPos(dungeonOne);
printFloor(dungeonOne);

//User input logic
$(document).ready(function() {
  $("#character-img").hide();
  $("#archer-info").hide();
  $("#wizard-info").hide();
  $("#warrior-info").hide();

  $('.clickable').click(function(){
    var value = $(this).html();
    console.log(value);
    playerOne.moveGrid(value, dungeonOne);
  });

  $("#start-button").click(function(){
    $(".landing-UI").hide();
    $("#character-img").show();
  });

  $('.character-image').click(function(){
    var myImg = $(this).attr('value');
    // console.log('You clicked on: '+myImg);
    if (myImg == "Archer") {
      playerOne.job = "archer";
      $("#wizard-info").hide()
      $("#warrior-info").hide()
      $("#archer-info").fadeIn()
      $(".start-UI").show();
    } if (myImg == "Wizard") {
      playerOne.job = "wizard";
      $("#archer-info").hide()
      $("#warrior-info").hide()
      $("#wizard-info").fadeIn()
      $(".start-UI").show();
    } if (myImg == "Warrior") {
      playerOne.job = "warrior";
      $("#archer-info").hide()
      $("#wizard-info").hide()
      $("#warrior-info").fadeIn()
      $(".start-UI").show();
    }
  });

  $("#start-game").click(function(event) {
    event.preventDefault();
    $(".start-UI").hide();
    $(".dungeon-UI").show()
    $("#box5").addClass("explored");
    $("#archer-info").hide();
    $("#wizard-info").hide();
    $("#warrior-info").hide();
    $("#character-name").hide();
    $("#start-game").hide();
    $("#select-character").hide();
    $("#back").hide();
    $("#character-img").hide();
    playerOne.name = $("#character-name").val();
    playerOne.getStats();
    $("#special-name").append(playerOne.specialName);
    // combatBegin(playerOne, enemyImp);
  });
  $("#attack-combat").click(function(event) {
    event.preventDefault();
    combatAttack(playerOne, currEnemy, false);
  });

  $("#special-combat").click(function(event) {
    event.preventDefault();
    combatAttack(playerOne, currEnemy, true);
  });

  $("#potion-combat").click(function(event) {
    event.preventDefault();
    combatHeal(playerOne, currEnemy);

  });

  $("#run-combat").click(function(event) {
    event.preventDefault();
    escapeCombat(playerOne, currEnemy);
  });
});
//Game Loop
function draw(){
  requestAnimationFrame(draw);
}
draw();
