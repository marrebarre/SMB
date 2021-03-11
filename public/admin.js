


function userPressed(){

    document.getElementById("search").innerHTML = "<input type='text' id='userSearch' name='username'><br>";
    document.getElementById("search").innerHTML +="<input type='submit' onClick='getUsers()' value='Search'>";

    

    try{
        document.getElementById("users").setAttribute('style', 'color: rgb(255, 174, 0)');
        document.getElementById("accounts").setAttribute('style', 'color: white');
        
    }catch{}
}


function getUsers(){

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
            for(var i= 0; i<data.length; i++){

                

                document.getElementById("tabledata").innerHTML += "<tr>"+
                
                "<td>" +data[i].id+"</td>"+
                "<td>" +data[i].username+"</td>"+
                "<td>" +data[i].password+"</td>"+
                "<td>" +data[i].admin+"</td>" + 
                "<td><input style='width: fit-content;' type='button' value='Edit' onclick='edit("+data[i].id+")'></td></tr>";
            
            }

        };

        postmsg = 
        "id="+id;
            
        }
        xmlhttp.open("POST", "/getusers", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(postmsg);
}

function edit(id){
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        //Response from server
        var data = JSON.parse(this.responseText); 

        document.getElementById("data").innerHTML = 
        "<br> Username<br><input type='text' id='u' value='"+data[0].username+"'>"+
        "<br> Password<br><input type='text' id='p' value='"+data[0].password+"'>"+
        "<br> isAdmin<br><input type='text' id='a' value='"+data[0].admin+"'>"+
        "<br><input style='width: fit-content;' type='submit' value='Save' onclick='save("+data[0].id+")'>";    
    }
    };

    postmsg = 
    "id="+id;
        
    
    xmlhttp.open("POST", "/getusers", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);

    
}

function save(id){

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
    "id="+id+
    "&username="+username+
    "&password="+password+
    "&admin="+admin;
        
    
    xmlhttp.open("POST", "/saveuser", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postmsg);


    
}



function accountsPressed(){

    document.getElementById("data").innerHTML = "<input type='text' id='accountsSearch' ><br>";
    document.getElementById("data").innerHTML +="<input type='submit' onClick='getAccounts("+document.getElementById("accountsSearch").value+")' value='Search'>";

    

    try{
        document.getElementById("users").setAttribute('style', 'color: white');
        document.getElementById("accounts").setAttribute('style', 'color: rgb(255, 174, 0)');
        
    }catch{}
}

function getAccounts(msg){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText); 

        
        
                              
    }
    };

    xmlhttp.open("GET", "/", true);
    xmlhttp.send();
}



userPressed();


