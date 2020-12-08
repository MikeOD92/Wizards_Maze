$(()=>{
  
    class Monster {
      constructor(name,health,damage){
        this.name = name;
        this.health = health;
        this.damage = damage;
      }
      monstAttack() {
        let chance = Math.floor(Math.random()*2);
        if(chance === 0){// this is the monsters attack. It randomly decides if it hit or misses
          console.log( `${this.name}'s attack missed`);
        } else {
          game1.playerHealth -= this.damage;
          $('#health-bar').css('width',`${game1.playerHealth}px`);
          console.log(`${this.name}'s attack hit the players health is ${game1.playerHealth}`);
        }
        if(game1.playerHealth <= 0){
          console.log('game over')
        }
      }
    
    }
    class Game {
      constructor(){
        this.pattern = [];
        this.enemy = undefined;
        this.monsterTypes = ['Demon','Skeleton','Seperent']; 
        this.playerHealth = 100;
        }
      //// method to spawn monster
      spawnMonsters(){

        //randomly decide if monsters are in new room or not
        let chance = Math.floor(Math.random()*2);
          // if chance = 0 generate a random monster and push into enemies array
        if( chance === 0 ){
          let ranName = this.monsterTypes[Math.floor(Math.random()*3)];
          let ranHealth = 10 + Math.floor(Math.random()*50); 
          let ranDamage = 16 + Math.floor(Math.random()*10);
          
          const baddy1 = new Monster(ranName,ranHealth,ranDamage);
          // our new bad guy is pushed into the enemies array
          this.enemy = baddy1;
          
        } else {
          return// if chance is not = 0 no monster is generated
        }
      }
      newRoom(){
        this.enemy = undefined;
        // called when a new room is entered
        this.spawnMonsters();
        //creates monsters by running spawn function
        // if there are enemies in the array we start the battle function. 
        if (this.enemy !== undefined){
          this.startBattle();
          console.log(this.enemy);
        } else {
        return
        }
       
        // otherwise nothing happens we just entered the room
      }
      //// these function for some reason done seem to connect to the class
      fireball(){
        //// this kinda works but i have no idea why im calling these as game1.enemy.health as opposed to this.enemy
        game1.enemy.health -= 10;
        console.log(`the players fireball did 10 damage the ${game1.enemy.name} health is now ${game1.enemy.health}`);
        game1.checkBattle();
        if (game1.enemy !== undefined){
        game1.enemy.monstAttack();
      }}
      heal(){
        console.log(game1.playerHealth);
        game1.playerHealth += 10;
        console.log(game1.playerHealth);
      }
      run(){
        $('#battle').css('display','none');
        $('#move-room-buttons').css('display','flex');
        game1.enemy = undefined;
          
      }
      startBattle(){
        $('#battle').css('display','block');
        $('#move-room-buttons').css('display','none');

      }
      checkBattle(){
        if (game1.enemy.health <= 0){
          console.log(`the ${game1.enemy.name} has been slain`)
          game1.enemy = undefined;
          $('#battle').css('display','none');
          $('#move-room-buttons').css('display','flex');
        }
        
   
      }
      checkPattern(){
        if (game1.pattern === ['left','right','left']){
          console.log('congrats you found your way out!');
        } else if (game1.pattern.length = 4){
          game1.pattern = [];
        }
      }
    }
    
    
      const $welcome = $('#welcome');
      const $startbutton = $('#start');
      const $howto = $('#how-to');
      const $closeHowto = $('#close-inst');
      const $instruction = $('#instructions');
      
      $startbutton.on('click',()=>{
        $welcome.css('display','none');
      });
      $howto.on('click',()=>{
        $instruction.css('display','block');
      });
      $closeHowto.on('click',()=>{
         $instruction.css('display','none');
      });
      
      //////////////////movement button listneners
const game1 = new Game();

const $left = $('#left');
const $right = $('#right');

$left.on('click',()=>{
  game1.pattern.push('left');
  console.log(game1.pattern);
  game1.newRoom();
})
$right.on('click',()=>{
  game1.pattern.push('right');
  console.log(game1.pattern);
  game1.newRoom();
})
////////battle button listeners 
$('#fireball').on('click', game1.fireball);
$('#run').on('click', game1.run);
$('#heal').on('click', game1.heal);

    });