$(()=>{
    
  class Monster {
      constructor(name,health,damage){
          this.monsterTypes = ['Demon','Skeleton','Serpent','Giant Spider']; 
          this.name = name;
          this.health = health;
          this.damage = damage;
          this.active = undefined;
          
      }
      monsterAttack(player,game){
        const $gameText = $('#game-text-2');
        const $prevGameText = $('#game-text-1');
          let chance = Math.floor(Math.random()*Math.floor(2));
          if(chance === 0){// this is the monsters attack. It randomly decides if it hit or misses
            $prevGameText.text($gameText.text());
            $gameText.text( `${this.name}'s attack missed`);
          } else {
            player.health -= this.damage;
            $('#health-bar').css('width',`${player.health}px`);
            $('#current-health').text(player.health);
            $prevGameText.text($gameText.text());
            $gameText.text(`${this.name}'s attack hit the players health is ${player.health}`).delay(7000);
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
        const $gameText = $('#game-text-2');
        const $prevGameText = $('#game-text-1');
      monster.active.health -= 10;
      // $('#fireball-animation-object').css('display','block');
      // $('#fireball-animation-object').addClass('fireball-animation');
      $prevGameText.text($gameText.text());
      $gameText.text(`You cast fireball did 10 damage. the ${monster.active.name}'s health is now ${monster.active.health}`);
      $('#monster-health').css('width',`${monster.active.health}px`);    
      game.checkBattle(monster,this); 
          if (monster.active !== undefined){
          monster.active.monsterAttack(this,game);
        }
      }
        heal(monster,game){
          let $gameText = $('#game-text-2');
          let $prevGameText = $('#game-text-1');
          if (this.health >= 80){
              this.health = 100;
              $('#health-bar').css('width',`${this.health}px`);
              $('#current-health').text(this.health);
            }
            if (this.health < 100){
          this.health += 20;
          $('#health-bar').css('width',`${this.health}px`);
          $('#current-health').text(this.health);
          $prevGameText.text($gameText.text());
          $gameText.text('You cast heal and gained 20 health points')
          } else {
            $prevGameText.text($gameText.text());
            $gameText.text('your health is full');
          }
         
          monster.active.monsterAttack(this,game);
        }
        run(monster,game){
          let $gameText = $('#game-text-2');
          let $prevGameText = $('#game-text-1');
          let chance = Math.floor(Math.random()*Math.floor(2));
            if (chance === 0){
              $('#battle').css('display','none');
              $('#move-room-buttons').css('display','flex');
              monster.active = undefined;
            } else{
              $prevGameText.text($gameText.text());
              $gameText.text('you could not get away');
              monster.active.monsterAttack(this,game);
            }
        
        }
  
  }
  /////////////////////////////////////      Game Class
  
  class Game {
      constructor(){
          this.pattern = [];
          this.winPattern = ["left", "right", "right", "left", "left", "left"];
          //this.winPattern = [];// this if for a random pattern;
      }
      // setNewPattern(){
      //   let arrayOptions = ['right','left'];
      //   for ( let i = 0; i < 6; i++){
      //     let chance = Math.floor(Math.random() * Math.floor(2));
      //     this.winPattern.push(arrayOptions[chance]);
      //   }

      // }
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
          let chance = Math.floor(Math.random()* Math.floor(2));
          if(this.pattern.length >= 6){ // makes sure no monster is generated on the final move of a path
            chance = 1;
          }
            // if chance = 0 generate a random monster as this.enemy
          if( chance === 0 ){
            let ranName = monster.monsterTypes[Math.floor(Math.random() * Math.floor(monster.monsterTypes.length))];
            let ranHealth = 10 + Math.floor(Math.random()* Math.floor(60)); 
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
          let $gameText = $('#game-text-2');
          let $prevGameText = $('#game-text-1');
          $prevGameText.text('')
          $('#battle').css('display','block');
          $('#move-room-buttons').css('display','none');
          switch(monster.active.name){
            case 'Skeleton':
            $enemyContainer.css('background-image','url("img/skeleton.jpeg")')
            $prevGameText.text('');
            $gameText.text(`A ${monster.active.name} has attacked!`)
            break
            case 'Demon':
            $enemyContainer.css('background-image','url("img/demon2.png")') 
            $prevGameText.text('');
            $gameText.text(`A ${monster.active.name} has attacked!`)
            break
            case 'Serpent':
            $enemyContainer.css('background-image','url("img/serpent.png")')
            $prevGameText.text('');
            $gameText.text(`A ${monster.active.name} has attacked!`) 
            break 
            case 'Giant Spider':
            $enemyContainer.css('background-image','url("img/spider.jpg")')
            $prevGameText.text('');
            $gameText.text(`A ${monster.active.name} has attacked!`) 
              
          }
          $('#monster-health').css('width',`${monster.active.health}px`);  
        }
        checkBattle(monster,player){
          let $gameText = $('#game-text-2');
          let $prevGameText = $('#game-text-1');
          if (monster.active.health <= 0){
            $prevGameText.text($gameText.text());
            $gameText.text(`the ${monster.active.name} has been slain`);
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
          //console.log(this.winPattern)
          //console.log(this.pattern);
          
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
          $('#health-bar').css('display','none');
          $('#current-health').text('0');
          //this.setNewPattern();
          
        }
        win(){
          $('#win-screen').css('display','flex');
          $('#battle').css('display','none');
          //this.setNewPattern();
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
  
    $('#run').on('click', () =>{
        newPlayer.run(newMonster,newGame)
    });
  
    $('#heal').on('click', ()=>{
      newPlayer.heal(newMonster,newGame)
    });
  
    $('.new-game').on('click', ()=>{
      
      newGame.pattern = [];
      newMonster.active = undefined;
      newPlayer.health = 100;
      $('#health-bar').css('display','block');
      $('#current-health').text('100');
      $('#rooms-visited').empty();
      $('#health-bar').css('width',`${newPlayer.health}px`);
      $("#gameover-screen").css('display','none');
      $('#win-screen').css('display','none');
      $('#battle').css('display','none');
      $('#move-room-buttons').css('display','flex');
    })
        
  
  })
  