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




app.get('/test', (req, res) => {
    res.sendFile(__dirname + "/public/data.html");
    
});


app.get('/secret', (req, res) => {
    res.sendFile((__dirname + '/private/secret.html'));
    
});

app.get('/data',(req, res) => {
    
    connection.query('SELECT * FROM user', function (err, rows, fields) {
        if (err) throw err

        console.log("Updated");
        res.json(rows);
    })
});


app.listen(80, () => console.log('Server running on port 80!'));