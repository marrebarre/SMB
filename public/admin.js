


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



