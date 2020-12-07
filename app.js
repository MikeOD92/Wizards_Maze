$(()=>{
  
    class Player {
      constructor(){
        this.health = 100;
        this.inventory = [];
        this.currentRoom = 10;
        this.previousRoom = undefined;
        
        
      }
      //////Methods for each spell 
      fireball(){
        
      }
      heal(){
        
      }
      run(){
        let chance = Math.floor(Math.random()*2)
       
        
      }
      pickUp(event){
        this.inventory.push(event.currentTarget);
      }
      attack(enemy){
        enemy.health -= 5;
        console.log(`players attack hit the ${enemy.name} health is ${enemy.health}`);
        
      }
    }
    ////// initiate a player 
    const player1 = new Player();
    
    ///////////////////////////////////////////
    
    const monsterTypes = ['Demon','Kobal', 'Seperent'];
      
    /////////////////////////class for making monsters 
    
    
    class Monster {
      constructor(name,health,damage){
        this.name = name;
        this.health = health;
        this.damage = damage;
        
      }
      attack(){
        let chance = Math.floor(Math.random()*2)
        if(chance === 0){
          console.log( `${this.name}'s attack missed`);
        } else {
          player1.health -= this.damage;
          $('#health-bar').css('width',`${player1.health}px`)
          console.log(`${this.name}'s attack hit the players health is ${player1.health}`);
        }
        
      }
    }
      const fred = new Monster('orgre',10,10); // monster to test things with
    
    ////////////////////////Room Class
    class Room {
      constructor(number,doors){
        this.number = number;
        this.doors = doors;
        this.enemies = [];
        this.$el = $(`#room${this.number}`);
        this.visited = false;
      }
      color(){
        console.log(this.$el);
        this.$el.css('background-color','red');
      }
      enter(){
        player1.currentRoom = this.number;
        this.spawnMonsters();
        this.visited = true;
        ///////////////////////////////////testing lines
        console.log( 'the player has entered room 10');
        console.log(this.enemies);
        ///////////////////////////////////////////////////
        if(this.enemies.length > 0){
          this.battle();
          
        } else {
          return
        }
      }
      spawnMonsters(){
        let chance = Math.floor(Math.random()*2)
        
        if (this.visited === false){
          
        if( chance === 0 ){
          
          let ranHealth = 10 + Math.floor(Math.random()*50); 
          let ranDamage = 4 + Math.floor(Math.random()*10);
          let ranName = monsterTypes[Math.floor(Math.random()*3)];
          
          const baddy1 = new Monster(ranName,ranHealth,ranDamage);
          
          this.enemies.push(baddy1);
          
        } else {
          return
        }
      }}
      battle() {
        $('#battle').css('display','block');
        
        while(player1.health > 0 && this.enemies[0].health > 0){
          this.enemies[0].attack();
          // need to have some way for the player to choose their attack; probably will have to do with the player.attack function;
          player1.attack(this.enemies[0]);/// look at the space battle game for a little back and forth battle action. probably a while loop but how can i let the player have the option to choose the action.  
        } if(this.enemies[0].health <= 0){
          console.log( `The ${this.enemies[0].name} has been slain.`)
          $('#battle').css('display','none');
        } else {
          console.log('GAME OVER');
        }
         
      }}
      
    
    
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
      
      const room10 = new Room(10,3);
      room10.enter();
      
      
      
       
    
      
      
    
    
    });