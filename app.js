$(()=>{
  
    class Monster {
      constructor(name,health,damage){
        this.name = name;
        this.health = health;
        this.damage = damage;
      }
      monstAttack() {
        let chance = Math.floor(Math.random()*Math.floor(2));
        if(chance === 0){// this is the monsters attack. It randomly decides if it hit or misses
          console.log( `${this.name}'s attack missed`);
        } else {
          game1.playerHealth -= this.damage;
          $('#health-bar').css('width',`${game1.playerHealth}px`);
          console.log(`${this.name}'s attack hit the players health is ${game1.playerHealth}`);
        }
        if(game1.playerHealth <= 0){
          game1.gameOver();
        }
      }
    
    }


    class Game {
      constructor(){
        this.pattern = [];
        this.winPattern = ["left", "right", "right", "left", "left", "left"];
        this.enemy = undefined;
        this.monsterTypes = ['Demon','Skeleton','Serpent']; 
        this.playerHealth = 100;
        }
      //// method to spawn monster
      spawnMonsters(){
        //randomly decide if monsters are in new room or not
        let chance = Math.floor(Math.random()* Math.floor(3));
          // if chance = 0 generate a random monster as this.enemy
        if( chance === 0 ){
          let ranName = this.monsterTypes[Math.floor(Math.random() * Math.floor(3))];
          let ranHealth = 10 + Math.floor(Math.random()* Math.floor(50)); 
          let ranDamage = 16 + Math.floor(Math.random()* Math.floor(10));
          
          const baddy1 = new Monster(ranName,ranHealth,ranDamage);
          // our new bad guy is pushed into the enemies array
          this.enemy = baddy1;
          
        } else {
          return// if chance is not = 0 no monster is generated
        }
      }
      newRoom(){
        this.checkPattern(); // check the winstate of the game
        this.enemy = undefined;
        $('#rooms-visited').append(`<li> ${this.pattern[this.pattern.length-1]}</li>`);
        // called when a new room is entered
        this.spawnMonsters();
        //creates monsters by running spawn function
        // if there are enemies in the array we start the battle function. 
        if (this.enemy !== undefined){
          this.startBattle();
        } else {
        return
        }
        // otherwise nothing happens we just entered the room
      }
      //// these function for some reason dont seem to connect to the class
      fireball(enemy){
        //// this kinda works but i have no idea why im calling these as game1.enemy.health as opposed to this.enemy
        
        enemy.enemy.health -= 10;
        console.log(`the players fireball did 10 damage the ${enemy.enemy.name} health is now ${enemy.enemy.health}`);
        game1.checkBattle();
        if (game1.enemy !== undefined){
        game1.enemy.monstAttack();
      }}
      heal(player){
        if (game1.playerHealth < 100){
        player.playerHealth += 15;
        $('#health-bar').css('width',`${player.playerHealth}px`);
        } else {
          console.log('your health is full');
        }
        game1.enemy.monstAttack()
      }
      run(){
        let chance = Math.floor(Math.random()*Math.floor(2));
          if (chance === 0){
            $('#battle').css('display','none');
            $('#move-room-buttons').css('display','flex');
            this.enemy = undefined;
          } else{
            console.log('you could not get away');
            game1.enemy.monstAttack()
          }
      
      }
      startBattle(){
        const $enemyContainer = $('#attacking-monster');
        $('#battle').css('display','block');
        $('#move-room-buttons').css('display','none');
        switch(this.enemy.name){
          case 'Skeleton':
          $enemyContainer.css('background-image','url("img/skeleton.jpeg")')
          break
          case 'Demon':
          $enemyContainer.css('background-image','url("img/demon.jpg")') 
          break
          case 'Serpent':
          $enemyContainer.css('background-image','url("img/serpent.jpg")')  
        }
      }
      checkBattle(){
        if (game1.enemy.health <= 0){
          console.log(`the ${game1.enemy.name} has been slain`)
          game1.enemy = undefined;
          $('#battle').css('display','none');
          $('#move-room-buttons').css('display','flex');
          
        }
        
   
      }
      checkPattern(){//this.pattern, this.winPattern
        let checker = true;
        console.log(this.winPattern)
        console.log(this.pattern);
        
        if(this.winPattern.length !== this.pattern.length){
          checker = false;
        } else {
          for(let i = 0; i < this.winPattern.length; i++){
            if(this.winPattern[i] !== this.pattern[i]){
              checker = false;
            } 
          }
        }
        if (checker === true){
          this.win();
        } else if (game1.pattern.length > 6){
          game1.pattern = [];
          $('#rooms-visited li').remove();
        }
      }
      gameOver(){
        $("#gameover-screen").css('display','flex');
      }
      win(){
        $('#win-screen').css('display','flex');
      }
    }
    
   /////////////welcome screen and how to play buttons  
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
let game1 = new Game();
console.log(game1);
const $left = $('#left');
const $right = $('#right');

$left.on('click',()=>{
  game1.pattern.push('left');
  game1.newRoom();
})
$right.on('click',()=>{
  game1.pattern.push('right');
  game1.newRoom();
})
////////battle button listeners 
$('#fireball').on('click', ()=>{
  game1.fireball(game1)
});
$('#run').on('click', game1.run);
$('#heal').on('click', ()=>{
  game1.heal(game1)
});
$('.new-game').on('click', ()=>{
  
  game1.pattern = [];
  game1.enemy = undefined;
  game1.playerHealth = 100;
  $('#rooms-visited').empty();
  $('#health-bar').css('width',`${game1.playerHealth}px`);
  $("#gameover-screen").css('display','none');
  $('#win-screen').css('display','none');
})
    });