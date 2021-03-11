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
                res.sendFile(__dirname + "/public/login.html");
                break;
        }
    } else {
        res.sendFile(__dirname + "/public/login.html");
    }



});

//Log in
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
    req.session.reset();

});
app.get('/about', (req, res) => {
    res.sendFile(__dirname + "/public/about.html");


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

app.post('/getusers', (req, res) => {

    var sql = "SELECT * FROM user WHERE id='" + req.body.id + "' OR username LIKE '%" + req.body.id + "%'";

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err

        res.json(rows);
        console.log(rows.length);

    })
});

app.post('/getuser', (req, res) => {

    var sql = "SELECT * FROM user WHERE id='" + req.body.id + "'";

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err

        res.json(rows);
        console.log(rows.length);

    })
});

app.post('/getaccounts', (req, res) => {

    var sql = "SELECT * FROM account WHERE id='" + req.body.id + "' OR user_id='" + req.body.id + "'";

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err

        res.json(rows);
        console.log(rows.length);

    })
});

app.post('/getaccount', (req, res) => {

    var sql = "SELECT * FROM account WHERE id='" + req.body.id + "'";

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err

        res.json(rows);
        console.log(rows.length);

    })
});

app.post('/saveaccount', (req, res) => {


    var sql1 = "UPDATE account SET name='" + req.body.name + "' WHERE id='" + req.body.id + "'";
    var sql2 = "UPDATE account SET balance='" + req.body.balance + "' WHERE id='" + req.body.id + "'";



    connection.query(sql1);
    connection.query(sql2);


    res.send(req.body);

});



app.post('/saveuser', (req, res) => {


    var sql1 = "UPDATE user SET username='" + req.body.username + "' WHERE id='" + req.body.id + "'";
    var sql2 = "UPDATE user SET password='" + req.body.password + "' WHERE id='" + req.body.id + "'";
    var sql3 = "UPDATE user SET admin='" + req.body.admin + "' WHERE id='" + req.body.id + "'";


    connection.query(sql1);
    connection.query(sql2);
    connection.query(sql3);

    res.send(req.body);

});



app.post('/transfer', (req, res) => {


    var sqlReduce = "UPDATE account SET balance= balance - " + req.body.amount + " WHERE id='" + req.body.from + "'";
    var sqlAdd = "UPDATE account SET balance= balance + " + req.body.amount + " WHERE id='" + req.body.to + "'";

    connection.query(sqlReduce);
    connection.query(sqlAdd);

    res.send(req.body);

});

app.post('/removeaccount', (req, res) => {


    var sql = "DELETE FROM account WHERE id='" + req.body.id + "'";

    connection.query(sql);


    res.send(req.body);

});

app.post('/removeuser', (req, res) => {


    var sql1 = "DELETE FROM account WHERE user_id='" + req.body.id + "'";
    var sql2 = "DELETE FROM user WHERE id='" + req.body.id + "'";

    connection.query(sql1);
    connection.query(sql2);


    res.send(req.body);

});


app.post('/addaccount', (req, res) => {


    var sql = "INSERT INTO account (name, balance, user_id)" +
        " VALUES ('" + req.body.name + "', '0', " + req.session.user.id + ")";

    connection.query(sql);


    res.send(req.body);

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
                console.log("Error, couldnt create account ");

            }
        })
    }
});


app.get('/loggedin', (req, res) => {

    if (req.session && req.session.user) {
        res.send("Log out");
    } else {
        res.send("Log in")
    }

});




app.listen(8080, () => console.log('Server running on port 8080!'));