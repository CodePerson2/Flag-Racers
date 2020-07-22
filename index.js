const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var http = require('http').createServer(app);
var io = require('socket.io')(http);

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL  //database init
});

var login = express()
  login.use(express.static(path.join(__dirname, 'public')))
  login.use(express.json())
  login.use(express.urlencoded({extended: false}))
  login.use(express.static(path.join(__dirname, 'public')))
  login.set('views', path.join(__dirname, 'views'))
  login.set('view engine', 'ejs')
  login.get('/', (req, res) => res.render('pages/index'))

  login.post('/signup/:signupArray', (req, res) => {
    var signupArr = req.params.signupArray;
    var signup = JSON.parse(signupArr);
    var admin = 0;

    //var getUsersQuery = `SELECT * FROM login where username = '` + signin.name +`'`;



    if(signup.adminCheck == true){
      admin = 1;
    }

    if(true){
      var getUsersQuery = `INSERT INTO login(username, password, admin, logincount) VALUES('` + signup.name + `', '`  + signup.password + `', `  + admin + `, `  + 0 +`)`;
    }
    pool.query(getUsersQuery, (error, result) => {
      if(error){
        res.send({res : 1, data : error});
      }
      else{
        var results = {'rows': result.rows}
        res.send({res : 0, data : JSON.stringify('success')});
      }  

      
    })
    // access database using uid

  });

  login.get('/signin/:signinArray', (req, res) => {
    var signinArr = req.params.signinArray;
    var signin = JSON.parse(signinArr);
    //res.send(signin);                       //signin data

    var getUsersQuery = `SELECT * FROM login where username = '` + signin.name +`' and password = '` + signin.password + `'`;    //database connection
                                                  //signup.name signup.password

    pool.query(getUsersQuery, (error, result) => {
      if(error){
        res.send({res : 1, data : error});
      }

      else{
        res.send({res : 0, data : result.rows});
      }
      if(signin.admin ===1){
        return res.redirect('/admin');
      }
    })
    // access database using uid

  });

  function addfriend(res, userid, friendid, username, friendname){
    var UserQuery = `INSERT INTO chat(user1, user2, name1, name2) VALUES('`+ userid +`', '`+ friendid +`', '`+ username +`', '`+ friendname +`')`;

    pool.query(UserQuery, (error, result) => {
      if(error){
        res.send({res : -1, data : error});
      }
      else{
        res.send({res : 0, data : "chat made!"});
      }
    })
  }


  function alreadyfriend(res, userid, friendid, username, friendname){
    var UsersQuery = `SELECT * FROM chat where (user1 = '` + userid + `' AND user2 = '` + friendid + `') OR (user1 = '` + friendid + `' AND user2 = '` + userid + `')`;
                                                 
    pool.query(UsersQuery, (error, result) => {
      if(error){
        res.send({res : -1, data : error});
      }
      else{
        if(result.rows.length > 0){
          res.send({res : 3, data : "already friends"});
          
        }
        else{
          addfriend(res, userid, friendid, username, friendname);
        }  
      }
    })
  }

  login.post('/addfriend/:val', (req, res) => {
    var val = req.params.val;
    var val = JSON.parse(val);
    var user;
    var friend;

    var getUsersQuery = `SELECT * FROM login where username = '` + val.friend + `' or userID = `+ val.user;                                         

    pool.query(getUsersQuery, (error, result) => {
      if(error){
        res.send({res : -1, data : error});
      }
      else{
        if(result.rows.length > 1){
          if(result.rows[0].userid == val.userid){
            user = result.rows[0];
            friend = result.rows[1];
          }
          else{
            user = result.rows[1];
            friend = result.rows[0];
          }
          
          alreadyfriend(res, user.userid, friend.userid, user.username, friend.username);
          
        }
        else if(result.rows.length > 0){
          if(val.user == result.rows[0].userid){
            res.send({res : 2, data : "Cant be friends with yourself!"});
            return;
          }
          res.send({res : 2, data : "username does not exist"});
        }
        else{
          res.send({res : 2, data : "error"});
        }
      }
    })
  });

  login.get('/getfriend/:val', (req, res) => {
    var val = req.params.val;
    var val = JSON.parse(val);

    var getUsersQuery = `SELECT * FROM chat where user1 = '` + val.user + `' or user2 = '`+ val.user +`'`;                                         

    pool.query(getUsersQuery, (error, result) => {
      if(error){
        res.send({res : -1, data : error});
      }
      else{
        res.send({res : 0, data : result.rows});

      }
    })
  });


  login.listen(PORT, () => console.log(`Listening on ${ PORT }`))
