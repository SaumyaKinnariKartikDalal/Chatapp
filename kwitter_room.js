//ADD YOUR FIREBASE LINKS HERE
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


function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  //End code
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}

function addRoom() {
      roomname = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update({
            purpose: "Add Roomname"
      });
      localStorage.setItem("roomname", roomname);
      window.location = "kwitter_page.html";
}
