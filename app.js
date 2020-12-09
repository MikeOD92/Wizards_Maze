$(()=>{
    
  class Monster {
      constructor(name,health,damage){
          this.monsterTypes = ['Demon','Skeleton','Serpent']; 
          this.name = name;
          this.health = health;
          this.damage = damage;
          
      }
      monsterAttack(player,game){
         
          let chance = Math.floor(Math.random()*Math.floor(2));
          if(chance === 0){// this is the monsters attack. It randomly decides if it hit or misses
            console.log( `${this.name}'s attack missed`);
          } else {
            player.health -= this.damage;
            $('#health-bar').css('width',`${player.health}px`);
            console.log(`${this.name}'s attack hit the players health is ${player.health}`);
          }
          if(player.health <= 0){
            game.gameOver();
          }
      }
  }
  ///////////////////////////////////// Player Class
  
  class Player {
      constructor(){
          this.health = 100;
  
      }
      fireball(monster,game){
      monster.active.health -= 10;
      console.log(`the players fireball did 10 damage the ${monster.active.name} health is now ${monster.active.health}`);
          game.checkBattle(monster,this); //im here!!
          if (monster.active !== undefined){
          monster.active.monsterAttack(this,game);
        }
      }
        heal(monster,game){
          if (this.health < 100){
          this.health += 15;
          $('#health-bar').css('width',`${this.health}px`);
          } else {
            console.log('your health is full');
          }
          monster.active.monsterAttack(this,game);
        }
        run(monster,game){
          let chance = Math.floor(Math.random()*Math.floor(2));
            if (chance === 0){
              $('#battle').css('display','none');
              $('#move-room-buttons').css('display','flex');
              monster.active = undefined;
            } else{
              console.log('you could not get away');
              monster.active.monsterAttack(this,game);
            }
        
        }
  
  }
  /////////////////////////////////////      Game Class
  
  class Game {
      constructor(){
          this.pattern = [];
          this.winPattern = ["left", "right", "right", "left", "left", "left"];
          
      }
      newRoom(monster){
          this.checkPattern(); // check the winstate of the game
          monster.active = undefined;
          if(this.pattern[this.pattern.length-1] === undefined){
            return;
          } else{
          $('#rooms-visited').append(`<li> ${this.pattern[this.pattern.length-1]}</li>`);
          }
          // called when a new room is entered
          this.spawnMonster(monster);
          //creates monsters by running spawn function
          // if there are enemies in the array we start the battle function. 
          if (monster.active !== undefined){
            this.startBattle(monster);
          } else {
          return
          }
          // otherwise nothing happens we just entered the room
  
      }
      spawnMonster(monster){
          //randomly decide if monsters are in new room or not
          let chance = Math.floor(Math.random()* Math.floor(3));
            // if chance = 0 generate a random monster as this.enemy
          if( chance === 0 ){
            let ranName = monster.monsterTypes[Math.floor(Math.random() * Math.floor(3))];
            let ranHealth = 10 + Math.floor(Math.random()* Math.floor(50)); 
            let ranDamage = 16 + Math.floor(Math.random()* Math.floor(10));
            
            const baddy1 = new Monster(ranName,ranHealth,ranDamage);
            // our new bad guy is pushed into the enemies array
            monster.active = baddy1;
            
          } else {
            return// if chance is not = 0 no monster is generated
          }
      }
      startBattle(monster){
          const $enemyContainer = $('#attacking-monster');
          $('#battle').css('display','block');
          $('#move-room-buttons').css('display','none');
          switch(monster.active.name){
            case 'Skeleton':
            $enemyContainer.css('background-image','url("img/skeleton.jpeg")')
            break
            case 'Demon':
            $enemyContainer.css('background-image','url("img/demon.jpg")') 
            break
            case 'Serpent':
            $enemyContainer.css('background-image','url("img/serpent.jpg")') 
            break 
          }
        }
        checkBattle(monster,player){
          if (monster.active.health <= 0){
            console.log(`the ${monster.active.name} has been slain`)
            monster.active.enemy = undefined;
            $('#battle').css('display','none');
            $('#move-room-buttons').css('display','flex');
          }
          if (player.health <= 0){
              this.gameOver();
          }
        }
        checkPattern(){//this.pattern, this.winPattern
          let checker = undefined;
          console.log(this.winPattern)
          console.log(this.pattern);
          
          if(this.winPattern.length !== this.pattern.length){
            checker = false;
          } else {
            for(let i = 0; i < this.winPattern.length; i++){
              if(this.winPattern[i] !== this.pattern[i]){
                checker = false;
                return;
              } else {
                  checker = true;
              }  
            }
          }
          if (checker === true){
            this.win();
          } else if (this.pattern.length >= 6){
            this.pattern = [];
            $('li').remove();
          }
        }
        gameOver(){
          $("#gameover-screen").css('display','flex');
        }
        win(){
          $('#win-screen').css('display','flex');
          $('#battle').css('display','none');
  
  
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
      //// initialize a new game;
  
      let newGame = new Game();
      let newMonster = new Monster();
      let newPlayer = new Player();
  
      ////////////////// movement buttons 
      const $left = $('#left');
      const $right = $('#right');
  
      $left.on('click',()=>{
          newGame.pattern.push('left');
          newGame.newRoom(newMonster);
  })
      $right.on('click',()=>{
          newGame.pattern.push('right');
          newGame.newRoom(newMonster);
  })
  ////////////////////////    Battle Buttons
  $('#fireball').on('click', ()=>{
      newPlayer.fireball(newMonster,newGame)
    });
  
    $('#run').on('click', newPlayer.run);
  
    $('#heal').on('click', ()=>{
      newPlayer.heal(newMonster,newGame)
    });
  
    $('.new-game').on('click', ()=>{
      
      newGame.pattern = [];
      newMonster.active = undefined;
      newPlayer.health = 100;
      $('#rooms-visited').empty();
      $('#health-bar').css('width',`${newPlayer.health}px`);
      $("#gameover-screen").css('display','none');
      $('#win-screen').css('display','none');
    })
        
  
  })
  