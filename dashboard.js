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

var wordData = {};
var expectedAnswer;

// Here I basically setting up the code to say 
// welcome back to the user. I do this by getting
// the stored uid for the authenticated user and finding the 
// corresponding user in the database
var welcomeBack = document.getElementById("welcomeBack");
var pointsText = document.getElementById("pointsText");
var wordListLevel = document.getElementById("wordListLevel");
var questionText = document.getElementById("question");
var answer = document.getElementById("userAnswer");
var checkAnswer = document.getElementById("checkAnswerButton");
var changeWordlistButton = document.getElementById("changeWordLevel");
var db = firebase.database();
var uid = localStorage.getItem("uid");
var userPoints = 0;
var wordyboardRank = "";
var wordlistLevel = "";

db.ref("users/" + uid).on("value", (snapshot) => {
    var data = snapshot.val()
    welcomeBack.innerHTML = "Welcome back, " + data.username + "!";
    userPoints = data.points;
    wordlistLevel = data.wordlist;
    showPoints()
    wordListLevel.innerHTML = "Current Wordlist: " + wordlistLevel;
    setup();
});

// adding click listener to the check answer btn
checkAnswer.addEventListener("click", submitAnswer);

// logging out button
var logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.clear();
    window.location = "index.html"
});

// adding click listener to switch wordlist level
changeWordlistButton.addEventListener("click", changeWordlist)
// gets the wordlist level and reads the file
// whilst putting words, meanings and synoyms into a function into an object 
function setup() {
    // finding the associated file name with the user level
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

    // read the file and append to word data
    // when it's appended to word data, I then
    // check to see if a question in progress is loaded otherwise,
    // generate a new one
    fetch(fileToRead)
    .then(response => response.text())
    .then((text) => {
        var lines = text.split("\n");
        for (line of lines) {
            var lineData = line.split(",");
            wordData[lineData[0]] = [lineData[1], lineData[2]]
        }
        var correctAnswer = localStorage.getItem('questionAnswer');
        if (correctAnswer === null) {
            generateQuestion(); 
        } else {
            displayQuestion(correctAnswer);
        }
    })
}

function generateQuestion() {
   // just storing a randomly generated question into local storage
   expectedAnswer =  Object.keys(wordData)[Math.floor(Object.keys(wordData).length * Math.random())];
   localStorage.setItem("questionAnswer", expectedAnswer);
   displayQuestion(expectedAnswer);
}

function displayQuestion(question) {
    // generating a random number to indicate whether I am using a synonym
    // or definition for the actual word for the given word
    var questionData = wordData[question];
    var questionSynonymOrQuestion = Math.round(Math.random())
    if (questionSynonymOrQuestion === 0) {
        questionText.innerHTML = "Definition: " + questionData[questionSynonymOrQuestion];
    } else {
        questionText.innerHTML = "A synonym for " + questionData[questionSynonymOrQuestion];
    }
}

function submitAnswer () {
    // firstly getting the stored answer from local storage
    var expectedAnswer = localStorage.getItem('questionAnswer');

    // i convert to lowercase to avoid any case issues and only check
    // spelling
    if (answer.value.toLowerCase() === expectedAnswer.toLowerCase()) {
        swal({
            title: "Yay!",
            text: "You got it correct!",
            icon: "success"
        });

        // adding points and then making a new question
        userPoints += 100;
        showPoints();
        updatePoints();
        generateQuestion();
    } else {
        swal({
            title: "Oh no!",
            text: "Try again!",
            icon: "error"
        })
    }
}

// just showing the points on the screen
function showPoints() {
    pointsText.innerHTML = "Total Points: " + userPoints.toString();
}


function updatePoints() {
    // getting the current data and just only modifying
    // the points field
    var dataUpdated;
    db.ref("users/" + uid).on("value", (snapshot) => {
        var data = snapshot.val()
        data.points = userPoints;
        dataUpdated = data;
    });    

    db.ref("users/" + uid).set(dataUpdated)
}

// changes the wordlist in the database
function changeWordlist() {
    // getting the current data in database
    // because I don't want to overwrite anything
    var dataUpdated;
    db.ref("users/" + uid).on("value", (snapshot) => {
        var data = snapshot.val()
        dataUpdated = data;
    });    

    swal({
        title: "Change Wordlist!",
        text: "Choose a wordlist level",
        buttons: {
            "Beginner": "Beginner",
            "Intermediate": "Intermediate",
            "Advanced": "Advanced"
        }
    })
    .then((value) => {
        // here I am taking the value from the button presses
        // and sending it to database
        dataUpdated.wordlist = value;
        db.ref("users/" + uid).set(dataUpdated);
        location.reload();
    })
}