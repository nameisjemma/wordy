// In this bit of code, I am getting the HTML UI elements
// so I can write code to get the registration to work
var registerButton = document.getElementById("registerButton");
var email = document.getElementById("email");
var password = document.getElementById("password");
var username = document.getElementById("username");

// Adding an eventListener for when the submit button is hit
registerButton.addEventListener("click", () => register())

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

let auth = firebase.auth();
let db = firebase.database();

function register() {
    // Here I am just using the Firebase API to create a new user
    auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(function(result) {
        // uid stands for user id. I use this in my database
        // as a unique way to identifies users
        var uid = result.user.uid
        db.ref("users/" + uid).set({
          email: email.value,
          username: username.value,
          wordlist: "Beginner",
          points: 0
        })

        swal({
          title: "Success!",
          text: "Your account was successfully created! Please proceed to the login page!",
          icon: "success"
        }) 
    })
    .catch(function(error) {
        // Basically sending a fancy error message
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          swal({
            title: "Oops!",
            text: "Your password is too weak!",
            icon: "error"
          })
        } else {
            swal({
              title: "Oops!",
              text: error.message,
              icon: "error"
          })
        }
        console.log(error);
    });
}
