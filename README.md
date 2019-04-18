# _Drakania. Text Based RPG Game._

#### _Drakania is a text based RPG game. By exploring the dungeon user can find different items, fight enemies and finally get to the boss room and win,  04/18/2019_

#### By _**Ian Christner, Kevin Garvey, Brendan Moroso, Svitlana Filatova**_

## Description

1. _Start the game by pushing on a "Start Game" button._
_Example._
_Input: "Start Game" button activated._
_Output: characters screen appears._


2. _Select character you wish._
_Example._
_Input: "Archer" character selected._
_Output: an information about character appears with "Name" textfield; the "Enter Dungeon" button appears._


3. _Enter the name you like for your character._
_Example._
_Input: "Lana"._
_Output: name "Lana" appears in every game screen ("combat" screen, "exploring" screen)._


4. _Push "Enter Dungeon" button to enter the dungeon's room._
_Example._
_Input: "Enter Dungeon" button activated._
_Output: the "exploring" screen appears. User can see the map of a dungeon and a log panel._


5. _Choose the way you want to go and push one of the buttons: "East", "West", "North", "South"._
_Example._
_Input: "North" button activated._
_Output (screen): user can see their current position on a map._
_Output (log panel): "Lana traveled north"._


6. _On your path you have a chance to meet enemies, find walls, keys, boss monster room. With every step an information changes in the log panel._
_Example: you found a wall._
_Input: "East" button activated._
_Output (screen): user can see their current position on a map._
_Output (log panel): "Lana finds a wall blocking their path"._

_Example: you found a boss monster room._
_Input: "South" button activated._
_Output (screen): user can see their current position on a map._
_Output (log panel): "Lana need a key to enter this room"._

_Example: you found a key._
_Input: "West" button activated._
_Output (screen): user can see their current position on a map._
_Output (log panel): "Lana found a key"._


7. _If you meet an enemy you'll be relocated to "combat" mode._
_Example: class Archer._
_Input: "West" button activated._
_Output (screen): user switched to "combat" mode screen. Images of character and enemy appears; new buttons appears: "Attack", "Barrage", "Use potion", "Run"._

_Input: "Attack" button activated._
_Output (log panel): "Lana attacked. Imp took 2 damage. Imp attacked. Lana took 1 damage."_

_Input: "Barrage" button activated._
_Output (log panel): "Lana used a special skill Barrage. Imp took 5 damage."_

_Input: "Use potion" button activated._
_Output (log panel): "Lana used a potion and recovered 8 HP"._

_Input: "Run" button activated._
_Output (log panel): "Lana failed to run away"._


8. _When battle is finished you'll be relocated to "exploring" mode._
_Example._
_Input: "Attack" button activated._
_Output (log panel): "You won!"_
_Output (screen): user can see their current position on a map._


9. _The game is over if you defeat or if you won the battle with the boss monster._
_Example._
_Input: "Attack" button activated._
_Output (log panel): "You won!"_
_Output (screen): user switched to characters screen._

10. _After killing the boss monster you have a chance to roll a health potion_


## Setup/Installation Requirements

* _Clone this repository_
* _Open index.html in a web browser of your choice._

## Known Bugs / Limitations

* _"Name" textbox input: user can enter any character._
* _UI: images of enemies are not responsive._

## Support and contact details

_Contact:
_Ian Christner at ianchristner@gmail.com._
_Kevin Garvey at kmgarvey279@gmail.com._
_Brendan Moroso at brendan.moroso@gmail.com._
_Svitlana Filatova at svitlana.filatova@gmail.com._

## Technologies Used

_JavaScript_
_CSS_
_HTTP_

### License

*This software (sans images) is licensed under the MIT license.*

Copyright (c) 2019 **_Ian Christner, Kevin Garvey, Brendan Moroso, Svitlana Filatova_**
