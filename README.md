#     Wizard's Maze 


A short guessing game with rpg battle elements. 
Choose doors to find the right pattern and escape the maze. 
_____________
When a player enters a new room a random enemy may be generated. When an enemy is encountered a turn by turn battle phase begins. in this phase players can choose to cast a fireball spell, a heal spell or to run. Your Fireball spell does 10 damage, your Heal spell will give you 20 health points, Run give you a 50% chance to escape the battle. The monster will always attack. If you find the right pattern you will exit the maze and win the game. 

## Technologies used:

+ JavaScript
+ Jquery
+ Css
+ HTML
  
## Approach:
Original idea went through a few variations.
Planned out basic play screens on paper and figured out necessary buttons. Created three objects to store data and interact. 

+ The player object which has the relevant functions, and the players health.
+ A Game object which does most of the heavy lifting and stores the game win state.
+ A Monster class which the game calls to randomly generate monsters. Holds the Attack for the monster to attack

---------------------------------------
Started with writing Javascript 
  
## Challenges:

+ Getting the overall structure to work was challenging. I rearranged the classes/ objects about three times, but learned a lot.
  
+ Making the health bars work and getting them to update right.
  
+ had trouble delaying text and making the text box in the battle screen look good.  
  
+ Figuring out how to implement the enemy's attacks was tricky. I called the function on the end of each player move after.    

## Additional Info:
+ Most images are from Wiki commons but some are from other places, I plan on making my own art so these are place holders. I want to add a few more monsters and give them a functions to select from diffrent moves instead of just attacking.
  
+ inspiration from the maze at the end of Link's Awakening(GBC) and the fight screen in Pokemon.
     
## Demo Link

[link](https://mikeod92.github.io/Wizards_Maze/) ~~_Wizard's Maze Game



