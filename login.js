var loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", () => login())


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

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // Here I am using the Firebase API with the given email and password
    // to help authenticate the user
    auth.signInWithEmailAndPassword(email, password)
    .then(function(result) {
        // If the user manages to sign in, I get the uid 
        // from the response and keep this stored in my local storage
        var uid = result.user.uid;
        localStorage.setItem("uid", uid);
        window.location = "dashboard.html"
    }).catch(function(error) {
         // fancy error message
        swal({
            title: "Oops!",
            text: error.message,
            icon: "error"
        })
    });
}