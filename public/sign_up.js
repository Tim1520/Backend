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

currentUser = null;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // Logged in
    } else {
        // Logged out
        window.location.href = "index.html";
    }
});

var db = firebase.firestore();

function signup() {

    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password === confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                var doctorEmail = {};
                doctorEmail[email] = email;

                db.collection('emails').doc('doctor_emails').set(doctorEmail, { merge: true });

                firebase.database().ref('Doctors/' + user.uid).set({
                    fullName: fullname,
                    email: email
                });

                document.getElementById("sign_up").style.display = "none";
                document.getElementById("success_button").style.display = "block";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                window.alert("Error (" + errorCode + ") " + errorMessage);
            });
    } else {
        window.alert("Passwords do not match");
    }
}

function goback() {
    window.location.href = "dashboard.html";
}