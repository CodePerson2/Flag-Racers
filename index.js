const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

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

  login.post('/addfriend/:val', (req, res) => {
    var val = req.params.val;
    var val = JSON.parse(val);
    //res.send(signin);                       //signin data

    var getUsersQuery = `SELECT * FROM login where username = '` + val.friend + `'`;
                                                 

    pool.query(getUsersQuery, (error, result) => {
      if(error){
        res.send({res : 1, data : error});
      }
      else{
        var rows = JSON.parse(results.rows);
        if(rows.length > 0){
          res.send({res : 0, data : 'success'});
        }
        else{
          res.send({res : 0, data : 'fail'});
        }
        
      }
     
    })
    // access database using uid

  });

  login.listen(PORT, () => console.log(`Listening on ${ PORT }`))
