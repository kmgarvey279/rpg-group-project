//Key class, which holds our desired User-Inputs
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
  constructor(startPosY, startPosX){
    this.y = startPosY;
    this.x = startPosX;
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
    return;
  }
  if(floorObj.roomArr[this.y - 1][this.x].isImport){
    console.log('You need a key to enter this room');
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.y -= 1; //Updating Players Y pos
  this.initPlayerPos(floorObj); //Updating moved to room to know Player is now there
  console.clear();
  console.log('The player walked into the north room');
  printFloor(dungeonOne);
}
Player.prototype.moveWest = function moveWest(floorObj){
  if(this.x - 1 < 0 || typeof floorObj.roomArr[this.y][this.x - 1] != 'object'){
    console.log('The player runs into a wall and does not move');
    return;
  }
  if(floorObj.roomArr[this.y][this.x - 1].isImport){
    console.log('You need a key to enter this room');
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.x -= 1; //Updating Players X pos
  this.initPlayerPos(floorObj); //Updating moved to room to know Player is now there
  console.clear();
  console.log('The player walked into the west room');
  printFloor(dungeonOne);
}
Player.prototype.moveSouth = function moveSouth(floorObj){
  if(this.y + 1 > floorObj.row - 1 || typeof floorObj.roomArr[this.y + 1][this.x] != 'object'){
    console.log('The player runs into a wall and does not move');
    return;
  }
  if(floorObj.roomArr[this.y + 1][this.x].isImport){
    console.log('You need a key to enter this room');
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.y += 1; //Updating Players Y pos
  this.initPlayerPos(floorObj); //Updating moved to room to know PLayer is now there
  console.clear();
  console.log('The player walked into the south room');
  printFloor(dungeonOne);
}
Player.prototype.moveEast = function moveEast(floorObj){
  if(this.x + 1 > floorObj.col - 1 || typeof floorObj.roomArr[this.y][this.x + 1] != 'object'){
    console.log('The player runs into a wall and does not move');
    return;
  }
  if(floorObj.roomArr[this.y][this.x + 1].isImport){
    console.log('You need a key to enter this room');
    return;
  }
  floorObj.roomArr[this.y][this.x].playerHere = false;
  this.x += 1; //Updating Players X pos
  this.initPlayerPos(floorObj); //Updating moved to room to know PLayer is now there
  console.clear();
  console.log('The player walked into the east room');
  printFloor(dungeonOne);
}
//Helper Functions
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
  }
}
function keyPressReady(inputObj){
  inputObj.keyPressed = false;
  console.log('Ready to receive input');
}
function randNum(max, min){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//globals
const myInputs = new Keys(); //Init which Keys are detected
let dungeonOne = new Floor(8, 8);// 64 tile grid
//dungeonOne.constructFloors();
let playerOne = new Player(dungeonOne.row - 1, 0);
dungeonOne.generateKeyRooms(playerOne);
console.log(dungeonOne.roomArr);
playerOne.initPlayerPos(dungeonOne);
printFloor(dungeonOne);

//Front End Logic
$(document).ready(function(){
  $('.clickable').click(function(){
    var value = $(this).html();
    console.log(value);
    playerOne.moveGrid(value, dungeonOne);
  });
});

//Game Loop
function draw(){
  requestAnimationFrame(draw);
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

}
draw();
