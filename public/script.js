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
    var score = $('#barFill');
    var finish = $('.finishLine');
    var carFlag = $('#playerFlag');

    //saving location of racetrack and car dimensions
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());

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
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
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
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
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

    function repeat() {
      // Test code on car collision causing game to end
      // Can be repurposed for colliding into objects causing player to slow car down
      // or maybe speed up
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }

        score_counter++;

        // Iterating the progress bar
        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
            var tempScore = score_counter/10;
            var strScore = tempScore.toString() + "%";
            score.css('width', strScore);
        }

        //Show and move the finish line when near the end of the race
        if (score_counter >= 900){
          finish.css('visibility', 'visible');
          var tempScoreFinish = (score_counter + 1) - 900;
          var strScore = tempScoreFinish.toString() + "%";
          finish.css('top', strScore);
        }

        //Ends game upon hitting the finish line
        if (score_counter == 1000){
          finish.css('visibility', 'hidden');
          finish.css('top', 0);
          stop_the_game();
          return;
        }

        //Speed adjustment tools for the player and track
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        //Methods for animating the cars and track as if it's moving
        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

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

    // For now car is just a collision object isn't exactly part of the race
    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
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
          stop_the_game();
    });

    // Function to stop game when needed
    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
        setHighScore();
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



});
