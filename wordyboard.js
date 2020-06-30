// This is a recurring section of code I have to allow
// access to my database and authentication on any pages where
// I am using Firebase API

// Reference for sorting the user points 
// https://stackoverflow.com/questions/14208651/javascript-sort-key-value-pair-object-based-on-value
var firebaseConfig = {
    apiKey: "AIzaSyBd9YGBhPhiFZYpFZicsSyQWtUrzfHNrjQ",
    authDomain: "wordy-d4524.firebaseapp.com",
    databaseURL: "https://wordy-d4524.firebaseio.com",
    projectId: "wordy-d4524",
    storageBucket: "wordy-d4524.appspot.com",
    messagingSenderId: "254223832093",
    appId: "1:254223832093:web:d88a61752b2ebb72cda2f4",
    measurementId: "G-267YRXGKHM"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var uid = localStorage.getItem("uid");
var wordyboard = document.getElementById("wordyboard");
var wordlistLevel = "";
var usersToPoints = [];

db.ref("users/").on("value", (snapshot) => {
    var data = snapshot.val();
    for (user in data) {
        var username = data[user].username;
        var points = data[user].points;
        usersToPoints.push([username, points]);
    }

    usersToPoints = usersToPoints.sort(function(a, b) { 
        console.log(a, b)
        return b[1] - a[1]; 
    });
    
    for (var user = 0; user < usersToPoints.length; user++) {
        displayWordyboardUser(user + 1, usersToPoints[user][0], usersToPoints[user][1])
    }
});

function displayWordyboardUser(pos, u, p) {
    var tr = document.createElement("tr");

    var position = document.createElement("td");
    var user = document.createElement("td");
    var points = document.createElement("td");

    position.style.color =  "#471a66";
    user.style.color = "#471a66";
    points.style.color = "#471a66";

    position.style.padding = "10px";
    user.style.padding = "10px";
    points.style.padding = "10px";

    position.style.textAlign = "center";
    user.style.textAlign = "center";
    points.style.textAlign = "center";

    position.innerHTML = pos;
    user.innerHTML = u;
    points.innerHTML = p;

    tr.appendChild(position);
    tr.appendChild(user);
    tr.appendChild(points);
    wordyboard.appendChild(tr)
}