function addUser() {
    if (username == "") {
        alert("Type A Name To Enter")
    } else {


        username = document.getElementById("username").value;
        localStorage.setItem("username", username);
        window.location = "kwitter_room.html";
    }
}
