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

//Room class and its protoypes
class Room{
  constructor(posY, posX){
    this.y = posY;
    this.x = posX;
  }
  beenTraveled = false;
  playerHere = false;
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
      }else{
        colStr = '['+i+','+j;
        if(j === floorObj.col - 1){
          colStr += ']\n';
        }else{
          colStr += ']';
        }
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
//globals
const myInputs = new Keys(); //Init which Keys are detected
let dungeonOne = new Floor(4, 4);
dungeonOne.constructFloors();
console.log(dungeonOne.roomArr);
let playerOne = new Player(3, 0);
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
