const express = require('express');
const app = express();
app.use(express.static('public'));

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

    //IF ADMIN
    res.sendFile((__dirname + '/private/admin.html'));
    //IF USER
    res.sendFile((__dirname + '/private/user.html'));
});

//Log in
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
    
});


//DATABASE REQUESTS
app.get('/data',(req, res) => {
    
    connection.query('SELECT * FROM user', function (err, rows, fields) {
        if (err) throw err

        console.log("Updated");
        res.json(rows);
    })
});


app.listen(80, () => console.log('Server running on port 80!'));