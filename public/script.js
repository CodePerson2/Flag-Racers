$(function() {

    var anim_id;

    //convert html and css content into usable values in code
    var container = $('#track');
    var car = $('#userCar');
    var car_1 = $('#botCar1');
    var car_2 = $('#botCar2');
    var car_3 = $('#botCar3');
    var line_1 = $('#leftLine1');
    var line_2 = $('#leftLine2');
    var line_3 = $('#leftLine3');
    var line_4 = $('#rightLine1');
    var line_5 = $('#rightLine2');
    var line_6 = $('#rightLine3');
    var line_7 = $('#midLine1');
    var line_8 = $('#midLine2');
    var line_9 = $('#midLine3');
    var restart_btn = $('.endButton');
    var score = $('#userProg');
    var car_1_score = $('#bot1Prog');
    var car_2_score = $('#bot2Prog');
    var car_3_score = $('#bot3Prog');
    var finish = $('.finishLine');
    var carFlag = $('#playerFlag');

    //Pick up variables
    var blockItem = $('#sinkhole');
    var slowDown = $('#slowTrack');
    var speedUp = $('#speedTrack');
    var endNow = $('#crash');
    var quickWin = $('#jumptoFinish');
    var resetProg = $('#reset');
    var blockedMovement = 0;
    var aBlock = false;
    var aBlockTime = false;
    var slowTime = 0;
    var speedTime = 0;

    //Socket IO init
    var socket = io.connect('/');
    var lostGame = false;
    var winGame = false;
    var numUsers = 0;

    //saving location of racetrack and car dimensions
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());
    var pickup_width = parseInt(blockItem.width());
    var pickup_height = parseInt(blockItem.height());

    //interactive variables for game function
    var game_over = false;

    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    // Begin function for moving a car with arrow keys
    // Hold down an arrow key causes car to move
    $(document).on('keydown', function(e) {
        if (game_over === false && aBlock == false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false ) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    // Upon release of key car stops moving
    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    // Changes to car position on page depending on key held
    function left() {
        if (aBlock == false && game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (aBlock == false && game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (aBlock == false && game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (aBlock == false && game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

    //End function for moving car with arrow keys

    // Begin animating track and other cars
    // Hide finish line at start
    finish.css('visibility', 'hidden');
    // Begin looping of track and cars until game ends
    anim_id = requestAnimationFrame(repeat);

    //Setting flag to player
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get('url');
    console.log(page_type);
    //carFlag.css('visibility', 'hidden');
    carFlag.attr('src', page_type);
    carFlag.css('max-width', '100%');
    carFlag.css('max-height', '100%');

    /* Socket IO request user ID */
    var idPass = urlParams.get('uid');
    /* Socket IO init calls */
    begin('friend', 1, 'bob', 23, 'evan', 21, 'eve', 11);
    ready();
    startGame();
    sendLoc(idPass, car.css('left'),car.css('top'), score.css('width'), lostGame);
    liveLoc();
    /* End socket io init calls */

    function repeat() {
        sendLoc(idPass, car.css('left'),car.css('top'), score.css('width'), lostGame);
        console.log(lostGame);
        if (lostGame){
          //alert("You lost");
          stop_the_game(false);
        }
      /*   Collision Tests  */

        // Test code on car collision causing game to end
        // Can be repurposed for colliding into objects causing player to slow car down
        // or maybe speed up

        /*
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }
        */
        // Reset block movement
        if (blockedMovement < 0){
          aBlock = false;
          blockedMovement = 0;
        }

        // Detect block movements
        if (collision(car, blockItem)){
          blockedMovement = 250;
          aBlock = true;
        }
        // Detect slowingDown collision
        else if(collision(car, slowDown)){
          slowTime = 200;
          aBlockTime = true;
        }
        // Detect speedUp collision
        else if(collision(car, speedUp)){
          speedTime = 100;
          aBlockTime = true;
        }
        // Detect endCrash Collision
        else if (collision (car, endNow)){
          stop_the_game();
          return;
        }
        // Detect quickWin Collision
        else if (collision (car, quickWin)){
          score_counter = 2899;
        }
        // Detect resetProg collision
        else if (collision (car, resetProg)){
          score_counter = 0;
        }

      /*  End Collision Tests */
      /*  Counters for Time penalty and Points  */
        blockedMovement--;

        // Default normal count, if collision slows down counter
        if (aBlockTime){
          if (slowTime > 0) {
            slowTime--;
            if (slowTime % 2 == 0){
              score_counter++;
            }
          }
          if (speedTime > 0){
            speedTime--;
            score_counter++;
            score_counter++;
          }
          if (slowTime < 1 && speedTime < 1){
            aBlockTime = false;
          }
        }
        else {
          score_counter++;
        }

        // Iterating the progress bar
        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
            var tempScore = score_counter/30;
            var strScore = tempScore.toString() + "%";
            score.css('width', strScore);
        }

        //Show and move the finish line when near the end of the race
        if (score_counter >= 2900){
          finish.css('visibility', 'visible');
          var tempScoreFinish = (score_counter + 1) - 2950;
          var strScore = tempScoreFinish.toString() + "%";
          finish.css('top', strScore);
        }

        // In case user hits trap that sends them back
        if (score_counter < 2900) {
          finish.css('visibility', 'hidden');
        }

        //Ends game upon hitting the finish line
        if (score_counter > 3000){
          lostGame = true; //This is to send
          lostGameAlert();
          finish.css('visibility', 'hidden');
          finish.css('top', 0);
          stop_the_game(true);
          return;
        }

        //Speed adjustment tools for the player and track
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        //Methods for animating the cars and track as if it's moving
        /*
        car_down(car_1);
        car_down(car_2);
        car_down(car_3);
        */

        block_movement_down(blockItem);
        block_movement_down(slowDown);
        block_movement_down(speedUp);
        block_movement_down(quickWin);
        block_movement_down(resetProg);
        block_movement_down(endNow);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);
        line_down(line_4);
        line_down(line_5);
        line_down(line_6);
        line_down(line_7);
        line_down(line_8);
        line_down(line_9);



        anim_id = requestAnimationFrame(repeat);
    }

    // Item that blocks movement keys
    function block_movement_down(theItem) {
      var block_current_top = parseInt(theItem.css('top'));
      if (block_current_top > container_height) {
          block_current_top = -200;
          var block_shift = parseInt(Math.random() * (container_width - pickup_width));
          theItem.css('left', block_shift);
      }
      theItem.css('top', block_current_top + speed);
    }

    // For now car is just a collision object isn't exactly part of the race
    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        /*
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        */
        car.css('top', car_current_top + speed);
    }

    // Function to make lines move to simulate game movement
    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    // Temporarily Game restarts upon hitting the End Button
    restart_btn.click(function() {
        //location.reload();
        //stop_the_game();
    });

    // Function to stop game when needed
    function stop_the_game(status) {
        game_redirect(status);
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();

        detectEnd();  //Socket IO end
    }

    //End game redirect
    function game_redirect(status){
      console.log("redirection attempted!");
      const  queryString = window.location.search;

      const urlParams = new URLSearchParams(queryString);
      if (status){
        window.location = "endPage.html?" + urlParams + "&status=win";
      }
      else{
        window.location = "endPage.html?" + urlParams + "&status=loss";
      }
    }

    // Collision check with objects
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    function lostGameAlert(){
      sendLoc(idPass, car.css('left'),car.css('top'), score.css('width'), lostGame);
    }

    /* socket IO functions for cars */

    //type : 'friend' 'random'
    //groupid needed only for friend type
    //ex begin('friend', 3), begin('random')
    function begin(type, groupid = -1, username = null, flag = null){
        socket.emit('begin', {type: type, groupid: groupid, flag: flag, username: username});
        socket.on('begin', function(data){
            socket.emit('begin', {type: type, groupid: groupid, flag: flag, username: username});
            socket.off('begin');
        });
    }

    //initates game and begins countdown 3,2,1,0 (startGame) when other user also runs ready()
    //returns username and flag on completion
    function ready(){
        socket.on('ready', function(data){
          socket.emit('ready', {ready: 'start'});
          socket.off('ready');
          console.log(data);
          return data;
          })
      }

      //data is the countdown. both players recieve at same time
      function startGame(){
          socket.on('gameStart', function(data){
              console.log(data);
          });
      }

    //returns coordinates of other car
    //data = {y: yCord, x: xCord}
    function liveLoc(){
    socket.on('friendLoc', function(data){
          //console.log(data);
          car_1.css('left', data.x);
          car_1.css('top', data.y);
          car_1_score.css('width', data.z);
          //console.log(data.room);

          lostGame = data.finish;

          return data;
      });

      socket.on('friendLoc2', function(data){
          //console.log(data);

          car_2.css('left', data.x);
          car_2.css('top', data.y);
          car_2_score.css('width', data.z);
          //console.log(data.room);

          lostGame = data.finish;

          return data;
      });

      socket.on('friendLoc3', function(data){
          //console.log(data);

          car_3.css('left', data.x);
          car_3.css('top', data.y);
          car_3_score.css('width', data.z);
          //console.log(data.room);

          lostGame = data.finish;

          return data;
      });

    }

    //sends the x,y variables to server
    function sendLoc(uid, x, y, z, finish){
      socket.emit('clientLoc', {uid:uid, x: x, y: y, z: z, finish: finish});
    }

    //catches end of game/ or end of connection
    function detectEnd(){
        socket.on('end', function(data){
            console.log(data.end);
        });
    }


});
