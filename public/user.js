function getStatus(){
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
setInterval(getStatus(),1000);

function getOverview(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText); 

        document.getElementById("data").innerHTML = "<br><table id='t'></table>";
        document.getElementById("t").innerHTML = "";
        for(var i= 0; i<data.length; i++){
            document.getElementById("t").innerHTML += "<tr>"+
            "<th>" +data[i].id+"</th>"+
            "<th>" +data[i].name+"</th>"+
            "<th>" + data[i].balance+"</th> </tr>"
        }
                              
    }
    };
    xmlhttp.open("GET", "/balance", true);
    xmlhttp.send();
}

function getTransfer(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText); 

        document.getElementById("data").innerHTML = "<br><select name='from' id='fromId'></select>";
        for(var i= 0; i<data.length; i++){
            document.getElementById("fromId").innerHTML += 
            "<option value="+data[i].id+">"+data[i].name+"("+data[i].balance+")"+"</option> ";
            
        }
        document.getElementById("data").innerHTML += "<br>&#8595<br><select name='to' id='toId'></select>";
        for(var i= 0; i<data.length; i++){
            document.getElementById("toId").innerHTML += 
            "<option value="+data[i].id+">"+data[i].name+"("+data[i].balance+")"+"</option> ";
            
        }

        const select = document.getElementById("fromId");

        document.getElementById("data").innerHTML += "<br><input min='0' type='number' placeholder='SEK' name='amount' id='amountId' required><br><input type='submit' value='Transfer' onclick='transfer()'>";

                     
    }
    };
    xmlhttp.open("GET", "/balance", true);
    xmlhttp.send();
}

function transfer(){
    //XMLHTTP POST
}

getOverview();