const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
/*
const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL  //database init
});
*/
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

    if(signup[0] == 'plcholder'){
      var getUsersQuery = `INSERT INTO login(name, password) VALUES('` + n[1] + `', `  + n[2] + `') RETURNING id`;
    }
    pool.query(getUsersQuery, (error, result) => {
      if(error)
        res.send(error);
      
      var results = {'rows': result.rows}
      res.send(results);
    })
    // access database using uid
  });

  login.get('/signin/:signinArray', (req, res) => {
    var signinArr = req.params.signinArray;
    console.log(siginArr);
    var signin = JSON.parse(signinArr);
    console.log(signin);
    var getUsersQuery = `SELECT * FROM login`;
    
    
    pool.query(getUsersQuery, (error, result) => {
      if(error)
        res.send(error);
      var results = {'rows': result.rows}
      res.send(results);
    })
    // access database using uid
  });

  login.listen(PORT, () => console.log(`Listening on ${ PORT }`))
