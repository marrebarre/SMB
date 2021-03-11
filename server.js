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
    duration: 30 * 60 * 1000,
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

    if (req.session && req.session.user) {
        switch (req.session.user.admin) {
            case 1:
                res.sendFile((__dirname + '/private/admin.html'));
                break;
            case 0:
                res.sendFile((__dirname + '/private/user.html'));
                break;

            default:
                console.log("trying to log in from creation")
                res.sendFile(__dirname + "/public/login.html");
                break;
        }
    } else {
        console.log("testing login from account creating")
        res.sendFile(__dirname + "/public/login.html");
    }



});

//Log in
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
    req.session.reset();

});
app.get('/register', (req, res) => {
    res.sendFile(__dirname + "/public/register.html");
    req.session.reset();

});


//DATABASE REQUESTS
app.get('/balance', (req, res) => {

    connection.query("SELECT name, id, balance FROM account WHERE user_id='" + req.session.user.id + "'", function(err, rows, fields) {
        if (err) throw err


        res.json(rows);
    })
});

app.post('/validate', (req, res) => {

    var sql = "SELECT * FROM user WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err

        if (rows.length == 0) {
            console.log("No user found.")
        } else {
            req.session.user = rows[0];
            res.redirect('/accounts');
        }

    })
});

app.get('/status', (req, res) => {

    if (req.session && req.session.user) {
        res.json(req.session.user.username);
    } else {
        res.redirect('/login');
    }

});

app.post('/createNew', (req, res) => {
    var checking = "1234567890 [`!@#$%^&*()_+-=[]{};':|,.<>/?~]^[0-9]+$/";
    var bool = false;

    const uname = req.body.username;

    for (var i = 0; i < checking.length; i++) {
        if (uname.includes(checking.charAt(i))) {
            bool = true;
        }
    }


    if (bool) {
        console.log("username contains errors");
    } else {
        var sqlCheckAccount = "SELECT * FROM user WHERE username='" + req.body.username + "'";
        var sqlCreateAccount = "INSERT INTO user (username, password, admin) VALUES ('" + req.body.username + "', '" + req.body.password + "', '0')";

        var sqlGetUser = "SELECT * FROM user WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";
        connection.query(sqlCheckAccount, function(err, rows, fields) {
            if (err) throw err
            if (rows.length == 0) {
                //we can create account
                console.log("we can create account");
                connection.query(sqlCreateAccount);
                connection.query(sqlGetUser, function(err, rows, fields) {
                    req.session.user = rows[0];
                    res.redirect('/accounts');
                });
            } else {
                console.log("Error, couldnt create a ");

            }
        })
    }



    /*if (nan(req.body.username) || format.test(req.body.username)) {
        console.log("username contains errors");
    } else {
        var sqlCheckAccount = "SELECT * FROM user WHERE username='" + req.body.username + "'";
        var sqlCreateAccount = "INSERT INTO user (username, password, admin) VALUES ('" + req.body.username + "', '" + req.body.password + "', '0')";

        var sqlGetUser = "SELECT * FROM user WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";
        connection.query(sqlCheckAccount, function(err, rows, fields) {
            if (err) throw err
            if (rows.length == 0) {
                //we can create account
                console.log("we can create account");
                connection.query(sqlCreateAccount);
                connection.query(sqlGetUser, function(err, rows, fields) {
                    req.session.user = rows[0];
                    res.redirect('/accounts');
                });
            } else {
                console.log("Error, couldnt create a ");

            }
        })
    }*/
});


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function nan(num) {
    return !isNaN(num);
}


app.listen(8080, () => console.log('Server running on port 8080!'));