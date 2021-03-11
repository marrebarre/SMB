function getStatus() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var data = this.responseText;

        }
    };
    xmlhttp.open("GET", "/status", true);
    xmlhttp.send();
}
//Check if there is session every sec
setInterval(getStatus(), 1000);

function getOverview(message = "") {

    if (message != null) {
        try {
            setFeedback(message);
        } catch {

        }

    } else {
        setFeedback("");
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var data = JSON.parse(this.responseText);

            document.getElementById("data").innerHTML = "<br><table id='t'></table>";
            document.getElementById("t").innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                document.getElementById("t").innerHTML += "<tr>" +

                    "<th>" + data[i].name + "</th>" +
                    "<th>" + data[i].balance + "</th> </tr>"
            }

        }
    };

    xmlhttp.open("GET", "/balance", true);
    xmlhttp.send();

    try {
        document.getElementById("overview").setAttribute('style', 'color: rgb(255, 174, 0)');
        document.getElementById("transfer").setAttribute('style', 'color: white');
        document.getElementById("manage").setAttribute('style', 'color: white');
    } catch {}
}

function getTransfer(message = "") {

    if (message != null) {
        try {
            setFeedback(message);
        } catch {

        }

    } else {
        setFeedback("");
    }


    var xmlhttp = new XMLHttpRequest();

    var data;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            data = JSON.parse(this.responseText);

            document.getElementById("data").innerHTML = "<br><select name='from' id='fromId'></select>";
            for (var i = 0; i < data.length; i++) {
                document.getElementById("fromId").innerHTML +=
                    "<option balance=" + data[i].balance + " value=" + data[i].id + ">" + data[i].name + "(" + data[i].balance + ")" + "</option> ";

            }
            document.getElementById("data").innerHTML += "<br>&#8595<br><select name='to' id='toId'></select>";
            for (var i = 0; i < data.length; i++) {
                document.getElementById("toId").innerHTML +=
                    "<option value=" + data[i].id + ">" + data[i].name + "(" + data[i].balance + ")" + "</option> ";

            }

            const select = document.getElementById("fromId");

            document.getElementById("data").innerHTML += "<br><input min='0' type='number' placeholder='SEK' name='amount' id='amountId' required><br><input type='submit' value='Transfer' onclick='transfer()'>";


        }
    };

    xmlhttp.open("GET", "/balance", true);
    xmlhttp.send();

    try {
        document.getElementById("overview").setAttribute('style', 'color: white');
        document.getElementById("transfer").setAttribute('style', 'color: rgb(255, 174, 0)');
        document.getElementById("manage").setAttribute('style', 'color: white');
    } catch {}


}

function getManage(message = "") {
    if (message != null) {
        try {
            setFeedback(message);
        } catch {

        }

    } else {
        setFeedback("");
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var data = JSON.parse(this.responseText);

            document.getElementById("data").innerHTML = "<br><table id='t'></table>";
            document.getElementById("t").innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                document.getElementById("t").innerHTML += "<tr>" +
                    "<th>" + data[i].id + "</th>" +
                    "<th>" + data[i].name + "</th>" +

                    "<th><input style='width: fit-content;' type='submit' value='Remove'  onclick='remove(" + data[i].id + "," + data[i].balance + ")'></th></tr>"
            }

            document.getElementById("data").innerHTML += "<input type='text' placeholder='New Account Name' id='accountName'></input><br>";
            document.getElementById("data").innerHTML += "<input style='font-size: 22px;' type='submit' value='Add Account' onclick='add()'></input>";


        }
    };

    xmlhttp.open("GET", "/balance", true);
    xmlhttp.send();

    try {
        document.getElementById("overview").setAttribute('style', 'color: white');
        document.getElementById("transfer").setAttribute('style', 'color: white');
        document.getElementById("manage").setAttribute('style', 'color: rgb(255, 174, 0)');
    } catch {}
}

function remove(id, balance) {

    if (balance > 0) {
        setFeedback("The account has money on it.")
    } else {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                //Response from server
                var data = JSON.parse(this.responseText);

                console.log(this.responseText);

                getManage("");
            };

            postmsg =
                "id=" + id;

        }
        xmlhttp.open("POST", "/removeaccount", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(postmsg);
    }
}

function add() {

    if (document.getElementById("accountName").value == null ||
        document.getElementById("accountName").value == "") {
        setFeedback("Please enter name.");
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                //Response from server
                var data = JSON.parse(this.responseText);

                console.log(this.responseText);

                getManage("");
            };

            postmsg =
                "name=" + document.getElementById("accountName").value;

        }
        xmlhttp.open("POST", "/addaccount", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(postmsg);
    }

}

function transfer() {

    var sel = document.getElementById("fromId");
    var opt = sel.options[sel.selectedIndex];
    var bal = opt.getAttribute("balance");

    if (document.getElementById("amountId").value == null || document.getElementById("amountId").value == 0) {
        setFeedback("Please enter amount.")
    } else if (document.getElementById("amountId").value > parseInt(bal)) {

        setFeedback("Not enough money.");

    } else {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {



            if (this.readyState == 4 && this.status == 200) {

                //Response from server
                var data = JSON.parse(this.responseText);

                console.log(this.responseText);

                getOverview("Success!");
            };

            postmsg =
                "from=" + document.getElementById("fromId").value +
                "&to=" + document.getElementById("toId").value +
                "&amount=" + document.getElementById("amountId").value;

        }
        xmlhttp.open("POST", "/transfer", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(postmsg);

    }

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

getOverview();