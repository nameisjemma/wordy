// This is a recurring section of code I have to allow
// access to my database and authentication on any pages where
// I am using Firebase API
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
var wordlistTable = document.getElementById("wordlistTable");
var wordlistLevel = "";
db.ref("users/" + uid).on("value", (snapshot) => {
    var data = snapshot.val()
    wordlistLevel = data.wordlist;
    displayWordlist();
});

function displayWordlist() {
    var fileToRead = "";
    switch(wordlistLevel) {
        case "Beginner":
            fileToRead = "Beginner.txt";
            break;
        case "Intermediate":
            fileToRead = "Intermediate.txt";
            break;
        case "Advanced":
            fileToRead = "Advanced.txt";
            break;
    }

    fetch(fileToRead)
    .then(response => response.text())
    .then((text) => {
        var lines = text.split("\n");
        for (line of lines) {
            var lineData = line.split(",");

            var tr = document.createElement("tr");

            var word = document.createElement("td");
            var definition = document.createElement("td");
            var synonym = document.createElement("td");
        
            word.style.color =  "#471a66";
            definition.style.color = "#471a66";
            synonym.style.color = "#471a66";

            word.style.padding = "10px";
            definition.style.padding = "10px";
            synonym.style.padding = "10px";

            word.style.textAlign = "center";
            definition.style.textAlign = "center";
            synonym.style.textAlign = "center";

            word.innerHTML = lineData[0];
            definition.innerHTML = lineData[1];
            synonym.innerHTML = lineData[2];

            tr.appendChild(word);
            tr.appendChild(definition);
            tr.appendChild(synonym);
            wordlistTable.appendChild(tr)
        }
    })
}