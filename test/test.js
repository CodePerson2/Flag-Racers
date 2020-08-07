var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('FriendsnSettings', function(){
	// tests associated with Friends and Setting
	it ('should add a single user on POST request for /addfriend', function(done){
		chai.request(server).post('/addfriend').send({'uname':'Imafriend'})
			.end(function(error,res){
			xhttp.open("GET", loc+val, true); //searching friend
			document.getElementById("chatlist").append(item); //finding and adding friend
		});
	});

	it ('should delete the users account', function(done){
		chai.request(server).post('/deleteAcc').send({'name': 'name', 'password': 'password'})
			.end(function(error,res){
			console.log("Here.");
			xhttp.open('POST', loc+deleteAcc, true);
		});
	});

	it ('should remove friend from list', function(done){
		chai.request(server).post('/removeFriend').send({'name': 'name', 'password': 'password'})
			.end(function(error,res){
			console.log("Here.");
			xhttp.open('POST', loc+removeFriend, true);
		});
	});

	it ('should change username of user', function(done){
		chai.request(server).post('/changeUsername').send({'name': 'name', 'password': 'password'})
			.end(function(error,res){
			console.log("Here");
  			xhttp.open('POST', loc+changeUsername, true);
		});
	});
});

describe('Multiplayer', function(){
	// tests associated with Multipayer Functionality
	it ('should add friends in the game', function(done){
		chai.request(server).post(socket.emit('begin').send(begin('friend', 1, 'bob', 23))
			.end(function(error,res){
			ready();
		});
	});

describe('Obstacles', function(){
	// tests associated with Obstacles
	it ('should slow the user down when it hits recession', function(done){
		chai.request(server).post(collision(car, slowdown)).send(car_1)
			.end(function(error,res){
			slowTime = 200;
          	aBlockTime = true;
		});
	});

	it ('should stop the user when it hits pandemic', function(done){
		chai.request(server).post(collision(car, blockItem)).send(car_1)
			.end(function(error,res){
			aBlock = true;
		});
	});

	it ('should end game if collision with nuke', function(done){
		chai.request(server).post(collision(car, blockedMovement)).send(car_1)
			.end(function(error,res){
			aBlock = false;
          	blockedMovement = 0;
		});
	});
});

describe('Boosts and Reset', function(){
	// tests associated with Boosts
	it ('should increase car speed when it hits money', function(done){
		chai.request(server).post(collision(car, speedUp)).send(car_1)
			.end(function(error,res){
			speedTime = 100;
          	aBlockTime = true;
		});
	});

	it ('should reset car progress to 0', function(done){
		chai.request(server).post(collision(car, resetProg)).send(car_1)
			.end(function(error,res){
			score_counter = 0;
		});
	});

	it ('should boost car to finish line', function(done){
		chai.request(server).post(collision(car, quickWin)).send(car_1)
			.end(function(error,res){
			score_counter = 2899;
		});
	});
});

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
