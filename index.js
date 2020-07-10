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
    if(signup.admin == true){
      admin = 1;
    }
    //res.send(signup);                     //signup data 
                                            //signup.name signup.password signup.password2 signup.adminCheck

    // database insert 
    if(true){
      var getUsersQuery = `INSERT INTO login (username, password, admin, logincount) VALUES("` + signup.name + `", "`  + signup.password + `", `  + admin + `, `  + 0 +`)`;
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
    var signin = JSON.parse(signinArr);
    //res.send(signin);                       //signin data
    
    var getUsersQuery = `SELECT * FROM login where username = '` + signin.name +`' and password = '` + signin.password + `'`;    //database connection
                                                  //signup.name signup.password
    
    pool.query(getUsersQuery, (error, result) => {
      if(error)
        res.send(error);
      var results = {'rows': result.rows}
      res.send(results);
    })
    // access database using uid
    
  });

  login.listen(PORT, () => console.log(`Listening on ${ PORT }`))
