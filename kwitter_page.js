//YOUR FIREBASE LINKS
count = 0;
const firebaseConfig = {
    apiKey: "AIzaSyBY1Unpakm2F74IbuTlluPRQ_lT1IuOzjw",
    authDomain: "kwitter-695c1.firebaseapp.com",
    databaseURL: "https://kwitter-695c1-default-rtdb.firebaseio.com",
    projectId: "kwitter-695c1",
    storageBucket: "kwitter-695c1.appspot.com",
    messagingSenderId: "261820029777",
    appId: "1:261820029777:web:a4b6343715c5a4a0319170"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("username")
room_name = localStorage.getItem("roomname")

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                Username = message_data['Name'];
                Message = message_data['Message'];
                Likes = message_data['like'];
                NameWithTag = "<h4> " + Username + " <img class = 'user_tick' src = 'tick.png'></h4>";
                MessageWithTag = "<h4 class = 'message_h4'> " + Message + " </h4>";
                LikeButton = "<button class = 'btn btn-warning' id  =" + firebase_message_id + " value =" + Likes + " onclick = 'update_like(this.id)'>";
                SpanWithTag = "<span class = 'glyphicon glyphicon-thumbs-up'> likes " + Likes + "</span></button><hr>";
                row = NameWithTag + MessageWithTag + LikeButton + SpanWithTag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location = "index.html";
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        Name: username,
        Message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function switchroom() {
    localStorage.removeItem("roomname");
    window.location = "kwitter_room.html";
}

function update_like(message_id){
    count = count+1;
    if (count == 1) {
          console.log("clicked on like button - " + message_id);
    buttonID = message_id;
    like = document.getElementById(buttonID).value;
    update_likes = Number(like) + 1;
    console.log(update_likes)
    firebase.database().ref(room_name).child(message_id).update({
          like: update_likes
    });
    } else {
          console.log("clicked on like button - " + message_id);
    buttonID = message_id;
    like = document.getElementById(buttonID).value;
    update_likes = Number(like) - 1;
    console.log(update_likes)
    firebase.database().ref(room_name).child(message_id).update({
          like: update_likes
    });
    count = 0;
    }
}
