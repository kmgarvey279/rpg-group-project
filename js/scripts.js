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
Floor.prototype.constructFloors = function constructFloors(){
  console.log('Populating Floor with Rooms');
  for(var i = 0; i < this.row; i++){
    for(var j = 0; j < this.col; j++){
      this.roomArr[i][j] = new Room(i, j);
    }
  }
}
Floor.prototype.generateKeyRooms = function generateKeyRooms(playerObj){
  var playerRoom = new Room(playerObj.y, playerObj.x, false);
  this.roomArr[playerObj.y][playerObj.x] = playerRoom;
  var bossY = randNum(Math.floor(this.row/2), 0);
  var bossX = randNum(this.col - 1, Math.floor(this.col/2));
  var bossRoom = new Room(bossY, bossX, true);
  this.roomArr[bossY][bossX] = bossRoom;
  playerRoom.buildPath(bossRoom, this);
  var bossKeyY = randNum(this.row - 1, 0);
  var bossKeyX = randNum(this.col -1, 0);
}
Floor.prototype.checkArr = function checkArr(posY, posX){
  var newRoom;
  if(typeof this.roomArr[posY][posX] != 'object'){
    newRoom = new Room(posY, posX);
    return newRoom;
  }else{
      return closestEmpty(posY, posX);
  }
}
Floor.prototype.closestEmpty = function closestEmpty(posY, posX){
  var closestRoom;
  var closePosY;
  var closeposX;
  var distanceFrom = this.row + this.col;
  for(var i = 0; i < this.row - 1; i++){
    for(var j = 0; j < this.col - 1; j++){
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
          closeposX = j;
        }
      }
    }
  }
  if(closePosY === null){
    console.log('Array is already FULL, cannot insert');
    return;
  }
  closestRoom = new Room(closePosY, closeposX, false);
  return closestRoom;
}


//Room class and its protoypes
class Room{
  constructor(posY, posX, isKey){
    this.y = posY;
    this.x = posX;
    this.keyRoom = isKey;
  }
  beenTraveled = false;
  playerHere = false;
}
Room.prototype.findClosest = function findClosest(){

}
Room.prototype.buildPath = function buildPath(roomObjNext, floorObj){
  var startY;
  var startX;
  var smallestY;
  var shortestX;
  if(this.y > roomObjNext.y){
    startY = this.y;
    smallestY = roomObjNext.y;
  }else{
    startY = roomObjNext.y;
    smallestY = this.y;
  }
  if(this.x > roomObjNext.x){
    startX = this.x;
    smallestX = roomObjNext.x;
  }else{
    startX = roomObjNext.x;
    smallestX = this.x;
  }
  var myChance = randNum(2, 1);
  if(myChance === 1){
    floorObj.roomArr[startY][startX] = new Room(startY, startX);
    for(var i = smallestY; i < startY; i++){
      floorObj.roomArr[i][startX] = new Room(i, startX);
    }
    for(var i = smallestX; i < startX; i++){
      floorObj.roomArr[startY][i] = new Room(startY, i);
    }
  }else{
    floorObj.roomArr[smallestY][smallestX] = new Room(smallestY, smallestX);
    for(var i = startY - 1; i > smallestY; i--){
      floorObj.roomArr[i][smallestX] = new Room(i, smallestX);
    }
    for(var i = startX - 1; i > smallestX; i--){
      floorObj.roomArr[smallestY][i] = new Room(smallestY, i);
    }
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
  if(this.y - 1 < 0){
    console.log('The player runs into a wall and does not move');
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
  if(this.x - 1 < 0){
    console.log('The player runs into a wall and does not move');
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
  if(this.y + 1 > floorObj.row - 1){
    console.log('The player runs into a wall and does not move');
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
  if(this.x + 1 > floorObj.col - 1){
    console.log('The player runs into a wall and does not move');
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
      if(floorObj.roomArr[i][j] === 0){
        colStr = '[ X ]';
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
