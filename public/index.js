// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBaMRoLTXNSnwcwqrsGECoasCBBzBQHWLQ",
    authDomain: "doctor-patient-access.firebaseapp.com",
    databaseURL: "https://doctor-patient-access-default-rtdb.firebaseio.com",
    projectId: "doctor-patient-access",
    storageBucket: "doctor-patient-access.appspot.com",
    messagingSenderId: "1066923897179",
    appId: "1:1066923897179:web:202b39d672d02fa5466a7e",
    measurementId: "G-DB578XYWEM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Logged in
        firebase.database().ref('Doctors/' + user.uid).on('value', (snapshot) => {
            var doctorProfile = snapshot.val();
            
            if (doctorProfile) {
                window.location.href = "dashboard.html";
            } else {
                logout();
            }
        });
    }
});

var regimentElements = [];

function login() {

    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error (" + errorCode + ") " + errorMessage);
        });
}

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.alert("User does not have doctor privileges");
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error (" + errorCode + ") " + errorMessage)
    });
}


