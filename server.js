const express = require('express');
const app = express();
app.use(express.static('public'));
const bp = require('body-parser');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
var session = require('client-sessions');


app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 0.5 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,

}));


//DATABASE
var mysql = require('mysql');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'bank'
});



//Home
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    
});

//Accounts
app.get('/accounts', (req, res) => {

    if(req.session && req.session.user){
        switch (req.session.user.admin) {
            case 1:
                res.sendFile((__dirname + '/private/admin.html'));
                break;
            case 0:
                res.sendFile((__dirname + '/private/user.html'));
                break;
        
            default:
                res.sendFile(__dirname + "/public/login.html");
                break;
        }
    }else{
        res.sendFile(__dirname + "/public/login.html");
    }

    
    
});

//Log in
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
    req.session.reset();
    
});


//DATABASE REQUESTS
app.get('/balance',(req, res) => {
    
    connection.query("SELECT name, id, balance FROM account WHERE user_id='"+req.session.user.id+"'", function (err, rows, fields) {
        if (err) throw err

        
        res.json(rows);
    })
});

app.post('/validate',(req, res) => {
    
    var sql = "SELECT * FROM user WHERE username='"+req.body.username+"' AND password='"+req.body.password+"'";

    connection.query(sql, function (err, rows, fields) {
        if (err) throw err

        if(rows.length == 0){
            console.log("No user found.")
        }else{
            req.session.user = rows[0];
            res.redirect('/accounts');
        }
        
    })
});

app.post('/validate',(req, res) => {
    
    var sql = "SELECT * FROM user WHERE username='";

    connection.query(sql, function (err, rows, fields) {
        if (err) throw err

        if(rows.length == 0){
            res.send("No user found.")
        }else{
            
            res.json(rows);
        }
        
    })
});

app.get('/status',(req, res) => {
    
    if(req.session && req.session.user){
        res.json(req.session.user.username);
    }else{
        res.redirect('/login');
    }
    
});





app.listen(80, () => console.log('Server running on port 80!'));