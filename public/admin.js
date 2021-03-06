function userPressed() {

    document.getElementById("data").innerHTML = "";
    setFeedback("Search for UserID or Username.");

    document.getElementById("search").innerHTML = "<input type='text' id='userSearch' name='username'><br>";
    document.getElementById("search").innerHTML += "<input type='submit' onClick='getUsers()' value='Search'>";



    try {
        document.getElementById("users").setAttribute('style', 'color: rgb(255, 174, 0)');
        document.getElementById("accounts").setAttribute('style', 'color: white');

    } catch {}
}


function getUsers() {

    id = document.getElementById("userSearch").value;

    console.log(id);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);

            console.log(this.responseText);

            document.getElementById("data").innerHTML = "<br><table id='tabledata'></table>";
            document.getElementById("tabledata").innerHTML = "<tr><th>ID</th><th>Username</th><th>Password</th><th>isAdmin</th></tr>";
            for (var i = 0; i < data.length; i++) {



                document.getElementById("tabledata").innerHTML += "<tr>" +

                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].username + "</td>" +
                    "<td>" + data[i].password + "</td>" +
                    "<td>" + data[i].admin + "</td>" +
                    "<td><input style='width: fit-content;' type='button' value='Edit' onclick='editUser(" + data[i].id + ")'></td>" +
                    "<td><input style='width: fit-content;' type='button' value='Remove' onclick='removeUser(" + data[i].id + ")'></td></tr>";

            }

        };

        postmsg =
            "id=" + id;

    }
    xmlhttp.open("POST", "/getusers", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);
}

function editUser(id) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);

            document.getElementById("data").innerHTML =
                "<br> Username<br><input type='text' id='u' value='" + data[0].username + "'>" +
                "<br> Password<br><input type='text' id='p' value='" + data[0].password + "'>" +
                "<br> isAdmin<br><input type='text' id='a' value='" + data[0].admin + "'>" +
                "<br><input style='width: fit-content;' type='submit' value='Save' onclick='saveUser(" + data[0].id + ")'>";
        }
    };

    postmsg =
        "id=" + id;


    xmlhttp.open("POST", "/getuser", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);


}

function saveUser(id) {

    username = document.getElementById("u").value;
    password = document.getElementById("p").value;
    admin = document.getElementById("a").value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);



        }

        document.getElementById("userSearch").value = id;
        document.getElementById("data").innerHTML = "";


    };

    postmsg =
        "id=" + id +
        "&username=" + username +
        "&password=" + password +
        "&admin=" + admin;


    xmlhttp.open("POST", "/saveuser", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);



}

function accountsPressed() {

    document.getElementById("data").innerHTML = "";
    setFeedback("Search for AccountID or UserID.");

    document.getElementById("search").innerHTML = "<input type='text' id='accountsSearch' ><br>";
    document.getElementById("search").innerHTML += "<input type='submit' onClick='getAccounts(" + document.getElementById("accountsSearch").value + ")' value='Search'>";



    try {
        document.getElementById("users").setAttribute('style', 'color: white');
        document.getElementById("accounts").setAttribute('style', 'color: rgb(255, 174, 0)');

    } catch {}
}

function getAccounts() {
    id = document.getElementById("accountsSearch").value;

    console.log(id);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);

            console.log(this.responseText);

            document.getElementById("data").innerHTML = "<br><table id='tabledata'></table>";
            document.getElementById("tabledata").innerHTML = "<tr><th>ID</th><th>Name</th><th>Balance</th><th>User</th></tr>";
            for (var i = 0; i < data.length; i++) {

                document.getElementById("tabledata").innerHTML += "<tr>" +

                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].name + "</td>" +
                    "<td>" + data[i].balance + "</td>" +
                    "<td>" + data[i].user_id + "</td>" +
                    "<td><input style='width: fit-content;' type='button' value='Edit' onclick='editAccount(" + data[i].id + ")'></td>" +
                    "<td><input style='width: fit-content;' type='button' value='Remove' onclick='removeAccount(" + data[i].id + ")'></td></tr>";

            }

        };

        postmsg =
            "id=" + id;

    }
    xmlhttp.open("POST", "/getaccounts", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);
}

function editAccount(id) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);

            document.getElementById("data").innerHTML =
                "<br> Name<br><input type='text' id='n' value='" + data[0].name + "'>" +
                "<br> Balance<br><input type='text' id='b' value='" + data[0].balance + "'>" +
                "<br><input style='width: fit-content;' type='submit' value='Save' onclick='saveAccount(" + data[0].id + ")'>";
        }
    };

    postmsg =
        "id=" + id;


    xmlhttp.open("POST", "/getaccount", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);


}

function removeAccount(id) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);
            getAccounts();

        }
    };

    postmsg =
        "id=" + id;


    xmlhttp.open("POST", "/removeaccount", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);


}

function removeUser(id) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);
            getUsers();

        }
    };

    postmsg =
        "id=" + id;


    xmlhttp.open("POST", "/removeuser", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);


}

function saveAccount(id) {

    name = document.getElementById("n").value;
    balance = document.getElementById("b").value;


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            //Response from server
            var data = JSON.parse(this.responseText);



        }

        document.getElementById("accountsSearch").value = id;
        document.getElementById("data").innerHTML = "";


    };

    postmsg =
        "id=" + id +
        "&name=" + name +
        "&balance=" + balance;


    xmlhttp.open("POST", "/saveaccount", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);



}

function setFeedback(message = "") {
    if (message != null) {
        try {
            document.getElementById("msg").innerHTML = message;
        } catch {

        }

    } else {
        document.getElementById("msg").innerHTML = "";
    }

}


function getAdmin() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var data = this.responseText;

            document.getElementById("displayAdmin").innerHTML = "Logged in as: " + data.replace(/['"]+/g, '');

        }
    };
    xmlhttp.open("GET", "/status", true);
    xmlhttp.send();
}
//Check if there is session every sec
setInterval(getAdmin(), 1000);


userPressed();